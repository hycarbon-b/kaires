import { useState, useEffect, useRef } from "react"
import { Navigate } from "react-router-dom"
import {
  KeyRound, Plus, Copy, Check, Trash2, RefreshCcw,
  Clock, BarChart2, ExternalLink, X,
} from "lucide-react"
import { listKeys, createKey, deleteKey } from "../lib/api"
import type { ApiKeyItem } from "../lib/api"
import { useAuth } from "../contexts/AuthContext"

// ── helpers ────────────────────────────────────────────────────────────────
function fmtDate(iso: string | null) {
  if (!iso) return "从未"
  return new Date(iso).toLocaleString("zh-CN", {
    month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit",
  })
}

function CopyBtn({ text, small }: { text: string; small?: boolean }) {
  const [done, setDone] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text).catch(() => undefined)
    setDone(true)
    setTimeout(() => setDone(false), 1600)
  }
  const sz = small ? 11 : 13
  return (
    <button
      onClick={copy}
      className="flex items-center gap-1 text-stone-500 hover:text-amber-400 transition-colors"
      title="复制"
    >
      {done ? <Check size={sz} className="text-green-400" /> : <Copy size={sz} />}
      {!small && <span className="text-[10px]">{done ? "已复制" : "复制"}</span>}
    </button>
  )
}

// ── New-key dialog ─────────────────────────────────────────────────────────
interface NewKeyDialogProps {
  onClose: () => void
  onCreate: (label: string) => Promise<void>
  busy: boolean
}
function NewKeyDialog({ onClose, onCreate, busy }: NewKeyDialogProps) {
  const [label, setLabel] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => { inputRef.current?.focus() }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="glass rounded-2xl p-6 w-full max-w-sm shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-stone-100">新增 API Key</h3>
          <button onClick={onClose} className="text-stone-500 hover:text-stone-300 transition-colors">
            <X size={15} />
          </button>
        </div>
        <label className="block text-xs text-stone-500 mb-1.5">备注名称（选填）</label>
        <input
          ref={inputRef}
          value={label}
          onChange={e => setLabel(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && !busy) onCreate(label) }}
          placeholder="例如：Chatbox 个人、公司服务器…"
          maxLength={60}
          className="w-full px-3 py-2 rounded-xl bg-stone-900 border border-stone-700 text-sm text-stone-100
                     placeholder:text-stone-600 focus:outline-none focus:border-amber-500/50 transition-colors"
        />
        <p className="text-[10px] text-stone-600 mt-1.5">生成后完整 Key 仅显示一次，请立即复制保存。</p>
        <div className="flex gap-2 mt-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-xl text-sm text-stone-400 hover:text-stone-200 border border-stone-800 hover:border-stone-700 transition-colors"
          >
            取消
          </button>
          <button
            onClick={() => onCreate(label)}
            disabled={busy}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400
                       disabled:opacity-50 text-black text-sm font-semibold transition-colors"
          >
            {busy ? <RefreshCcw size={13} className="animate-spin" /> : <Plus size={13} />}
            生成
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Revealed-key banner ────────────────────────────────────────────────────
function RevealedBanner({ fullKey, onDismiss }: { fullKey: string; onDismiss: () => void }) {
  return (
    <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4">
      <div className="flex items-start justify-between gap-3 mb-2">
        <p className="text-xs text-amber-300 font-semibold">新 Key 已生成 — 请立即复制，之后将无法再次查看完整密钥</p>
        <button onClick={onDismiss} className="text-stone-500 hover:text-stone-300 transition-colors shrink-0">
          <X size={14} />
        </button>
      </div>
      <div className="flex items-center gap-2 bg-stone-900 rounded-xl px-3 py-2 border border-stone-800">
        <code className="flex-1 text-xs text-stone-100 font-mono break-all">{fullKey}</code>
        <CopyBtn text={fullKey} />
      </div>
    </div>
  )
}

// ── Key row ────────────────────────────────────────────────────────────────
interface KeyRowProps {
  k: ApiKeyItem
  onDelete: (id: number) => Promise<void>
  deletingId: number | null
}
function KeyRow({ k, onDelete, deletingId }: KeyRowProps) {
  const [confirmDel, setConfirmDel] = useState(false)
  const isDeleting = deletingId === k.id

  return (
    <div className="glass rounded-2xl p-4 space-y-3">
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
            <KeyRound size={14} className="text-amber-400" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-stone-100 truncate">{k.label}</p>
            <p className="text-[10px] text-stone-600 mt-0.5">创建于 {fmtDate(k.refreshed_at)}</p>
          </div>
        </div>

        {confirmDel ? (
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-stone-400">确认删除？</span>
            <button
              onClick={() => { setConfirmDel(false); onDelete(k.id) }}
              disabled={isDeleting}
              className="px-2.5 py-1 rounded-lg text-xs bg-red-500/15 text-red-400 hover:bg-red-500/25 transition-colors disabled:opacity-50"
            >
              删除
            </button>
            <button
              onClick={() => setConfirmDel(false)}
              className="px-2.5 py-1 rounded-lg text-xs text-stone-500 hover:text-stone-300 border border-stone-800 transition-colors"
            >
              取消
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmDel(true)}
            disabled={isDeleting}
            className="w-7 h-7 rounded-lg text-stone-600 hover:text-red-400 hover:bg-red-500/10 transition-colors flex items-center justify-center disabled:opacity-40 shrink-0"
            title="删除"
          >
            {isDeleting ? <RefreshCcw size={13} className="animate-spin" /> : <Trash2 size={13} />}
          </button>
        )}
      </div>

      {/* Key + stats */}
      <div className="grid sm:grid-cols-2 gap-2">
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-stone-900/60 border border-stone-800">
          <code className="flex-1 text-xs text-stone-300 font-mono truncate">{k.masked_key}</code>
          <CopyBtn text={k.masked_key} small />
        </div>
        <div className="flex items-center gap-4 px-3 py-2 rounded-xl bg-stone-900/60 border border-stone-800">
          <div className="flex items-center gap-1.5 text-xs text-stone-500">
            <BarChart2 size={11} className="text-stone-600" />
            <span className="text-stone-300 font-medium">{k.calls_this_month}</span>
            <span>次/月</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-stone-500">
            <Clock size={11} className="text-stone-600" />
            <span>{fmtDate(k.last_used_at)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main page ──────────────────────────────────────────────────────────────
export default function KeysPage() {
  const { account, loading } = useAuth()
  const [keys, setKeys] = useState<ApiKeyItem[]>([])
  const [fetching, setFetching] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showDialog, setShowDialog] = useState(false)
  const [creating, setCreating] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [revealedKey, setRevealedKey] = useState<string | null>(null)

  const apiBaseUrl = `${window.location.origin}/v1`

  const loadKeys = async () => {
    try {
      const data = await listKeys()
      setKeys(data.keys)
    } catch (err) {
      setError(err instanceof Error ? err.message : "加载失败")
    } finally {
      setFetching(false)
    }
  }

  useEffect(() => { loadKeys() }, [])

  if (loading) return null
  if (!account) return <Navigate to="/login" replace />

  const handleCreate = async (label: string) => {
    setCreating(true)
    setError(null)
    try {
      const { apiKey } = await createKey(label)
      setRevealedKey(apiKey.key!)
      await loadKeys()
      setShowDialog(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "创建失败")
    } finally {
      setCreating(false)
    }
  }

  const handleDelete = async (id: number) => {
    setDeletingId(id)
    setError(null)
    try {
      await deleteKey(id)
      setKeys(prev => prev.filter(k => k.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : "删除失败")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-2xl mx-auto space-y-5">

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl text-stone-100 tracking-widest uppercase">API Keys</h1>
            <p className="text-sm text-stone-500 mt-0.5">管理你的中转 API Key — 在任意 OpenAI 兼容软件中使用</p>
          </div>
          <button
            onClick={() => setShowDialog(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold transition-colors shrink-0"
          >
            <Plus size={14} /> 新增 Key
          </button>
        </div>

        {/* Base URL card */}
        <div className="glass p-4 rounded-2xl flex items-center gap-3">
          <ExternalLink size={14} className="text-stone-500 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-stone-600 uppercase tracking-wider mb-0.5">Base URL（所有 Key 通用）</p>
            <code className="text-xs text-stone-300 font-mono">{apiBaseUrl}</code>
          </div>
          <CopyBtn text={apiBaseUrl} />
        </div>

        {/* Error */}
        {error && (
          <div className="glass px-4 py-3 rounded-xl text-sm text-red-400 flex items-center gap-2">
            <X size={14} />{error}
          </div>
        )}

        {/* Newly revealed key */}
        {revealedKey && (
          <RevealedBanner fullKey={revealedKey} onDismiss={() => setRevealedKey(null)} />
        )}

        {/* Key list */}
        {fetching ? (
          <div className="flex items-center justify-center h-32 text-stone-600 text-sm">
            <RefreshCcw size={15} className="animate-spin mr-2" /> 加载中…
          </div>
        ) : keys.length === 0 ? (
          <div className="glass rounded-2xl p-10 text-center">
            <KeyRound size={28} className="text-stone-700 mx-auto mb-3" />
            <p className="text-stone-500 text-sm">还没有 API Key</p>
            <p className="text-stone-700 text-xs mt-1">点击「新增 Key」创建你的第一个中转 Key</p>
            <button
              onClick={() => setShowDialog(true)}
              className="mt-4 flex items-center gap-2 mx-auto px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold transition-colors"
            >
              <Plus size={13} /> 新增 Key
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {keys.map(k => (
              <KeyRow key={k.id} k={k} onDelete={handleDelete} deletingId={deletingId} />
            ))}
          </div>
        )}

        {/* Usage note */}
        <p className="text-[11px] text-stone-700 text-center">
          删除 Key 后使用该 Key 的请求将立即返回 401。本月用量数据保留 30 天。
        </p>
      </div>

      {/* Dialog */}
      {showDialog && (
        <NewKeyDialog
          onClose={() => setShowDialog(false)}
          onCreate={handleCreate}
          busy={creating}
        />
      )}
    </div>
  )
}
