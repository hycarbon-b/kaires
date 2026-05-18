export interface ApiKeyRecord {
  id: number
  name: string
  provider: string
  token_id?: string
  masked_key: string
  refreshed_at: string
  last_used_at?: string
  request_count: number
  created_at: string
  key?: string
}

export interface AccountState {
  user: { id: number; email: string; name: string }
  subscription: { plan: string; status: string; monthly_limit: number; used_this_month: number; current_period_end: string }
  apiKey?: ApiKeyRecord | null
  apiKeys?: ApiKeyRecord[]
  gateway: { mock: boolean }
}

async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(path, {
    ...options,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(body.message || `Request failed: ${res.status}`)
  return body as T
}

export function me() {
  return api<AccountState>("/api/me")
}

export function login(email: string, password: string) {
  return api<AccountState>("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password }) })
}

export function register(email: string, password: string, name: string) {
  return api<AccountState>("/api/auth/register", { method: "POST", body: JSON.stringify({ email, password, name }) })
}

export function logout() {
  return api<{ ok: true }>("/api/auth/logout", { method: "POST" })
}

export function updateSubscription(plan: string) {
  return api<AccountState>("/api/subscription", { method: "POST", body: JSON.stringify({ plan }) })
}

export function refreshKey() {
  return api<Pick<AccountState, "apiKey" | "gateway">>("/api/api-key/refresh", { method: "POST" })
}

export function listApiKeys() {
  return api<{ apiKeys: ApiKeyRecord[]; gateway: { mock: boolean } }>("/api/api-keys")
}

export function createApiKey(name: string) {
  return api<{ apiKey: ApiKeyRecord; apiKeys: ApiKeyRecord[]; gateway: { mock: boolean } }>("/api/api-keys", {
    method: "POST",
    body: JSON.stringify({ name }),
  })
}

export function deleteApiKey(id: number) {
  return api<{ ok: true; apiKeys: ApiKeyRecord[] }>(`/api/api-keys/${id}`, { method: "DELETE" })
}

export function sendChat(model: string, messages: { role: "user" | "assistant"; content: string }[]) {
  return api<{ message: { role: "assistant"; content: string; model?: string }; account: Omit<AccountState, "user"> }>("/api/chat", {
    method: "POST",
    body: JSON.stringify({ model, messages }),
  })
}
