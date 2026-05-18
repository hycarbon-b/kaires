import type { Message } from "../types"
import { Bot, User } from "lucide-react"

export default function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user"
  return (
    <div className={`flex gap-3 animate-fade-up ${isUser ? "flex-row-reverse" : ""}`}>
      {/* Avatar */}
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
        style={isUser
          ? { background: "rgba(28,25,23,0.8)", border: "1px solid rgba(251,191,36,0.12)" }
          : { background: "rgba(251,191,36,0.1)", border: "1px solid rgba(251,191,36,0.15)" }}
      >
        {isUser
          ? <User size={13} className="text-stone-400" />
          : <Bot size={13} className="text-amber-400" />}
      </div>

      <div className={`max-w-[78%] flex flex-col gap-1 ${isUser ? "items-end" : "items-start"}`}>
        {msg.model && (
          <span className="text-[10px] text-stone-600 px-0.5 uppercase tracking-wider font-medium">
            {msg.model}
          </span>
        )}
        <div
          className={`px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
            isUser
              ? "bg-amber-500 text-black font-medium"
              : "glass text-stone-200"
          }`}
          style={isUser
            ? { borderRadius: "12px 2px 12px 12px", boxShadow: "0 4px 16px rgba(251,191,36,0.15)" }
            : { borderRadius: "2px 12px 12px 12px" }}
        >
          {msg.content}
        </div>
      </div>
    </div>
  )
}
