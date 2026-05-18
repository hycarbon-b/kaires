import { useState } from "react"
import { Navigate, useSearchParams } from "react-router-dom"
import { Lock, Mail, UserPlus } from "lucide-react"
import { login, register } from "../lib/api"
import { useAuth } from "../contexts/AuthContext"

export default function AuthPage() {
  const { account, setAccount } = useAuth()
  const [searchParams] = useSearchParams()
  const from = searchParams.get("from") || "/chat"
  const [mode, setMode] = useState<"login" | "register">("login")
  const [email, setEmail] = useState("demo@kaires.local")
  const [password, setPassword] = useState("secret123")
  const [name, setName] = useState("Kaires User")
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  if (account) return <Navigate to={from} replace />

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    setBusy(true)
    setError(null)
    try {
      setAccount(mode === "login" ? await login(email, password) : await register(email, password, name))
    } catch (err) {
      setError(err instanceof Error ? err.message : "认证失败")
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 dot-bg" style={{ background: "#07070a" }}>
      <form onSubmit={submit} className="glass w-full max-w-sm p-6 rounded-2xl">
        <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center mb-5">
          <span className="font-display text-black tracking-widest">K</span>
        </div>
        <h1 className="font-display text-3xl text-stone-100 tracking-widest uppercase">Kaires Account</h1>
        <p className="text-sm text-stone-500 mt-1 mb-6">登录后可使用后台托管的 API Key，并按订阅额度进行聊天。</p>

        <div className="flex p-1 rounded-xl mb-4" style={{ background: "rgba(9,9,12,0.9)", border: "1px solid rgba(251,191,36,0.08)" }}>
          {(["login", "register"] as const).map(item => (
            <button
              key={item}
              type="button"
              onClick={() => setMode(item)}
              className={`flex-1 py-2 rounded-lg text-xs transition-colors ${mode === item ? "bg-amber-500 text-black font-semibold" : "text-stone-500 hover:text-stone-300"}`}
            >
              {item === "login" ? "登录" : "注册"}
            </button>
          ))}
        </div>

        {mode === "register" && (
          <label className="block mb-3">
            <span className="text-[10px] text-stone-600 uppercase tracking-wider">名称</span>
            <div className="input-dark mt-1 flex items-center px-3">
              <UserPlus size={13} className="text-stone-600" />
              <input value={name} onChange={e => setName(e.target.value)} className="flex-1 bg-transparent outline-none px-3 py-2.5 text-sm text-stone-200" />
            </div>
          </label>
        )}

        <label className="block mb-3">
          <span className="text-[10px] text-stone-600 uppercase tracking-wider">邮箱</span>
          <div className="input-dark mt-1 flex items-center px-3">
            <Mail size={13} className="text-stone-600" />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="flex-1 bg-transparent outline-none px-3 py-2.5 text-sm text-stone-200" />
          </div>
        </label>
        <label className="block mb-4">
          <span className="text-[10px] text-stone-600 uppercase tracking-wider">密码</span>
          <div className="input-dark mt-1 flex items-center px-3">
            <Lock size={13} className="text-stone-600" />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="flex-1 bg-transparent outline-none px-3 py-2.5 text-sm text-stone-200" />
          </div>
        </label>

        {error && <p className="text-xs text-red-400 mb-3">{error}</p>}
        <button disabled={busy} className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black text-sm font-semibold transition-colors">
          {busy ? "处理中..." : mode === "login" ? "登录" : "创建账户"}
        </button>
      </form>
    </div>
  )
}
