const DEFAULT_MODEL = "gpt-4o-mini"

function parseSetCookie(headers) {
  const raw = headers.getSetCookie?.() || []
  if (raw.length) return raw.map(cookie => cookie.split(";")[0]).join("; ")
  const single = headers.get("set-cookie")
  return single ? single.split(",").map(cookie => cookie.split(";")[0]).join("; ") : ""
}

function extractItems(payload) {
  const data = payload?.data ?? payload
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.items)) return data.items
  if (Array.isArray(data?.data)) return data.data
  if (Array.isArray(payload?.items)) return payload.items
  return []
}

export function isMockGateway() {
  return process.env.NEW_API_MOCK === "1" || !process.env.NEW_API_BASE_URL
}

export async function createGatewayToken({ userId, email }) {
  if (isMockGateway()) {
    return {
      provider: "mock-new-api",
      tokenId: `mock-${userId}-${Date.now()}`,
      key: `sk-kaires_mock_${Buffer.from(`${email}:${Date.now()}`).toString("base64url")}`,
    }
  }

  const baseUrl = process.env.NEW_API_BASE_URL.replace(/\/$/, "")
  let cookie = process.env.NEW_API_COOKIE || ""

  if (!cookie && process.env.NEW_API_USERNAME && process.env.NEW_API_PASSWORD) {
    const login = await fetch(`${baseUrl}/api/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: process.env.NEW_API_USERNAME, password: process.env.NEW_API_PASSWORD }),
    })
    const loginPayload = await login.json().catch(() => ({}))
    if (!login.ok || loginPayload.success === false) {
      throw new Error(loginPayload.message || `New API login failed: ${login.status}`)
    }
    cookie = parseSetCookie(login.headers)
  }

  if (!cookie) {
    throw new Error("Configure NEW_API_USERNAME/NEW_API_PASSWORD or NEW_API_COOKIE to refresh a real New API key")
  }

  const tokenName = `kaires-${userId}-${Date.now()}`
  const create = await fetch(`${baseUrl}/api/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Cookie: cookie },
    body: JSON.stringify({
      name: tokenName,
      expired_time: -1,
      remain_quota: 500000,
      unlimited_quota: false,
      model_limits_enabled: false,
      model_limits: "",
      group: "default",
    }),
  })
  const createPayload = await create.json().catch(() => ({}))
  if (!create.ok || createPayload.success === false) {
    throw new Error(createPayload.message || `New API token creation failed: ${create.status}`)
  }

  const list = await fetch(`${baseUrl}/api/token/?p=0&size=50`, { headers: { Cookie: cookie } })
  const listPayload = await list.json().catch(() => ({}))
  const created = extractItems(listPayload).find(token => token.name === tokenName)
  if (!created?.id) throw new Error("New API token was created but could not be found in token list")

  const keyRes = await fetch(`${baseUrl}/api/token/${created.id}/key`, { method: "POST", headers: { Cookie: cookie } })
  const keyPayload = await keyRes.json().catch(() => ({}))
  const key = keyPayload?.data?.key || keyPayload?.key
  if (!keyRes.ok || !key) throw new Error(keyPayload.message || `New API key fetch failed: ${keyRes.status}`)

  return { provider: "new-api", tokenId: String(created.id), key }
}

export async function chatWithGateway({ apiKey, model, messages }) {
  if (isMockGateway() || apiKey.includes("kaires_mock")) {
    const last = [...messages].reverse().find(message => message.role === "user")?.content || ""
    return `已通过后台代理收到你的问题：${last}\n\n当前处于 New API mock 模式。配置 NEW_API_BASE_URL 与 NEW_API_USERNAME/NEW_API_PASSWORD 后，后台会刷新真实 New API Key 并代理 /v1/chat/completions。`
  }

  const baseUrl = process.env.NEW_API_BASE_URL.replace(/\/$/, "")
  const res = await fetch(`${baseUrl}/v1/chat/completions`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model: model || DEFAULT_MODEL, messages, temperature: 0.7 }),
  })
  const payload = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(payload.error?.message || payload.message || `Gateway chat failed: ${res.status}`)
  return payload.choices?.[0]?.message?.content || "网关返回了空内容。"
}
