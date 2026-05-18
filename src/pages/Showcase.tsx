import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  MessageSquare, BookOpen, BarChart2, FileSearch,
  ArrowRight, Send, Loader2, ChevronRight, Sparkles,
  CheckCircle2, Building2,
} from 'lucide-react'

// ─────────────────────────────────────────────
// Demo 1: Embedded Brand Chatbot
// ─────────────────────────────────────────────
const CHAT_FAQS = [
  '你们支持哪些支付方式？',
  '如何申请企业账户？',
  '退款政策是什么？',
]

const CHAT_ANSWERS: Record<string, string> = {
  '你们支持哪些支付方式？': '我们支持微信支付、支付宝、银行转账及企业对公付款，月付、年付均可，年付享 8.5 折优惠。',
  '如何申请企业账户？': '填写企业信息后，销售顾问将在 1 个工作日内与您联系，完成审核后即可开通企业账户并享受专属权益。',
  '退款政策是什么？': '预付额度 30 天内可全额退款，订阅套餐按剩余天数折算退款。具体请联系 support@kairos.ai。',
}

function ChatbotDemo() {
  interface ChatMsg { role: 'user' | 'bot'; text: string }
  const [msgs, setMsgs] = useState<ChatMsg[]>([
    { role: 'bot', text: '你好！我是「KAIROS 品牌智能客服」，请问有什么可以帮您？' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const send = (text: string) => {
    if (loading) return
    const q = text || input.trim()
    if (!q) return
    setInput('')
    setMsgs(prev => [...prev, { role: 'user', text: q }])
    setLoading(true)
    setTimeout(() => {
      const answer = CHAT_ANSWERS[q] ?? `感谢提问。针对「${q}」，我们的专属顾问将为您进一步解答，或可发送邮件至 support@kairos.ai。`
      setMsgs(prev => [...prev, { role: 'bot', text: answer }])
      setLoading(false)
    }, 800)
  }

  return (
    <div className="flex flex-col h-64 bg-stone-950 rounded-xl border border-stone-800 overflow-hidden text-xs">
      <div className="bg-stone-900 border-b border-stone-800 px-3 py-2 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-amber-400" />
        <span className="text-stone-400 font-medium">KAIROS 客服</span>
        <span className="ml-auto text-stone-700">在线</span>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-2 no-bar">
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-2.5 py-1.5 rounded-lg leading-relaxed ${
              m.role === 'user' ? 'bg-amber-500 text-black' : 'bg-stone-800 text-stone-200'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-1.5 text-stone-600">
            <Loader2 size={10} className="animate-spin" />
            <span>回复中…</span>
          </div>
        )}
      </div>
      {/* Quick FAQ */}
      <div className="border-t border-stone-800 px-3 pt-1.5 pb-1 flex gap-1 overflow-x-auto no-bar">
        {CHAT_FAQS.map(q => (
          <button
            key={q}
            onClick={() => send(q)}
            className="shrink-0 text-[10px] px-2 py-1 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-stone-200 transition-colors"
          >
            {q}
          </button>
        ))}
      </div>
      <div className="border-t border-stone-800 px-2 py-2 flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send('')}
          placeholder="输入问题…"
          className="flex-1 bg-stone-900 border border-stone-700 rounded-lg px-2.5 py-1.5 text-stone-200 placeholder-stone-700 text-[11px] outline-none focus:border-stone-500"
        />
        <button
          onClick={() => send('')}
          disabled={!input.trim()}
          className="px-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-black rounded-lg transition-colors"
        >
          <Send size={11} />
        </button>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Demo 2: Knowledge Q&A
// ─────────────────────────────────────────────
const KB_DOCS = [
  { title: '2025年度报告.pdf', pages: 42 },
  { title: '产品手册 v3.2.pdf', pages: 18 },
  { title: '合规指引-金融版.docx', pages: 9 },
]

const KB_QA: Record<string, string> = {
  '报告中提到了哪些核心指标？': '根据《2025年度报告》第 3 页：核心指标包括年营收增长 47%、MAU 突破 120 万、净推荐值 NPS 达到 68，位于行业前 10%。',
  '产品的 SLA 承诺是多少？': '根据《产品手册》第 7 页：标准套餐 SLA 为 99.9%，企业专属版 SLA 为 99.99%，含 15 分钟故障响应保障。',
  '金融版需要哪些合规资质？': '根据《合规指引-金融版》第 2 页：需提供营业执照副本、金融业务许可证及数据安全责任人授权书。',
}

function KnowledgeDemo() {
  const [selected, setSelected] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [answer, setAnswer] = useState('')

  const ask = (q: string) => {
    setSelected(q)
    setLoading(true)
    setAnswer('')
    setTimeout(() => {
      setAnswer(KB_QA[q])
      setLoading(false)
    }, 900)
  }

  return (
    <div className="h-64 bg-stone-950 rounded-xl border border-stone-800 overflow-hidden text-xs flex flex-col">
      <div className="bg-stone-900 border-b border-stone-800 px-3 py-2 flex items-center gap-2">
        <BookOpen size={11} className="text-sky-400" />
        <span className="text-stone-400 font-medium">知识库 · 3 份文档</span>
      </div>
      <div className="flex flex-1 overflow-hidden">
        {/* Doc list */}
        <div className="w-28 border-r border-stone-800 overflow-y-auto p-2 space-y-1 no-bar">
          {KB_DOCS.map(d => (
            <div key={d.title} className="p-1.5 rounded-md bg-stone-900 border border-stone-800">
              <p className="text-[10px] text-stone-400 leading-tight">{d.title}</p>
              <p className="text-[9px] text-stone-700 mt-0.5">{d.pages}页</p>
            </div>
          ))}
        </div>
        {/* Q&A pane */}
        <div className="flex-1 flex flex-col p-3 overflow-hidden">
          <p className="text-stone-600 mb-2">点击提问</p>
          <div className="space-y-1.5 mb-3">
            {Object.keys(KB_QA).map(q => (
              <button
                key={q}
                onClick={() => ask(q)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg border transition-colors flex items-center justify-between gap-1 ${
                  selected === q
                    ? 'border-sky-500/40 bg-sky-500/10 text-sky-300'
                    : 'border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-300'
                }`}
              >
                <span className="line-clamp-1 flex-1">{q}</span>
                <ChevronRight size={10} className="shrink-0" />
              </button>
            ))}
          </div>
          {loading && (
            <div className="flex items-center gap-1.5 text-stone-600">
              <Loader2 size={10} className="animate-spin" />
              <span>检索中…</span>
            </div>
          )}
          {answer && !loading && (
            <div className="p-2.5 bg-stone-900 border border-stone-800 rounded-lg text-stone-300 leading-relaxed overflow-y-auto no-bar">
              {answer}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Demo 3: AI Data Analyst
// ─────────────────────────────────────────────
const DATA_QUERIES = [
  '上个月哪个渠道的转化率最高？',
  '预测下季度 GMV 走势',
  '用户留存率的主要流失节点在哪？',
]

const DATA_ANSWERS: Record<string, { summary: string; bars: { label: string; pct: number; color: string }[] }> = {
  '上个月哪个渠道的转化率最高？': {
    summary: '自然搜索渠道转化率最高，达 12.4%，比社媒广告高出 3.1 个百分点。建议加大 SEO 内容投入。',
    bars: [
      { label: '自然搜索', pct: 82, color: 'bg-amber-500' },
      { label: '社媒广告', pct: 61, color: 'bg-sky-500' },
      { label: '邮件营销', pct: 53, color: 'bg-violet-500' },
      { label: '合作推广', pct: 40, color: 'bg-emerald-500' },
    ],
  },
  '预测下季度 GMV 走势': {
    summary: '基于过去 8 个季度数据，下季度 GMV 预测增长 23–31%，Q3 旺季效应将在 7 月中旬显现。',
    bars: [
      { label: 'Q1 实际', pct: 45, color: 'bg-stone-600' },
      { label: 'Q2 实际', pct: 62, color: 'bg-stone-500' },
      { label: 'Q3 预测(低)', pct: 74, color: 'bg-amber-600' },
      { label: 'Q3 预测(高)', pct: 90, color: 'bg-amber-400' },
    ],
  },
  '用户留存率的主要流失节点在哪？': {
    summary: '注册后第 3 天（-18%）和第 14 天（-22%）是两大流失峰值，建议在这两个节点增加触达和激励机制。',
    bars: [
      { label: 'D1 留存', pct: 100, color: 'bg-emerald-500' },
      { label: 'D3 留存', pct: 72, color: 'bg-amber-500' },
      { label: 'D14 留存', pct: 48, color: 'bg-orange-500' },
      { label: 'D30 留存', pct: 31, color: 'bg-red-500' },
    ],
  },
}

function DataAnalystDemo() {
  const [selected, setSelected] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<typeof DATA_ANSWERS[string] | null>(null)

  const query = (q: string) => {
    setSelected(q)
    setLoading(true)
    setResult(null)
    setTimeout(() => {
      setResult(DATA_ANSWERS[q])
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="h-64 bg-stone-950 rounded-xl border border-stone-800 overflow-hidden text-xs flex flex-col">
      <div className="bg-stone-900 border-b border-stone-800 px-3 py-2 flex items-center gap-2">
        <BarChart2 size={11} className="text-violet-400" />
        <span className="text-stone-400 font-medium">AI 数据分析师</span>
      </div>
      <div className="flex flex-1 overflow-hidden gap-0">
        {/* Query list */}
        <div className="w-36 border-r border-stone-800 flex flex-col p-2 gap-1.5 overflow-y-auto no-bar">
          {DATA_QUERIES.map(q => (
            <button
              key={q}
              onClick={() => query(q)}
              className={`text-left px-2.5 py-2 rounded-lg border transition-colors leading-tight ${
                selected === q
                  ? 'border-violet-500/40 bg-violet-500/10 text-violet-300'
                  : 'border-stone-800 text-stone-400 hover:border-stone-700 hover:text-stone-300'
              }`}
            >
              {q}
            </button>
          ))}
        </div>
        {/* Result */}
        <div className="flex-1 p-3 overflow-y-auto no-bar">
          {!selected && !loading && (
            <p className="text-stone-700 mt-6 text-center">← 点击左侧问题</p>
          )}
          {loading && (
            <div className="flex items-center gap-1.5 text-stone-600 mt-6 justify-center">
              <Loader2 size={12} className="animate-spin" />
              <span>分析中…</span>
            </div>
          )}
          {result && !loading && (
            <div className="space-y-3">
              <p className="text-stone-300 leading-relaxed">{result.summary}</p>
              <div className="space-y-1.5">
                {result.bars.map(b => (
                  <div key={b.label} className="flex items-center gap-2">
                    <span className="text-[10px] text-stone-600 w-16 shrink-0 text-right">{b.label}</span>
                    <div className="flex-1 h-3 bg-stone-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${b.color} rounded-full transition-all duration-700`}
                        style={{ width: `${b.pct}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-stone-500 w-6">{b.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Demo 4: Document Intelligence
// ─────────────────────────────────────────────
const DOC_SAMPLES = [
  { name: '招聘合同-张三.pdf', type: '合同' },
  { name: '采购发票-2026Q1.pdf', type: '发票' },
  { name: '产品说明书-EN.pdf', type: '技术文档' },
]

const DOC_RESULTS: Record<string, { fields: { k: string; v: string }[]; tags: string[] }> = {
  '招聘合同-张三.pdf': {
    fields: [
      { k: '合同类型', v: '劳动合同（固定期限）' },
      { k: '甲方', v: '凯若斯智能科技（深圳）有限公司' },
      { k: '乙方', v: '张三' },
      { k: '合同期限', v: '2026.01.01 — 2028.12.31' },
      { k: '试用期', v: '3 个月' },
    ],
    tags: ['已签署', '归档', 'HR'],
  },
  '采购发票-2026Q1.pdf': {
    fields: [
      { k: '发票类型', v: '增值税专用发票' },
      { k: '开票方', v: '某科技有限公司' },
      { k: '金额（含税）', v: '¥ 128,400.00' },
      { k: '税率', v: '13%' },
      { k: '开票日期', v: '2026-03-28' },
    ],
    tags: ['待报销', '财务', 'Q1'],
  },
  '产品说明书-EN.pdf': {
    fields: [
      { k: '文档语言', v: 'English (US)' },
      { k: '产品名称', v: 'KAIROS API Gateway v2.4' },
      { k: '页数', v: '64 pages' },
      { k: '最后修订', v: '2026-05-01' },
      { k: '版权声明', v: 'KAIROS Inc. All rights reserved.' },
    ],
    tags: ['技术', '外部文档', 'v2.4'],
  },
}

function DocumentDemo() {
  const [selected, setSelected] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<typeof DOC_RESULTS[string] | null>(null)

  const analyze = (name: string) => {
    setSelected(name)
    setLoading(true)
    setResult(null)
    setTimeout(() => {
      setResult(DOC_RESULTS[name])
      setLoading(false)
    }, 1100)
  }

  return (
    <div className="h-64 bg-stone-950 rounded-xl border border-stone-800 overflow-hidden text-xs flex flex-col">
      <div className="bg-stone-900 border-b border-stone-800 px-3 py-2 flex items-center gap-2">
        <FileSearch size={11} className="text-emerald-400" />
        <span className="text-stone-400 font-medium">智能文档理解</span>
      </div>
      <div className="flex flex-1 overflow-hidden">
        {/* Doc list */}
        <div className="w-32 border-r border-stone-800 p-2 space-y-1.5 overflow-y-auto no-bar">
          {DOC_SAMPLES.map(d => (
            <button
              key={d.name}
              onClick={() => analyze(d.name)}
              className={`w-full text-left p-2 rounded-lg border transition-colors ${
                selected === d.name
                  ? 'border-emerald-500/40 bg-emerald-500/10'
                  : 'border-stone-800 hover:border-stone-700'
              }`}
            >
              <p className={`leading-tight text-[10px] ${selected === d.name ? 'text-emerald-300' : 'text-stone-400'}`}>{d.name}</p>
              <p className="text-[9px] text-stone-700 mt-0.5">{d.type}</p>
            </button>
          ))}
          <p className="text-[10px] text-stone-700 text-center pt-1">点击解析</p>
        </div>
        {/* Result pane */}
        <div className="flex-1 p-3 overflow-y-auto no-bar">
          {!selected && (
            <p className="text-stone-700 mt-8 text-center">← 选择文档</p>
          )}
          {loading && (
            <div className="flex items-center gap-1.5 text-stone-600 mt-8 justify-center">
              <Loader2 size={12} className="animate-spin" />
              <span>解析中…</span>
            </div>
          )}
          {result && !loading && (
            <div className="space-y-2">
              {result.fields.map(f => (
                <div key={f.k} className="flex gap-2">
                  <span className="text-stone-600 shrink-0 w-20">{f.k}</span>
                  <span className="text-stone-300">{f.v}</span>
                </div>
              ))}
              <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-stone-800">
                {result.tags.map(t => (
                  <span key={t} className="px-1.5 py-0.5 bg-stone-800 rounded text-stone-400 text-[10px]">{t}</span>
                ))}
                <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-emerald-900/30 rounded text-emerald-500 text-[10px]">
                  <CheckCircle2 size={8} />
                  AI 已验证
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Demo Cards Config
// ─────────────────────────────────────────────
const DEMOS = [
  {
    icon: <MessageSquare size={18} className="text-amber-400" />,
    color: 'amber',
    title: '品牌智能客服',
    subtitle: 'Webchat Embed',
    desc: '一行代码嵌入官网，支持自定义品牌风格、FAQ 自动回答与人工转接。',
    tags: ['可嵌入', '多场景', '品牌定制'],
    component: <ChatbotDemo />,
    link: '查看接入方案',
  },
  {
    icon: <BookOpen size={18} className="text-sky-400" />,
    color: 'sky',
    title: '企业知识问答',
    subtitle: 'Knowledge Q&A',
    desc: '上传 PDF、Word、网页等私有文档，AI 精准检索并引用来源，杜绝幻觉。',
    tags: ['RAG 检索', '引用溯源', '私有部署'],
    component: <KnowledgeDemo />,
    link: '了解 RAG 方案',
  },
  {
    icon: <BarChart2 size={18} className="text-violet-400" />,
    color: 'violet',
    title: 'AI 数据分析师',
    subtitle: 'Data Intelligence',
    desc: '用自然语言查询数据库，自动生成图表与决策建议，无需 SQL 技能。',
    tags: ['自然语言 → SQL', '可视化', '决策辅助'],
    component: <DataAnalystDemo />,
    link: '预约演示',
  },
  {
    icon: <FileSearch size={18} className="text-emerald-400" />,
    color: 'emerald',
    title: '智能文档处理',
    subtitle: 'Document Intelligence',
    desc: '自动提取合同、发票、说明书中的结构化信息，替代人工录入。',
    tags: ['OCR 增强', '字段抽取', '批量处理'],
    component: <DocumentDemo />,
    link: '了解自动化方案',
  },
]

const colorMap: Record<string, string> = {
  amber: 'border-amber-500/20 bg-amber-500/5 text-amber-300',
  sky: 'border-sky-500/20 bg-sky-500/5 text-sky-300',
  violet: 'border-violet-500/20 bg-violet-500/5 text-violet-300',
  emerald: 'border-emerald-500/20 bg-emerald-500/5 text-emerald-300',
}

const tagMap: Record<string, string> = {
  amber: 'bg-amber-500/10 text-amber-400',
  sky: 'bg-sky-500/10 text-sky-400',
  violet: 'bg-violet-500/10 text-violet-400',
  emerald: 'bg-emerald-500/10 text-emerald-400',
}

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────
export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-[#07070a] pt-24 pb-20 px-4">
      {/* Hero */}
      <div className="max-w-5xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-800/60 border border-stone-700/50 text-stone-400 text-xs mb-8">
          <Sparkles size={11} className="text-amber-400" />
          可嵌入企业系统 · 即开即用
        </div>

        <h1 className="font-display text-4xl sm:text-6xl font-extrabold uppercase tracking-wide mb-4 text-white">
          Showcase
        </h1>
        <p className="text-lg text-amber-400 font-medium mb-4">体验中心</p>
        <p className="text-stone-400 max-w-xl mx-auto text-sm leading-relaxed">
          亲手体验 KAIROS 可嵌入企业系统的定制 AI 服务。
          每个模块均可独立部署，也可组合为完整解决方案。
        </p>

        <div className="flex items-center justify-center gap-6 mt-8 text-xs text-stone-500">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={12} className="text-emerald-500" />
            无需登录，直接体验
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={12} className="text-emerald-500" />
            演示数据，安全隔离
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={12} className="text-emerald-500" />
            1 周内完成接入
          </div>
        </div>
      </div>

      {/* Demo grid */}
      <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-6 mb-16">
        {DEMOS.map((demo) => (
          <div
            key={demo.title}
            className="glass rounded-2xl p-6 border border-stone-800 hover:border-stone-700 transition-colors"
          >
            {/* Card header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center ${colorMap[demo.color]}`}>
                  {demo.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-stone-100 text-sm">{demo.title}</h3>
                  <p className="text-[11px] text-stone-600 mt-0.5">{demo.subtitle}</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed mb-3">{demo.desc}</p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {demo.tags.map(t => (
                <span key={t} className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${tagMap[demo.color]}`}>
                  {t}
                </span>
              ))}
            </div>

            {/* Interactive demo */}
            {demo.component}

            {/* Footer CTA */}
            <div className="mt-4 flex items-center justify-between">
              <Link
                to="/api"
                className="text-xs text-stone-500 hover:text-stone-300 flex items-center gap-1 transition-colors"
              >
                {demo.link}
                <ArrowRight size={11} />
              </Link>
              <span className="text-[10px] text-stone-700">演示版 · 数据模拟</span>
            </div>
          </div>
        ))}
      </div>

      {/* Enterprise CTA */}
      <div className="max-w-2xl mx-auto text-center">
        <div className="glass border border-stone-800 rounded-2xl p-10">
          <Building2 size={28} className="mx-auto text-amber-400 mb-4" />
          <h2 className="font-display text-2xl font-extrabold uppercase tracking-wide mb-3">
            准备好接入了吗？
          </h2>
          <p className="text-stone-400 text-sm mb-6">
            以上所有模块均可嵌入您的现有系统，支持私有化部署，通常 1 周内完成交付。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/api"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-lg transition-colors text-sm"
            >
              <Sparkles size={14} />
              获取 API Key 立即开始
            </Link>
            <Link
              to="/#pricing"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-100 border border-stone-700 rounded-lg transition-colors text-sm"
            >
              查看定价方案
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
