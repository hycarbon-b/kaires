import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Zap, Shield, Globe, Code2,
  MessageSquare, Bot, BookOpen, Monitor, Smartphone,
  Check, Star, ChevronRight, ChevronLeft, Lock, TrendingUp, Layers, Wrench, Rocket, Sparkles,
  Users, Building2, ImageIcon, Share2, Library, Wand2,
} from 'lucide-react'

// ─────────────────────────────────────────────
// Product Mockup Components
// ─────────────────────────────────────────────

function AgentMockup() {
  const steps = [
    { label: '邮件触发', done: true },
    { label: 'AI 规划', done: true },
    { label: '工具调用', done: false, active: true },
    { label: '完成', done: false },
  ]
  return (
    <div className="mockup-frame p-4">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-[10px] text-stone-500 font-mono uppercase tracking-wider">WORKFLOW · RUNNING</span>
      </div>
      <div className="flex items-start">
        {steps.map((s, i) => (
          <div key={s.label} className="flex items-start flex-1 min-w-0">
            <div className="flex flex-col items-center gap-1.5 flex-1">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                s.done
                  ? 'bg-amber-500/20 border border-amber-500/50 text-amber-400'
                  : (s as any).active
                    ? 'bg-stone-800 border border-stone-600 text-stone-400 animate-pulse'
                    : 'bg-stone-900 border border-stone-800 text-stone-700'
              }`}>
                {s.done ? '✓' : i + 1}
              </div>
              <span className="text-[9px] text-stone-500 text-center leading-tight">{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 h-px mt-3.5 mx-1" style={{
                background: s.done
                  ? 'linear-gradient(90deg,rgba(251,191,36,0.5),rgba(251,191,36,0.15))'
                  : 'rgba(28,25,23,0.8)'
              }} />
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 p-2.5 rounded-lg bg-stone-900/60 border border-stone-800">
        <p className="text-[10px] text-stone-500 font-mono">&gt; 调用 search_web("Q4 销售数据")...</p>
      </div>
    </div>
  )
}

function KnowledgeMockup() {
  return (
    <div className="mockup-frame p-4 space-y-3">
      <div className="flex gap-2.5">
        <span className="shrink-0 w-5 h-5 rounded bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-[10px] text-amber-400 font-bold">Q</span>
        <p className="text-xs text-stone-300 leading-relaxed">"如何申请产品退款？"</p>
      </div>
      <div className="border-t border-stone-800" />
      <div className="flex gap-2.5">
        <span className="shrink-0 w-5 h-5 rounded bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-[10px] text-sky-400 font-bold">A</span>
        <div className="space-y-2 min-w-0">
          <p className="text-xs text-stone-300 leading-relaxed">
            根据退款政策第 2 条，您可在购买后 <span className="text-amber-400 font-medium">30 日内</span>申请全额退款...
          </p>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-stone-800/80 border border-stone-700/60 w-fit">
            <span className="text-[10px]">📎</span>
            <span className="text-[10px] text-stone-500">退款政策.pdf · 第 2 条 · 置信度 97%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function WebchatMockup() {
  return (
    <div className="mockup-frame overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2 bg-stone-900/80 border-b border-stone-800">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-stone-700" />
          <div className="w-2.5 h-2.5 rounded-full bg-stone-700" />
          <div className="w-2.5 h-2.5 rounded-full bg-stone-700" />
        </div>
        <div className="flex-1 mx-2 px-2 py-0.5 rounded-sm bg-stone-800/80 text-[10px] text-stone-500 font-mono">
          yourcompany.com
        </div>
      </div>
      <div className="relative p-4 bg-stone-950/40" style={{ minHeight: 100 }}>
        <div className="space-y-1.5 opacity-30">
          <div className="h-1.5 bg-stone-700 rounded w-3/4" />
          <div className="h-1.5 bg-stone-700 rounded w-1/2" />
          <div className="h-1.5 bg-stone-700 rounded w-2/3" />
          <div className="h-1.5 bg-stone-700 rounded w-5/6" />
        </div>
        <div className="absolute bottom-3 right-3 w-36 shadow-2xl">
          <div className="bg-stone-900 border border-stone-700/80 rounded-xl overflow-hidden">
            <div className="px-3 py-2 bg-amber-500/15 border-b border-amber-500/20 flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center shrink-0">
                <span className="text-[9px] font-bold text-black">AI</span>
              </div>
              <span className="text-[11px] text-amber-300 font-medium">智能客服</span>
              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400" />
            </div>
            <div className="p-2.5 space-y-1.5">
              <div className="text-[10px] text-stone-300 bg-stone-800/60 rounded-lg rounded-tl-none px-2 py-1.5 leading-relaxed">
                您好！有什么可以帮您？
              </div>
              <div className="flex items-center gap-1 bg-stone-800 rounded-full px-2 py-1 border border-stone-700/60">
                <span className="text-[10px] text-stone-600 flex-1">输入问题…</span>
                <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center shrink-0">
                  <span className="text-[8px] text-black">↑</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MiniProgramMockup() {
  return (
    <div className="flex justify-center">
      <div className="w-28 bg-black border-2 border-stone-700 rounded-[18px] overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-2.5 py-1.5 bg-stone-950">
          <span className="text-[9px] text-stone-400 font-medium">9:41</span>
          <div className="w-5 h-2 rounded-sm border border-stone-600 relative overflow-hidden">
            <div className="absolute inset-0 w-4/5 bg-green-400/60" />
          </div>
        </div>
        <div className="bg-stone-900 border-b border-stone-800 px-2.5 py-2 text-center">
          <p className="text-[11px] text-stone-200 font-medium">智能助手</p>
        </div>
        <div className="bg-stone-950 p-2 space-y-2" style={{ minHeight: 90 }}>
          <div className="flex justify-start">
            <div className="flex items-end gap-1">
              <div className="w-4 h-4 rounded-full bg-amber-500/80 flex items-center justify-center shrink-0">
                <span className="text-[7px] font-bold text-black">AI</span>
              </div>
              <div className="text-[10px] bg-stone-800 text-stone-300 rounded-lg rounded-tl-none px-2 py-1 max-w-[65%] leading-relaxed">
                您好，请问有什么可以帮到您？
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="text-[10px] bg-amber-500/20 text-amber-200 border border-amber-500/20 rounded-lg rounded-tr-none px-2 py-1 max-w-[65%]">
              退款流程？
            </div>
          </div>
          <div className="flex justify-start">
            <div className="flex items-end gap-1">
              <div className="w-4 h-4 rounded-full bg-amber-500/80 flex items-center justify-center shrink-0">
                <span className="text-[7px] font-bold text-black">AI</span>
              </div>
              <div className="text-[10px] bg-stone-800 text-stone-300 rounded-lg rounded-tl-none px-2 py-1 max-w-[65%] leading-relaxed">
                30 日内可申请全额退款…
              </div>
            </div>
          </div>
        </div>
        <div className="bg-stone-900 border-t border-stone-800 px-2 py-1.5 flex items-center gap-1">
          <div className="flex-1 bg-stone-800 rounded-full px-2 py-0.5 border border-stone-700/60">
            <span className="text-[9px] text-stone-600">提问…</span>
          </div>
          <div className="w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center shrink-0">
            <span className="text-[9px] text-black font-bold">↑</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 px-4 bg-[#07070a]">
      <div className="dot-bg absolute inset-0 opacity-100" />
      <div className="orb w-[600px] h-[600px] bg-amber-600 -top-60 left-1/3 -translate-x-1/2" />
      <div className="orb w-80 h-80 bg-orange-700 top-20 right-1/4" />

      <div className="relative max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs mb-10">
          <Star size={11} className="fill-amber-400 text-amber-400" />
          全新 GPT-5.4 模型现已上线
          <ArrowRight size={11} />
        </div>

        <div className="mb-3">
          <h1 className="font-display text-[clamp(4rem,14vw,7.5rem)] font-extrabold tracking-[0.12em] leading-none uppercase text-white">
            KAIROS
          </h1>
        </div>

        <p className="text-xs uppercase tracking-[0.25em] text-stone-500 mb-8">
          For Developers · Creators · Enterprise
        </p>

        <p className="text-base sm:text-lg text-stone-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          <span className="text-stone-200">一把 Key，接入 40+ 顶级模型</span>。
          个人开发者拿 OpenAI 兼容 API在 Chatbox / Cursor / 代码里直接调用；
          企业可获得<span className="text-amber-400"> 全栈定制交付</span>与容灾路由。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            to="/app"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-lg transition-all hover:shadow-xl hover:shadow-amber-500/20 text-sm"
          >
            <Sparkles size={15} />
            免费获取 API Key
          </Link>
          <Link
            to="/showcase"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-stone-900 hover:bg-stone-800 text-stone-100 font-medium rounded-lg transition-colors border border-stone-700 text-sm"
          >
            <Monitor size={15} />
            企业体验中心
          </Link>
        </div>

        <div className="max-w-2xl mx-auto code-block text-left">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-3 h-3 rounded-full bg-red-500/40" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/40" />
            <span className="w-3 h-3 rounded-full bg-green-500/40" />
            <span className="ml-2 text-xs text-stone-600">quick_start.py</span>
          </div>
          <pre className="overflow-x-auto whitespace-pre"><code><span className="tok-kw">from</span> openai <span className="tok-kw">import</span> OpenAI{'\n\n'}client = OpenAI({'\n'}    base_url=<span className="tok-str">"https://api.kairos.ai/v1"</span>,{'\n'}    api_key=<span className="tok-str">"sk-your-api-key"</span>,{'\n'}){'\n\n'}response = client.chat.completions.<span className="tok-fn">create</span>({'\n'}    model=<span className="tok-str">"gpt-5.4"</span>,{'\n'}    messages=[{'{'}  <span className="tok-str">"role"</span>: <span className="tok-str">"user"</span>, <span className="tok-str">"content"</span>: <span className="tok-str">"你好！"</span> {'}'}]{'\n'}){'\n'}<span className="tok-fn">print</span>(response.choices[0].message.content)</code></pre>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// Stats
// ─────────────────────────────────────────────
function Stats() {
  const items = [
    { v: '40+', l: '可用模型' },
    { v: '99.9%', l: 'SLA 可用率' },
    { v: '< 100ms', l: 'P99 延迟' },
    { v: '1000+', l: '企业客户' },
  ]
  return (
    <section className="border-y border-stone-800/60 py-12 px-4 bg-stone-950/40">
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {items.map(i => (
          <div key={i.l}>
            <p className="font-display text-3xl sm:text-4xl font-extrabold grad-text mb-1">{i.v}</p>
            <p className="text-sm text-stone-500">{i.l}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// Features
// ─────────────────────────────────────────────
function Features() {
  const items = [
    {
      icon: <Globe size={20} className="text-amber-400" />,
      title: '多模型统一接口',
      desc: 'OpenAI 兼容 API，无缝切换 GPT、Claude、Gemini、Qwen 等模型，现有代码零改动。',
    },
    {
      icon: <Shield size={20} className="text-amber-400" />,
      title: '安全合规',
      desc: 'API Key 托管、细粒度访问控制、完整请求审计日志，满足企业安全合规要求。',
    },
    {
      icon: <Zap size={20} className="text-amber-400" />,
      title: '智能路由 & 负载均衡',
      desc: '自动故障转移，按模型能力和成本智能路由，多区域部署保障高可用。',
    },
    {
      icon: <Code2 size={20} className="text-amber-400" />,
      title: '精细计费管控',
      desc: '按 Token 精确计费，设置团队配额和消费上限，费用透明可控。',
    },
  ]
  return (
    <section id="features" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold mb-4 uppercase tracking-wide">
            为企业打造的 AI 基础设施
          </h2>
          <p className="text-stone-400 max-w-xl mx-auto">
            从 API 代理到企业级管控，一站式满足研发、业务、合规各团队需求。
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {items.map(item => (
            <div key={item.title} className="glass p-6">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/15 flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="font-semibold text-stone-100 mb-2">{item.title}</h3>
              <p className="text-sm text-stone-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Delivery Model
// ─────────────────────────────────────────────
function DeliveryModel() {
  const tiers = [
    {
      icon: <Code2 size={22} className="text-stone-300" />,
      badge: '开发者',
      badgeColor: 'bg-stone-800 border-stone-700 text-stone-400',
      title: 'API 自助接入',
      sub: '5 分钟上手，按量付费',
      desc: '通过 OpenAI 兼容接口，一行代码接入 40+ 顶级模型。适合技术团队快速验证 AI 能力。',
      bullets: ['40+ 大模型统一接口', 'Token 级精细计费', '完整调用日志与审计', 'SDK / cURL / OpenAI 兼容'],
      cta: '查看文档',
      ctaLink: '/api',
      highlight: false,
    },
    {
      icon: <Layers size={22} className="text-stone-300" />,
      badge: '企业',
      badgeColor: 'bg-stone-800 border-stone-700 text-stone-400',
      title: '标准产品部署',
      sub: '3 天上线，低代码配置',
      desc: '使用我们预构建的 Agent、知识库、Webchat 模块，可视化配置，无需自研 AI 后端。',
      bullets: ['企业 Agent 工作流', '私有知识库问答', '品牌 Webchat 组件', '微信小程序 SDK'],
      cta: '浏览解决方案',
      ctaLink: '/#solutions',
      highlight: false,
    },
    {
      icon: <Wrench size={22} className="text-amber-400" />,
      badge: '推荐 · 企业旗舰',
      badgeColor: 'bg-amber-500/15 border-amber-500/25 text-amber-400',
      title: '全栈深度定制',
      sub: '平均 2 周交付',
      desc: '从需求分析、架构设计、模型调优到 UI 交付，我们的工程团队全程驻场，构建专属 AI 产品。',
      bullets: ['专属需求分析与方案设计', '私有化部署 / 混合云', '模型微调与 RAG 工程', '上线后运维与迭代支持'],
      cta: '预约定制咨询',
      ctaLink: '#',
      highlight: true,
    },
  ]

  return (
    <section className="py-20 px-4 bg-stone-950/40">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs mb-4 uppercase tracking-widest">
            服务交付模式
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-wide mb-3">
            从接口到产品，按需选择
          </h2>
          <p className="text-stone-400 max-w-xl mx-auto text-sm">
            无论是技术团队自助接入，还是需要端到端定制交付，三种模式覆盖企业 AI 落地全路径。
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 items-stretch">
          {tiers.map((t, i) => (
            <div
              key={t.title}
              className={`relative flex flex-col rounded-xl border p-6 transition-all ${
                t.highlight
                  ? 'bg-gradient-to-b from-stone-900 to-stone-950 border-amber-500/30 shadow-xl shadow-amber-500/5'
                  : 'glass'
              }`}
            >
              {t.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-amber-500 text-black text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-amber-500/30">
                    <Rocket size={9} />
                    企业深度定制
                  </span>
                </div>
              )}

              {/* Icon + badge */}
              <div className="flex items-start justify-between mb-5 mt-1">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                  t.highlight ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-stone-800 border border-stone-700'
                }`}>
                  {t.icon}
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border uppercase tracking-wider ${t.badgeColor}`}>
                  {t.badge}
                </span>
              </div>

              {/* Title */}
              <h3 className={`font-display text-xl uppercase tracking-wide mb-0.5 ${t.highlight ? 'text-white' : 'text-stone-200'}`}>
                {t.title}
              </h3>
              <p className={`text-xs mb-4 ${t.highlight ? 'text-amber-400' : 'text-stone-500'}`}>{t.sub}</p>
              <p className="text-sm text-stone-400 leading-relaxed mb-5 flex-1">{t.desc}</p>

              {/* Bullets */}
              <ul className="space-y-2 mb-6">
                {t.bullets.map(b => (
                  <li key={b} className="flex items-start gap-2 text-xs text-stone-400">
                    <Check size={11} className={`mt-0.5 shrink-0 ${t.highlight ? 'text-amber-400' : 'text-stone-500'}`} />
                    {b}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={t.ctaLink}
                className={`inline-flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  t.highlight
                    ? 'bg-amber-500 hover:bg-amber-400 text-black'
                    : 'bg-stone-800 hover:bg-stone-700 text-stone-300 border border-stone-700'
                }`}
              >
                {t.cta}
                <ChevronRight size={13} />
              </a>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-stone-600 mt-6">
          不确定选哪种？<a href="#" className="text-amber-500/70 hover:text-amber-400 transition-colors">与我们的解决方案顾问聊聊</a>，15 分钟评估，无需承诺。
        </p>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// Solutions
// ─────────────────────────────────────────────
function Solutions() {
  const items = [
    {
      icon: <Bot size={20} className="text-amber-400" />,
      badge: '企业首选',
      title: '企业 Agent',
      desc: '基于大模型构建自动化工作流 Agent，处理邮件审批、数据分析、报告生成等重复性任务。',
      features: ['多步骤任务规划', '外部工具调用', 'RAG 知识增强', '权限沙箱隔离'],
      mockup: <AgentMockup />,
    },
    {
      icon: <BookOpen size={20} className="text-amber-400" />,
      badge: '高精度',
      title: '知识问答',
      desc: '上传企业文档构建私有知识库，实现精准的内部知识检索与带来源溯源的多轮问答。',
      features: ['多格式文档解析', '向量相似检索', '引用来源溯源', '多轮追问'],
      mockup: <KnowledgeMockup />,
    },
    {
      icon: <Monitor size={20} className="text-amber-400" />,
      badge: '品牌定制',
      title: '品牌 Webchat',
      desc: '嵌入官网的 AI 客服窗口，完全定制品牌视觉，7×24 小时自动应答，提升访客转化率。',
      features: ['品牌视觉定制', '一行代码接入', '多语言支持', 'CRM 数据打通'],
      mockup: <WebchatMockup />,
    },
    {
      icon: <Smartphone size={20} className="text-amber-400" />,
      badge: '微信生态',
      title: '小程序问答',
      desc: '为微信小程序提供 AI 对话能力，无需自建 AI 后端，快速为小程序赋予智能问答功能。',
      features: ['原生 SDK 接入', '用户会话隔离', '内容安全过滤', '用量可视化统计'],
      mockup: <MiniProgramMockup />,
    },
  ]
  return (
    <section id="solutions" className="py-20 px-4 bg-stone-950/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs mb-4 uppercase tracking-widest">
            定制解决方案
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold mb-4 uppercase tracking-wide">
            从 API 到完整 AI 产品
          </h2>
          <p className="text-stone-400 max-w-xl mx-auto">
            端到端企业 AI 交付，从基础设施到最终用户界面全程覆盖。
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {items.map(item => (
            <div
              key={item.title}
              className="glass flex flex-col overflow-hidden hover:-translate-y-1 transition-all duration-200"
            >
              <div className="p-5 pb-3 bg-stone-950/40 border-b border-stone-800/60">
                {item.mockup}
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/15 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <h3 className="font-semibold text-base text-stone-100">{item.title}</h3>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 uppercase tracking-wider">
                    {item.badge}
                  </span>
                </div>
                <p className="text-sm text-stone-400 mb-4 leading-relaxed flex-1">{item.desc}</p>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-4">
                  {item.features.map(f => (
                    <li key={f} className="flex items-center gap-1.5 text-xs text-stone-400">
                      <Check size={10} className="text-amber-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className="flex items-center gap-1 text-sm text-amber-400 hover:text-amber-300 transition-colors mt-auto">
                  了解详情 <ChevronRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// Case Studies — Horizontal Scroll Carousel
// ─────────────────────────────────────────────
const CASES = [
  {
    logo: 'TF',
    company: '天风证券',
    industry: '金融科技',
    tag: '企业 Agent',
    tagColor: 'amber',
    headline: '研报自动生成效率提升 8 倍',
    body: '将分析师工作流接入 Agent 系统，每日自动抓取公告、抓取财报关键指标、生成初稿，分析师审核时间从 4 小时压缩至 30 分钟。',
    metrics: [
      { v: '8×', l: '效率提升' },
      { v: '30min', l: '日均审核时间' },
      { v: '¥0.03', l: '单篇成本' },
    ],
  },
  {
    logo: 'ML',
    company: '美乐教育',
    industry: '在线教育',
    tag: '知识问答',
    tagColor: 'sky',
    headline: '课程顾问 AI 化覆盖率达 91%',
    body: '将 20 万份教学资料、招生政策、课程大纲向量化，构建私有知识库，学员咨询响应时间从平均 8 分钟缩短至 3 秒，差评率下降 40%。',
    metrics: [
      { v: '91%', l: '自动化覆盖率' },
      { v: '3s', l: '平均响应时间' },
      { v: '−40%', l: '客诉率' },
    ],
  },
  {
    logo: 'HM',
    company: '好买云',
    industry: '零售 SaaS',
    tag: '品牌 Webchat',
    tagColor: 'green',
    headline: '官网访客转化率提高 23%',
    body: '在 B2B 官网嵌入 AI 销售助手，7×24 小时解答产品问题、收集线索，并与 CRM 直连，比传统在线客服线索转化率提高 23%。',
    metrics: [
      { v: '+23%', l: '线索转化率' },
      { v: '7×24h', l: '全时段覆盖' },
      { v: '0', l: '额外人力成本' },
    ],
  },
  {
    logo: 'XY',
    company: '星羽健康',
    industry: '医疗健康',
    tag: '小程序问答',
    tagColor: 'violet',
    headline: '问诊前分诊准确率达 88%',
    body: '在微信小程序集成智能问诊助手，基于症状描述进行科室预分诊，减少挂错号情况，医生问诊时间平均缩短 12 分钟/次。',
    metrics: [
      { v: '88%', l: '分诊准确率' },
      { v: '−12min', l: '问诊时长' },
      { v: '50K+', l: '月活用户' },
    ],
  },
]

const TAG_COLORS: Record<string, string> = {
  amber:  'bg-amber-500/10 border-amber-500/20 text-amber-400',
  sky:    'bg-sky-500/10 border-sky-500/20 text-sky-400',
  green:  'bg-green-500/10 border-green-500/20 text-green-400',
  violet: 'bg-violet-500/10 border-violet-500/20 text-violet-400',
}

function CaseStudies() {
  const [active, setActive] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  const goTo = (i: number) => {
    const idx = Math.max(0, Math.min(CASES.length - 1, i))
    setActive(idx)
    const el = trackRef.current?.children[idx] as HTMLElement | undefined
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
  }

  const onScroll = () => {
    if (!trackRef.current) return
    const { scrollLeft, children } = trackRef.current
    let closest = 0
    let minDist = Infinity
    Array.from(children).forEach((c, i) => {
      const dist = Math.abs((c as HTMLElement).offsetLeft - scrollLeft)
      if (dist < minDist) { minDist = dist; closest = i }
    })
    setActive(closest)
  }

  return (
    <section className="py-20 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header row */}
        <div className="flex items-end justify-between mb-10 gap-6">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs mb-4 uppercase tracking-widest">
              用户案例
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-wide leading-none">
              行业标杆的共同选择
            </h2>
            <p className="text-stone-400 text-sm mt-2 hidden sm:block">
              跨金融、教育、零售、医疗等行业，平均项目交付周期 2 周。
            </p>
          </div>
          {/* Desktop nav arrows */}
          <div className="hidden sm:flex items-center gap-2 mb-1 shrink-0">
            <button
              onClick={() => goTo(active - 1)}
              disabled={active === 0}
              className="w-9 h-9 rounded-full border border-stone-700 flex items-center justify-center text-stone-400 hover:border-amber-500/50 hover:text-amber-400 disabled:opacity-25 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={15} />
            </button>
            <span className="text-xs text-stone-600 tabular-nums w-8 text-center">{active + 1}/{CASES.length}</span>
            <button
              onClick={() => goTo(active + 1)}
              disabled={active === CASES.length - 1}
              className="w-9 h-9 rounded-full border border-stone-700 flex items-center justify-center text-stone-400 hover:border-amber-500/50 hover:text-amber-400 disabled:opacity-25 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>

        {/* Scroll track */}
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="no-bar flex gap-4 overflow-x-auto pb-2"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {CASES.map((c, i) => (
            <div
              key={c.company}
              className="shrink-0 w-[85vw] sm:w-[calc(50%-8px)] glass flex flex-col gap-5 p-6 transition-all duration-300"
              style={{
                scrollSnapAlign: 'start',
                opacity: i === active ? 1 : 0.5,
                borderColor: i === active ? 'rgba(251,191,36,0.28)' : undefined,
              }}
            >
              {/* Top */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-stone-800 border border-stone-700 flex items-center justify-center shrink-0">
                    <span className="font-display text-sm text-stone-200 tracking-wider">{c.logo}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-100">{c.company}</p>
                    <p className="text-xs text-stone-500">{c.industry}</p>
                  </div>
                </div>
                <span className={`shrink-0 text-[10px] px-2 py-0.5 rounded-full border uppercase tracking-wider ${TAG_COLORS[c.tagColor]}`}>
                  {c.tag}
                </span>
              </div>
              {/* Body */}
              <div className="flex-1">
                <p className="text-base font-semibold text-stone-100 mb-2 leading-snug">{c.headline}</p>
                <p className="text-sm text-stone-400 leading-relaxed">{c.body}</p>
              </div>
              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-stone-800/60">
                {c.metrics.map(m => (
                  <div key={m.l} className="text-center">
                    <p className="font-display text-2xl text-amber-400 leading-none mb-1">{m.v}</p>
                    <p className="text-[10px] text-stone-500 leading-tight">{m.l}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Dot indicators + CTA */}
        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            {CASES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === active ? 'w-6 h-1.5 bg-amber-500' : 'w-1.5 h-1.5 bg-stone-700 hover:bg-stone-500'
                }`}
              />
            ))}
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold rounded-lg transition-colors"
          >
            预约方案咨询 <ArrowRight size={13} />
          </a>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// Pricing
// ─────────────────────────────────────────────
function Pricing() {
  const plans = [
    {
      name: '开发者',
      price: '免费',
      period: '',
      desc: '个人开发者快速上手',
      features: ['每月 $5 免费额度', '所有模型访问', 'API 文档与 SDK', '社区支持'],
      cta: '免费注册',
      highlight: false,
    },
    {
      name: '团队',
      price: '¥999',
      period: '/月起',
      desc: '成长中的技术团队',
      features: ['按量计费，无月度上限', '优先路由 & 更低延迟', '用量分析仪表盘', '邮件支持（8 h 响应）', '团队成员管理'],
      cta: '14 天免费试用',
      highlight: true,
    },
    {
      name: '企业',
      price: '联系我们',
      period: '',
      desc: '大规模企业级部署',
      features: ['私有化 / 混合云部署', '独立集群 & 专属资源', 'SLA 99.9% 保障', '专属客户成功经理', '合规审计报告', '定制模型接入'],
      cta: '联系销售',
      highlight: false,
    },
  ]
  return (
    <section id="pricing" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold mb-4 uppercase tracking-wide">
            简单透明的定价
          </h2>
          <p className="text-stone-400">按实际用量付费，无隐藏费用。</p>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 items-start">
          {plans.map(plan => (
            <div
              key={plan.name}
              className={`rounded-xl border p-6 flex flex-col relative ${
                plan.highlight
                  ? 'border-amber-500/40 bg-amber-500/5 a-glow'
                  : 'border-stone-800 bg-stone-900/40'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-500 text-black text-xs font-bold whitespace-nowrap">
                  最受欢迎
                </div>
              )}
              <p className="text-sm text-stone-400 mb-1">{plan.name}</p>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="font-display text-3xl font-extrabold">{plan.price}</span>
                <span className="text-stone-400 text-sm">{plan.period}</span>
              </div>
              <p className="text-xs text-stone-500 mb-6">{plan.desc}</p>
              <ul className="space-y-2.5 flex-1 mb-6">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm text-stone-300">
                    <Check size={13} className="text-amber-400 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                  plan.highlight
                    ? 'bg-amber-500 hover:bg-amber-400 text-black'
                    : 'bg-stone-800 hover:bg-stone-700 text-stone-100'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// Financial MCP — coming soon section
// ─────────────────────────────────────────────
const MCP_TOOLS = [
{ fn: 'kairos.finance.quote',       desc: '实时行情 · A股/港股/美股',        preview: true  },
  { fn: 'kairos.finance.earnings',    desc: '财报关键指标解析与摘要',           preview: true  },
  { fn: 'kairos.finance.risk',        desc: '持仓风险敎口多维分析',             preview: false },
  { fn: 'kairos.finance.screener',    desc: '多因子量化选股与报告生成',         preview: false },
  { fn: 'kairos.finance.nl_backtest', desc: '自然语言策略描述回测引擎',         preview: false },
]

function FinancialMCP() {
  return (
    <section className="py-20 px-4 border-y border-stone-800/60 bg-gradient-to-b from-transparent to-stone-950/60">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — marketing copy */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs uppercase tracking-widest">
                即将推出 · Q3 2026
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 border border-stone-700/60 text-stone-400 text-xs uppercase tracking-widest">
                金融垂直
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-wide leading-none mb-1">
              金融 MCP
            </h2>
            <p className="font-display text-xl text-amber-400 uppercase tracking-wide mb-5">
              连接模型与市场数据
            </p>
            <p className="text-stone-400 leading-relaxed mb-7 text-sm max-w-md">
              基于 Model Context Protocol，将实时行情、财报数据库、量化因子直接注入大模型上下文。无需手工查询，AI 自动调取数据完成分析与报告生成。
            </p>
            <ul className="space-y-3 mb-8">
              {[
                '实时接入 A 股、港股、美股行情数据',
                '财报、公告向量化自动入库与检索',
                '自然语言描述策略即触发回测',
                '合规审计日志与细粒度权限隔离',
              ].map(f => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-stone-300">
                  <Check size={13} className="text-amber-400 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-800 hover:bg-stone-700 border border-stone-700 hover:border-amber-500/40 text-stone-200 text-sm font-medium rounded-lg transition-all group"
            >
              <TrendingUp size={14} className="text-amber-400 group-hover:scale-110 transition-transform" />
              申请内测资格
            </a>
          </div>

          {/* Right — terminal mockup */}
          <div className="code-block !pb-4">
            <div className="flex items-center gap-1.5 mb-5">
              <span className="w-3 h-3 rounded-full bg-red-500/40" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/40" />
              <span className="w-3 h-3 rounded-full bg-green-500/40" />
              <span className="ml-2 text-xs text-stone-600 flex-1">phanes_mcp_config.json</span>
              <span className="text-[10px] text-stone-700 uppercase tracking-widest">MCP Preview</span>
            </div>
            <div className="space-y-2">
              {MCP_TOOLS.map(t => (
                <div
                  key={t.fn}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${
                    t.preview
                      ? 'bg-amber-500/5 border border-amber-500/15'
                      : 'bg-stone-900/50 border border-stone-800/50'
                  }`}
                >
                  <div className="shrink-0">
                    {t.preview ? (
                      <span className="flex items-center justify-center w-4 h-4 rounded-full bg-amber-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse block" />
                      </span>
                    ) : (
                      <Lock size={12} className="text-stone-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-mono truncate ${t.preview ? 'text-amber-300' : 'text-stone-600'}`}>
                      {t.fn}
                    </p>
                    <p className="text-[10px] text-stone-600 mt-0.5">{t.desc}</p>
                  </div>
                  <span className={`shrink-0 text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider ${
                    t.preview
                      ? 'bg-amber-500/15 text-amber-500 border border-amber-500/20'
                      : 'bg-stone-800 text-stone-600 border border-stone-700/60'
                  }`}>
                    {t.preview ? '预览中' : '开发中'}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-stone-800 flex items-center gap-2">
              <span className="text-amber-500 font-mono text-xs">$</span>
              <span className="text-xs text-stone-400 font-mono">kairos mcp install financial --preview</span>
              <span className="w-2 h-4 bg-amber-500/60 animate-pulse inline-block rounded-sm ml-0.5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// Footer (with embedded legal disclosure)
// ─────────────────────────────────────────────
function Footer() {
  const cols = [
    { title: '产品', links: ['API 文档', '模型列表', '定价方案', '更新日志'] },
    { title: '解决方案', links: ['企业 Agent', '知识问答', '品牌 Webchat', '小程序问答'] },
    { title: '公司', links: ['关于我们', '博客', '联系销售', '服务条款'] },
  ]
  return (
    <footer className="border-t border-stone-800 pt-14 px-4 bg-stone-950/50">
      <div className="max-w-5xl mx-auto">
        {/* Main 4-col grid */}
        <div className="grid sm:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded bg-amber-500 flex items-center justify-center">
                <span className="font-display font-extrabold text-black text-xs">PH</span>
              </div>
              <div className="flex flex-col leading-none gap-0.5">
                <span className="font-display font-extrabold text-white text-sm tracking-widest uppercase">KAIROS</span>
                <span className="text-amber-400 text-[9px] tracking-[0.3em]">凯若斯</span>
              </div>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed mb-4">
              企业级 AI 基础设施与定制化 AI 解决方案提供商。
            </p>
            <div className="space-y-1 text-[11px] text-stone-600">
              <p>support@kairos.ai</p>
              <p>400-000-0000</p>
            </div>
          </div>
          {cols.map(col => (
            <div key={col.title}>
              <p className="text-sm font-medium text-stone-300 mb-4">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map(link => (
                  <li key={link}>
                    <a href="#" className="text-xs text-stone-500 hover:text-stone-300 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legal info — naturally embedded */}
        <div className="border-t border-stone-800/50 py-5 grid sm:grid-cols-3 gap-x-8 gap-y-3">
          {[
            { k: '公司全称',         v: '凯若斯智能科技（深圳）有限公司' },
            { k: '注册地址',         v: '广东省深圳市南山区科技园南区科苑路 18 号' },
            { k: '统一社会信用代码', v: '91440300KAIROS00XX（模拟数据）' },
          ].map(r => (
            <div key={r.k}>
              <p className="text-[10px] text-stone-700 mb-0.5">{r.k}</p>
              <p className="text-[11px] text-stone-500 font-mono">{r.v}</p>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-stone-800/40 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 text-[10px] text-stone-600">
          <p className="shrink-0">© 2026 KAIROS 凯若斯. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 flex-1 sm:justify-center">
            <a href="#" className="hover:text-stone-400 transition-colors">粤ICP备2024000000号【模拟】</a>
            <span>粤公网安备 44030002001000 号【模拟】</span>
            <span>粤 B2-20240000 增值电信业务许可证【模拟】</span>
          </div>
          <div className="flex gap-4 shrink-0">
            <a href="#" className="hover:text-stone-400 transition-colors">隐私政策</a>
            <a href="#" className="hover:text-stone-400 transition-colors">服务条款</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────
// Home Page
// ─────────────────────────────────────────────
// ─────────────────────────────────────────────
// Audience Split — To C vs To B
// ─────────────────────────────────────────────
function AudienceSplit() {
  return (
    <section className="py-20 px-4 bg-stone-950/40">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs mb-4 uppercase tracking-widest">
            两种身份，一个平台
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-wide">
            为你而来
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {/* To C */}
          <div className="glass p-8 flex flex-col gap-5 hover:-translate-y-1 transition-all duration-200 border-stone-800/60">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                <Users size={22} className="text-amber-400" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-500 mb-0.5">个人开发者 & 创作者</p>
                <h3 className="font-display text-xl font-extrabold uppercase tracking-wide text-stone-100">一把 Key，任意调用</h3>
              </div>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed">
              注册即拿 <span className="text-stone-200">OpenAI 兼容 API Key</span>，
              在 Chatbox / Cursor / Cherry Studio / 自己的代码里直接调用 40+ 模型；
              还可以在自带的 KAIROS APP 里聊天、做 RAG、出图——<span className="text-amber-400">零门槛起步</span>。
            </p>
            <ul className="space-y-2.5">
              {['OpenAI 兼容 Base URL，现有 SDK 零改动', '一个账号管理多把 Key，精细看用量', '内置 APP：对话 / 文件问答 / 图片工作台', '按量计费，10 元起，到期不续费不扣款'].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-stone-300">
                  <Check size={11} className="text-amber-400 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link to="/app"
              className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold rounded-lg transition-colors w-fit">
              <Sparkles size={14} />
              免费获取 API Key
            </Link>
          </div>

          {/* To B */}
          <div className="glass p-8 flex flex-col gap-5 hover:-translate-y-1 transition-all duration-200 border-stone-800/60">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                <Building2 size={22} className="text-sky-400" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-stone-500 mb-0.5">企业用户</p>
                <h3 className="font-display text-xl font-extrabold uppercase tracking-wide text-stone-100">企业 AI 基础设施</h3>
              </div>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed">
              一个 API 接入 40+ 模型，配套企业级管控、私有部署、全栈定制交付——
              <span className="text-stone-200">AI 落地，交给专业团队</span>。
            </p>
            <ul className="space-y-2.5">
              {['OpenAI 兼容接口，现有代码零改动', '细粒度配额管控与费用看板', 'Agent / 知识库 / Webchat 标准产品', '2 周全栈定制交付，私有化部署'].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-stone-300">
                  <Check size={11} className="text-sky-400 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link to="/api"
              className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-100 text-sm font-semibold rounded-lg transition-colors w-fit">
              <Code2 size={14} />
              查看 API 文档
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// App Features — To C showcase
// ─────────────────────────────────────────────
function AppFeatures() {
  const cards = [
    {
      icon: <MessageSquare size={20} className="text-amber-400" />,
      badge: '多模型',
      title: 'AI 对话，随时切换',
      desc: 'GPT-4o、Claude、Gemini、KAIROS 自研模型一键切换，Shift+Enter 换行，响应毫秒级，体验顶级模型的真实差异。',
      color: 'amber',
    },
    {
      icon: <Library size={20} className="text-violet-400" />,
      badge: 'RAG 检索',
      title: '上传文件，即问即答',
      desc: '拖拽 PDF / Excel / Word，秒级向量入库，提问自动召回相关段落并标注来源，知识不再散落各处。',
      color: 'violet',
    },
    {
      icon: <Share2 size={20} className="text-sky-400" />,
      badge: '一键分享',
      title: '打造专属 Bot，分享给任何人',
      desc: '给你的 Bot 起名、配色、写欢迎语，生成链接或嵌入代码，收件人无需注册即可使用你的专属助手。',
      color: 'sky',
    },
    {
      icon: <Wand2 size={20} className="text-pink-400" />,
      badge: '图片工作台',
      title: 'AI 图像处理，节点工作流',
      desc: '文生图、超分辨率、去水印、背景消除六大工具，可视化节点串联，配置参数一目了然，无需 Photoshop。',
      color: 'pink',
    },
  ]
  const colorMap: Record<string, string> = {
    amber: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    violet: 'bg-violet-500/10 border-violet-500/20 text-violet-400',
    sky: 'bg-sky-500/10 border-sky-500/20 text-sky-400',
    pink: 'bg-pink-500/10 border-pink-500/20 text-pink-400',
  }
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs mb-4 uppercase tracking-widest">
            KAIROS APP · 个人版
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-wide mb-3">
            不只是聊天
          </h2>
          <p className="text-stone-400 max-w-xl mx-auto text-sm">
            从对话到知识管理，从 Bot 分享到图片工作台——四个核心功能，重新定义个人 AI 工具。
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {cards.map(c => (
            <div key={c.title} className="glass p-6 hover:-translate-y-0.5 transition-all duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[c.color]}`}>
                  {c.icon}
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border uppercase tracking-wider ${colorMap[c.color]}`}>
                  {c.badge}
                </span>
              </div>
              <h3 className="font-semibold text-stone-100 mb-2">{c.title}</h3>
              <p className="text-sm text-stone-400 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/app"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-lg transition-all hover:shadow-xl hover:shadow-amber-500/20 text-sm">
            <Sparkles size={14} />
            打开 KAIROS APP
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main>
      <Hero />
      <AudienceSplit />
      <AppFeatures />
      <Stats />
      <Features />
      <DeliveryModel />
      <Solutions />
      <Pricing />
      <Footer />
    </main>
  )
}
