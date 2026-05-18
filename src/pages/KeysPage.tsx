import { useEffect, useMemo, useState } from "react"
import {
  KeyRound, Plus, Trash2, Copy, Check, Search, AlertTriangle, Sparkles, X,
} from "lucide-react"
import { createApiKey, deleteApiKey, listApiKeys, type ApiKeyRecord } from "../lib/api"
import { useAuth } from "../contexts/AuthContext"

export default function KeysPage() {
  const { account } = useAuth()
  const [keys, setKeys] = useState<ApiKeyRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState("")
  const [showCreate, setShowCreate] = useState(false)
  const [name, setName] = useState("")
  const [creating, setCreating] = useState(false)
  const [revealedKey, setRevealedKey] = useState<ApiKeyRecord | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [pendingDelete, setPendingDelete] = useState<ApiKeyRecord | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    let alive = true
    listApiKeys()
      .then(res => { if (alive) setKeys(res.apiKeys) })
      .catch(err => { if (alive) setError(err instanceof Error ? err.message : "加载失败") })
      .finally(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return keys
    return keys.filter(k => k.name.toLowerCase().includes(q) || k.masked_key.toLowerCase().includes(q))
  }, [keys, query])

  const totals = useMemo(() => ({
    total: keys.length,
    requests: keys.reduce((s, k) => s + (k.request_count || 0), 0),
    active: keys.filter(k => k.last_used_at).length,
  }), [keys])

  const submitCreate = async () => {
    setCreating(true)
    setError(null)
    try {
      const res = await createApiKey(name.trim() || `Key #${keys.length + 1}`)
      setKeys(res.apiKeys)
      setRevealedKey(res.apiKey)
      setShowCreate(false)
      setName("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "创建失败")
    } finally {
      setCreating(false)
    }
  }

  const confirmDelete = async () => {
    if (!pendingDelete) return
    setDeleting(true)
    setError(null)
    try {
      const res = await deleteApiKey(pendingDelete.id)
      setKeys(res.apiKeys)
      setPendingDelete(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "删除失败")
    } finally {
      setDeleting(false)
    }
  }

  const copy = async (label: string, value: string) => {
    await navigator.clipboard.writeText(value)
    setCopied(label)
    setTimeout(() => setCopied(null), 1500)
  }

  const baseUrl = `${window.location.origin}/v1`
  const plan = account?.subscription.plan ?? "free"
  const used = account?.subscription.used_this_month ?? 0
  const limit = account?.subscription.monthly_limit ?? 0

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-5">
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-amber-400/80">API Key 管理</p>
            <h1 className="font-display text-2xl text-stone-100 tracking-wider mt-1">Keys</h1>
            <p className="text-xs text-stone-500 mt-1">每把 Key 都可独立命名、限速、查看用量、随时撤销。</p>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-sm font-medium"
          >
            <Plus size={13} /> 新增 Key
          </button>
        </header>

        {error && (
          <div className="rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-2.5 text-sm text-red-300 flex items-center gap-2">
            <AlertTriangle size={13} /> {error}
          </div>
        )}

        <div className="grid grid-cols-3 gap-3">
          <Stat label="Keys 总数" value={totals.total} />
          <Stat label="活跃 Key" value={totals.active} />
          <Stat label={`本月调用 / ${limit}`} value={`${used} (${plan})`} />
        </div>

        {/* Reveal newly created key once */}
        {revealedKey?.key && (
          <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/[0.04] p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-emerald-300 flex items-center gap-1">
                <Sparkles size={11} /> Key 已创建 — 此 Key 仅展示一次
              </p>
              <button onClick={() => setRevealedKey(null)} className="text-stone-500 hover:text-stone-200">
                <X size={13} />
              </button>
            </div>
            <div className="flex items-center justify-between gap-2 bg-black/40 rounded-lg p-2.5 border border-stone-800">
              <code className="text-xs text-stone-100 font-mono truncate">{revealedKey.key}</code>
              <button
                onClick={() => copy("reveal", revealedKey.key!)}
                className="shrink-0 px-2.5 py-1 rounded-md text-xs text-emerald-300 hover:bg-white/5"
              >
                {copied === "reveal" ? "已复制" : "复制"}
              </button>
            </div>
            <p className="text-[10px] text-stone-500 mt-2 font-mono">
              Base URL: {baseUrl}
            </p>
          </div>
        )}

        {/* Search */}
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-600" />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="按名称或 Key 前缀搜索"
            className="w-full pl-8 pr-3 py-2 rounded-lg bg-black/30 border border-stone-800 text-sm text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-amber-500/40"
          />
        </div>

        {/* Table */}
        <div className="rounded-xl border border-stone-800/80 bg-black/20 overflow-hidden">
          <div className="grid grid-cols-12 px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] text-stone-500 border-b border-stone-800/80">
            <div className="col-span-4">名称 / Key</div>
            <div className="col-span-2">请求</div>
            <div className="col-span-3">最近使用</div>
            <div className="col-span-2">创建时间</div>
            <div className="col-span-1 text-right">操作</div>
          </div>
          {loading ? (
            <div className="px-5 py-10 text-center text-sm text-stone-500">加载中…</div>
          ) : filtered.length === 0 ? (
            <div className="px-5 py-10 text-center text-sm text-stone-500">
              {keys.length === 0 ? "还没有 Key，点击右上角“新增 Key”创建第一把。" : "没有匹配的 Key。"}
            </div>
          ) : filtered.map(k => (
            <div key={k.id} className="grid grid-cols-12 px-5 py-3.5 items-center border-b border-stone-800/40 last:border-b-0 hover:bg-white/[0.02]">
              <div className="col-span-4 min-w-0">
                <p className="text-sm text-stone-100 truncate">{k.name}</p>
                <code className="text-[11px] text-stone-500 font-mono">{k.masked_key}</code>
              </div>
              <div className="col-span-2 text-sm text-stone-300">{k.request_count}</div>
              <div className="col-span-3 text-xs text-stone-400">
                {k.last_used_at ? new Date(k.last_used_at).toLocaleString() : <span className="text-stone-600">—</span>}
              </div>
              <div className="col-span-2 text-xs text-stone-500">
                {new Date(k.created_at || k.refreshed_at).toLocaleDateString()}
              </div>
              <div className="col-span-1 flex items-center justify-end gap-1">
                <button
                  onClick={() => copy(`mask-${k.id}`, k.masked_key)}
                  title="复制掩码"
                  className="p-1.5 rounded text-stone-500 hover:text-stone-200 hover:bg-white/5"
                >
                  {copied === `mask-${k.id}` ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                </button>
                <button
                  onClick={() => setPendingDelete(k)}
                  title="删除"
                  className="p-1.5 rounded text-stone-500 hover:text-red-400 hover:bg-red-500/5"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-stone-600">
          <KeyRound size={10} className="inline mr-1" />
          所有 Key 加密存储；删除后立即失效，使用该 Key 的所有外部软件将收到 401。
        </p>
      </div>

      {/* Create dialog */}
      {showCreate && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => !creating && setShowCreate(false)}>
          <div onClick={e => e.stopPropagation()} className="w-full max-w-md rounded-2xl border border-stone-800 bg-[#0d0d11] p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-stone-100">新增 API Key</h3>
              <button onClick={() => setShowCreate(false)} className="text-stone-500 hover:text-stone-200"><X size={15} /></button>
            </div>
            <label className="block text-xs text-stone-400 mb-1.5">Key 名称（用于区分不同用途）</label>
            <input
              autoFocus
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="例如：Chatbox 个人版"
              className="w-full px-3 py-2 rounded-lg bg-black/40 border border-stone-800 text-sm text-stone-100 focus:outline-none focus:border-amber-500/40"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setShowCreate(false)}
                className="px-3 py-1.5 rounded-lg text-xs text-stone-400 hover:bg-white/5"
              >取消</button>
              <button
                onClick={submitCreate}
                disabled={creating}
                className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-medium disabled:opacity-60"
              >{creating ? "创建中…" : "创建"}</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {pendingDelete && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4" onClick={() => !deleting && setPendingDelete(null)}>
          <div onClick={e => e.stopPropagation()} className="w-full max-w-md rounded-2xl border border-red-500/30 bg-[#0d0d11] p-5">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={15} className="text-red-400" />
              <h3 className="text-sm font-semibold text-stone-100">删除 Key</h3>
            </div>
            <p className="text-sm text-stone-300">
              确认删除「<span className="text-stone-100">{pendingDelete.name}</span>」？
            </p>
            <p className="text-xs text-stone-500 mt-1.5">
              <code className="font-mono">{pendingDelete.masked_key}</code> 将立即失效，无法恢复。
            </p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setPendingDelete(null)}
                className="px-3 py-1.5 rounded-lg text-xs text-stone-400 hover:bg-white/5"
              >取消</button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="px-4 py-1.5 rounded-lg bg-red-500 hover:bg-red-400 text-white text-xs font-medium disabled:opacity-60"
              >{deleting ? "删除中…" : "确认删除"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-stone-800/80 bg-black/20 p-4">
      <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500 mb-2">{label}</p>
      <p className="text-xl text-stone-100 font-display tracking-wider">{value}</p>
    </div>
  )
}
