import { useState } from 'react'
import { Copy, Check, Key, Globe, Terminal, ChevronDown, ChevronUp } from 'lucide-react'
import { Link } from 'react-router-dom'

// ─── Copy button ───────────────────────────────
function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text).catch(() => undefined)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={copy}
      className="p-1.5 rounded text-stone-500 hover:text-stone-200 hover:bg-stone-700/60 transition-colors"
      title="复制"
    >
      {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
    </button>
  )
}

// ─── Code examples ─────────────────────────────
const CODE: Record<'python' | 'js' | 'curl', string> = {
  python: `from openai import OpenAI

client = OpenAI(
    base_url="https://gw-stg.tradingbase.ai/v1",
    api_key="sk-your-api-key",
)

response = client.chat.completions.create(
    model="gpt-5.4",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user",   "content": "你好！"},
    ],
)
print(response.choices[0].message.content)`,

  js: `import OpenAI from 'openai'

const client = new OpenAI({
  baseURL: 'https://api.kairos.ai/v1',
  apiKey:  'sk-your-api-key',
})

const response = await client.chat.completions.create({
  model: 'gpt-5.4',
  messages: [{ role: 'user', content: '你好！' }],
})

console.log(response.choices[0].message.content)`,

  curl: `curl https://api.kairos.ai/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer sk-your-api-key" \\
  -d '{
    "model": "gpt-5.4",
    "messages": [
      {"role": "user", "content": "你好！"}
    ]
  }'`,
}

const LANG_LABELS: Record<'python' | 'js' | 'curl', string> = {
  python: 'Python',
  js:     'Node.js',
  curl:   'cURL',
}

// ─── Model list ────────────────────────────────
const MODELS = [
  { id: 'gpt-5.4',             provider: 'OpenAI',     ctx: '128K', type: '聊天' },
  { id: 'gpt-4o',              provider: 'OpenAI',     ctx: '128K', type: '聊天' },
  { id: 'gpt-4o-mini',         provider: 'OpenAI',     ctx: '128K', type: '聊天' },
  { id: 'claude-3-7-sonnet',   provider: 'Anthropic',  ctx: '200K', type: '聊天' },
  { id: 'claude-3-5-haiku',    provider: 'Anthropic',  ctx: '200K', type: '聊天' },
  { id: 'gemini-2.5-pro',      provider: 'Google',     ctx: '1M',   type: '聊天' },
  { id: 'gemini-2.0-flash',    provider: 'Google',     ctx: '1M',   type: '聊天' },
  { id: 'deepseek-v3',         provider: 'DeepSeek',   ctx: '64K',  type: '聊天' },
  { id: 'qwen-max',            provider: 'Alibaba',    ctx: '32K',  type: '聊天' },
  { id: 'text-embedding-3-large', provider: 'OpenAI',  ctx: '8K',   type: '嵌入' },
]

// ─── FAQ ───────────────────────────────────────
const FAQ = [
  {
    q: '是否完全兼容 OpenAI SDK？',
    a: '是的。只需将 base_url 指向我们的网关地址，所有 OpenAI SDK 的方法（chat、embeddings、images 等）均可直接使用。',
  },
  {
    q: '免费额度用完后如何计费？',
    a: '超出免费额度后按实际 Token 用量计费，费率与官方相近且透明公示。您可在控制台设置消费上限，超限后自动暂停。',
  },
  {
    q: '数据安全如何保障？',
    a: '请求全程 TLS 加密，不存储用户对话内容。企业版支持私有化部署，数据完全在您的基础设施内流转。',
  },
  {
    q: '如何接入私有化部署版本？',
    a: '私有化版本提供与云端相同的 API 接口，只需将 base_url 替换为内网地址，其他代码完全一致。',
  },
]

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-stone-800 last:border-0">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full text-left flex items-center justify-between py-4 gap-4"
      >
        <span className="text-sm font-medium text-stone-200">{q}</span>
        {open ? <ChevronUp size={15} className="text-stone-500 shrink-0" /> : <ChevronDown size={15} className="text-stone-500 shrink-0" />}
      </button>
      {open && <p className="text-sm text-stone-400 pb-4 leading-relaxed">{a}</p>}
    </div>
  )
}

// ─── Main page ─────────────────────────────────
export default function ApiPage() {
  const [lang, setLang] = useState<'python' | 'js' | 'curl'>('python')

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-16">
      <div className="mb-12">
        <div className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs mb-4">
          开发者文档
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">API 接入指南</h1>
        <p className="text-stone-400">兼容 OpenAI 标准，修改两行配置即可完成接入。</p>
      </div>

      {/* Step 1: Quick start */}
      <div className="glass p-6 mb-5">
        <h2 className="font-semibold flex items-center gap-2 mb-1">
          <Terminal size={15} className="text-amber-400" />
          快速开始
        </h2>
        <p className="text-sm text-stone-400 mb-5">选择你的语言，复制代码后替换 api_key 即可运行。</p>

        {/* Language tabs */}
          <div className="flex gap-1 mb-4 bg-stone-900/80 rounded-lg p-1 w-fit">
          {(Object.keys(LANG_LABELS) as Array<keyof typeof LANG_LABELS>).map(l => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-3.5 py-1.5 rounded text-sm font-mono transition-colors ${
                lang === l ? 'bg-stone-700 text-stone-100' : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {LANG_LABELS[l]}
            </button>
          ))}
        </div>

        <div className="relative">
          <pre className="code-block overflow-x-auto"><code>{CODE[lang]}</code></pre>
          <div className="absolute top-3 right-3">
            <CopyBtn text={CODE[lang]} />
          </div>
        </div>
      </div>

      {/* Step 2: Get API key */}
      <div className="glass p-6 mb-5">
        <h2 className="font-semibold flex items-center gap-2 mb-1">
          <Key size={15} className="text-amber-400" />
          获取 API Key
        </h2>
        <p className="text-sm text-stone-400 mb-5">注册后在控制台创建 API Key，免费额度立即可用。</p>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 p-3 bg-stone-900 rounded-lg border border-stone-800">
            <span className="text-xs text-stone-500 font-mono w-20 shrink-0">Base URL</span>
            <code className="text-sm text-amber-300 font-mono flex-1 min-w-0 truncate">
              https://api.kairos.ai/v1
            </code>
            <CopyBtn text="https://api.kairos.ai/v1" />
          </div>
          <div className="flex items-center gap-3 p-3 bg-stone-900 rounded-lg border border-stone-800">
            <span className="text-xs text-stone-500 font-mono w-20 shrink-0">API Key</span>
            <code className="text-sm text-stone-500 font-mono flex-1 tracking-widest">
              sk-••••••••••••••••••••••••••••••••
            </code>
            <a
              href="http://localhost:3000"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-amber-400 hover:text-amber-300 transition-colors px-2 shrink-0"
            >
              申请 →
            </a>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black text-sm font-medium rounded-lg transition-colors"
          >
            <Globe size={14} />
            进入控制台
          </a>
          <Link
            to="/chat"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-100 text-sm font-medium rounded-lg transition-colors"
          >
            在线体验对话
          </Link>
        </div>
      </div>

      {/* Model table */}
      <div className="glass p-6 mb-5">
        <h2 className="font-semibold flex items-center gap-2 mb-1">
          <Globe size={15} className="text-amber-400" />
          可用模型
        </h2>
        <p className="text-sm text-stone-400 mb-5">支持 40+ 模型，持续扩充中。</p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-stone-500 border-b border-stone-800">
                <th className="text-left pb-3 font-normal">模型 ID</th>
                <th className="text-left pb-3 font-normal">提供商</th>
                <th className="text-left pb-3 font-normal">类型</th>
                <th className="text-left pb-3 font-normal">上下文</th>
              </tr>
            </thead>
            <tbody>
              {MODELS.map(m => (
                <tr key={m.id} className="border-b border-stone-800/50 hover:bg-stone-800/30 transition-colors">
                  <td className="py-2.5 pr-4">
                    <code className="font-mono text-xs text-amber-300">{m.id}</code>
                  </td>
                  <td className="py-2.5 pr-4 text-stone-400 text-xs">{m.provider}</td>
                  <td className="py-2.5 pr-4 text-stone-400 text-xs">{m.type}</td>
                  <td className="py-2.5 text-stone-400 text-xs">{m.ctx}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-stone-600 mt-3 text-center">
            … 更多模型请在控制台查看完整列表
          </p>
        </div>
      </div>

      {/* FAQ */}
      <div className="glass p-6">
        <h2 className="font-semibold mb-4">常见问题</h2>
        {FAQ.map(item => (
          <FaqItem key={item.q} q={item.q} a={item.a} />
        ))}
      </div>
    </div>
  )
}
