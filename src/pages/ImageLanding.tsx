import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Check, Download, Eraser, ImageIcon, Layers,
  Scissors, Sparkles, Upload, Wand2, Zap,
} from 'lucide-react'

const TOOLS = [
  { icon: <Wand2 size={16} />, title: '文生图', desc: '从一句提示词生成适合内容、活动和创意探索的图片。' },
  { icon: <Layers size={16} />, title: '超分辨率', desc: '提升低清素材的尺寸与细节，适合电商图和宣传图。' },
  { icon: <Eraser size={16} />, title: '去水印', desc: '清理素材中的干扰区域，保留主体和整体质感。' },
  { icon: <Scissors size={16} />, title: '背景消除', desc: '快速抠图，输出透明背景或统一视觉背景。' },
]

const STEPS = [
  '上传图片或输入提示词',
  '选择工具和参数',
  '节点式串联多个处理步骤',
  '下载结果并继续迭代',
]

function setMeta() {
  document.title = 'AI 图片生成与处理工具 | KAIROS 凯若斯'
  const description = 'KAIROS AI 图片工具支持文生图、超分辨率、去水印、背景消除和节点式图片工作流，适合创作者、电商和营销团队。'
  let meta = document.querySelector('meta[name="description"]')
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('name', 'description')
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', description)
}

function ImageScene() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-85">
      <div className="dot-bg absolute inset-0" />
      <div className="absolute inset-x-0 top-20 mx-auto max-w-6xl px-4">
        <div className="grid md:grid-cols-[0.72fr_1.28fr] gap-4 items-start">
          <div className="glass p-3 hidden md:block translate-y-20">
            <div className="flex items-center gap-2 px-2 py-2 border-b border-stone-800/60 mb-2">
              <ImageIcon size={13} className="text-amber-400" />
              <span className="text-[10px] text-stone-500 uppercase tracking-widest">toolbox</span>
            </div>
            {TOOLS.map(tool => (
              <div key={tool.title} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                <span className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/15 text-amber-400 flex items-center justify-center">
                  {tool.icon}
                </span>
                <span className="text-xs text-stone-400">{tool.title}</span>
              </div>
            ))}
          </div>
          <div className="glass p-4 shadow-2xl shadow-black/40">
            <div className="flex items-center gap-2 pb-3 border-b border-stone-800/60">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              <span className="ml-2 text-[10px] text-stone-600 uppercase tracking-widest">image workflow</span>
            </div>
            <div className="grid sm:grid-cols-[0.9fr_1.1fr] gap-4 pt-4">
              <div className="space-y-3">
                {[
                  { icon: <Upload size={14} />, label: '输入源' },
                  { icon: <Wand2 size={14} />, label: '生成主视觉' },
                  { icon: <Scissors size={14} />, label: '背景消除' },
                  { icon: <Download size={14} />, label: '导出结果' },
                ].map((node, index) => (
                  <div key={node.label} className="relative flex items-center gap-3 rounded-xl bg-stone-950/70 border border-stone-800 px-3 py-3">
                    {index < 3 && <span className="absolute left-7 top-full h-3 w-px bg-amber-500/30" />}
                    <span className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/15 text-amber-400 flex items-center justify-center">
                      {node.icon}
                    </span>
                    <span className="text-xs text-stone-300">{node.label}</span>
                    <span className="ml-auto text-[10px] text-stone-700">0{index + 1}</span>
                  </div>
                ))}
              </div>
              <div className="relative min-h-72 rounded-xl overflow-hidden border border-amber-500/15 bg-[#09090c]">
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(251,191,36,0.2), rgba(20,184,166,0.16) 42%, rgba(124,58,237,0.18))' }} />
                <div className="absolute inset-0 dot-bg opacity-60" />
                <div className="absolute left-5 right-5 bottom-5 rounded-xl bg-black/45 border border-white/10 backdrop-blur px-4 py-3">
                  <p className="text-xs text-stone-200">夏季新品海报 · 16:9 · 高清导出</p>
                  <p className="text-[10px] text-stone-500 mt-1">prompt: clean product hero, warm light, premium texture</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ImageLanding() {
  useEffect(setMeta, [])

  return (
    <main className="pt-16 bg-[#07070a]">
      <section className="relative min-h-[92vh] overflow-hidden flex items-end px-4 pb-16">
        <ImageScene />
        <div className="absolute inset-0 bg-gradient-to-b from-[#07070a]/10 via-[#07070a]/50 to-[#07070a]" />
        <div className="relative max-w-6xl mx-auto w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs mb-6 uppercase tracking-widest">
              <Sparkles size={12} /> AI Image Landing
            </div>
            <h1 className="font-display text-[clamp(3rem,10vw,7rem)] leading-none tracking-[0.08em] uppercase text-white">
              AI 图片工具
            </h1>
            <p className="mt-5 text-stone-300 text-lg sm:text-xl max-w-2xl leading-relaxed">
              面向创作者、电商和营销团队的图片生成与处理入口。文生图、超分辨率、去水印、背景消除，用节点工作流串成完整视觉生产线。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link to="/app" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-lg transition-all hover:shadow-xl hover:shadow-amber-500/20 text-sm">
                打开图片工作台 <ArrowRight size={15} />
              </Link>
              <Link to="/api" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-stone-900 hover:bg-stone-800 text-stone-100 font-medium rounded-lg transition-colors border border-stone-700 text-sm">
                了解 API 接入 <Zap size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 border-y border-stone-800/60">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TOOLS.map(tool => (
            <div key={tool.title} className="glass p-5">
              <span className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/15 text-amber-400 flex items-center justify-center mb-5">
                {tool.icon}
              </span>
              <h2 className="text-sm font-semibold text-stone-100 mb-2">{tool.title}</h2>
              <p className="text-xs text-stone-500 leading-relaxed">{tool.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs text-amber-400 uppercase tracking-widest">Workflow</span>
            <h2 className="font-display text-4xl sm:text-5xl uppercase tracking-wide mt-3 mb-4">从搜索流量到成图转化</h2>
            <p className="text-stone-400 leading-relaxed text-sm max-w-md">
              搜索图片生成、去水印、抠图、图片变高清的用户，通常希望马上看到结果。这个 landing page 用可视化工作流解释能力，并把用户引导到可操作的图片工作台。
            </p>
          </div>
          <div className="space-y-3">
            {STEPS.map((step, index) => (
              <div key={step} className="glass p-4 flex items-center gap-4">
                <span className="font-display text-2xl text-amber-400 w-10">0{index + 1}</span>
                <span className="text-sm text-stone-300">{step}</span>
                <Check size={14} className="ml-auto text-stone-600" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 border-t border-stone-800/60 bg-stone-950/40">
        <div className="max-w-4xl mx-auto text-center">
          <ImageIcon size={20} className="text-amber-400 mx-auto mb-4" />
          <h2 className="font-display text-3xl sm:text-4xl uppercase tracking-wide mb-4">让图片需求直接进入工具台</h2>
          <p className="text-stone-400 text-sm mb-8">把搜索“AI 生图、图片变清晰、去水印、抠图”的用户，引导到 KAIROS 图片工作流。</p>
          <Link to="/app" className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-lg transition-colors text-sm">
            体验图片工作流 <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </main>
  )
}
