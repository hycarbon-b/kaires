process.env.NEW_API_MOCK ||= "1"
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
const key = await request("/api/new-api/refresh-key", { method: "POST" })
if (!key.apiKey?.masked_key) throw new Error("missing refreshed key")
const chat = await request("/api/chat", {
  method: "POST",
  body: JSON.stringify({ model: "gpt-4o-mini", messages: [{ role: "user", content: "ping" }] }),
})
if (!chat.message?.content.includes("ping")) throw new Error("chat response did not include mock echo")
const me = await request("/api/me")
if (me.subscription.used_this_month !== 1) throw new Error("subscription usage was not incremented")

console.log("E2E OK", { email, plan: me.subscription.plan, used: me.subscription.used_this_month, key: key.apiKey.masked_key })
server.close()
