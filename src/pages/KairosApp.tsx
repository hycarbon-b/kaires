import { useState, useRef, useEffect, KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  MessageSquare, ImageIcon, Send, Bot, User, ChevronDown,
  Loader2, Sparkles, ArrowLeft, Wand2, RefreshCw, Zap,
} from 'lucide-react'

// ─── Types ────────────────────────────────────
interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  model?: string
}

// ─── Data ─────────────────────────────────────
const MODELS = [
  { id: 'gpt-5.4',           name: 'GPT-5.4',           provider: 'OpenAI'    },
  { id: 'gpt-4o',            name: 'GPT-4o',             provider: 'OpenAI'    },
  { id: 'claude-3-7-sonnet', name: 'Claude 3.7 Sonnet',  provider: 'Anthropic' },
  { id: 'gemini-2.5-pro',    name: 'Gemini 2.5 Pro',     provider: 'Google'    },
  { id: 'deepseek-v3',       name: 'DeepSeek V3',        provider: 'DeepSeek'  },
]

const IMAGE_STYLES = ['写实', '动漫', '水彩', '油画', '素描', '极简']
const IMAGE_RATIOS = ['1:1', '4:3', '16:9', '3:4']

const IMAGE_SEEDS = [
  { stops: ['#7c3aed', '#4338ca', '#1e40af'], noise: 'from-violet-800/30' },
  { stops: ['#0891b2', '#0284c7', '#1d4ed8'], noise: 'from-cyan-800/30' },
  { stops: ['#dc2626', '#c2410c', '#b45309'], noise: 'from-red-800/30' },
  { stops: ['#059669', '#0d9488', '#0891b2'], noise: 'from-emerald-800/30' },
]

function getMockResponse(input: string, modelName: string): string {
  const lower = input.toLowerCase()
  if (lower.includes('你好') || lower.includes('hello') || lower.includes('hi')) {
    return `你好！我是由 KAIROS 提供支持的 AI 助手（${modelName}）。可以帮你回答问题、撰写内容、分析数据等，请告诉我你的需求。`
  }
  if (lower.includes('api') || lower.includes('接口') || lower.includes('key')) {
    return `KAIROS 提供兼容 OpenAI 的统一 API，只需修改 \`base_url\` 即可无缝接入：\n\nbase_url = "https://api.kairos.ai/v1"\n\n支持 Python / Node.js / cURL 等方式调用，前往 API 文档页面可查看完整示例。`
  }
  if (lower.includes('价格') || lower.includes('定价') || lower.includes('费用') || lower.includes('多少钱')) {
    return '套餐概览：\n\n• 开发者（免费）：每月 $5 额度\n• 团队（¥999/月起）：按量计费，含用量仪表盘\n• 企业：私有化部署，定制 SLA，请联系销售\n\n所有套餐按实际 Token 用量精确结算，无隐藏费用。'
  }
  if (lower.includes('模型') || lower.includes('gpt') || lower.includes('claude') || lower.includes('gemini')) {
    return `当前支持 40+ 模型：\n\n• OpenAI：GPT-5.4、GPT-4o、GPT-4o-mini\n• Anthropic：Claude 3.7 Sonnet、Claude 3.5\n• Google：Gemini 2.5 Pro、Gemini 2.0 Flash\n• 国内：Qwen-Max、DeepSeek-V3、GLM-4\n\n切换模型只需改 model 参数，其余代码零改动。`
  }
  if (lower.includes('生图') || lower.includes('图像') || lower.includes('image') || lower.includes('图片')) {
    return '切换到上方「生图」选项卡，即可体验 AI 图像生成功能。支持写实、动漫、水彩等多种风格，以及 1:1、16:9 等多种比例。'
  }
  return `我理解你的问题。作为 ${modelName} 驱动的 AI 助手，我可以帮你处理文字创作、代码编写、数据分析、问题解答等各类任务。请告诉我更多具体需求。\n\n接入真实模型请获取 API Key。`
}

// ─────────────────────────────────────────────
// Chat Tab
// ─────────────────────────────────────────────
function ChatTab() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: '你好！我是 KAIROS AI 助手。\n\n可以问我 API 接入、模型列表、定价方案或企业解决方案等问题。这是演示模式，体验真实效果请获取 API Key。',
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
    setMessages(prev => [...prev, {
      id: String(Date.now() + 1),
      role: 'assistant',
      content: getMockResponse(userMsg.content, selectedModel.name),
      model: selectedModel.id,
    }])
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
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Model bar */}
      <div className="px-4 py-2.5 border-b border-stone-800/60 flex items-center gap-3 bg-stone-950/30">
        <span className="text-xs text-stone-600">模型</span>
        <div className="relative">
          <button
            onClick={() => setShowModelPicker(v => !v)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-stone-800/60 hover:bg-stone-800 text-sm transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
            <span>{selectedModel.name}</span>
            <span className="text-xs text-stone-500">{selectedModel.provider}</span>
            <ChevronDown size={12} className="text-stone-500" />
          </button>
          {showModelPicker && (
            <div className="absolute top-full left-0 mt-1 w-64 bg-stone-900 border border-stone-700 rounded-xl shadow-2xl z-20 overflow-hidden">
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
          <Link to="/api" className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-amber-500 hover:bg-amber-400 text-black rounded-lg transition-colors">
            <Zap size={11} />
            获取 API Key
          </Link>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-6 px-4">
        <div className="max-w-2xl mx-auto space-y-5">
          {messages.map(msg => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === 'assistant' ? 'bg-amber-500/15' : 'bg-stone-700'
              }`}>
                {msg.role === 'assistant'
                  ? <Bot size={15} className="text-amber-400" />
                  : <User size={15} className="text-stone-300" />}
              </div>
              <div className={`max-w-[80%] flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                {msg.model && <span className="text-xs text-stone-600 px-0.5">{msg.model}</span>}
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
                <Loader2 size={14} className="text-amber-400 animate-spin" />
                <span className="text-xs text-stone-500">思考中…</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-stone-800 px-4 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex gap-2 bg-stone-900 border border-stone-700 rounded-2xl focus-within:border-stone-500 transition-colors overflow-hidden">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              onInput={onInput}
              placeholder="输入消息… (Enter 发送，Shift+Enter 换行)"
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
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Image Generation Tab
// ─────────────────────────────────────────────
function ImageTab() {
  const [prompt, setPrompt] = useState('')
  const [style, setStyle] = useState('写实')
  const [ratio, setRatio] = useState('1:1')
  const [loading, setLoading] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [genKey, setGenKey] = useState(0)

  const paddingMap: Record<string, string> = {
    '1:1': '100%', '4:3': '75%', '16:9': '56.25%', '3:4': '133.33%',
  }

  const generate = () => {
    if (!prompt.trim() || loading) return
    setLoading(true)
    setGenerated(false)
    setTimeout(() => {
      setLoading(false)
      setGenerated(true)
      setGenKey(k => k + 1)
    }, 2200)
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">

        {/* Result area */}
        {!generated && !loading && (
          <div className="border border-dashed border-stone-800 rounded-2xl p-16 text-center">
            <Wand2 size={28} className="mx-auto mb-3 text-stone-700" />
            <p className="text-sm text-stone-600">输入描述，AI 将为你生成图像</p>
            <p className="text-xs text-stone-700 mt-1">支持中英文描述，越详细效果越好</p>
          </div>
        )}

        {loading && (
          <div className="border border-amber-500/20 bg-amber-500/5 rounded-2xl p-16 text-center">
            <Loader2 size={28} className="mx-auto mb-3 text-amber-400 animate-spin" />
            <p className="text-sm text-stone-400">正在生成图像…</p>
            <p className="text-xs text-stone-600 mt-1">通常需要 3–8 秒</p>
          </div>
        )}

        {generated && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-stone-500">生成结果 · {style} · {ratio}</span>
              <button
                onClick={generate}
                className="flex items-center gap-1 text-xs text-stone-400 hover:text-stone-200 transition-colors"
              >
                <RefreshCw size={11} />
                重新生成
              </button>
            </div>
            <div key={genKey} className="grid grid-cols-2 gap-3">
              {IMAGE_SEEDS.map((seed, i) => (
                <div
                  key={i}
                  className="relative rounded-xl overflow-hidden group cursor-pointer"
                  style={{ paddingBottom: paddingMap[ratio] }}
                >
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(135deg, ${seed.stops[0]}, ${seed.stops[1]}, ${seed.stops[2]})` }}
                  />
                  {/* Noise texture overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${seed.noise} opacity-40`} />
                  {/* Simulated image details */}
                  <div className="absolute inset-0 opacity-20"
                    style={{ backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(0,0,0,0.3) 0%, transparent 50%)' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5">
                    <p className="text-xs text-white/80 line-clamp-1">{prompt}</p>
                  </div>
                  <div className="absolute top-2 right-2 bg-black/50 text-white/60 text-[10px] px-1.5 py-0.5 rounded">
                    #{i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Style selector */}
        <div>
          <p className="text-xs text-stone-500 mb-2.5">风格</p>
          <div className="flex flex-wrap gap-2">
            {IMAGE_STYLES.map(s => (
              <button
                key={s}
                onClick={() => setStyle(s)}
                className={`px-3.5 py-1.5 text-xs rounded-lg border transition-colors ${
                  style === s
                    ? 'border-amber-500/60 bg-amber-500/10 text-amber-300'
                    : 'border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-300'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Ratio selector */}
        <div>
          <p className="text-xs text-stone-500 mb-2.5">比例</p>
          <div className="flex gap-2">
            {IMAGE_RATIOS.map(r => (
              <button
                key={r}
                onClick={() => setRatio(r)}
                className={`px-4 py-1.5 text-xs rounded-lg border transition-colors ${
                  ratio === r
                    ? 'border-amber-500/60 bg-amber-500/10 text-amber-300'
                    : 'border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-300'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Prompt input */}
        <div className="relative">
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); generate() } }}
            placeholder="描述你想生成的图像，例如：「霓虹灯闪烁的赛博朋克城市街道，雨夜，cinematic lighting」"
            className="w-full bg-stone-900 border border-stone-800 rounded-xl px-4 py-3 pr-28 text-sm text-stone-200 placeholder-stone-600 resize-none focus:outline-none focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/10"
            rows={3}
          />
          <button
            onClick={generate}
            disabled={loading || !prompt.trim()}
            className="absolute bottom-3 right-3 flex items-center gap-1.5 px-4 py-1.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 disabled:cursor-not-allowed text-black text-xs font-semibold rounded-lg transition-colors"
          >
            <Wand2 size={12} />
            生成
          </button>
        </div>

        <p className="text-center text-xs text-stone-700">演示模式 · 接入真实图像模型请<Link to="/api" className="text-amber-600 hover:text-amber-500 ml-0.5">获取 API Key</Link></p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────
export default function KairosAppPage() {
  const [tab, setTab] = useState<'chat' | 'image'>('chat')

  return (
    <div className="flex flex-col h-screen pt-16 bg-[#07070a]">
      {/* Tab bar */}
      <div className="border-b border-stone-800 bg-stone-950/60 backdrop-blur-sm shrink-0">
        <div className="max-w-5xl mx-auto px-4 h-12 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Link
              to="/"
              className="flex items-center gap-1.5 text-stone-500 hover:text-stone-300 text-xs px-2 py-1.5 rounded-md hover:bg-stone-800/40 transition-colors mr-2"
            >
              <ArrowLeft size={12} />
              返回
            </Link>
            <button
              onClick={() => setTab('chat')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-sm rounded-md transition-colors ${
                tab === 'chat'
                  ? 'bg-stone-800 text-stone-100'
                  : 'text-stone-500 hover:text-stone-300 hover:bg-stone-800/40'
              }`}
            >
              <MessageSquare size={13} />
              对话
            </button>
            <button
              onClick={() => setTab('image')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-sm rounded-md transition-colors ${
                tab === 'image'
                  ? 'bg-stone-800 text-stone-100'
                  : 'text-stone-500 hover:text-stone-300 hover:bg-stone-800/40'
              }`}
            >
              <ImageIcon size={13} />
              生图
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-stone-600">
            <Sparkles size={11} className="text-amber-500" />
            <span>KAIROS APP</span>
            <span className="text-stone-800">·</span>
            <span>演示版</span>
          </div>
        </div>
      </div>

      {tab === 'chat' ? <ChatTab /> : <ImageTab />}
    </div>
  )
}
