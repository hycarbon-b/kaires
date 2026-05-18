import type { ReactNode } from "react"
import { useState } from "react"
import {
  Upload, Download, Wand2, ArrowUpToLine, Eraser,
  Scissors, Palette, Sparkles, CheckCircle2, Loader2,
  Play, X, Plus,
} from "lucide-react"
import type { WorkflowNode, ToolType } from "../types"

const TOOL_META: Record<ToolType, {
  label: string
  icon: ReactNode
  accent: string
  accentBg: string
  configs: { key: string; label: string; options: string[] }[]
}> = {
  generate:   { label: "文生图",    icon: <Wand2 size={15} />,         accent: "text-violet-400", accentBg: "rgba(139,92,246,0.12)",
    configs: [{ key: "style", label: "风格", options: ["写实","动漫","水彩","油画"] }, { key: "ratio", label: "比例", options: ["1:1","16:9","4:3","3:4"] }] },
  upscale:    { label: "超分辨率",  icon: <ArrowUpToLine size={15} />, accent: "text-amber-400",  accentBg: "rgba(251,191,36,0.1)",
    configs: [{ key: "scale", label: "倍率", options: ["2x","4x","8x"] }, { key: "quality", label: "质量", options: ["标准","高质量"] }] },
  watermark:  { label: "去水印",    icon: <Eraser size={15} />,        accent: "text-cyan-400",   accentBg: "rgba(34,211,238,0.1)",
    configs: [{ key: "mode", label: "模式", options: ["自动检测","精准模式"] }] },
  background: { label: "背景消除",  icon: <Scissors size={15} />,     accent: "text-pink-400",   accentBg: "rgba(244,114,182,0.1)",
    configs: [{ key: "edge", label: "边缘", options: ["标准","精细毛发"] }, { key: "output", label: "输出背景", options: ["透明","白色","模糊"] }] },
  colorfix:   { label: "色彩修复",  icon: <Palette size={15} />,       accent: "text-orange-400", accentBg: "rgba(251,146,60,0.1)",
    configs: [{ key: "strength", label: "强度", options: ["轻微","标准","强力"] }] },
  enhance:    { label: "图像增强",  icon: <Sparkles size={15} />,      accent: "text-emerald-400",accentBg: "rgba(52,211,153,0.1)",
    configs: [{ key: "mode", label: "模式", options: ["自动","人像优化","风景增强"] }] },
}

function ConnArrow() {
  return (
    <div className="flex flex-col items-center gap-0.5 mx-0.5 shrink-0">
      <svg width="52" height="24" viewBox="0 0 52 24">
        <path d="M 2 12 C 16 12 34 12 44 12"
          stroke="rgba(251,191,36,0.3)" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
        <path d="M 39 7 L 46 12 L 39 17"
          stroke="rgba(251,191,36,0.4)" strokeWidth="1.5" fill="none" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    </div>
  )
}

function NodeCard({ node, onClick, active }: { node: WorkflowNode; onClick?: () => void; active?: boolean }) {
  const isInput = node.type === "input"
  const isOutput = node.type === "output"
  const meta = node.toolType ? TOOL_META[node.toolType] : null

  return (
    <div
      onClick={onClick}
      className="relative w-44 rounded-xl transition-all select-none"
      style={{
        background: "rgba(17,17,22,0.95)",
        border: `1px solid ${active ? "rgba(251,191,36,0.4)" : "rgba(251,191,36,0.08)"}`,
        boxShadow: active ? "0 0 20px rgba(251,191,36,0.08)" : "none",
        cursor: onClick ? "pointer" : "default",
      }}
    >
      {/* Status badge */}
      {node.status !== "idle" && (
        <span
          className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center"
          style={{
            background: node.status === "done" ? "rgba(52,211,153,0.15)" :
                        node.status === "running" ? "rgba(251,191,36,0.15)" : "rgba(239,68,68,0.15)",
            border: `1px solid ${node.status === "done" ? "rgba(52,211,153,0.3)" : "rgba(251,191,36,0.3)"}`,
          }}
        >
          {node.status === "running" && <Loader2 size={10} className="text-amber-400 animate-spin" />}
          {node.status === "done" && <CheckCircle2 size={10} className="text-emerald-400" />}
        </span>
      )}

      <div className="p-3.5">
        {/* Icon */}
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
          style={{ background: meta ? meta.accentBg : "rgba(28,25,23,0.8)", border: "1px solid rgba(251,191,36,0.06)" }}
        >
          {isInput  && <Upload size={15} className="text-stone-400" />}
          {isOutput && <Download size={15} className="text-stone-400" />}
          {meta && <span className={meta.accent}>{meta.icon}</span>}
        </div>

        <p className="text-xs font-semibold text-stone-200 leading-snug">{node.label}</p>
        <p className="text-[10px] text-stone-600 mt-0.5">{node.sublabel}</p>

        {/* Config summary pills */}
        {node.toolType && (
          <div className="mt-2.5 space-y-1.5">
            {TOOL_META[node.toolType].configs.slice(0, 2).map(c => (
              <div key={c.key} className="flex items-center justify-between gap-1">
                <span className="text-[10px] text-stone-600">{c.label}</span>
                <span
                  className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${meta?.accent}`}
                  style={{ background: meta?.accentBg }}
                >
                  {(node.config[c.key] as string) || c.options[0]}
                </span>
              </div>
            ))}
          </div>
        )}

        {isInput && (
          <div
            className="mt-3 rounded-lg p-2 text-center"
            style={{ border: "1px dashed rgba(251,191,36,0.15)" }}
          >
            <p className="text-[10px] text-stone-600">拖放或点击上传</p>
          </div>
        )}

        {isOutput && node.status === "done" && (
          <div className="mt-3 space-y-1.5">
            <div
              className="h-14 rounded-lg"
              style={{ background: "linear-gradient(135deg, rgba(251,191,36,0.15), rgba(249,115,22,0.1))", border: "1px solid rgba(251,191,36,0.1)" }}
            />
            <button
              className="flex items-center justify-center gap-1 w-full py-1.5 rounded-lg text-[10px] font-medium text-black bg-amber-500 hover:bg-amber-400 transition-colors"
            >
              <Download size={9} /> 下载结果
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function ConfigPanel({ node, onUpdate, onClose }: {
  node: WorkflowNode
  onUpdate: (config: Record<string, string | number>) => void
  onClose: () => void
}) {
  const meta = node.toolType ? TOOL_META[node.toolType] : null
  if (!meta) return null
  return (
    <div
      className="border-t px-5 py-4"
      style={{ background: "rgba(13,13,17,0.98)", borderColor: "rgba(251,191,36,0.08)" }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className={meta.accent}>{meta.icon}</span>
          <span className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
            配置 · {meta.label}
          </span>
        </div>
        <button onClick={onClose} className="text-stone-600 hover:text-stone-400 transition-colors">
          <X size={13} />
        </button>
      </div>
      <div className="flex flex-wrap gap-5">
        {meta.configs.map(c => (
          <div key={c.key}>
            <p className="text-[10px] text-stone-600 mb-2 uppercase tracking-wider">{c.label}</p>
            <div className="flex gap-1.5 flex-wrap">
              {c.options.map(opt => {
                const active = (node.config[c.key] || c.options[0]) === opt
                return (
                  <button
                    key={opt}
                    onClick={() => onUpdate({ ...node.config, [c.key]: opt })}
                    className={`px-3 py-1 text-xs rounded-lg transition-all ${
                      active ? `${meta.accent} font-medium` : "text-stone-500 hover:text-stone-300"
                    }`}
                    style={{
                      background: active ? meta.accentBg : "rgba(28,25,23,0.5)",
                      border: `1px solid ${active ? "rgba(251,191,36,0.15)" : "rgba(251,191,36,0.05)"}`,
                    }}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface Props { activeTool: ToolType | null }

export default function NodeCanvas({ activeTool }: Props) {
  const defaultTool: ToolType = activeTool || "upscale"
  const meta = TOOL_META[defaultTool]

  const [nodes, setNodes] = useState<WorkflowNode[]>([
    { id: "input", type: "input",  label: "输入源",  sublabel: "图片 / URL",  config: {}, status: "idle" },
    { id: "tool1", type: "tool",  toolType: defaultTool, label: meta.label, sublabel: "点击配置", config: {}, status: "idle" },
    { id: "output", type: "output", label: "输出",    sublabel: "处理结果", config: {}, status: "idle" },
  ])
  const [extraTool, setExtraNode] = useState<WorkflowNode | null>(null)
  const [activeConfig, setActiveConfig] = useState<string | null>(null)
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)

  // Sync active tool
  const syncedNodes = nodes.map(n => {
    if (n.id === "tool1" && activeTool && n.toolType !== activeTool) {
      const m = TOOL_META[activeTool]
      return { ...n, toolType: activeTool, label: m.label, config: {}, status: "idle" as const }
    }
    return n
  })

  const allNodes = extraTool
    ? [syncedNodes[0], syncedNodes[1], extraTool, syncedNodes[2]]
    : syncedNodes

  const runWorkflow = async () => {
    if (running) return
    setRunning(true); setDone(false)
    const upd = (status: WorkflowNode["status"]) => {
      setNodes(prev => prev.map(n => ({ ...n, status })))
      if (extraTool) setExtraNode(p => p ? { ...p, status } : p)
    }
    upd("running")
    await new Promise(r => setTimeout(r, 2200))
    upd("done")
    setRunning(false); setDone(true)
  }

  const addExtra = () => {
    const t: ToolType = "enhance"
    const m = TOOL_META[t]
    setExtraNode({ id: "tool2", type: "tool", toolType: t, label: m.label, sublabel: "点击配置", config: {}, status: "idle" })
  }

  const updateConfig = (nodeId: string, config: Record<string, string | number>) => {
    setNodes(prev => prev.map(n => n.id === nodeId ? { ...n, config } : n))
    if (extraTool?.id === nodeId) setExtraNode(p => p ? { ...p, config } : p)
  }

  const configNode = allNodes.find(n => n.id === activeConfig)

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Toolbar */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b shrink-0"
        style={{ background: "rgba(13,13,17,0.9)", borderColor: "rgba(251,191,36,0.07)" }}
      >
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-stone-600 uppercase tracking-widest">节点工作流</span>
          <span className="text-stone-700">|</span>
          <span className="text-[10px] text-stone-600">{allNodes.length} 节点</span>
        </div>
        <button
          onClick={runWorkflow}
          disabled={running}
          className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium rounded-lg transition-all disabled:cursor-not-allowed"
          style={done
            ? { background: "rgba(52,211,153,0.15)", color: "#34d399", border: "1px solid rgba(52,211,153,0.25)" }
            : running
              ? { background: "rgba(251,191,36,0.15)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.2)" }
              : { background: "#f59e0b", color: "#000", boxShadow: "0 4px 16px rgba(245,158,11,0.25)" }}
        >
          {running ? <Loader2 size={12} className="animate-spin" /> : done ? <CheckCircle2 size={12} /> : <Play size={12} />}
          {running ? "运行中…" : done ? "已完成" : "运行工作流"}
        </button>
      </div>

      {/* Canvas */}
      <div className="flex-1 canvas-dot-bg overflow-auto flex items-center justify-center p-10 relative">
        <div className="flex items-center flex-wrap justify-center">
          {allNodes.map((node, i) => (
            <div key={node.id} className="flex items-center">
              <NodeCard
                node={node}
                onClick={node.type === "tool" ? () => setActiveConfig(activeConfig === node.id ? null : node.id) : undefined}
                active={activeConfig === node.id}
              />
              {i < allNodes.length - 1 && (
                <div className="flex flex-col items-center gap-0.5">
                  <ConnArrow />
                  {i === allNodes.length - 2 && !extraTool && (
                    <button
                      onClick={addExtra}
                      className="w-5 h-5 rounded-full flex items-center justify-center text-stone-600 hover:text-amber-400 transition-colors -mt-0.5"
                      style={{ background: "rgba(17,17,22,0.9)", border: "1px solid rgba(251,191,36,0.1)" }}
                    >
                      <Plus size={9} />
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {!running && !done && (
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-stone-700 uppercase tracking-widest whitespace-nowrap">
            点击工具节点配置参数 · 点击 + 添加步骤
          </p>
        )}
      </div>

      {/* Config panel */}
      {activeConfig && configNode?.type === "tool" && (
        <ConfigPanel
          node={configNode}
          onUpdate={cfg => updateConfig(activeConfig, cfg)}
          onClose={() => setActiveConfig(null)}
        />
      )}
    </div>
  )
}
