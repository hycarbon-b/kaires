export interface AccountState {
  user: { id: number; email: string; name: string }
  subscription: { plan: string; status: string; monthly_limit: number; used_this_month: number; current_period_end: string }
  apiKey?: { id?: number; label?: string; provider: string; token_id?: string; masked_key: string; refreshed_at: string; last_used_at?: string; key?: string; calls_this_month?: number }
  gateway: { mock: boolean }
}

export interface ApiKeyItem {
  id: number
  label: string
  masked_key: string
  last_used_at: string | null
  calls_this_month: number
  refreshed_at: string
  /** Only present immediately after creation */
  key?: string
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

export function listKeys() {
  return api<{ keys: ApiKeyItem[] }>("/api/api-keys")
}

export function createKey(label: string) {
  return api<{ apiKey: ApiKeyItem & { key: string } }>("/api/api-keys", {
    method: "POST",
    body: JSON.stringify({ label }),
  })
}

export function deleteKey(id: number) {
  return api<{ ok: true }>(`/api/api-keys/${id}`, { method: "DELETE" })
}

export function sendChat(model: string, messages: { role: "user" | "assistant"; content: string }[]) {
  return api<{ message: { role: "assistant"; content: string; model?: string }; account: Omit<AccountState, "user"> }>("/api/chat", {
    method: "POST",
    body: JSON.stringify({ model, messages }),
  })
}
