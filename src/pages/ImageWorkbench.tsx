import type { ReactNode } from "react"
import { useState } from "react"
import {
  Wand2, ArrowUpToLine, Eraser, Scissors, Palette, Sparkles,
  Download, Loader2, CheckCircle2, ImageIcon,
} from "lucide-react"
import type { ToolType } from "../types"
import NodeCanvas from "../components/NodeCanvas"

interface Tool { id: ToolType; label: string; sublabel: string; icon: ReactNode; accentBg: string; accentText: string }

const TOOLS: Tool[] = [
  { id: "generate",   label: "文生图",    sublabel: "AI 生成",  icon: <Wand2 size={15} />,         accentBg: "rgba(139,92,246,0.12)", accentText: "text-violet-400" },
  { id: "upscale",    label: "超分辨率",  sublabel: "画质提升",  icon: <ArrowUpToLine size={15} />, accentBg: "rgba(251,191,36,0.10)", accentText: "text-amber-400" },
  { id: "watermark",  label: "去水印",    sublabel: "无损去除",  icon: <Eraser size={15} />,        accentBg: "rgba(34,211,238,0.10)", accentText: "text-cyan-400" },
  { id: "background", label: "背景消除",  sublabel: "智能抠图",  icon: <Scissors size={15} />,     accentBg: "rgba(244,114,182,0.10)", accentText: "text-pink-400" },
  { id: "colorfix",   label: "色彩修复",  sublabel: "色调校正",  icon: <Palette size={15} />,       accentBg: "rgba(251,146,60,0.10)", accentText: "text-orange-400" },
  { id: "enhance",    label: "图像增强",  sublabel: "细节强化",  icon: <Sparkles size={15} />,      accentBg: "rgba(52,211,153,0.10)", accentText: "text-emerald-400" },
]

export default function ImageWorkbench() {
  const [activeTool, setActiveTool] = useState<ToolType>("upscale")
  const [preview, setPreview] = useState<string | null>(null)
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)

  const run = async () => {
    if (running) return
    setRunning(true); setDone(false)
    await new Promise(r => setTimeout(r, 2200))
    setRunning(false); setDone(true)
  }

  const cur = TOOLS.find(t => t.id === activeTool)!

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div
        className="flex items-center gap-3 px-5 py-3 border-b shrink-0"
        style={{ background: "rgba(13,13,17,0.9)", borderColor: "rgba(251,191,36,0.07)", backdropFilter: "blur(8px)" }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: cur.accentBg, border: "1px solid rgba(251,191,36,0.1)" }}
        >
          <span className={cur.accentText}>{cur.icon}</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-stone-100">{cur.label}</p>
          <p className="text-[10px] text-stone-600">{cur.sublabel}</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          {done && (
            <span className="flex items-center gap-1 text-xs text-emerald-400 mr-2">
              <CheckCircle2 size={12} /> 处理完成
            </span>
          )}
          <button
            onClick={run}
            disabled={running}
            className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium rounded-lg transition-all"
            style={running
              ? { background: "rgba(251,191,36,0.12)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.2)" }
              : { background: "#f59e0b", color: "#000", boxShadow: "0 4px 12px rgba(245,158,11,0.2)" }}
          >
            {running ? <Loader2 size={12} className="animate-spin" /> : null}
            {running ? "处理中…" : "开始处理"}
          </button>
          {done && (
            <button
              className="flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg font-medium"
              style={{ background: "rgba(52,211,153,0.12)", color: "#34d399", border: "1px solid rgba(52,211,153,0.2)" }}
            >
              <Download size={11} /> 下载
            </button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Tool palette */}
        <div
          className="w-[72px] flex flex-col items-center gap-1 py-3 border-r shrink-0 overflow-y-auto no-bar"
          style={{ background: "#0d0d11", borderColor: "rgba(251,191,36,0.08)" }}
        >
          {TOOLS.map(tool => {
            const active = tool.id === activeTool
            return (
              <button
                key={tool.id}
                onClick={() => { setActiveTool(tool.id); setDone(false) }}
                title={tool.label}
                className="w-12 h-12 flex flex-col items-center justify-center gap-1 rounded-xl transition-all"
                style={{
                  background: active ? tool.accentBg : "transparent",
                  border: `1px solid ${active ? "rgba(251,191,36,0.15)" : "transparent"}`,
                }}
              >
                <span className={active ? tool.accentText : "text-stone-600 hover:text-stone-400"}>
                  {tool.icon}
                </span>
                <span className={`text-[9px] leading-none ${active ? tool.accentText : "text-stone-700"}`}>
                  {tool.label.slice(0, 3)}
                </span>
              </button>
            )
          })}

          {/* Divider */}
          <div className="h-px w-8 mx-auto my-1" style={{ background: "rgba(251,191,36,0.07)" }} />

          {/* Image placeholder */}
          <label
            className="w-12 h-12 flex flex-col items-center justify-center gap-1 rounded-xl cursor-pointer transition-all text-stone-600 hover:text-stone-400"
            style={{ border: "1px dashed rgba(251,191,36,0.12)" }}
            title="上传图片"
          >
            <ImageIcon size={14} />
            <span className="text-[9px]">上传</span>
            <input type="file" accept="image/*" className="hidden" onChange={e => {
              const file = e.target.files?.[0]
              if (file) setPreview(URL.createObjectURL(file))
            }} />
          </label>
        </div>

        {/* Canvas area */}
        <NodeCanvas activeTool={activeTool} />
      </div>
    </div>
  )
}
