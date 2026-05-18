import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Bot, Check, FileSearch, Globe2, KeyRound,
  MessageSquare, ShieldCheck, Sparkles, Zap,
} from 'lucide-react'

const USE_CASES = [
  { title: '个人效率助手', desc: '写作、总结、翻译、代码解释，日常任务直接对话完成。' },
  { title: '企业知识问答', desc: '接入文档库与业务资料，让客服、销售、运营都能得到可信答案。' },
  { title: '多模型聊天入口', desc: '一个聊天界面切换多家模型，按质量、速度和成本灵活选择。' },
]

const CAPABILITIES = [
  { icon: <MessageSquare size={16} />, label: '上下文连续对话' },
  { icon: <FileSearch size={16} />, label: '知识库检索增强' },
  { icon: <Globe2 size={16} />, label: '多语言内容生成' },
  { icon: <ShieldCheck size={16} />, label: '团队权限与审计' },
]

function setMeta() {
  document.title = 'AI 聊天助手 | KAIROS 凯若斯'
  const description = 'KAIROS AI 聊天助手面向个人与团队，提供多模型对话、知识库问答、内容创作和 API Key 托管能力。'
  let meta = document.querySelector('meta[name="description"]')
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('name', 'description')
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', description)
}

function ChatScene() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-80">
      <div className="dot-bg absolute inset-0" />
      <div className="absolute inset-x-0 top-24 mx-auto max-w-5xl px-4">
        <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-4 items-start">
          <div className="hidden md:block glass p-4 translate-y-16">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-stone-500 font-mono uppercase tracking-widest">knowledge ready</span>
            </div>
            {['产品手册.pdf', '合同模板.docx', '客服话术.xlsx'].map((item, index) => (
              <div key={item} className="flex items-center gap-3 py-2 border-t border-stone-800/60 first:border-t-0">
                <span className="w-6 h-6 rounded bg-amber-500/10 border border-amber-500/15 text-[10px] text-amber-400 flex items-center justify-center">
                  {index + 1}
                </span>
                <span className="text-xs text-stone-500">{item}</span>
              </div>
            ))}
          </div>
          <div className="glass p-4 shadow-2xl shadow-black/40">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-800/60">
              <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center">
                <Bot size={14} className="text-black" />
              </div>
              <span className="text-xs text-stone-300 font-medium">KAIROS Chat</span>
              <span className="ml-auto text-[10px] text-stone-600 uppercase tracking-widest">live</span>
            </div>
            <div className="py-4 space-y-3">
              <div className="max-w-[78%] rounded-2xl rounded-tl-sm bg-stone-900 border border-stone-800 px-4 py-3 text-sm text-stone-300">
                可以根据这三份资料，生成一段面向客户的产品说明吗？
              </div>
              <div className="ml-auto max-w-[78%] rounded-2xl rounded-tr-sm bg-amber-500 px-4 py-3 text-sm text-black font-medium">
                当然。我会先抽取卖点，再按客户关心的问题组织成简洁话术。
              </div>
              <div className="max-w-[88%] rounded-2xl rounded-tl-sm bg-stone-900 border border-amber-500/15 px-4 py-3 text-sm text-stone-300 leading-relaxed">
                <span className="text-amber-400">摘要已生成：</span> 该产品适合需要快速搭建智能客服、知识问答和内容协作的团队...
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-[#09090c] border border-stone-800 px-3 py-2">
              <span className="text-xs text-stone-600 flex-1">输入问题...</span>
              <span className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center">
                <ArrowRight size={13} className="text-black" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ChatLanding() {
  useEffect(setMeta, [])

  return (
    <main className="pt-16 bg-[#07070a]">
      <section className="relative min-h-[92vh] overflow-hidden flex items-end px-4 pb-16">
        <ChatScene />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07070a]/10 via-[#07070a]/55 to-[#07070a]" />
        <div className="relative max-w-6xl mx-auto w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs mb-6 uppercase tracking-widest">
              <Sparkles size={12} /> AI Chat Landing
            </div>
            <h1 className="font-display text-[clamp(3rem,10vw,7rem)] leading-none tracking-[0.08em] uppercase text-white">
              AI 聊天助手
            </h1>
            <p className="mt-5 text-stone-300 text-lg sm:text-xl max-w-2xl leading-relaxed">
              面向个人、团队和企业官网的智能对话入口。把内容创作、知识问答、客服回复和多模型调用收进一个清爽的聊天界面。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link to="/app" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-lg transition-all hover:shadow-xl hover:shadow-amber-500/20 text-sm">
                体验聊天应用 <ArrowRight size={15} />
              </Link>
              <Link to="/api" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-stone-900 hover:bg-stone-800 text-stone-100 font-medium rounded-lg transition-colors border border-stone-700 text-sm">
                获取 API Key <KeyRound size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 border-y border-stone-800/60">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-3">
          {CAPABILITIES.map(item => (
            <div key={item.label} className="glass p-5 flex items-center gap-3">
              <span className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/15 text-amber-400 flex items-center justify-center">
                {item.icon}
              </span>
              <span className="text-sm text-stone-300">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-12 items-start">
          <div>
            <span className="text-xs text-amber-400 uppercase tracking-widest">Search Intent</span>
            <h2 className="font-display text-4xl sm:text-5xl uppercase tracking-wide mt-3 mb-4">用户为什么会搜到这里</h2>
            <p className="text-stone-400 leading-relaxed text-sm max-w-md">
              这不是单纯的聊天玩具，而是给“想要马上开始对话、马上接入业务”的用户准备的入口。页面内容聚焦真实场景、结果和转化路径。
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {USE_CASES.map(item => (
              <div key={item.title} className="glass p-5">
                <Check size={16} className="text-amber-400 mb-5" />
                <h3 className="text-sm font-semibold text-stone-100 mb-2">{item.title}</h3>
                <p className="text-xs text-stone-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 border-t border-stone-800/60 bg-stone-950/40">
        <div className="max-w-4xl mx-auto text-center">
          <Zap size={20} className="text-amber-400 mx-auto mb-4" />
          <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-wide mb-4">从一次对话开始引流</h2>
          <p className="text-stone-400 text-sm mb-8">给搜索 AI 聊天、智能客服、知识库问答的用户一个可理解、可体验、可转化的落点。</p>
          <Link to="/app" className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-lg transition-colors text-sm">
            打开 KAIROS APP <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </main>
  )
}
