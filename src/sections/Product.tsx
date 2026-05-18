export default function Product() {
  const features = [
    {
      category: '核心网关功能',
      items: [
        { name: '多模型聚合', desc: '支持OpenAI、Claude、Gemini、国内主流模型' },
        { name: '智能路由', desc: '基于成本、延迟、可用性的智能选择' },
        { name: '负载均衡', desc: '多密钥轮询、故障自动切换' },
        { name: '成本优化', desc: '实时价格对比、最优路径推荐' }
      ]
    },
    {
      category: '企业级管理',
      items: [
        { name: '用户系统', desc: '多租户、权限管理、SSO集成' },
        { name: '配额管理', desc: '灵活的计费策略、预付费/后付费' },
        { name: '审计日志', desc: '完整的调用记录、合规审计' },
        { name: '数据分析', desc: '实时监控、成本分析、使用报表' }
      ]
    },
    {
      category: 'AI SaaS套件',
      items: [
        { name: '财务助手', desc: '智能记账、报表生成、财务预测' },
        { name: '客服系统', desc: '多渠道客服、智能对话、工单管理' },
        { name: '营销自动化', desc: '内容生成、用户分析、精准投放' },
        { name: '低代码平台', desc: '可视化构建AI应用' }
      ]
    }
  ]

  return (
    <section id="product" className="min-h-screen flex items-center py-24 px-6 bg-gradient-to-b from-purple-950/10 to-black">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">产品矩阵</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-6">
            完整的产品线，满足不同场景需求
          </p>
          <div className="max-w-4xl mx-auto">
            <p className="text-white/60 leading-relaxed">
              KAIROS的产品策略是"平台+生态"。我们首先构建强大的基础设施平台，提供稳定可靠的AI API网关服务；在此基础上，打造一系列垂直行业的SaaS应用，覆盖财务、客服、营销等核心业务场景；同时开放平台能力，吸引第三方开发者构建更多应用，形成繁荣的生态系统。这种分层的产品架构既保证了底层能力的通用性，又满足了上层应用的个性化需求。
            </p>
          </div>
        </div>

        <div className="space-y-8 mb-16">
          {features.map((category, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10"
              style={{
                animation: 'slideUp 0.6s ease-out',
                animationDelay: `${idx * 0.1}s`,
                animationFillMode: 'both'
              }}
            >
              <h3 className="text-2xl font-bold mb-6 text-white">{category.category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {category.items.map((item, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                    <div className="font-semibold text-white mb-2">{item.name}</div>
                    <div className="text-sm text-white/60">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-900/20 to-purple-900/5 border border-purple-500/20">
            <h3 className="text-2xl font-bold mb-6 text-white">技术特色</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-purple-400">✓</span>
                <div>
                  <div className="font-semibold text-white">高性能架构</div>
                  <div className="text-sm text-white/60">Go语言开发，支持百万级并发</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-purple-400">✓</span>
                <div>
                  <div className="font-semibold text-white">云原生设计</div>
                  <div className="text-sm text-white/60">Docker容器化，K8s编排，弹性伸缩</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-purple-400">✓</span>
                <div>
                  <div className="font-semibail text-white">多数据库支持</div>
                  <div className="text-sm text-white/60">SQLite、MySQL、PostgreSQL</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-purple-400">✓</span>
                <div>
                  <div className="font-semibold text-white">安全保障</div>
                  <div className="text-sm text-white/60">HTTPS、JWT、OAuth、WebAuthn</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-900/20 to-blue-900/5 border border-blue-500/20">
            <h3 className="text-2xl font-bold mb-6 text-white">部署方式</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="font-semibold text-white mb-2">☁️ 云端SaaS</div>
                <div className="text-sm text-white/60">开箱即用，5分钟完成接入，适合中小企业</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="font-semibold text-white mb-2">🏢 私有化部署</div>
                <div className="text-sm text-white/60">独立部署，数据完全自主，适合大型企业</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="font-semibold text-white mb-2">🔀 混合云</div>
                <div className="text-sm text-white/60">灵活组合，兼顾安全与便捷</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
