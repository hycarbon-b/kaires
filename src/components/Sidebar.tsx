import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  Plus, MessageSquare, ImageIcon, Settings,
  User, ChevronRight, KeyRound, LayoutDashboard, Activity,
} from "lucide-react"
import { useAuth } from "../contexts/AuthContext"

export default function Sidebar() {
  const loc = useLocation()
  const navigate = useNavigate()
  const { account } = useAuth()
  const [collapsed, setCollapsed] = useState(false)

  const isActive = (p: string) => loc.pathname === p || (p !== "/" && loc.pathname.startsWith(p))

  const NAV: { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean }[] = [
    { to: "/", label: "控制台", icon: LayoutDashboard, exact: true },
    { to: "/keys", label: "API Keys", icon: KeyRound },
    { to: "/chat", label: "对话", icon: MessageSquare },
    { to: "/image", label: "图片", icon: ImageIcon },
  ]

  if (collapsed) {
    return (
      <aside
        className="w-14 flex-shrink-0 flex flex-col items-center py-3 gap-3 border-r"
        style={{ background: "#0d0d11", borderColor: "rgba(251,191,36,0.08)" }}
      >
        <button
          onClick={() => setCollapsed(false)}
          className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center hover:bg-amber-400 transition-colors"
        >
          <span className="font-display text-sm text-black tracking-wider">K</span>
        </button>
        {NAV.map(item => {
          const active = item.exact ? loc.pathname === item.to : isActive(item.to)
          const Icon = item.icon
          return (
            <button
              key={item.to}
              onClick={() => navigate(item.to)}
              title={item.label}
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                active ? "bg-amber-500/15 text-amber-400" : "text-stone-500 hover:text-stone-300 hover:bg-white/5"
              }`}
            >
              <Icon size={15} />
            </button>
          )
        })}
      </aside>
    )
  }

  const monthlyUsed = account?.subscription.used_this_month ?? 0
  const monthlyLimit = account?.subscription.monthly_limit ?? 0
  const usagePct = monthlyLimit ? Math.min(100, Math.round((monthlyUsed / monthlyLimit) * 100)) : 0

  return (
    <aside
      className="w-64 flex-shrink-0 flex flex-col overflow-hidden border-r"
      style={{ background: "#0d0d11", borderColor: "rgba(251,191,36,0.08)" }}
    >
      <div
        className="px-4 py-3 flex items-center justify-between border-b"
        style={{ borderColor: "rgba(251,191,36,0.06)" }}
      >
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
            <span className="font-display text-sm text-black tracking-widest">K</span>
          </div>
          <div className="flex flex-col leading-none gap-0.5">
            <span className="font-display text-base text-stone-100 tracking-[0.12em]">KAIROS</span>
            <span className="text-[9px] text-amber-400/70 tracking-[0.25em]">RELAY API</span>
          </div>
        </Link>
        <button
          onClick={() => setCollapsed(true)}
          className="text-stone-600 hover:text-stone-400 transition-colors p-1 rounded"
        >
          <ChevronRight size={13} />
        </button>
      </div>

      <div className="px-3 pt-3 pb-1">
        <Link
          to="/keys"
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-sm font-medium transition-colors"
        >
          <Plus size={14} />
          新增 API Key
        </Link>
      </div>

      <nav className="px-2 pt-2 pb-3 flex flex-col gap-0.5">
        {NAV.map(item => {
          const active = item.exact ? loc.pathname === item.to : isActive(item.to)
          const Icon = item.icon
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                active
                  ? "bg-amber-500/10 text-amber-300 border border-amber-500/15"
                  : "text-stone-400 hover:bg-white/4 hover:text-stone-200 border border-transparent"
              }`}
            >
              <Icon size={13} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="flex-1" />

      <div className="mx-3 mb-3 rounded-xl border border-stone-800/80 bg-black/30 p-3">
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-stone-500 mb-1.5">
          <Activity size={11} className="text-amber-400" /> 本月用量
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-stone-100 text-sm font-mono">{monthlyUsed}</span>
          <span className="text-stone-500 text-[10px]">/ {monthlyLimit}</span>
        </div>
        <div className="mt-1.5 h-1 rounded-full bg-stone-800 overflow-hidden">
          <div className="h-full bg-amber-500/70" style={{ width: `${usagePct}%` }} />
        </div>
        <Link to="/account" className="block mt-2 text-[10px] text-stone-500 hover:text-amber-300">
          {account?.subscription.plan?.toUpperCase() || "FREE"} 方案 · 升级 →
        </Link>
      </div>

      <div
        className="px-3 py-3 flex items-center justify-between gap-2 border-t"
        style={{ borderColor: "rgba(251,191,36,0.06)" }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 border"
            style={{ background: "#1c1c22", borderColor: "rgba(251,191,36,0.1)" }}
          >
            <User size={13} className="text-stone-500" />
          </div>
          <span className="text-xs text-stone-500 truncate">{account?.user.name || "用户"}</span>
        </div>
        <button
          onClick={() => navigate("/account")}
          className="w-7 h-7 rounded-md flex items-center justify-center text-stone-600 hover:text-stone-400 hover:bg-white/5 transition-colors"
          title="账户与订阅"
        >
          <Settings size={13} />
        </button>
      </div>
    </aside>
  )
}
