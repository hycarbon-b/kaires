export default function Ask() {
  return (
    <section id="ask" className="min-h-screen flex items-center py-24 px-6 bg-gradient-to-b from-black via-purple-950/20 to-black">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">融资需求</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-6">
            寻找志同道合的投资伙伴，共同打造AI时代的基础设施
          </p>
          <div className="max-w-4xl mx-auto">
            <p className="text-white/60 leading-relaxed">
              我们不仅在寻找资金支持，更在寻找能够认同我们愿景、理解AI基础设施价值的战略伙伴。理想的投资人应该在企业服务、AI/云计算等领域有丰富的资源和经验，能够在业务拓展、团队建设、战略规划等方面为我们提供支持。我们相信，好的投资人不仅是资金提供者，更是企业成长的助推器。让我们一起，在AI时代创造真正的价值。
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* 融资金额 */}
          <div className="p-12 rounded-3xl bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 mb-12 text-center">
            <div className="text-sm text-purple-300 mb-4 uppercase tracking-wider">Pre-A轮融资</div>
            <div className="text-7xl font-bold gradient-text mb-6">¥1000万</div>
            <p className="text-xl text-white/80 mb-8">出让股权：10-15%</p>
            <div className="flex items-center justify-center gap-8">
              <div>
                <div className="text-2xl font-bold text-white mb-1">12-18个月</div>
                <div className="text-sm text-white/60">资金使用周期</div>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <div className="text-2xl font-bold text-white mb-1">¥2-5亿</div>
                <div className="text-sm text-white/60">预期估值（A轮）</div>
              </div>
            </div>
          </div>

          {/* 里程碑 */}
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 mb-12">
            <h3 className="text-2xl font-bold mb-6 text-white text-center">融资后关键里程碑</h3>
            <div className="max-w-3xl mx-auto mb-6">
              <p className="text-white/60 leading-relaxed">
                本轮融资将主要用于产品研发、市场拓展和团队建设。我们制定了清晰的里程碑计划，每个阶段都有明确的目标和可量化的指标。这不仅是对投资人的承诺，更是我们团队的行动指南。我们深知，只有踏踏实实地完成每个阶段的目标，才能最终实现长期愿景。
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center flex-shrink-0 text-sm font-bold text-purple-300">
                  6m
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">产品完善 & 用户增长</div>
                  <div className="text-sm text-white/60">完成核心功能开发，用户数突破1000，月收入50万</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center flex-shrink-0 text-sm font-bold text-purple-300">
                  12m
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">规模化增长</div>
                  <div className="text-sm text-white/60">企业客户100+，月收入200万，团队扩充至30人</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center flex-shrink-0 text-sm font-bold text-purple-300">
                  18m
                </div>
                <div>
                  <div className="font-semibold text-white mb-1">市场领先</div>
                  <div className="text-sm text-white/60">年收入5000万，成为行业头部玩家，启动A轮融资</div>
                </div>
              </div>
            </div>
          </div>

          {/* 投资亮点 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/20 to-purple-900/5 border border-purple-500/20">
              <h4 className="text-xl font-bold mb-4 text-white">为什么是现在？</h4>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>AI市场爆发式增长，3-5年窗口期</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>企业AI需求旺盛，市场空白明显</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>技术成熟，商业模式清晰</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">•</span>
                  <span>先发优势建立品牌和网络效应</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-900/20 to-blue-900/5 border border-blue-500/20">
              <h4 className="text-xl font-bold mb-4 text-white">退出路径</h4>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>战略并购：云厂商、大型企业服务公司</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>IPO：3-5年内科创板/港股/美股上市</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>后续轮次：A/B轮高估值退出</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">•</span>
                  <span>预期回报：5-10倍投资回报率</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 寻找投资人 */}
          <div className="p-10 rounded-2xl bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-blue-900/20 border border-white/10 text-center">
            <h3 className="text-3xl font-bold mb-6 text-white">我们在寻找</h3>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              认同我们愿景，理解AI基础设施价值，能够提供资金之外的资源支持（行业人脉、销售渠道、技术顾问等）的投资伙伴
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white">
                ✓ 企业服务赛道经验
              </div>
              <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white">
                ✓ AI/云计算行业资源
              </div>
              <div className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white">
                ✓ 长期价值投资理念
              </div>
            </div>
          </div>

          {/* 联系方式 */}
          <div className="mt-12 text-center">
            <div className="inline-block p-8 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-lg text-white/80 mb-4">如果您对我们的项目感兴趣</div>
              <div className="text-2xl font-bold gradient-text mb-2">欢迎联系我们</div>
              <div className="text-white/60 mb-6">
                <div>邮箱：contact@kairos.ai</div>
                <div>微信：待补充</div>
              </div>
              <div className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:scale-105 transition-transform cursor-pointer">
                预约路演
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-8 text-center text-white/40 text-sm border-t border-white/5">
        <p>KAIROS © 2026 | 商业计划书 - 机密文件，请勿外传</p>
      </div>
    </section>
  )
}
