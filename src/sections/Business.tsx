export default function Business() {
  return (
    <section id="business" className="min-h-screen flex items-center py-24 px-6">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">商业模式</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            多元化收入来源，持续增长动力
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* 基础设施收入 */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-900/20 to-purple-900/5 border border-purple-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-3xl">🏗️</div>
              <h3 className="text-2xl font-bold text-white">基础设施收入</h3>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white">API调用分成</span>
                  <span className="text-purple-400 font-bold">50%</span>
                </div>
                <p className="text-sm text-white/60">按API调用量抽取5-15%服务费</p>
                <p className="text-xs text-white/40 mt-1">预计占总收入50%</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white">订阅服务</span>
                  <span className="text-purple-400 font-bold">20%</span>
                </div>
                <p className="text-sm text-white/60">企业级功能订阅：¥2,999-19,999/月</p>
                <p className="text-xs text-white/40 mt-1">预计占总收入20%</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white">Chat订阅</span>
                  <span className="text-purple-400 font-bold">10%</span>
                </div>
                <p className="text-sm text-white/60">统一聊天界面订阅：¥99-499/月/用户</p>
                <p className="text-xs text-white/40 mt-1">预计占总收入10%</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white">私有化部署</span>
                  <span className="text-purple-400 font-bold">10%</span>
                </div>
                <p className="text-sm text-white/60">大型企业私有化：¥50万-200万/年</p>
                <p className="text-xs text-white/40 mt-1">预计占总收入10%</p>
              </div>
            </div>
          </div>

          {/* SaaS应用收入 */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-900/20 to-blue-900/5 border border-blue-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="text-3xl">🚀</div>
              <h3 className="text-2xl font-bold text-white">SaaS应用收入</h3>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white">SaaS订阅</span>
                  <span className="text-blue-400 font-bold">35%</span>
                </div>
                <p className="text-sm text-white/60">垂直SaaS应用订阅费</p>
                <div className="mt-2 space-y-1 text-xs text-white/50">
                  <div>• 基础版 ¥999/月（10用户）</div>
                  <div>• 专业版 ¥2,999/月（50用户）</div>
                  <div>• 企业版 ¥9,999/月（无限用户）</div>
                </div>
                <p className="text-xs text-white/40 mt-2">预计占总收入35%</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white">定制开发</span>
                  <span className="text-blue-400 font-bold">15%</span>
                </div>
                <p className="text-sm text-white/60">行业定制解决方案：¥20万-100万/项目</p>
                <p className="text-xs text-white/40 mt-1">预计占总收入15%</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white">应用市场分成</span>
                  <span className="text-blue-400 font-bold">10%</span>
                </div>
                <p className="text-sm text-white/60">第三方应用销售分成（抽成30%）</p>
                <p className="text-xs text-white/40 mt-1">预计占总收入10%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-3xl font-bold gradient-text mb-2">12-24个月</div>
            <p className="text-white/70">客户生命周期价值（LTV）</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-3xl font-bold gradient-text mb-2">3-6个月</div>
            <p className="text-white/70">客户获取成本回收期</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-3xl font-bold gradient-text mb-2">85%+</div>
            <p className="text-white/70">预期客户留存率</p>
          </div>
        </div>

        <div className="p-10 rounded-2xl bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-white/10">
          <h3 className="text-2xl font-bold mb-6 text-white text-center">增长飞轮与商业闭环</h3>
          <div className="max-w-4xl mx-auto mb-8">
            <p className="text-white/70 leading-relaxed mb-4">
              我们的商业模式设计充分考虑了网络效应和规模效应。通过低价、高质量的API服务快速获取大量开发者和企业用户，这些用户的使用数据将帮助我们优化路由算法、提升服务质量；基于积累的行为数据，我们能够精准推荐匹配的SaaS产品，实现从基础设施到应用层的价值提升；满意的用户会带来口碑传播和推荐，形成自增长的获客循环。
            </p>
            <p className="text-white/70 leading-relaxed">
              这个飞轮一旦启动，将产生强大的正向反馈：用户越多，数据越丰富，服务越优质，成本越低，竞争力越强。预计在达到临界规模后（约5000企业用户），我们的边际获客成本将显著降低，毛利率将持续提升。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center mx-auto mb-3 text-2xl">
                1
              </div>
              <p className="font-semibold text-white mb-1">基础设施获客</p>
              <p className="text-sm text-white/60">低价API吸引大量开发者</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center mx-auto mb-3 text-2xl">
                2
              </div>
              <p className="font-semibold text-white mb-1">数据积累</p>
              <p className="text-sm text-white/60">积累使用数据和行为</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center mx-auto mb-3 text-2xl">
                3
              </div>
              <p className="font-semibold text-white mb-1">SaaS转化</p>
              <p className="text-sm text-white/60">推荐垂直SaaS产品</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center mx-auto mb-3 text-2xl">
                4
              </div>
              <p className="font-semibold text-white mb-1">生态扩张</p>
              <p className="text-sm text-white/60">用户带来更多用户</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
