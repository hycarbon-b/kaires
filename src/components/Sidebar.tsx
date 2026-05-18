import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  Plus, MessageSquare, ImageIcon, Settings,
  MoreHorizontal, Sparkles, User, ChevronRight,
} from "lucide-react"
import { useAuth } from "../contexts/AuthContext"

const HISTORY = [
  { id: "1", title: "线代教学助手" },
  { id: "2", title: "Python 爬虫帮助" },
  { id: "3", title: "合同审查 - 采购" },
  { id: "4", title: "季度报告分析" },
  { id: "5", title: "客服话术优化" },
]

const BOTS = [
  { id: "b1", title: "法律咨询 Bot", color: "bg-violet-500" },
  { id: "b2", title: "投研助手", color: "bg-sky-500" },
]

export default function Sidebar() {
  const loc = useLocation()
  const navigate = useNavigate()
  const { account } = useAuth()
  const [collapsed, setCollapsed] = useState(false)
  const onChat = loc.pathname.startsWith("/chat")
  const onImage = loc.pathname === "/image"

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
        <button
          onClick={() => navigate("/chat")}
          className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
            onChat
              ? "bg-amber-500/15 text-amber-400"
              : "text-stone-500 hover:text-stone-300 hover:bg-white/5"
          }`}
        >
          <MessageSquare size={15} />
        </button>
        <button
          onClick={() => navigate("/image")}
          className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
            onImage
              ? "bg-amber-500/15 text-amber-400"
              : "text-stone-500 hover:text-stone-300 hover:bg-white/5"
          }`}
        >
          <ImageIcon size={15} />
        </button>
      </aside>
    )
  }

  return (
    <aside
      className="w-64 flex-shrink-0 flex flex-col overflow-hidden border-r"
      style={{ background: "#0d0d11", borderColor: "rgba(251,191,36,0.08)" }}
    >
      {/* Logo */}
      <div
        className="px-4 py-3 flex items-center justify-between border-b"
        style={{ borderColor: "rgba(251,191,36,0.06)" }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
            <span className="font-display text-sm text-black tracking-widest">K</span>
          </div>
          <div className="flex flex-col leading-none gap-0.5">
            <span className="font-display text-base text-stone-100 tracking-[0.12em]">KAIROS APP</span>
            <span className="text-[9px] text-amber-400/70 tracking-[0.25em]">PERSONAL AI</span>
          </div>
        </div>
        <button
          onClick={() => setCollapsed(true)}
          className="text-stone-600 hover:text-stone-400 transition-colors p-1 rounded"
        >
          <ChevronRight size={13} />
        </button>
      </div>

      {/* New chat */}
      <div className="px-3 pt-3 pb-1">
        <Link
          to="/chat"
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-sm font-medium transition-colors"
        >
          <Plus size={14} />
          新对话
        </Link>
      </div>

      {/* Nav tabs */}
      <div className="px-3 py-2 flex gap-1">
        <Link
          to="/chat"
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs transition-colors ${
            onChat
              ? "bg-amber-500/12 text-amber-400 font-medium border border-amber-500/15"
              : "text-stone-500 hover:bg-white/4 hover:text-stone-300"
          }`}
        >
          <MessageSquare size={12} />
          对话
        </Link>
        <Link
          to="/image"
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs transition-colors ${
            onImage
              ? "bg-amber-500/12 text-amber-400 font-medium border border-amber-500/15"
              : "text-stone-500 hover:bg-white/4 hover:text-stone-300"
          }`}
        >
          <ImageIcon size={12} />
          图片工作台
        </Link>
      </div>

      {/* History */}
      <div className="flex-1 overflow-y-auto no-bar px-2 pb-2">
        <p className="px-2 py-2 text-[10px] font-medium text-stone-600 uppercase tracking-[0.15em]">
          最近对话
        </p>
        {HISTORY.map(h => (
          <Link
            key={h.id}
            to={`/chat/${h.id}`}
            className={`group flex items-center justify-between px-2.5 py-1.5 rounded-lg text-sm transition-colors ${
              loc.pathname === `/chat/${h.id}`
                ? "bg-amber-500/10 text-amber-300 border border-amber-500/15"
                : "text-stone-400 hover:bg-white/4 hover:text-stone-200"
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <MessageSquare size={11} className="shrink-0 text-stone-600" />
              <span className="truncate text-xs">{h.title}</span>
            </div>
            <button className="opacity-0 group-hover:opacity-100 transition-opacity text-stone-600 hover:text-stone-400 shrink-0">
              <MoreHorizontal size={12} />
            </button>
          </Link>
        ))}

        <p className="px-2 py-2 mt-2 text-[10px] font-medium text-stone-600 uppercase tracking-[0.15em]">
          我的 Bot
        </p>
        {BOTS.map(b => (
          <Link
            key={b.id}
            to={`/chat/${b.id}`}
            className="group flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs text-stone-400 hover:bg-white/4 hover:text-stone-200 transition-colors"
          >
            <span
              className={`w-5 h-5 rounded-full ${b.color} flex items-center justify-center shrink-0`}
            >
              <Sparkles size={9} className="text-white" />
            </span>
            <span className="truncate">{b.title}</span>
          </Link>
        ))}
      </div>

      {/* Bottom bar */}
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
          title="设置"
        >
          <Settings size={13} />
        </button>
      </div>
    </aside>
  )
}
