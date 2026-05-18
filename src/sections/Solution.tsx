export default function Solution() {
  return (
    <section id="solution" className="min-h-screen flex items-center py-24 px-6">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">KAIROS 解决方案</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            双引擎驱动：AI基础设施 + SaaS应用
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* 基础设施引擎 */}
          <div className="p-10 rounded-3xl bg-gradient-to-br from-purple-900/20 to-purple-900/5 border border-purple-500/20">
            <div className="text-4xl mb-6">🏗️</div>
            <h3 className="text-3xl font-bold mb-6 text-white">基础设施引擎</h3>
            <p className="text-lg text-white/70 mb-8">
              统一的AI API网关，聚合40+主流AI服务商
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-white mb-1">统一API接口</div>
                  <div className="text-sm text-white/60">兼容OpenAI标准，一次集成，接入所有主流AI模型</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-white mb-1">智能路由与负载均衡</div>
                  <div className="text-sm text-white/60">自动选择最优服务商，故障自动切换，99.99%可用性</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-white mb-1">成本优化引擎</div>
                  <div className="text-sm text-white/60">实时价格对比，自动选择性价比最优路径，节省40%+成本</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-white mb-1">企业级安全</div>
                  <div className="text-sm text-white/60">统一鉴权、密钥管理、数据加密、审计日志</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-white mb-1">Chat订阅服务</div>
                  <div className="text-sm text-white/60">为企业提供统一的聊天界面和订阅管理</div>
                </div>
              </div>
            </div>
          </div>

          {/* SaaS应用引擎 */}
          <div className="p-10 rounded-3xl bg-gradient-to-br from-blue-900/20 to-blue-900/5 border border-blue-500/20">
            <div className="text-4xl mb-6">🚀</div>
            <h3 className="text-3xl font-bold mb-6 text-white">SaaS应用引擎</h3>
            <p className="text-lg text-white/70 mb-8">
              深度集成AI的垂直SaaS解决方案
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-white mb-1">AI财务助手</div>
                  <div className="text-sm text-white/60">智能记账、报表分析、财务预测，降低80%人工成本</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-white mb-1">AI客服系统</div>
                  <div className="text-sm text-white/60">多渠道接入、智能对话、工单管理、知识库</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-white mb-1">AI营销自动化</div>
                  <div className="text-sm text-white/60">内容生成、用户画像、精准投放、效果分析</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-white mb-1">垂直行业应用</div>
                  <div className="text-sm text-white/60">根据行业特点定制AI解决方案（法律、医疗、教育等）</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-white mb-1">低代码平台</div>
                  <div className="text-sm text-white/60">让企业快速构建自己的AI应用，无需编程</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-10 rounded-3xl bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-blue-900/20 border border-white/10">
          <h4 className="text-2xl font-bold mb-6 text-white text-center">核心价值主张</h4>
          <div className="max-w-4xl mx-auto mb-8">
            <p className="text-white/70 leading-relaxed mb-4">
              KAIROS的双引擎战略是我们的核心创新。基础设施引擎为企业提供稳定、高效、经济的AI API接入能力，解决了"用得上"的问题；SaaS应用引擎则提供行业化、场景化的AI解决方案，解决了"用得好"的问题。这种双轮驱动模式形成了完整的商业闭环，既能快速获客，又能提升客户粘性和生命周期价值。
            </p>
            <p className="text-white/70 leading-relaxed">
              更重要的是，这两个引擎相互赋能：基础设施积累的大量调用数据可以优化SaaS产品的AI能力；SaaS产品的用户反馈又能指导基础设施的功能演进。这种正向循环将帮助我们快速建立竞争壁垒。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">降本增效</div>
              <p className="text-white/70">降低40%+ AI使用成本<br />提升10倍开发效率</p>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">开箱即用</div>
              <p className="text-white/70">5分钟完成接入<br />零技术门槛</p>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">可靠安全</div>
              <p className="text-white/70">99.99%可用性<br />企业级安全保障</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
