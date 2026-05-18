export default function Market() {
  return (
    <section id="market" className="min-h-screen flex items-center py-24 px-6 bg-gradient-to-b from-black to-purple-950/10">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">市场机遇</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            AI基础设施市场正在爆发式增长
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-3xl font-bold mb-6 text-white">市场规模</h3>
            <div className="space-y-6">
              <div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-bold gradient-text">$250B</span>
                  <span className="text-white/60">2026年</span>
                </div>
                <p className="text-white/70">全球AI服务市场规模</p>
              </div>
              <div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-bold gradient-text">$850B</span>
                  <span className="text-white/60">2030年预测</span>
                </div>
                <p className="text-white/70">年复合增长率 35.8%</p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold gradient-text">¥120B</span>
                  <span className="text-white/60">中国市场</span>
                </div>
                <p className="text-white/70">2026年中国AI服务市场规模</p>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-3xl font-bold mb-6 text-white">目标客户</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white">中大型企业</span>
                  <span className="text-purple-400">40%</span>
                </div>
                <p className="text-sm text-white/60">需要统一AI基础设施，降本增效</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white">中小企业</span>
                  <span className="text-purple-400">35%</span>
                </div>
                <p className="text-sm text-white/60">寻求开箱即用的AI SaaS解决方案</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white">开发者/团队</span>
                  <span className="text-purple-400">15%</span>
                </div>
                <p className="text-sm text-white/60">需要快速集成AI能力</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white">行业方案商</span>
                  <span className="text-purple-400">10%</span>
                </div>
                <p className="text-sm text-white/60">构建垂直行业AI应用</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/20 to-purple-900/5 border border-purple-500/20 text-center">
            <div className="text-4xl mb-3">🌍</div>
            <div className="text-3xl font-bold gradient-text mb-2">90%+</div>
            <p className="text-white/70">企业计划在2026年<br />增加AI投入</p>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900/20 to-blue-900/5 border border-blue-500/20 text-center">
            <div className="text-4xl mb-3">💼</div>
            <div className="text-3xl font-bold gradient-text mb-2">75%</div>
            <p className="text-white/70">企业认为AI基础设施<br />是核心竞争力</p>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-pink-900/20 to-pink-900/5 border border-pink-500/20 text-center">
            <div className="text-4xl mb-3">⚡</div>
            <div className="text-3xl font-bold gradient-text mb-2">3-5年</div>
            <p className="text-white/70">市场窗口期<br />先发优势明显</p>
          </div>
        </div>

        <div className="p-10 rounded-2xl bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-white/10">
          <h3 className="text-2xl font-bold mb-6 text-white text-center">竞争格局与市场机会</h3>
          <div className="max-w-4xl mx-auto mb-6">
            <p className="text-white/70 leading-relaxed mb-4">
              当前AI基础设施市场呈现出"群雄割据"的局面。国际巨头OpenAI、Anthropic专注于模型研发，但不提供企业级的网关服务；AWS、Azure等云厂商虽然提供了部分AI能力，但存在严重的厂商锁定问题，且成本高昂；Kong、Apigee等传统API网关厂商虽然成熟，但缺乏针对AI场景的深度优化。
            </p>
            <p className="text-white/70 leading-relaxed">
              国内市场更是存在明显的供需错配。大厂主推自有模型，开放性差，中小企业难以获得多样化的AI能力；初创公司提供的API代理服务功能单一，稳定性差，缺乏完整的产品生态。这为KAIROS创造了绝佳的市场切入机会——我们既不绑定特定模型，也不局限于单纯的API代理，而是构建完整的AI基础设施+应用生态。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-white mb-3">国际玩家</h4>
              <ul className="space-y-2 text-white/70">
                <li>• OpenAI、Anthropic：专注模型开发，不提供网关服务</li>
                <li>• AWS、Azure、GCP：云厂商方案，绑定生态，成本高</li>
                <li>• Kong、Apigee：通用API网关，缺乏AI优化</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">国内现状</h4>
              <ul className="space-y-2 text-white/70">
                <li>• 阿里、腾讯、字节：主推自有模型，开放性差</li>
                <li>• 初创公司：功能单一，缺乏SaaS生态</li>
                <li>• <span className="gradient-text font-semibold">市场空白：统一网关+SaaS双引擎</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
