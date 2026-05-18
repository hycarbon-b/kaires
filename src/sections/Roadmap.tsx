export default function Roadmap() {
  const phases = [
    {
      quarter: 'Q2 2026',
      title: 'MVP上线',
      status: 'current',
      items: [
        '核心API网关功能完成',
        '支持10+主流AI服务商',
        '基础管理后台',
        '获取前100个种子用户',
        '完成Pre-A轮融资'
      ]
    },
    {
      quarter: 'Q3 2026',
      title: '市场验证',
      status: 'planned',
      items: [
        '接入40+ AI服务商',
        '上线Chat订阅服务',
        '发布第一个SaaS产品（AI财务助手）',
        '用户数突破1000',
        '月收入达到50万'
      ]
    },
    {
      quarter: 'Q4 2026',
      title: '快速增长',
      status: 'planned',
      items: [
        '上线3个垂直SaaS产品',
        '开放第三方应用市场',
        '企业客户突破100家',
        '月收入达到200万',
        '启动A轮融资'
      ]
    },
    {
      quarter: '2027',
      title: '规模化',
      status: 'planned',
      items: [
        '完成A轮融资',
        '团队扩充至50人',
        '建立销售和运营体系',
        '拓展海外市场',
        '年收入突破5000万'
      ]
    },
    {
      quarter: '2028',
      title: '生态成熟',
      status: 'planned',
      items: [
        '成为行业标准',
        '第三方应用超过100个',
        '企业客户超过1000家',
        '年收入突破2亿',
        '准备B轮融资'
      ]
    }
  ]

  const milestones = [
    { date: '2026 Q2', event: 'MVP上线，种子用户获取' },
    { date: '2026 Q3', event: '月收入50万，Pre-A轮融资' },
    { date: '2026 Q4', event: '月收入200万，企业客户100+' },
    { date: '2027 H1', event: 'A轮融资，年收入5000万' },
    { date: '2028', event: '行业领导者，年收入2亿+' }
  ]

  return (
    <section id="roadmap" className="min-h-screen flex items-center py-24 px-6">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">发展路线图</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            清晰的发展计划，可执行的里程碑
          </p>
        </div>

        {/* 时间轴 */}
        <div className="mb-16">
          <div className="relative">
            {/* 横向时间线 */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500" />
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {phases.map((phase, idx) => (
                <div key={idx} className="relative">
                  <div className="lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 z-10 hidden lg:block" />
                  
                  <div className={`p-6 rounded-2xl border ${
                    phase.status === 'current'
                      ? 'bg-gradient-to-br from-purple-900/30 to-purple-900/10 border-purple-500/50'
                      : 'bg-white/5 border-white/10'
                  } hover:border-white/30 transition-all`}>
                    <div className="text-center mb-4">
                      <div className="text-sm text-purple-400 mb-1">{phase.quarter}</div>
                      <h3 className="text-xl font-bold text-white">{phase.title}</h3>
                      {phase.status === 'current' && (
                        <div className="inline-block mt-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/50 text-xs text-purple-300">
                          当前阶段
                        </div>
                      )}
                    </div>
                    <ul className="space-y-2">
                      {phase.items.map((item, i) => (
                        <li key={i} className="text-sm text-white/70 flex items-start gap-2">
                          <span className="text-purple-400">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 关键里程碑 */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 mb-16">
          <h3 className="text-2xl font-bold mb-6 text-white text-center">关键里程碑</h3>
          <div className="max-w-4xl mx-auto mb-6">
            <p className="text-white/70 leading-relaxed">
              我们的发展路线图遵循"小步快跑、快速迭代"的原则。在产品早期，专注于打磨核心功能，验证商业模式的可行性；进入增长期后，快速扩张用户规模，建立市场地位；在成熟期，构建完整生态，巩固行业领导地位。每个阶段都有明确的里程碑和可量化的目标，确保团队聚焦，资源高效利用。
            </p>
          </div>
          <div className="space-y-4">
            {milestones.map((milestone, idx) => (
              <div
                key={idx}
                className="flex items-center gap-6 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
              >
                <div className="flex-shrink-0 w-24 text-purple-400 font-semibold">{milestone.date}</div>
                <div className="flex-1 text-white/90">{milestone.event}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-900/20 to-purple-900/5 border border-purple-500/20">
            <h3 className="text-2xl font-bold mb-6 text-white">短期目标 (6个月)</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">✓</span>
                <div>
                  <div className="font-semibold text-white">产品打磨</div>
                  <div className="text-sm text-white/60">完善核心功能，提升用户体验</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">✓</span>
                <div>
                  <div className="font-semibold text-white">用户增长</div>
                  <div className="text-sm text-white/60">获取1000+种子用户，验证PMF</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">✓</span>
                <div>
                  <div className="font-semibold text-white">商业化</div>
                  <div className="text-sm text-white/60">月收入达到50万，验证商业模式</div>
                </div>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-900/20 to-blue-900/5 border border-blue-500/20">
            <h3 className="text-2xl font-bold mb-6 text-white">长期愿景 (3年)</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 text-xl">★</span>
                <div>
                  <div className="font-semibold text-white">行业领导者</div>
                  <div className="text-sm text-white/60">成为中国AI基础设施第一品牌</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 text-xl">★</span>
                <div>
                  <div className="font-semibold text-white">生态繁荣</div>
                  <div className="text-sm text-white/60">建立开放生态，第三方应用100+</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 text-xl">★</span>
                <div>
                  <div className="font-semibold text-white">国际化</div>
                  <div className="text-sm text-white/60">拓展海外市场，成为全球平台</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
