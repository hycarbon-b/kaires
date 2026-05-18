import { Link } from 'react-router-dom'
import {
  Check, ArrowRight, Lock, TrendingUp,
  FlaskConical, Building2, Bot, Boxes,
} from 'lucide-react'

// ─────────────────────────────────────────────
// MCP Tools
// ─────────────────────────────────────────────
const MCP_TOOLS = [
  { fn: 'kairos.finance.quote',       desc: '实时行情 · A股 / 港股 / 美股', preview: true  },
  { fn: 'kairos.finance.earnings',    desc: '财报关键指标解析与摘要',        preview: true  },
  { fn: 'kairos.finance.risk',        desc: '持仓风险敞口多维分析',          preview: false },
  { fn: 'kairos.finance.screener',    desc: '多因子量化选股与报告生成',      preview: false },
  { fn: 'kairos.finance.nl_backtest', desc: '自然语言策略描述回测引擎',      preview: false },
]

// ─────────────────────────────────────────────
// Partnership tiers
// ─────────────────────────────────────────────
const PARTNERS = [
  {
    icon: <Boxes size={24} className="text-amber-400" />,
    title: 'SaaS 标准订阅',
    desc: '开箱即用，无需自建 AI 基础设施。按模块订阅，按使用量付费，最快 1 天完成对接。',
    suits: '适合：中小券商、独立资管机构、量化私募',
    items: ['模块化按需订阅', '多租户隔离', 'REST API 全量开放', 'SLA 99.9% 可用性保障'],
  },
  {
    icon: <Bot size={24} className="text-sky-400" />,
    title: 'Agent 定制部署',
    desc: '针对业务流程深度定制的智能体系统，将内部数据库、工具链与大模型无缝连接。',
    suits: '适合：大型证券公司、公募基金、银行资管',
    items: ['业务流程 Agent 设计', '内部系统工具注册', '私有化或混合云部署', '自定义数据管道'],
  },
  {
    icon: <Building2 size={24} className="text-violet-400" />,
    title: '联合技术开发',
    desc: '我们的工程师团队嵌入您的组织，共同构建下一代 AI 原生金融基础设施与应用。',
    suits: '适合：头部金融机构、需要独立知识产权的企业',
    items: ['需求分析与架构共建', '模型微调与知识工程', '全程驻场开发支持', '交付后维护协议'],
  },
]

// ─────────────────────────────────────────────
// FinLab Page
// ─────────────────────────────────────────────
export default function FinLab() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 px-4 bg-[#07070a]">
        <div className="dot-bg absolute inset-0 opacity-60" />
        <div className="orb w-[500px] h-[500px] bg-amber-700 -top-40 left-1/4 -translate-x-1/2 opacity-30" />
        <div className="orb w-64 h-64 bg-sky-800 top-10 right-1/5 opacity-20" />

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs mb-8">
            <FlaskConical size={11} className="text-amber-400" />
            金融垂直 · 闭门内测
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse ml-0.5" />
          </div>

          <h1 className="font-display text-[clamp(2.8rem,8vw,5.5rem)] font-extrabold tracking-[0.08em] leading-none uppercase text-white mb-4">
            Fin Lab
          </h1>
          <p className="font-display text-lg sm:text-2xl text-amber-400 uppercase tracking-widest mb-6">
            金融智能实验室
          </p>
          <p className="text-stone-400 text-base max-w-2xl mx-auto leading-relaxed mb-10">
            专为券商、资管机构与量化团队打造的 AI 原生工具集。
            从研报生成、量化回测到合规处理，覆盖金融核心业务场景。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#mcp"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-lg transition-all hover:shadow-xl hover:shadow-amber-500/20 text-sm"
            >
              了解金融 MCP
              <ArrowRight size={15} />
            </a>
            <a
              href="#partnership"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-stone-900 hover:bg-stone-800 text-stone-100 font-medium rounded-lg transition-colors border border-stone-700 text-sm"
            >
              了解合作模式
            </a>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <div className="border-y border-stone-800/60 bg-stone-950/60 py-5 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-4 text-center">
          {[
            { v: '5+', l: 'MCP 工具函数' },
            { v: '3', l: '合作模式' },
            { v: 'Q3 2026', l: '开放内测' },
          ].map(s => (
            <div key={s.l}>
              <p className="font-display text-2xl sm:text-3xl text-amber-400 leading-none">{s.v}</p>
              <p className="text-[11px] text-stone-500 mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* MCP Introduction */}
      <section id="mcp" className="py-20 px-4 border-b border-stone-800/60">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Left — copy */}
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
                基于 Model Context Protocol，将实时行情、财报数据库、量化因子直接注入大模型上下文。
                无需手工查询，AI 自动调取数据完成分析与报告生成。
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
                <span className="ml-2 text-xs text-stone-600 flex-1">kairos_mcp_config.json</span>
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

      {/* Partnership model */}
      <section id="partnership" className="py-20 px-4 border-t border-stone-800/60 bg-stone-950/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs mb-4 uppercase tracking-widest">
              合作模式
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase tracking-wide mb-3">
              三种合作路径
            </h2>
            <p className="text-stone-400 max-w-xl mx-auto text-sm">
              为不同规模与需求的金融机构提供灵活的合作方式，从标准 SaaS 到深度技术共建。
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {PARTNERS.map((p, i) => (
              <div key={p.title} className={`glass p-6 flex flex-col gap-4 ${i === 1 ? 'sm:scale-[1.02] z-10' : ''}`}>
                <div className="w-12 h-12 rounded-xl bg-stone-900 border border-stone-700/60 flex items-center justify-center">
                  {p.icon}
                </div>
                <div>
                  <h3 className="font-display text-lg uppercase tracking-wide text-white mb-1">{p.title}</h3>
                  <p className="text-xs text-stone-500 mb-3">{p.suits}</p>
                  <p className="text-sm text-stone-400 leading-relaxed">{p.desc}</p>
                </div>
                <ul className="space-y-2 mt-auto pt-4 border-t border-stone-800/50">
                  {p.items.map(item => (
                    <li key={item} className="flex items-start gap-2 text-xs text-stone-400">
                      <Check size={10} className="text-amber-500/70 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 border-t border-stone-800/60">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-wide mb-4">
            申请内测资格
          </h2>
          <p className="text-stone-400 text-sm mb-8 leading-relaxed">
            Fin Lab 目前处于闭门内测阶段，向头部券商、资管机构与量化团队开放合作名额。
            填写申请后我们的解决方案顾问将在 2 个工作日内与您联系。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-semibold rounded-lg transition-all hover:shadow-xl hover:shadow-amber-500/20 text-sm"
            >
              <FlaskConical size={15} />
              提交合作申请
            </a>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-stone-900 hover:bg-stone-800 text-stone-300 font-medium rounded-lg transition-colors border border-stone-700 text-sm"
            >
              返回主页
            </Link>
          </div>
          <p className="text-xs text-stone-600 mt-5">
            当前内测合作已开放 · 2026 Q3 正式上线 · 限时合作伙伴权益
          </p>
        </div>
      </section>
    </main>
  )
}
