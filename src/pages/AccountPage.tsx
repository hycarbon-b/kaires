import { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { Check, CreditCard, KeyRound, LogOut, ArrowRight } from "lucide-react"
import { logout, updateSubscription } from "../lib/api"
import { useAuth } from "../contexts/AuthContext"

const PLANS = [
  { id: "free", name: "Free", limit: "100 次/月", desc: "个人体验与测试" },
  { id: "pro", name: "Pro", limit: "2,000 次/月", desc: "高频个人工作流" },
  { id: "team", name: "Team", limit: "10,000 次/月", desc: "团队共享与集成" },
]

export default function AccountPage() {
  const { account, loading, setAccount } = useAuth()
  const [busy, setBusy] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  if (loading) return null
  if (!account) return <Navigate to="/login" replace />

  const usage = Math.round((account.subscription.used_this_month / account.subscription.monthly_limit) * 100)
  const keyCount = account.apiKeys?.length ?? (account.apiKey ? 1 : 0)

  const run = async (name: string, fn: () => Promise<void>) => {
    setBusy(name)
    setError(null)
    try { await fn() } catch (err) { setError(err instanceof Error ? err.message : "操作失败") } finally { setBusy(null) }
  }

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl text-stone-100 tracking-widest uppercase">账户与订阅</h1>
            <p className="text-sm text-stone-500">{account.user.email}</p>
          </div>
          <button
            onClick={() => run("logout", async () => { await logout(); setAccount(null); navigate("/login") })}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-stone-500 hover:text-stone-200 hover:bg-white/5 transition-colors"
          >
            <LogOut size={13} /> 退出
          </button>
        </div>

        {error && <div className="glass px-4 py-3 rounded-xl text-sm text-red-400">{error}</div>}

        <section className="glass p-5 rounded-2xl">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard size={16} className="text-amber-400" />
            <h2 className="text-sm font-semibold text-stone-100">订阅制管理</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            {PLANS.map(plan => {
              const active = account.subscription.plan === plan.id
              return (
                <button
                  key={plan.id}
                  onClick={() => run(plan.id, async () => setAccount(await updateSubscription(plan.id)))}
                  className={`text-left p-4 rounded-xl border transition-all ${active ? "border-amber-500/30 bg-amber-500/10" : "border-stone-800 bg-stone-950/40 hover:border-stone-700"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-xl text-stone-100 tracking-wider">{plan.name}</span>
                    {active && <Check size={14} className="text-amber-400" />}
                  </div>
                  <p className="text-xs text-amber-400 mt-1">{plan.limit}</p>
                  <p className="text-xs text-stone-500 mt-2">{plan.desc}</p>
                </button>
              )
            })}
          </div>
          <div className="mt-5">
            <div className="flex justify-between text-xs text-stone-500 mb-2">
              <span>本月用量</span>
              <span>{account.subscription.used_this_month} / {account.subscription.monthly_limit}</span>
            </div>
            <div className="h-2 rounded-full bg-stone-900 overflow-hidden">
              <div className="h-full bg-amber-500" style={{ width: `${Math.min(usage, 100)}%` }} />
            </div>
          </div>
        </section>

        <section className="glass p-5 rounded-2xl">
          <Link to="/keys" className="flex items-center justify-between gap-4 group">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <KeyRound size={16} className="text-amber-400" />
              </div>
              <div className="min-w-0">
                <h2 className="text-sm font-semibold text-stone-100">API Keys</h2>
                <p className="text-xs text-stone-500 mt-1">
                  当前共 <span className="text-amber-400 font-mono">{keyCount}</span> 把 Key。在 Keys 管理页可新增、命名、查看用量、删除。
                </p>
                <p className="text-[10px] text-stone-700 mt-1">
                  Base URL: <code className="font-mono">{`${window.location.origin}/v1`}</code>
                </p>
              </div>
            </div>
            <span className="flex items-center gap-1.5 text-xs text-amber-400 group-hover:text-amber-300">
              前往管理 <ArrowRight size={12} />
            </span>
          </Link>
        </section>
      </div>
    </div>
  )
}
