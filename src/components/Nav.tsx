import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Sparkles, FlaskConical } from 'lucide-react'

const NAV_LINKS = [
  { label: '产品特性', href: '/#features' },
  { label: '解决方案', href: '/#solutions' },
  { label: '定价', href: '/#pricing' },
]

const LANDING_LINKS = [
  { label: 'AI 聊天', to: '/ai-chat' },
  { label: 'AI 图片', to: '/ai-image' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  const onFinLab = loc.pathname === '/fin-lab'

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-stone-800/50 bg-[#07070a]/85 backdrop-blur-md">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-8 h-8 rounded bg-amber-500 flex items-center justify-center transition-all group-hover:bg-amber-400">
            <span className="font-display font-extrabold text-black text-sm leading-none tracking-tight">K</span>
          </div>
          <span className="font-display font-extrabold text-white text-base tracking-widest uppercase leading-none">KAIROS</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1 flex-1">
          {NAV_LINKS.map(l => (
            <a
              key={l.label}
              href={l.href}
              className="px-3.5 py-2 text-sm text-stone-400 hover:text-stone-100 rounded-lg hover:bg-stone-800/40 transition-colors"
            >
              {l.label}
            </a>
          ))}
          {LANDING_LINKS.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-3.5 py-2 text-sm rounded-lg transition-colors ${
                loc.pathname === l.to
                  ? 'text-stone-100 bg-stone-800/40'
                  : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800/40'
              }`}
            >
              {l.label}
            </Link>
          ))}
          {/* Showcase */}
          <Link
            to="/showcase"
            className={`px-3.5 py-2 text-sm rounded-lg transition-colors ${
              loc.pathname === '/showcase'
                ? 'text-stone-100'
                : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800/40'
            }`}
          >
            Showcase
          </Link>
          {/* Fin Lab — special highlight */}
          <Link
            to="/fin-lab"
            className={`relative ml-1 flex items-center gap-1.5 px-3.5 py-2 text-sm rounded-lg transition-all ${
              onFinLab
                ? 'text-amber-300 bg-amber-500/10 border border-amber-500/20'
                : 'text-stone-300 hover:text-amber-300 hover:bg-amber-500/5'
            }`}
          >
            <FlaskConical size={13} className="text-amber-400 shrink-0" />
            Fin Lab
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          </Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Link
            to="/app"
            className="flex items-center gap-1.5 px-3.5 py-2 text-sm text-amber-300 hover:text-amber-200 border border-amber-500/30 hover:border-amber-500/60 hover:bg-amber-500/5 rounded-lg transition-all"
          >
            <Sparkles size={13} />
            KAIROS APP
          </Link>
          <Link
            to="/api"
            className="px-4 py-2 text-sm font-medium bg-amber-500 hover:bg-amber-400 text-black rounded-lg transition-colors"
          >
            获取 API Key
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-stone-400 hover:text-stone-100 transition-colors"
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-stone-800 bg-[#07070a] px-4 py-4 flex flex-col gap-1">
          {NAV_LINKS.map(l => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 text-sm text-stone-300 hover:text-stone-100 rounded-lg hover:bg-stone-800/40 transition-colors"
            >
              {l.label}
            </a>
          ))}
          {LANDING_LINKS.map(l => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="px-3 py-2.5 text-sm text-stone-400 hover:text-stone-100 rounded-lg hover:bg-stone-800/40 transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/fin-lab"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-3 py-2.5 text-sm text-amber-300 rounded-lg hover:bg-amber-500/5 transition-colors"
          >
            <FlaskConical size={13} className="text-amber-400" />
            Fin Lab
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse ml-0.5" />
          </Link>
          <Link
            to="/showcase"
            onClick={() => setOpen(false)}
            className="px-3 py-2.5 text-sm text-stone-400 hover:text-stone-100 rounded-lg hover:bg-stone-800/40 transition-colors"
          >
            Showcase
          </Link>
          <div className="mt-3 flex flex-col gap-2">
            <Link
              to="/app"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm text-amber-300 border border-amber-500/30 rounded-lg"
            >
              <Sparkles size={13} />
              KAIROS APP
            </Link>
            <Link
              to="/api"
              onClick={() => setOpen(false)}
              className="px-4 py-2.5 text-sm font-medium bg-amber-500 text-black rounded-lg text-center"
            >
              获取 API Key
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
