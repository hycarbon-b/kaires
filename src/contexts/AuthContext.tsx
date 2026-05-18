import { createContext, useContext, useEffect, useMemo, useState } from "react"
import type { ReactNode } from "react"
import * as client from "../lib/api"
import type { AccountState } from "../lib/api"

interface AuthContextValue {
  account: AccountState | null
  loading: boolean
  error: string | null
  setAccount: (account: AccountState | null) => void
  reload: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<AccountState | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const reload = async () => {
    setLoading(true)
    setError(null)
    try {
      setAccount(await client.me())
    } catch (err) {
      setAccount(null)
      setError(err instanceof Error ? err.message : "加载账户失败")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { void reload() }, [])

  const value = useMemo(() => ({ account, loading, error, setAccount, reload }), [account, loading, error])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider")
  return ctx
}
