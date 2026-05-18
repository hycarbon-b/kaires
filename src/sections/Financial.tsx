export default function Financial() {
  const revenue = [
    { year: '2026 H2', revenue: 300, cost: 250, profit: 50 },
    { year: '2027', revenue: 5000, cost: 3500, profit: 1500 },
    { year: '2028', revenue: 20000, cost: 12000, profit: 8000 },
    { year: '2029', revenue: 60000, cost: 30000, profit: 30000 }
  ]

  const breakdown2027 = [
    { source: 'API调用分成', amount: 2500, percent: 50 },
    { source: 'SaaS订阅', amount: 1750, percent: 35 },
    { source: '订阅服务', amount: 500, percent: 10 },
    { source: '其他', amount: 250, percent: 5 }
  ]

  const costs = [
    { category: '研发', percent: 40, desc: '团队薪资、技术研发' },
    { category: '销售与市场', percent: 30, desc: '获客成本、品牌建设' },
    { category: '运营', percent: 20, desc: '服务器、带宽、第三方服务' },
    { category: '管理', percent: 10, desc: '行政、财务、法务' }
  ]

  return (
    <section id="financial" className="min-h-screen flex items-center py-24 px-6">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">财务规划</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-6">
            清晰的财务模型，可持续的增长路径
          </p>
          <div className="max-w-4xl mx-auto">
            <p className="text-white/60 leading-relaxed">
              我们的财务模型基于保守的市场假设和严谨的成本测算。收入预测考虑了市场增长率、客户获取速度、转化率等关键指标；成本结构则充分考虑了研发投入、市场费用、运营成本等各项支出。我们的目标是在18个月内实现盈亏平衡，并在第三年达到30%的净利润率。这不是激进的增长计划，而是稳健可持续的发展路径。
            </p>
          </div>
        </div>

        {/* 收入预测 */}
        <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 mb-16">
          <h3 className="text-2xl font-bold mb-6 text-white text-center">营收预测（万元）</h3>
          <div className="max-w-3xl mx-auto mb-6">
            <p className="text-white/60 text-sm leading-relaxed">
              以下预测基于保守的市场假设：用户获取成本¥5000/户，平均客单价¥3000/月，年留存率85%，客户生命周期价值LTV/CAC比率约为7:1。我们假设第一年聚焦产品打磨和种子用户积累，第二年开始规模化获客，第三年进入快速增长期。这些数字都经过了详细的市场调研和财务测算，具有较高的可实现性。
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-white/70">年份</th>
                  <th className="text-right py-4 px-4 text-white/70">营收</th>
                  <th className="text-right py-4 px-4 text-white/70">成本</th>
                  <th className="text-right py-4 px-4 text-white/70">利润</th>
                  <th className="text-right py-4 px-4 text-white/70">利润率</th>
                </tr>
              </thead>
              <tbody>
                {revenue.map((row, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-4 px-4 text-white font-semibold">{row.year}</td>
                    <td className="py-4 px-4 text-right text-green-400 font-bold">
                      ¥{row.revenue.toLocaleString()}万
                    </td>
                    <td className="py-4 px-4 text-right text-red-400">
                      ¥{row.cost.toLocaleString()}万
                    </td>
                    <td className="py-4 px-4 text-right text-purple-400 font-bold">
                      ¥{row.profit.toLocaleString()}万
                    </td>
                    <td className="py-4 px-4 text-right text-white/90">
                      {((row.profit / row.revenue) * 100).toFixed(0)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* 收入构成 */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-900/20 to-purple-900/5 border border-purple-500/20">
            <h3 className="text-2xl font-bold mb-6 text-white">2027年收入构成</h3>
            <div className="space-y-4">
              {breakdown2027.map((item, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white">{item.source}</span>
                    <span className="text-purple-400 font-bold">¥{item.amount}万 ({item.percent}%)</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between text-lg">
                <span className="text-white font-bold">总计</span>
                <span className="text-purple-400 font-bold">¥5,000万</span>
              </div>
            </div>
          </div>

          {/* 成本结构 */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-900/20 to-blue-900/5 border border-blue-500/20">
            <h3 className="text-2xl font-bold mb-6 text-white">成本结构</h3>
            <div className="space-y-4">
              {costs.map((cost, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-white">{cost.category}</span>
                    <span className="text-blue-400 font-bold">{cost.percent}%</span>
                  </div>
                  <p className="text-sm text-white/60">{cost.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 关键指标 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-3xl mb-2">💰</div>
            <div className="text-2xl font-bold gradient-text mb-2">¥5000万</div>
            <p className="text-white/70">2027年目标营收</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-3xl mb-2">📈</div>
            <div className="text-2xl font-bold gradient-text mb-2">30%</div>
            <p className="text-white/70">净利润率（成熟期）</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-3xl mb-2">⏱️</div>
            <div className="text-2xl font-bold gradient-text mb-2">18个月</div>
            <p className="text-white/70">预计盈亏平衡时间</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
            <div className="text-3xl mb-2">🚀</div>
            <div className="text-2xl font-bold gradient-text mb-2">200%+</div>
            <p className="text-white/70">年增长率</p>
          </div>
        </div>

        {/* 资金使用计划 */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-white/10">
          <h3 className="text-2xl font-bold mb-8 text-white text-center">本轮融资使用计划</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="text-3xl mb-3">👨‍💻</div>
              <h4 className="font-bold text-white mb-2 text-lg">产品研发 (50%)</h4>
              <ul className="text-sm text-white/70 space-y-1">
                <li>• 扩充研发团队</li>
                <li>• 完善核心功能</li>
                <li>• 开发SaaS产品</li>
                <li>• 技术基础设施</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="text-3xl mb-3">📢</div>
              <h4 className="font-bold text-white mb-2 text-lg">市场营销 (30%)</h4>
              <ul className="text-sm text-white/70 space-y-1">
                <li>• 用户获取</li>
                <li>• 品牌建设</li>
                <li>• 渠道拓展</li>
                <li>• 市场活动</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="text-3xl mb-3">🏢</div>
              <h4 className="font-bold text-white mb-2 text-lg">运营管理 (20%)</h4>
              <ul className="text-sm text-white/70 space-y-1">
                <li>• 团队建设</li>
                <li>• 服务器与带宽</li>
                <li>• 办公与行政</li>
                <li>• 储备资金</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
