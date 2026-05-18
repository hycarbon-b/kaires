import type { ReactNode } from "react"
import { X, FileText, Table2, FileType2, ImageIcon, File, Upload, CheckCircle2, Loader2 } from "lucide-react"
import type { FileItem } from "../types"

const TYPE_ICON: Record<string, ReactNode> = {
  pdf:   <FileText size={13} className="text-red-400" />,
  excel: <Table2 size={13} className="text-emerald-400" />,
  word:  <FileType2 size={13} className="text-sky-400" />,
  image: <ImageIcon size={13} className="text-violet-400" />,
  text:  <File size={13} className="text-stone-400" />,
}

interface Props { files: FileItem[]; onClose: () => void }

export default function FileLibraryPanel({ files, onClose }: Props) {
  return (
    <div
      className="w-72 flex-shrink-0 flex flex-col border-l"
      style={{ background: "#0d0d11", borderColor: "rgba(251,191,36,0.08)" }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: "rgba(251,191,36,0.06)" }}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-stone-200">文件库</span>
          <span
            className="px-1.5 py-0.5 text-[10px] rounded font-medium uppercase tracking-wider"
            style={{ background: "rgba(52,211,153,0.1)", color: "#34d399", border: "1px solid rgba(52,211,153,0.2)" }}
          >
            RAG 激活
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-stone-600 hover:text-stone-300 transition-colors"
        >
          <X size={15} />
        </button>
      </div>

      {/* File list */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 no-bar">
        {files.map(f => (
          <div
            key={f.id}
            className="flex items-center gap-2.5 p-2.5 rounded-lg border"
            style={{ background: "rgba(28,25,23,0.5)", borderColor: "rgba(251,191,36,0.06)" }}
          >
            <div className="shrink-0">{TYPE_ICON[f.type]}</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-stone-300 truncate">{f.name}</p>
              <p className="text-[10px] text-stone-600 mt-0.5">{f.size}</p>
            </div>
            {f.status === "indexed"
              ? <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
              : <Loader2 size={12} className="text-amber-400 shrink-0 animate-spin" />}
          </div>
        ))}
      </div>

      {/* Upload button */}
      <div className="p-3 border-t" style={{ borderColor: "rgba(251,191,36,0.06)" }}>
        <button
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs text-stone-600 hover:text-amber-400 transition-colors border border-dashed"
          style={{ borderColor: "rgba(251,191,36,0.12)" }}
        >
          <Upload size={12} />
          上传文件 (PDF / Excel / Word)
        </button>
      </div>
    </div>
  )
}
