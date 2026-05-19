import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Check, FileSearch, Globe2, KeyRound,
  MessageSquare, ShieldCheck,
} from 'lucide-react'

const HIGHLIGHTS = [
  {
    icon: <MessageSquare size={18} />,
    title: '一把 Key，接入 40+ 顶级模型',
    desc: '统一接入 GPT、Claude、Gemini 等主流模型，用一个入口管理调用、切换与扩展。',
  },
  {
    icon: <FileSearch size={18} />,
    title: 'KAIROS APP 更好用',
    desc: '除了 API，我们也提供更顺手的 Chat 和图像工具，适合直接拿来用，也适合给团队落地。',
  },
  {
    icon: <ShieldCheck size={18} />,
    title: '企业可做定制交付',
    desc: '从业务助手到知识库应用，再到容灾路由与部署方案，支持全栈定制交付。',
  },
]

const SCENARIOS = [
  '个人开发者可在 Chatbox、Cursor 和代码里直接调用',
  '团队可直接使用 KAIROS APP 的 Chat 和图像工具',
  '企业可获得全栈定制交付与容灾路由',
]

function setMeta() {
  document.title = 'AI 聊天助手 | KAIROS 凯若斯'
  const description = 'KAIROS 提供 AI 中转、KAIROS APP 和企业应用定制服务，一把 Key 接入 40+ 顶级模型，支持 OpenAI 兼容 API 与容灾路由。'
  let meta = document.querySelector('meta[name="description"]')
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('name', 'description')
    document.head.appendChild(meta)
  }
  meta.setAttribute('content', description)
}

export default function ChatLanding() {
  useEffect(setMeta, [])

  return (
    <main className="pt-16 bg-[#07070a]">
      <section className="px-4 py-20 sm:py-28 border-b border-stone-800/60">
        <div className="max-w-5xl mx-auto">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-amber-300">
              AI Routing
            </span>
            <h1 className="mt-6 font-display text-[clamp(3rem,8vw,5.5rem)] leading-[0.95] uppercase text-white">
              一把 Key
              <br />
              接入 40+ 顶级模型
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-stone-300 sm:text-lg">
              KAIROS 提供 AI 中转、更好用的 Chat 和图像工具，以及企业应用定制。个人开发者可以用 OpenAI 兼容 API 直接接入，企业则可以继续往前做到全栈交付和容灾路由。
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/app" className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-amber-400">
                打开 KAIROS APP <ArrowRight size={15} />
              </Link>
              <Link to="/api" className="inline-flex items-center justify-center gap-2 rounded-lg border border-stone-700 bg-stone-900 px-6 py-3 text-sm font-medium text-stone-100 transition-colors hover:bg-stone-800">
                获取 API Key <KeyRound size={15} />
              </Link>
            </div>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {HIGHLIGHTS.map(item => (
              <div key={item.title} className="rounded-2xl border border-stone-800 bg-stone-950/70 p-6">
                <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-400">
                {item.icon}
                </span>
                <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                <p className="mt-2 text-sm leading-7 text-stone-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="text-xs uppercase tracking-[0.24em] text-amber-400">适合谁用</span>
            <h2 className="mt-4 font-display text-4xl uppercase text-white sm:text-5xl">
              从个人开发到企业交付
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-stone-400 sm:text-base">
              如果你只想先把模型接起来，可以直接走 OpenAI 兼容 API。如果你希望拿到更完整的产品体验，可以用 KAIROS APP；如果你要面向业务上线，我们也可以继续做到定制交付。
            </p>
            <div className="mt-8 space-y-3">
              {SCENARIOS.map(item => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-stone-800 bg-stone-950/50 px-4 py-4 text-sm text-stone-200">
                  <Check size={16} className="text-amber-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-stone-800 bg-stone-950 p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Quick Preview</p>
                <h3 className="mt-2 text-xl font-semibold text-white">KAIROS Service</h3>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-emerald-300">
                ready
              </span>
            </div>
            <div className="space-y-4 py-6">
              <div className="rounded-2xl border border-stone-800 bg-stone-900 px-4 py-3 text-sm leading-7 text-stone-300">
                我需要一个稳定的 AI 接入方案，开发时想直接兼容 OpenAI，后面还可能做企业级应用。
              </div>
              <div className="rounded-2xl bg-amber-500 px-4 py-3 text-sm font-medium leading-7 text-black">
                可以。先用一把 Key 接入 40+ 模型，在 Chatbox、Cursor 或代码里直接调用；后续再接 KAIROS APP，或者进入企业定制与容灾路由方案。
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-stone-800 bg-[#09090c] p-4">
                  <MessageSquare size={16} className="text-amber-400" />
                  <p className="mt-3 text-sm text-stone-200">OpenAI 兼容接入</p>
                  <p className="mt-1 text-xs leading-6 text-stone-500">个人开发者可以在 Chatbox、Cursor 和现有代码里直接调用，几乎不用改使用习惯。</p>
                </div>
                <div className="rounded-2xl border border-stone-800 bg-[#09090c] p-4">
                  <Globe2 size={16} className="text-amber-400" />
                  <p className="mt-3 text-sm text-stone-200">企业级稳定性</p>
                  <p className="mt-1 text-xs leading-6 text-stone-500">企业可以获得全栈定制交付，并通过容灾路由提升线上可用性和切换弹性。</p>
                </div>
              </div>
            </div>
            <Link to="/app" className="inline-flex items-center gap-2 text-sm font-medium text-amber-300 transition-colors hover:text-amber-200">
              前往 KAIROS APP <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-stone-800/60 px-4 py-16">
        <div className="mx-auto max-w-4xl rounded-3xl border border-stone-800 bg-stone-950/70 px-6 py-10 text-center sm:px-10">
          <h2 className="font-display text-3xl uppercase text-white sm:text-4xl">先接入，再决定走到多深</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-stone-400 sm:text-base">
            你可以先用一把 Key 把模型接起来，也可以直接体验 KAIROS APP。等业务要上线时，再继续往企业应用定制和容灾架构推进。
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/app" className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 px-7 py-3 text-sm font-semibold text-black transition-colors hover:bg-amber-400">
              体验 KAIROS APP <ArrowRight size={15} />
            </Link>
            <Link to="/api" className="inline-flex items-center justify-center gap-2 rounded-lg border border-stone-700 bg-stone-900 px-7 py-3 text-sm font-medium text-stone-100 transition-colors hover:bg-stone-800">
              获取 API Key <KeyRound size={15} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
