import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import {
  KeyRound, Copy, Check, ArrowRight, Activity, Zap, ShieldCheck,
  Plus, MessageSquare, Sparkles, Terminal,
} from "lucide-react"
import { useAuth } from "../contexts/AuthContext"
import { createApiKey, listApiKeys, type ApiKeyRecord } from "../lib/api"

export default function DashboardPage() {
  const { account } = useAuth()
  const [keys, setKeys] = useState<ApiKeyRecord[]>(account?.apiKeys ?? [])
  const [loading, setLoading] = useState(false)
  const [creating, setCreating] = useState(false)
  const [newKey, setNewKey] = useState<ApiKeyRecord | null>(null)
  const [copied, setCopied] = useState<string | null>(null)

  const baseUrl = `${window.location.origin}/v1`

  useEffect(() => {
    let alive = true
    setLoading(true)
    listApiKeys()
      .then(res => { if (alive) setKeys(res.apiKeys) })
      .finally(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [])

  const totalRequests = useMemo(() => keys.reduce((sum, k) => sum + (k.request_count || 0), 0), [keys])

  const quickCreate = async () => {
    setCreating(true)
    try {
      const res = await createApiKey(`Key #${keys.length + 1}`)
      setKeys(res.apiKeys)
      setNewKey(res.apiKey)
    } finally {
      setCreating(false)
    }
  }

  const copy = async (label: string, value: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(label)
    setTimeout(() => setCopied(null), 1500)
  }

  if (!account) return null

  const used = account.subscription.used_this_month
  const limit = account.subscription.monthly_limit
  const usagePct = Math.min(100, Math.round((used / Math.max(limit, 1)) * 100))

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        {/* Hero */}
        <div className="rounded-2xl border border-amber-500/15 bg-gradient-to-br from-amber-500/[0.06] to-transparent p-6 md:p-8">
          <div className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase text-amber-400/80 mb-2">
            <ShieldCheck size={12} /> Kairos Relay · 中转 API
          </div>
          <h1 className="font-display text-2xl md:text-3xl text-stone-100 tracking-wider">
            一把 Key，接入所有主流模型
          </h1>
          <p className="text-sm text-stone-400 mt-2 max-w-xl">
            OpenAI 兼容协议，按订阅计费。在 Chatbox / Cherry Studio / Cursor / 自己的代码里直接替换 Base URL 即可使用。
          </p>

          <div className="mt-5 grid sm:grid-cols-2 gap-3">
            <div className="rounded-xl bg-black/30 border border-stone-800/80 p-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500 mb-1">Base URL</p>
              <div className="flex items-center justify-between gap-2">
                <code className="text-xs text-amber-300 font-mono truncate">{baseUrl}</code>
                <button
                  onClick={() => copy("base", baseUrl)}
                  className="shrink-0 p-1.5 rounded-md text-stone-500 hover:text-stone-200 hover:bg-white/5"
                >
                  {copied === "base" ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                </button>
              </div>
            </div>
            <div className="rounded-xl bg-black/30 border border-stone-800/80 p-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500 mb-1">协议</p>
              <p className="text-xs text-stone-200 font-mono">POST /v1/chat/completions · Bearer sk-kaires_…</p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              to="/keys"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-sm font-medium transition-colors"
            >
              <KeyRound size={13} /> 管理我的 Key
            </Link>
            <button
              onClick={quickCreate}
              disabled={creating}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-stone-700 hover:border-amber-500/40 hover:text-amber-300 text-sm text-stone-300 transition-colors disabled:opacity-60"
            >
              <Plus size={13} /> {creating ? "生成中…" : "快速生成一把 Key"}
            </button>
            <Link
              to="/chat"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm text-stone-400 hover:text-stone-200 transition-colors"
            >
              <MessageSquare size={13} /> 试用对话 <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* New key reveal */}
        {newKey?.key && (
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] p-4">
            <p className="text-xs text-emerald-300 mb-2">
              <Sparkles size={11} className="inline mr-1" /> 新 Key 已生成，仅展示一次，请立即复制保存：
            </p>
            <div className="flex items-center justify-between gap-2 bg-black/40 rounded-lg p-2.5 border border-stone-800">
              <code className="text-xs text-stone-100 font-mono truncate">{newKey.key}</code>
              <button
                onClick={() => copy("new", newKey.key!)}
                className="shrink-0 px-2.5 py-1 rounded-md text-xs text-emerald-300 hover:bg-white/5"
              >
                {copied === "new" ? "已复制" : "复制"}
              </button>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <StatCard icon={<KeyRound size={14} />} label="API Keys" value={loading ? "…" : keys.length} hint="活跃中" />
          <StatCard icon={<Activity size={14} />} label="本月调用" value={`${used} / ${limit}`} hint={`${usagePct}% 已用`} />
          <StatCard icon={<Zap size={14} />} label="累计请求" value={totalRequests} hint="所有 Key 合计" />
        </div>

        {/* Recent keys */}
        <div className="rounded-2xl border border-stone-800/80 bg-black/20">
          <div className="flex items-center justify-between px-5 py-4 border-b border-stone-800/80">
            <div>
              <h2 className="text-sm font-semibold text-stone-100">我的 Keys</h2>
              <p className="text-xs text-stone-500">在「Keys 管理」里可以新增、命名、删除并查看每把 Key 的用量。</p>
            </div>
            <Link to="/keys" className="text-xs text-amber-400 hover:text-amber-300 inline-flex items-center gap-1">
              全部管理 <ArrowRight size={11} />
            </Link>
          </div>
          <div className="divide-y divide-stone-800/60">
            {keys.length === 0 ? (
              <div className="px-5 py-8 text-center text-sm text-stone-500">
                还没有 Key。点击上面「快速生成一把 Key」即可开始。
              </div>
            ) : keys.slice(0, 5).map(k => (
              <div key={k.id} className="px-5 py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm text-stone-200 truncate">{k.name}</p>
                  <code className="text-[11px] text-stone-500 font-mono">{k.masked_key}</code>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-stone-400">{k.request_count} 次</p>
                  <p className="text-[10px] text-stone-600">
                    {k.last_used_at ? `最近 ${new Date(k.last_used_at).toLocaleDateString()}` : "未使用"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quickstart */}
        <div className="rounded-2xl border border-stone-800/80 bg-black/20 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Terminal size={14} className="text-amber-400" />
            <h2 className="text-sm font-semibold text-stone-100">快速接入</h2>
          </div>
          <pre className="text-[11px] text-stone-300 font-mono bg-black/40 border border-stone-800 rounded-lg p-3 overflow-x-auto">{`from openai import OpenAI

client = OpenAI(
    base_url="${baseUrl}",
    api_key="sk-kaires_...",
)
resp = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "hi"}],
)`}</pre>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, hint }: { icon: React.ReactNode; label: string; value: React.ReactNode; hint?: string }) {
  return (
    <div className="rounded-xl border border-stone-800/80 bg-black/20 p-4">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-stone-500 mb-2">
        <span className="text-amber-400">{icon}</span>{label}
      </div>
      <p className="text-xl text-stone-100 font-display tracking-wider">{value}</p>
      {hint && <p className="text-[11px] text-stone-500 mt-0.5">{hint}</p>}
    </div>
  )
}
