export default function Problem() {
  const problems = [
    {
      icon: '💸',
      title: 'API成本失控',
      description: '企业直连多个AI服务商，缺乏统一管理和成本控制，平均超支40%+'
    },
    {
      icon: '🔧',
      title: '集成复杂度高',
      description: '每个AI服务商都有不同的接口标准，开发团队需要维护多套SDK和适配代码'
    },
    {
      icon: '⚡',
      title: '服务稳定性差',
      description: '单一服务商故障会导致业务中断，缺乏自动故障转移和负载均衡机制'
    },
    {
      icon: '🔐',
      title: '安全合规风险',
      description: 'API密钥分散管理，缺乏统一的权限控制和审计追踪，存在数据泄露风险'
    },
    {
      icon: '📊',
      title: '数据孤岛严重',
      description: '使用数据分散在各个服务商，无法统一分析和优化，难以做出数据驱动的决策'
    },
    {
      icon: '🚀',
      title: 'AI应用门槛高',
      description: '中小企业缺乏技术能力和资源来构建AI应用，错失AI转型机遇'
    }
  ]

  return (
    <section id="problem" className="min-h-screen flex items-center py-24 px-6">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">我们看到的问题</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            企业在AI时代面临的六大核心痛点
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
              style={{
                animation: 'slideUp 0.6s ease-out',
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both'
              }}
            >
              <div className="text-5xl mb-4">{problem.icon}</div>
              <h3 className="text-2xl font-bold mb-3 text-white">{problem.title}</h3>
              <p className="text-white/60 leading-relaxed">{problem.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 p-10 rounded-2xl bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-white/10">
          <p className="text-2xl text-center text-white/90 leading-relaxed mb-6">
            企业在AI转型过程中，急需一个<span className="gradient-text font-bold">统一、可靠、经济</span>的基础设施层来解决这些问题
          </p>
          <div className="max-w-4xl mx-auto space-y-4 text-white/70">
            <p className="leading-relaxed">
              根据我们的市场调研，超过70%的企业在AI应用落地过程中遇到了技术和成本双重障碍。技术团队需要花费大量时间研究各个AI服务商的接口差异，运维团队要面对复杂的监控和故障处理，而管理层则为不断攀升的AI成本感到焦虑。
            </p>
            <p className="leading-relaxed">
              更严重的是，这些问题不仅增加了企业的显性成本，更拖慢了AI创新的速度，让企业在快速变化的市场中失去先机。我们深知，只有从根本上解决这些痛点，才能真正释放AI技术的价值，推动产业数字化升级。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
