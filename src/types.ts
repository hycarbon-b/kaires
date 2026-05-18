export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  model?: string
}

export interface FileItem {
  id: string
  name: string
  type: "pdf" | "excel" | "word" | "image" | "text"
  size: string
  status: "indexed" | "processing"
}

export interface BotConfig {
  id: string
  name: string
  greeting: string
  primaryColor: string
}

export type ToolType = "generate" | "upscale" | "watermark" | "background" | "colorfix" | "enhance"

export interface WorkflowNode {
  id: string
  type: "input" | "tool" | "output"
  toolType?: ToolType
  label: string
  sublabel: string
  config: Record<string, string | number>
  status: "idle" | "running" | "done" | "error"
}