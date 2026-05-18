import { createServer } from "node:http"
import { db, maskKey, nextMonthIso, nowIso, publicUser } from "./db.mjs"
import { decryptKey, encryptKey, hashPassword, newCustomerApiKey, newSessionId, verifyPassword } from "./crypto.mjs"
import { chatWithGateway, createGatewayToken, isMockGateway } from "./newApiClient.mjs"

const PLAN_LIMITS = { free: 100, pro: 2000, team: 10000 }

function json(res, status, body, headers = {}) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    ...headers,
  })
  res.end(JSON.stringify(body))
}

function empty(res, status = 204) {
  res.writeHead(status, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  })
  res.end()
}

function parseCookies(header = "") {
  return Object.fromEntries(header.split(";").map(part => part.trim().split("=")).filter(pair => pair[0]))
}

function sessionCookie(id, maxAge = 60 * 60 * 24 * 30) {
  return `kaires_session=${id}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}`
}

async function readBody(req) {
  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  if (!chunks.length) return {}
  return JSON.parse(Buffer.concat(chunks).toString("utf8"))
}

function getCurrentUser(req) {
  const sessionId = parseCookies(req.headers.cookie).kaires_session
  if (!sessionId) return null
  const row = db.prepare(`
    SELECT users.* FROM sessions
    JOIN users ON users.id = sessions.user_id
    WHERE sessions.id = ? AND sessions.expires_at > CURRENT_TIMESTAMP
  `).get(sessionId)
  return row || null
}

function listApiKeys(userId) {
  return db.prepare("SELECT id, name, provider, token_id, masked_key, refreshed_at, last_used_at, request_count, created_at FROM api_keys WHERE user_id = ? ORDER BY created_at DESC, id DESC").all(userId)
}

function getAccount(userId) {
  const subscription = db.prepare("SELECT * FROM subscriptions WHERE user_id = ?").get(userId)
  const apiKeys = listApiKeys(userId)
  return { subscription, apiKeys, apiKey: apiKeys[0] || null, gateway: { mock: isMockGateway() } }
}

function requireUser(req, res) {
  const user = getCurrentUser(req)
  if (!user) json(res, 401, { error: "UNAUTHENTICATED", message: "请先登录" })
  return user
}

function ensureSubscription(userId) {
  const existing = db.prepare("SELECT * FROM subscriptions WHERE user_id = ?").get(userId)
  if (existing) return existing
  db.prepare(`
    INSERT INTO subscriptions (user_id, plan, status, monthly_limit, used_this_month, current_period_end)
    VALUES (?, 'free', 'active', ?, 0, ?)
  `).run(userId, PLAN_LIMITS.free, nextMonthIso())
  return db.prepare("SELECT * FROM subscriptions WHERE user_id = ?").get(userId)
}

async function createKeyForUser(user, name) {
  const customerKey = newCustomerApiKey()
  const gatewayToken = await createGatewayToken({ userId: user.id, email: user.email })
  const result = db.prepare(`
    INSERT INTO api_keys (user_id, name, provider, token_id, key_cipher, masked_key, gateway_key_cipher, gateway_token_id, refreshed_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    user.id,
    String(name || "Default Key").slice(0, 80) || "Default Key",
    "kaires-api",
    `kaires-${user.id}-${Date.now()}`,
    encryptKey(customerKey),
    maskKey(customerKey),
    encryptKey(gatewayToken.key),
    gatewayToken.tokenId,
    nowIso(),
  )
  const apiKey = db.prepare("SELECT id, name, provider, token_id, masked_key, refreshed_at, last_used_at, request_count, created_at FROM api_keys WHERE id = ?").get(result.lastInsertRowid)
  return { ...apiKey, key: customerKey }
}

function ensureAnyKey(user) {
  const existing = db.prepare("SELECT * FROM api_keys WHERE user_id = ? ORDER BY id ASC").get(user.id)
  if (existing) return existing
  return null
}

function findUserByApiKey(rawKey) {
  if (!rawKey) return null
  const rows = db.prepare("SELECT api_keys.*, users.email, users.name FROM api_keys JOIN users ON users.id = api_keys.user_id").all()
  return rows.find(row => decryptKey(row.key_cipher) === rawKey) || null
}

function getProxyKey(apiKeyRow) {
  return decryptKey(apiKeyRow.gateway_key_cipher || apiKeyRow.key_cipher)
}

function openAIChatResponse({ model, content }) {
  return {
    id: `chatcmpl_${Date.now()}`,
    object: "chat.completion",
    created: Math.floor(Date.now() / 1000),
    model,
    choices: [
      {
        index: 0,
        message: { role: "assistant", content },
        finish_reason: "stop",
      },
    ],
    usage: {
      prompt_tokens: 0,
      completion_tokens: 0,
      total_tokens: 0,
    },
  }
}

async function handleOpenAIRequest(req, res) {
  const url = new URL(req.url, "http://localhost")
  if (req.method === "OPTIONS") return empty(res)
  if (req.method === "GET" && url.pathname === "/v1/models") {
    return json(res, 200, {
      object: "list",
      data: ["gpt-4o-mini", "gpt-4o", "claude-3-7-sonnet", "gemini-2.5-pro"].map(id => ({ id, object: "model", owned_by: "kaires" })),
    })
  }
  if (req.method !== "POST" || url.pathname !== "/v1/chat/completions") return json(res, 404, { error: { message: "Route not found" } })

  const auth = req.headers.authorization || ""
  const apiKey = auth.toLowerCase().startsWith("bearer ") ? auth.slice(7).trim() : ""
  const apiKeyRow = findUserByApiKey(apiKey)
  if (!apiKeyRow) return json(res, 401, { error: { message: "Invalid API key", type: "invalid_request_error" } })

  const subscription = ensureSubscription(apiKeyRow.user_id)
  if (subscription.status !== "active" || subscription.used_this_month >= subscription.monthly_limit) {
    return json(res, 402, { error: { message: "Subscription quota exceeded", type: "insufficient_quota" } })
  }

  const body = await readBody(req)
  const messages = Array.isArray(body.messages) ? body.messages : []
  const model = body.model || "gpt-4o-mini"
  const content = await chatWithGateway({ apiKey: getProxyKey(apiKeyRow), model, messages })
  const userMessage = [...messages].reverse().find(message => message.role === "user")
  if (userMessage?.content) db.prepare("INSERT INTO chat_messages (user_id, role, content, model) VALUES (?, 'user', ?, ?)").run(apiKeyRow.user_id, userMessage.content, model)
  db.prepare("INSERT INTO chat_messages (user_id, role, content, model) VALUES (?, 'assistant', ?, ?)").run(apiKeyRow.user_id, content, model)
  db.prepare("UPDATE subscriptions SET used_this_month = used_this_month + 1 WHERE user_id = ?").run(apiKeyRow.user_id)
  db.prepare("UPDATE api_keys SET last_used_at = ?, request_count = request_count + 1 WHERE id = ?").run(nowIso(), apiKeyRow.id)
  return json(res, 200, openAIChatResponse({ model, content }))
}

export async function handleRequest(req, res) {
  const url = new URL(req.url, "http://localhost")
  if (!url.pathname.startsWith("/api/")) return false

  try {
    if (req.method === "POST" && url.pathname === "/api/auth/register") {
      const body = await readBody(req)
      const email = String(body.email || "").trim().toLowerCase()
      const password = String(body.password || "")
      const name = String(body.name || email.split("@")[0] || "Kaires User").trim()
      if (!email.includes("@") || password.length < 6) {
        return json(res, 400, { message: "请输入有效邮箱，密码至少 6 位" })
      }
      const { salt, hash } = hashPassword(password)
      const result = db.prepare("INSERT INTO users (email, name, password_hash, salt) VALUES (?, ?, ?, ?)").run(email, name, hash, salt)
      ensureSubscription(result.lastInsertRowid)
      const sessionId = newSessionId()
      db.prepare("INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)").run(sessionId, result.lastInsertRowid, nextMonthIso())
      const user = db.prepare("SELECT * FROM users WHERE id = ?").get(result.lastInsertRowid)
      return json(res, 200, { user: publicUser(user), ...getAccount(user.id) }, { "Set-Cookie": sessionCookie(sessionId) })
    }

    if (req.method === "POST" && url.pathname === "/api/auth/login") {
      const body = await readBody(req)
      const email = String(body.email || "").trim().toLowerCase()
      const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email)
      if (!user || !verifyPassword(String(body.password || ""), user.salt, user.password_hash)) {
        return json(res, 401, { message: "邮箱或密码错误" })
      }
      ensureSubscription(user.id)
      const sessionId = newSessionId()
      db.prepare("INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)").run(sessionId, user.id, nextMonthIso())
      return json(res, 200, { user: publicUser(user), ...getAccount(user.id) }, { "Set-Cookie": sessionCookie(sessionId) })
    }

    if (req.method === "POST" && url.pathname === "/api/auth/logout") {
      const sessionId = parseCookies(req.headers.cookie).kaires_session
      if (sessionId) db.prepare("DELETE FROM sessions WHERE id = ?").run(sessionId)
      return json(res, 200, { ok: true }, { "Set-Cookie": sessionCookie("", 0) })
    }

    if (req.method === "GET" && url.pathname === "/api/me") {
      const user = requireUser(req, res)
      if (!user) return
      ensureSubscription(user.id)
      return json(res, 200, { user: publicUser(user), ...getAccount(user.id) })
    }

    if (req.method === "POST" && url.pathname === "/api/subscription") {
      const user = requireUser(req, res)
      if (!user) return
      const body = await readBody(req)
      const plan = String(body.plan || "free")
      if (!PLAN_LIMITS[plan]) return json(res, 400, { message: "未知订阅方案" })
      db.prepare(`
        INSERT INTO subscriptions (user_id, plan, status, monthly_limit, used_this_month, current_period_end)
        VALUES (?, ?, 'active', ?, 0, ?)
        ON CONFLICT(user_id) DO UPDATE SET
          plan = excluded.plan,
          status = 'active',
          monthly_limit = excluded.monthly_limit,
          current_period_end = excluded.current_period_end
      `).run(user.id, plan, PLAN_LIMITS[plan], nextMonthIso())
      return json(res, 200, { user: publicUser(user), ...getAccount(user.id) })
    }

    if (req.method === "GET" && url.pathname === "/api/api-keys") {
      const user = requireUser(req, res)
      if (!user) return
      return json(res, 200, { apiKeys: listApiKeys(user.id), gateway: { mock: isMockGateway() } })
    }

    if (req.method === "POST" && url.pathname === "/api/api-keys") {
      const user = requireUser(req, res)
      if (!user) return
      const body = await readBody(req)
      const existing = listApiKeys(user.id)
      if (existing.length >= 20) return json(res, 400, { message: "已达到 Key 数量上限（20）" })
      const apiKey = await createKeyForUser(user, body.name)
      return json(res, 200, { apiKey, apiKeys: listApiKeys(user.id), gateway: { mock: isMockGateway() } })
    }

    const deleteMatch = url.pathname.match(/^\/api\/api-keys\/(\d+)$/)
    if (req.method === "DELETE" && deleteMatch) {
      const user = requireUser(req, res)
      if (!user) return
      const id = Number(deleteMatch[1])
      const row = db.prepare("SELECT id FROM api_keys WHERE id = ? AND user_id = ?").get(id, user.id)
      if (!row) return json(res, 404, { message: "Key 不存在" })
      db.prepare("DELETE FROM api_keys WHERE id = ?").run(id)
      return json(res, 200, { ok: true, apiKeys: listApiKeys(user.id) })
    }

    // Legacy refresh kept as compatibility shim: creates a new Key labeled 'Refreshed Key'.
    if (req.method === "POST" && url.pathname === "/api/api-key/refresh") {
      const user = requireUser(req, res)
      if (!user) return
      const apiKey = await createKeyForUser(user, "Refreshed Key")
      return json(res, 200, { apiKey, gateway: { mock: isMockGateway() } })
    }

    if (req.method === "POST" && url.pathname === "/api/chat") {
      const user = requireUser(req, res)
      if (!user) return
      const subscription = ensureSubscription(user.id)
      if (subscription.status !== "active" || subscription.used_this_month >= subscription.monthly_limit) {
        return json(res, 402, { message: "订阅额度不足，请升级或等待下个周期" })
      }
      let apiKeyRow = ensureAnyKey(user)
      if (!apiKeyRow) {
        await createKeyForUser(user, "Default Key")
        apiKeyRow = ensureAnyKey(user)
      }
      const body = await readBody(req)
      const messages = Array.isArray(body.messages) ? body.messages : []
      const content = await chatWithGateway({ apiKey: getProxyKey(apiKeyRow), model: body.model, messages })
      const userMessage = [...messages].reverse().find(message => message.role === "user")
      if (userMessage?.content) db.prepare("INSERT INTO chat_messages (user_id, role, content, model) VALUES (?, 'user', ?, ?)").run(user.id, userMessage.content, body.model || null)
      db.prepare("INSERT INTO chat_messages (user_id, role, content, model) VALUES (?, 'assistant', ?, ?)").run(user.id, content, body.model || null)
      db.prepare("UPDATE subscriptions SET used_this_month = used_this_month + 1 WHERE user_id = ?").run(user.id)
      db.prepare("UPDATE api_keys SET last_used_at = ?, request_count = request_count + 1 WHERE id = ?").run(nowIso(), apiKeyRow.id)
      return json(res, 200, { message: { role: "assistant", content, model: body.model }, account: getAccount(user.id) })
    }

    return json(res, 404, { message: "API route not found" })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown server error"
    const status = message.includes("UNIQUE constraint") ? 409 : 500
    return json(res, status, { message })
  }
}

export function createAppServer() {
  return createServer(async (req, res) => {
    const url = new URL(req.url, "http://localhost")
    if (url.pathname.startsWith("/v1/")) {
      await handleOpenAIRequest(req, res)
      return
    }
    if (url.pathname.startsWith("/api/")) {
      await handleRequest(req, res)
      return
    }
    json(res, 404, { message: "Not found" })
  })
}
