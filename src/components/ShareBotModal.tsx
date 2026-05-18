import { X, Link2, Code2, QrCode, Copy, Check } from "lucide-react"
import { useState } from "react"

const TABS = [
  { id: "link",  icon: <Link2 size={13} />,  label: "链接分享" },
  { id: "embed", icon: <Code2 size={13} />,  label: "嵌入代码" },
  { id: "qr",    icon: <QrCode size={13} />, label: "二维码" },
]
const PALETTES = ["#f59e0b","#10b981","#3b82f6","#8b5cf6","#f43f5e","#14b8a6"]

export default function ShareBotModal({ botName, onClose }: { botName: string; onClose: () => void }) {
  const [tab, setTab] = useState("link")
  const [color, setColor] = useState("#f59e0b")
  const [copied, setCopied] = useState(false)
  const mockUrl = "https://app.kairos.ai/bot/xxxxxxxx"

  const copy = () => {
    navigator.clipboard.writeText(mockUrl).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(6px)" }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-md rounded-2xl shadow-2xl overflow-hidden"
        style={{ background: "#111116", border: "1px solid rgba(251,191,36,0.1)", boxShadow: "0 32px 64px rgba(0,0,0,0.7)" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4 border-b"
          style={{ borderColor: "rgba(251,191,36,0.07)" }}
        >
          <div>
            <h3 className="font-display text-xl tracking-widest text-stone-100 uppercase">分享 Bot</h3>
            <p className="text-xs text-stone-500 mt-0.5">{botName}</p>
          </div>
          <button onClick={onClose} className="text-stone-600 hover:text-stone-300 transition-colors">
            <X size={16} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b" style={{ borderColor: "rgba(251,191,36,0.07)" }}>
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs transition-all relative ${
                tab === t.id ? "text-amber-400 font-medium" : "text-stone-500 hover:text-stone-400"
              }`}
            >
              {t.icon} {t.label}
              {tab === t.id && (
                <span
                  className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-amber-500 rounded-t"
                />
              )}
            </button>
          ))}
        </div>

        <div className="px-5 py-5">
          {tab === "link" && (
            <div className="space-y-4">
              <div>
                <p className="text-[10px] text-stone-600 uppercase tracking-wider mb-2">访问链接</p>
                <div
                  className="flex items-center gap-2 p-2.5 rounded-xl border"
                  style={{ background: "rgba(9,9,12,0.8)", borderColor: "rgba(251,191,36,0.1)" }}
                >
                  <span className="flex-1 text-xs text-stone-400 truncate font-mono">{mockUrl}</span>
                  <button
                    onClick={copy}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg transition-all"
                    style={{
                      background: copied ? "rgba(52,211,153,0.15)" : "rgba(251,191,36,0.12)",
                      color: copied ? "#34d399" : "#fbbf24",
                      border: `1px solid ${copied ? "rgba(52,211,153,0.25)" : "rgba(251,191,36,0.2)"}`,
                    }}
                  >
                    {copied ? <Check size={10} /> : <Copy size={10} />}
                    {copied ? "已复制" : "复制"}
                  </button>
                </div>
              </div>

              <div>
                <p className="text-[10px] text-stone-600 uppercase tracking-wider mb-2">主题色</p>
                <div className="flex gap-2 flex-wrap">
                  {PALETTES.map(c => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className="w-7 h-7 rounded-full transition-transform hover:scale-110"
                      style={{
                        background: c,
                        boxShadow: color === c ? `0 0 0 2px #111116, 0 0 0 4px ${c}` : "none",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === "embed" && (
            <div>
              <p className="text-[10px] text-stone-600 uppercase tracking-wider mb-2">嵌入代码</p>
              <pre
                className="text-[10px] text-stone-400 rounded-xl p-3.5 overflow-x-auto code-block leading-relaxed"
              >{`<iframe
  src="${mockUrl}"
  width="420"
  height="680"
  style="border:none;border-radius:16px;"
/>`}</pre>
            </div>
          )}

          {tab === "qr" && (
            <div className="flex flex-col items-center gap-4 py-2">
              <div
                className="w-36 h-36 rounded-2xl flex items-center justify-center"
                style={{ background: "rgba(28,25,23,0.6)", border: "1px dashed rgba(251,191,36,0.15)" }}
              >
                <QrCode size={72} className="text-stone-600" />
              </div>
              <p className="text-[10px] text-stone-600">二维码将在正式部署后生成</p>
            </div>
          )}
        </div>

        <div
          className="flex justify-end px-5 pb-5 pt-1"
        >
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium rounded-xl text-black bg-amber-500 hover:bg-amber-400 transition-colors"
          >
            完成
          </button>
        </div>
      </div>
    </div>
  )
}
