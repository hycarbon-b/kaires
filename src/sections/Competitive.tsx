export default function Competitive() {
  const advantages = [
    {
      title: '双引擎战略',
      desc: '基础设施+SaaS双轮驱动，形成完整生态闭环',
      icon: '🔄'
    },
    {
      title: '技术领先',
      desc: '自研智能调度算法，支持40+主流AI服务商',
      icon: '🚀'
    },
    {
      title: '成本优势',
      desc: '帮助企业降低40%+ AI使用成本',
      icon: '💰'
    },
    {
      title: '开放生态',
      desc: '兼容OpenAI标准，无缝迁移，无厂商锁定',
      icon: '🌐'
    },
    {
      title: '本地化',
      desc: '深度理解中国市场，支持国内主流AI服务商',
      icon: '🇨🇳'
    },
    {
      title: '快速迭代',
      desc: '敏捷开发，每周发布，快速响应市场需求',
      icon: '⚡'
    }
  ]

  const competitors = [
    {
      name: '云厂商方案',
      pros: ['品牌知名度高', '资源丰富'],
      cons: ['绑定自家生态', '成本高', '不够开放'],
      color: 'red'
    },
    {
      name: '初创API代理',
      pros: ['价格有竞争力', '灵活'],
      cons: ['功能单一', '稳定性差', '无SaaS生态'],
      color: 'yellow'
    },
    {
      name: 'KAIROS',
      pros: ['双引擎战略', '技术领先', '成本优势', '开放生态', '企业级稳定性'],
      cons: ['品牌知名度需提升'],
      color: 'green'
    }
  ]

  return (
    <section id="competitive" className="min-h-screen flex items-center py-24 px-6 bg-gradient-to-b from-black to-blue-950/10">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">竞争优势</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            我们的核心竞争力
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {advantages.map((adv, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-white/20 transition-all hover:scale-105"
              style={{
                animation: 'slideUp 0.6s ease-out',
                animationDelay: `${idx * 0.1}s`,
                animationFillMode: 'both'
              }}
            >
              <div className="text-4xl mb-4">{adv.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-white">{adv.title}</h3>
              <p className="text-white/60">{adv.desc}</p>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <h3 className="text-3xl font-bold mb-8 text-white text-center">竞争对比分析</h3>
          <div className="max-w-4xl mx-auto mb-6">
            <p className="text-white/60 leading-relaxed">
              通过对主要竞争对手的深入分析，我们发现每种类型的玩家都有明显的局限性。云厂商虽然资源丰富，但战略重点在自有模型推广，对第三方模型的支持有限；通用API网关厂商虽然技术成熟，但缺乏对AI场景的深度理解；初创API代理虽然灵活，但缺乏资金和技术实力做长期投入。而KAIROS的差异化优势在于：我们专注于AI场景，但保持开放中立；我们提供基础设施，更构建应用生态；我们追求技术领先，更注重商业价值创造。
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {competitors.map((comp, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border-2 ${
                  comp.color === 'green'
                    ? 'bg-gradient-to-br from-green-900/20 to-green-900/5 border-green-500/50'
                    : comp.color === 'yellow'
                    ? 'bg-white/5 border-yellow-500/30'
                    : 'bg-white/5 border-red-500/30'
                }`}
              >
                <h4 className="text-2xl font-bold mb-6 text-white text-center">{comp.name}</h4>
                <div className="mb-6">
                  <div className="font-semibold text-green-400 mb-3">✓ 优势</div>
                  <ul className="space-y-2">
                    {comp.pros.map((pro, i) => (
                      <li key={i} className="text-sm text-white/70 flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="font-semibold text-red-400 mb-3">✗ 劣势</div>
                  <ul className="space-y-2">
                    {comp.cons.map((con, i) => (
                      <li key={i} className="text-sm text-white/70 flex items-start gap-2">
                        <span className="text-red-400">•</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-10 rounded-2xl bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-white/10">
          <h3 className="text-2xl font-bold mb-6 text-white text-center">为什么我们能赢？</h3>
          <div className="max-w-4xl mx-auto mb-8">
            <p className="text-white/70 leading-relaxed mb-4">
              竞争优势的构建不是一蹴而就的，而是多重要素的有机结合。我们清楚地认识到，在AI基础设施这个赛道上，技术领先只是基础，更重要的是建立系统性的竞争壁垒。通过先发优势抢占市场心智，通过网络效应建立用户规模，通过技术积累形成专利保护，通过执行能力保持迭代速度——这些要素相互强化，形成了难以被复制的综合竞争力。
            </p>
            <p className="text-white/70 leading-relaxed">
              我们的团队在AI、企业服务、系统架构等领域都有深厚积累，这让我们能够在快速变化的市场中保持敏锐的洞察和高效的执行。更重要的是，我们不是在做一个简单的API代理，而是在构建一个生态系统——这需要的是长期主义和战略定力，而这正是我们的核心优势所在。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-bold text-white mb-4 text-lg">先发优势</h4>
              <ul className="space-y-2 text-white/70">
                <li>• 率先布局双引擎战略（基础设施+SaaS）</li>
                <li>• 积累40+AI服务商深度集成经验</li>
                <li>• 建立先发品牌认知</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4 text-lg">网络效应</h4>
              <ul className="space-y-2 text-white/70">
                <li>• 用户越多，数据越多，算法越优</li>
                <li>• 开发者生态吸引更多第三方应用</li>
                <li>• 规模效应带来成本优势</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4 text-lg">技术壁垒</h4>
              <ul className="space-y-2 text-white/70">
                <li>• 自研智能调度算法</li>
                <li>• 大规模生产环境验证</li>
                <li>• 专利和知识产权保护</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4 text-lg">执行能力</h4>
              <ul className="space-y-2 text-white/70">
                <li>• 经验丰富的创业团队</li>
                <li>• 快速迭代和市场响应</li>
                <li>• 强大的技术交付能力</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
