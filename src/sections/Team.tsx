export default function Team() {
  const team = [
    {
      role: '创始人 & CEO',
      name: '待补充',
      bg: '10年+互联网经验，曾任某上市公司技术总监',
      expertise: '战略规划、产品设计、团队管理'
    },
    {
      role: 'CTO',
      name: '待补充',
      bg: '前大厂资深架构师，AI基础设施专家',
      expertise: '系统架构、技术管理、AI工程'
    },
    {
      role: '产品总监',
      name: '待补充',
      bg: '8年+产品经验，B端SaaS产品专家',
      expertise: '产品规划、用户研究、数据分析'
    },
    {
      role: '技术负责人',
      name: '待补充',
      bg: '核心开发团队，全栈工程师',
      expertise: 'Go/React开发、DevOps、系统优化'
    }
  ]

  const advisors = [
    {
      name: '待邀请',
      title: 'AI领域专家',
      desc: '前大厂AI实验室负责人'
    },
    {
      name: '待邀请',
      title: '企业服务专家',
      desc: '成功创业者，多次退出经验'
    },
    {
      name: '待邀请',
      title: '投资顾问',
      desc: '知名投资机构合伙人'
    }
  ]

  return (
    <section id="team" className="min-h-screen flex items-center py-24 px-6 bg-gradient-to-b from-blue-950/10 to-black">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">核心团队</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-6">
            经验丰富的创业团队，技术与商业兼备
          </p>
          <div className="max-w-4xl mx-auto">
            <p className="text-white/60 leading-relaxed">
              一个优秀的团队是创业成功的基石。我们的核心成员在AI技术、企业服务、产品开发等领域都有丰富的实战经验，曾在一线互联网公司负责过大规模系统的设计与实施。更重要的是，我们对AI基础设施这个赛道有深刻的理解和长期的投入决心。我们不是在追逐风口，而是在解决真实的行业痛点，创造长期价值。
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {team.map((member, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-white/20 transition-all"
              style={{
                animation: 'slideUp 0.6s ease-out',
                animationDelay: `${idx * 0.1}s`,
                animationFillMode: 'both'
              }}
            >
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-3xl flex-shrink-0">
                  👤
                </div>
                <div className="flex-1">
                  <div className="text-sm text-purple-400 mb-1">{member.role}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-white/70 mb-3">{member.bg}</p>
                  <div className="text-sm text-white/50">
                    <span className="font-semibold">专长：</span>{member.expertise}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <h3 className="text-3xl font-bold mb-8 text-white text-center">顾问团队</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {advisors.map((advisor, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-2xl mx-auto mb-4">
                  🎯
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{advisor.name}</h4>
                <div className="text-purple-400 mb-2">{advisor.title}</div>
                <p className="text-sm text-white/60">{advisor.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-900/20 to-purple-900/5 border border-purple-500/20">
            <h3 className="text-2xl font-bold mb-6 text-white">团队优势</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">✓</span>
                <div>
                  <div className="font-semibold text-white mb-1">技术实力强</div>
                  <div className="text-sm text-white/60">核心团队来自一线互联网公司，有大规模系统经验</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">✓</span>
                <div>
                  <div className="font-semibold text-white mb-1">行业理解深</div>
                  <div className="text-sm text-white/60">对AI技术和企业服务市场有深刻洞察</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">✓</span>
                <div>
                  <div className="font-semibold text-white mb-1">执行力强</div>
                  <div className="text-sm text-white/60">快速迭代，高效交付，持续学习</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 text-xl">✓</span>
                <div>
                  <div className="font-semibold text-white mb-1">全栈能力</div>
                  <div className="text-sm text-white/60">覆盖技术、产品、运营、销售全链路</div>
                </div>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-900/20 to-blue-900/5 border border-blue-500/20">
            <h3 className="text-2xl font-bold mb-6 text-white">团队扩张计划</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white">当前</span>
                  <span className="text-blue-400 font-bold">5人</span>
                </div>
                <p className="text-sm text-white/60">核心创始团队</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white">6个月</span>
                  <span className="text-blue-400 font-bold">15人</span>
                </div>
                <p className="text-sm text-white/60">扩充研发和运营团队</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white">1年</span>
                  <span className="text-blue-400 font-bold">30人</span>
                </div>
                <p className="text-sm text-white/60">建立销售和客户成功团队</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white">2年</span>
                  <span className="text-blue-400 font-bold">50+人</span>
                </div>
                <p className="text-sm text-white/60">完整的组织架构和团队</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
