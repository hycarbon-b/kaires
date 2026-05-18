import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { Send, Bot, User, ChevronDown, Loader2, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  model?: string
}

const MODELS = [
  { id: 'gpt-5.4',           name: 'GPT-5.4',             provider: 'OpenAI'    },
  { id: 'gpt-4o',            name: 'GPT-4o',              provider: 'OpenAI'    },
  { id: 'claude-3-7-sonnet', name: 'Claude 3.7 Sonnet',   provider: 'Anthropic' },
  { id: 'gemini-2.5-pro',    name: 'Gemini 2.5 Pro',      provider: 'Google'    },
  { id: 'deepseek-v3',       name: 'DeepSeek V3',         provider: 'DeepSeek'  },
]

function getMockResponse(input: string, modelName: string): string {
  const lower = input.toLowerCase()
  if (lower.includes('你好') || lower.includes('hello') || lower.includes('hi')) {
    return `你好！我是由 KAIROS 凯若斯提供支持的智能助手（${modelName}）。我可以帮你回答问题、撰写内容、分析数据等。请问有什么我可以帮助你的？`
  }
  if (lower.includes('api') || lower.includes('接口') || lower.includes('接入') || lower.includes('key')) {
    return `KAIROS 凯若斯提供兼容 OpenAI 的统一 API，您只需修改 base_url 和 api_key 即可接入：\n\nbase_url = "https://api.kairos.ai/v1"\n\n支持 Python / Node.js / cURL 等方式调用。前往【API 文档】页面可查看完整示例与申请 API Key。`
  }
  if (lower.includes('价格') || lower.includes('定价') || lower.includes('费用') || lower.includes('多少钱') || lower.includes('收费')) {
    return '我们提供三个套餐：\n\n• 开发者（免费）：每月 $5 额度，适合个人测试\n• 团队（¥999/月起）：按量计费，含用量仪表盘\n• 企业：私有化部署，定制 SLA，请联系销售\n\n所有套餐均无隐藏费用，按实际 Token 用量结算。'
  }
  if (lower.includes('模型') || lower.includes('gpt') || lower.includes('claude') || lower.includes('gemini')) {
    return `当前平台支持 40+ 模型，包括：\n\n• OpenAI：GPT-5.4、GPT-4o、GPT-4o-mini\n• Anthropic：Claude 3.7 Sonnet、Claude 3.5\n• Google：Gemini 2.5 Pro、Gemini 2.0 Flash\n• 国内：Qwen-Max、DeepSeek-V3、GLM-4\n\n所有模型通过同一 API 端点调用，切换模型只需改 model 参数。`
  }
  if (lower.includes('解决方案') || lower.includes('agent') || lower.includes('知识库') || lower.includes('webchat') || lower.includes('小程序')) {
    return '我们提供四类定制化 AI 服务：\n\n① 企业 Agent — 自动化工作流，处理邮件、报告、审批等\n② 知识问答 — 私有文档库 + RAG 检索，精准问答\n③ 品牌 Webchat — 嵌入官网的定制 AI 客服窗口\n④ 小程序问答 — 微信小程序 AI 对话 SDK\n\n欢迎联系销售了解具体方案。'
  }
  return `我理解你的问题。作为基于 ${modelName} 的 AI 助手，我可以帮你处理各类任务。请告诉我更多具体需求，我会尽力提供帮助。\n\n如需接入真实模型，请获取 API Key 并参考文档。`
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: '你好！我是 KAIROS 凯若斯 AI 助手。\n\n你可以问我关于 API 接入方式、模型列表、定价方案或企业解决方案等问题。这是演示模式，体验真实效果请获取 API Key。',
      model: 'gpt-5.4',
    },
  ])
  const [input, setInput] = useState('')
  const [selectedModel, setSelectedModel] = useState(MODELS[0])
  const [showModelPicker, setShowModelPicker] = useState(false)
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input.trim() }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    if (textareaRef.current) textareaRef.current.style.height = 'auto'
    setLoading(true)
    await new Promise(r => setTimeout(r, 600 + Math.random() * 700))
    const assistantMsg: Message = {
      id: String(Date.now() + 1),
      role: 'assistant',
      content: getMockResponse(userMsg.content, selectedModel.name),
      model: selectedModel.id,
    }
    setMessages(prev => [...prev, assistantMsg])
    setLoading(false)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() }
  }

  const onInput = () => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 160) + 'px'
  }

  return (
    <div className="flex flex-col h-screen bg-[#07070a] pt-16">
      {/* Model selector bar */}
      <div className="border-b border-stone-800 px-4 py-2.5 flex items-center gap-3 bg-[#07070a]/90 backdrop-blur">
        <span className="text-xs text-stone-500">模型：</span>
        <div className="relative">
          <button
            onClick={() => setShowModelPicker(v => !v)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-sm transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
            <span>{selectedModel.name}</span>
            <span className="text-xs text-stone-500">{selectedModel.provider}</span>
            <ChevronDown size={13} className="text-stone-500" />
          </button>
          {showModelPicker && (
            <div className="absolute top-full left-0 mt-1 w-60 bg-stone-900 border border-stone-700 rounded-xl shadow-2xl z-20 overflow-hidden">
              {MODELS.map(m => (
                <button
                  key={m.id}
                  onClick={() => { setSelectedModel(m); setShowModelPicker(false) }}
                  className={`w-full px-4 py-2.5 text-left flex items-center justify-between hover:bg-stone-800 transition-colors ${m.id === selectedModel.id ? 'bg-stone-800' : ''}`}
                >
                  <span className="text-sm">{m.name}</span>
                  <span className="text-xs text-stone-500">{m.provider}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="ml-auto">
          <Link
            to="/api"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-amber-500 hover:bg-amber-400 text-black rounded-lg transition-colors"
          >
            <Zap size={12} />
            获取真实 API Key
          </Link>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-6 px-4">
        <div className="max-w-2xl mx-auto space-y-6">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'assistant' ? 'bg-amber-500/15' : 'bg-stone-700'
              }`}>
                {msg.role === 'assistant'
                  ? <Bot size={15} className="text-amber-400" />
                  : <User size={15} className="text-stone-300" />}
              </div>
              <div className={`max-w-[80%] flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                {msg.model && (
                  <span className="text-xs text-stone-600 px-0.5">{msg.model}</span>
                )}
                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-amber-500 text-black rounded-tr-sm'
                    : 'bg-stone-900 border border-stone-800 text-stone-100 rounded-tl-sm'
                }`}>
                  {msg.content}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-500/15 flex items-center justify-center shrink-0">
                <Bot size={15} className="text-amber-400" />
              </div>
              <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-stone-900 border border-stone-800 flex items-center gap-2">
                <Loader2 size={15} className="text-amber-400 animate-spin" />
                <span className="text-xs text-stone-500">思考中...</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-stone-800 bg-[#07070a] px-4 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex gap-2 bg-stone-900 border border-stone-700 rounded-2xl focus-within:border-stone-500 transition-colors overflow-hidden">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              onInput={onInput}
              placeholder="输入消息... (Enter 发送，Shift+Enter 换行)"
              className="flex-1 bg-transparent px-4 py-3 text-sm text-stone-100 placeholder-stone-600 resize-none outline-none"
              rows={1}
              style={{ minHeight: 48 }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="m-2 px-3 bg-amber-500 hover:bg-amber-400 disabled:bg-stone-700 disabled:text-stone-500 text-black rounded-xl transition-colors flex items-center justify-center"
            >
              <Send size={15} />
            </button>
          </div>
          <p className="text-center text-xs text-stone-600 mt-2">
            演示模式 · 接入真实模型请{' '}
            <Link to="/api" className="text-amber-500 hover:underline">获取 API Key</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
