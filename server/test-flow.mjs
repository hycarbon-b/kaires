process.env.GATEWAY_MOCK ||= "1"
process.env.KAIRES_DB_PATH ||= `./data/test-${Date.now()}.sqlite`

const { createAppServer } = await import("./app.mjs")

const server = createAppServer()
await new Promise(resolve => server.listen(0, resolve))
const base = `http://127.0.0.1:${server.address().port}`
let cookie = ""

async function request(path, options = {}) {
  const res = await fetch(`${base}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", Cookie: cookie, ...(options.headers || {}) },
  })
  const setCookie = res.headers.get("set-cookie")
  if (setCookie) cookie = setCookie.split(";")[0]
  const body = await res.json()
  if (!res.ok) throw new Error(`${path} failed: ${res.status} ${JSON.stringify(body)}`)
  return body
}

const email = `tester-${Date.now()}@kaires.local`
await request("/api/auth/register", { method: "POST", body: JSON.stringify({ email, password: "secret123", name: "Flow Tester" }) })
await request("/api/subscription", { method: "POST", body: JSON.stringify({ plan: "pro" }) })
const key = await request("/api/api-keys", { method: "POST", body: JSON.stringify({ name: "Production" }) })
if (!key.apiKey?.masked_key || !key.apiKey?.key) throw new Error("missing created key")
const list = await request("/api/api-keys")
if (!Array.isArray(list.apiKeys) || list.apiKeys.length !== 1) throw new Error("expected exactly one key")
const second = await request("/api/api-keys", { method: "POST", body: JSON.stringify({ name: "Staging" }) })
const afterTwo = await request("/api/api-keys")
if (afterTwo.apiKeys.length !== 2) throw new Error("expected two keys")
await request(`/api/api-keys/${second.apiKey.id}`, { method: "DELETE" })
const afterDelete = await request("/api/api-keys")
if (afterDelete.apiKeys.length !== 1) throw new Error("delete did not remove key")
const chat = await request("/api/chat", {
  method: "POST",
  body: JSON.stringify({ model: "gpt-4o-mini", messages: [{ role: "user", content: "ping" }] }),
})
if (!chat.message?.content.includes("ping")) throw new Error("chat response did not include mock echo")
const external = await fetch(`${base}/v1/chat/completions`, {
  method: "POST",
  headers: { "Content-Type": "application/json", Authorization: `Bearer ${key.apiKey.key}` },
  body: JSON.stringify({ model: "gpt-4o-mini", messages: [{ role: "user", content: "external ping" }] }),
})
const externalBody = await external.json()
if (!external.ok) throw new Error(`/v1/chat/completions failed: ${external.status} ${JSON.stringify(externalBody)}`)
if (!externalBody.choices?.[0]?.message?.content.includes("external ping")) throw new Error("external chat response did not include mock echo")
const me = await request("/api/me")
if (me.subscription.used_this_month !== 2) throw new Error("subscription usage was not incremented")

console.log("E2E OK", { email, plan: me.subscription.plan, used: me.subscription.used_this_month, key: key.apiKey.masked_key, external: "/v1/chat/completions" })
server.close()
