import { useState, useRef, useEffect } from "react"
import {
  Send, Paperclip, ChevronDown, Bot, Share2, Library, Sparkles,
} from "lucide-react"
import type { Message, FileItem } from "../types"
import MessageBubble from "../components/MessageBubble"
import FileLibraryPanel from "../components/FileLibraryPanel"
import ShareBotModal from "../components/ShareBotModal"

const MODELS = ["KAIROS Pro", "KAIROS Fast", "GPT-4o", "Claude 3.7", "Gemini 2.5"]
const MOCK_FILES: FileItem[] = [
  { id: "f1", name: "2025年度报告.pdf", type: "pdf", size: "2.4 MB", status: "indexed" },
  { id: "f2", name: "产品路线图.xlsx", type: "excel", size: "856 KB", status: "indexed" },
  { id: "f3", name: "技术架构文档.docx", type: "word", size: "1.1 MB", status: "processing" },
]
const INIT: Message[] = [
  { id: "m0", role: "assistant", content: "你好！我已读取知识库中的 3 份文件（RAG 已激活）。请直接提问，例如：2025 年各季度收入对比，或技术架构中的微服务拆分方案。", model: "KAIROS Pro" },
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(INIT)
  const [input, setInput] = useState("")
  const [model, setModel] = useState(MODELS[0])
  const [showModelPicker, setShowModelPicker] = useState(false)
  const [showFiles, setShowFiles] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [sending, setSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const send = async () => {
    if (!input.trim() || sending) return
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input.trim() }
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setSending(true)
    if (textRef.current) textRef.current.style.height = "auto"
    await new Promise(r => setTimeout(r, 1200))
    const reply: Message = {
      id: (Date.now() + 1).toString(), role: "assistant",
      content: "这是基于知识库的模拟回复。实际部署后将调用您选择的 AI 模型进行真实推理，并结合 RAG 向量检索返回精准答案。",
      model,
    }
    setMessages(prev => [...prev, reply])
    setSending(false)
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send() }
  }

  const autoResize = () => {
    if (!textRef.current) return
    textRef.current.style.height = "auto"
    textRef.current.style.height = Math.min(textRef.current.scrollHeight, 160) + "px"
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-5 py-3 border-b shrink-0"
        style={{ background: "rgba(13,13,17,0.9)", borderColor: "rgba(251,191,36,0.07)", backdropFilter: "blur(8px)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.15)" }}
          >
            <Bot size={14} className="text-amber-400" />
          </div>
          <div className="flex flex-col leading-none gap-0.5">
            <span className="text-sm font-medium text-stone-100">智能文档助手</span>
            <div className="flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow"
              />
              <span className="text-[10px] text-stone-500 uppercase tracking-wider">RAG 已激活</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowFiles(v => !v)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-colors ${
              showFiles
                ? "bg-amber-500/15 text-amber-400 border border-amber-500/20"
                : "text-stone-500 hover:text-stone-300 hover:bg-white/5"
            }`}
          >
            <Library size={12} />
            文件库
          </button>
          <button
            onClick={() => setShowShare(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-stone-500 hover:text-stone-300 hover:bg-white/5 transition-colors"
          >
            <Share2 size={12} />
            分享 Bot
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-8 px-4 no-bar">
          <div className="max-w-2xl mx-auto space-y-6">
            {messages.map(msg => <MessageBubble key={msg.id} msg={msg} />)}
            {sending && (
              <div className="flex gap-3 animate-fade-up">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.15)" }}
                >
                  <Bot size={14} className="text-amber-400" />
                </div>
                <div
                  className="glass px-4 py-3 flex items-center gap-1.5"
                  style={{ borderRadius: "0 12px 12px 12px" }}
                >
                  <span className="w-1.5 h-1.5 bg-stone-500 rounded-full animate-bounce" style={{animationDelay:"0ms"}} />
                  <span className="w-1.5 h-1.5 bg-stone-500 rounded-full animate-bounce" style={{animationDelay:"120ms"}} />
                  <span className="w-1.5 h-1.5 bg-stone-500 rounded-full animate-bounce" style={{animationDelay:"240ms"}} />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </div>

        {/* File panel */}
        {showFiles && <FileLibraryPanel files={MOCK_FILES} onClose={() => setShowFiles(false)} />}
      </div>

      {/* Input area */}
      <div
        className="px-4 py-4 border-t shrink-0"
        style={{ borderColor: "rgba(251,191,36,0.07)" }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="input-dark">
            <textarea
              ref={textRef}
              value={input}
              onChange={e => { setInput(e.target.value); autoResize() }}
              onKeyDown={handleKey}
              placeholder="输入消息，Shift+Enter 换行…"
              rows={1}
              className="w-full px-4 pt-3.5 pb-1 bg-transparent outline-none text-sm resize-none text-stone-200 placeholder:text-stone-600 font-sans"
            />
            <div className="flex items-center justify-between px-3 pb-3 pt-1">
              <div className="flex items-center gap-1">
                <button className="w-7 h-7 flex items-center justify-center text-stone-600 hover:text-stone-400 transition-colors rounded-lg hover:bg-white/5">
                  <Paperclip size={13} />
                </button>
                {/* Model picker */}
                <div className="relative">
                  <button
                    onClick={() => setShowModelPicker(v => !v)}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs text-stone-500 hover:text-stone-300 rounded-lg hover:bg-white/5 transition-colors font-medium"
                  >
                    <Sparkles size={10} className="text-amber-500/70" />
                    {model}
                    <ChevronDown size={10} />
                  </button>
                  {showModelPicker && (
                    <div
                      className="absolute bottom-full mb-1.5 left-0 w-44 rounded-xl shadow-2xl overflow-hidden z-20 border"
                      style={{ background: "#111116", borderColor: "rgba(251,191,36,0.1)", boxShadow: "0 20px 40px rgba(0,0,0,0.6)" }}
                    >
                      {MODELS.map(m => (
                        <button
                          key={m}
                          onClick={() => { setModel(m); setShowModelPicker(false) }}
                          className={`w-full text-left px-3 py-2 text-xs transition-colors flex items-center gap-2 ${
                            m === model
                              ? "bg-amber-500/12 text-amber-400 font-medium"
                              : "text-stone-400 hover:bg-white/5 hover:text-stone-200"
                          }`}
                        >
                          {m === model && <span className="w-1 h-1 rounded-full bg-amber-400 shrink-0" />}
                          {m}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={send}
                disabled={!input.trim() || sending}
                className="w-8 h-8 flex items-center justify-center rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-25 disabled:cursor-not-allowed text-black transition-all hover:shadow-lg hover:shadow-amber-500/20"
              >
                <Send size={13} />
              </button>
            </div>
          </div>
          <p className="text-center text-[10px] text-stone-700 mt-2">
            KAIROS 可能出错。请核查重要信息。
          </p>
        </div>
      </div>

      {showShare && <ShareBotModal botName="智能文档助手" onClose={() => setShowShare(false)} />}
    </div>
  )
}
