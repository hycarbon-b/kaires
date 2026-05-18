export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 animate-fade-in">
          <span className="text-sm text-white/80">融资商业计划书 | 2026年5月</span>
        </div>
        
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 animate-slide-up">
          <span className="gradient-text">KAIROS</span>
        </h1>
        
        <p className="text-2xl md:text-3xl lg:text-4xl font-light mb-8 text-white/90 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          重新定义企业AI基础设施
        </p>
        
        <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
          统一的AI API网关 + 深度集成的SaaS解决方案<br />
          让每个企业都能轻松拥抱AI时代
        </p>
        
        <div className="max-w-4xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <p className="text-lg text-white/60 leading-relaxed mb-4">
            在AI技术快速发展的今天，企业面临着前所未有的机遇与挑战。如何高效、安全、经济地接入和使用AI能力，成为制约企业AI转型的关键瓶颈。KAIROS应运而生，我们不仅提供统一的AI API网关，聚合全球40+主流AI服务商，更通过深度集成的SaaS产品，为企业提供开箱即用的AI解决方案。
          </p>
          <p className="text-lg text-white/60 leading-relaxed">
            我们的使命是让AI技术真正普惠化，降低企业使用AI的门槛和成本，让每一家企业都能在AI时代保持竞争力。无论是初创公司还是大型企业，都能通过KAIROS快速构建自己的AI能力体系。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="text-4xl font-bold gradient-text mb-2">40+</div>
            <div className="text-white/60">AI服务提供商</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="text-4xl font-bold gradient-text mb-2">95%</div>
            <div className="text-white/60">成本节省潜力</div>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <div className="text-4xl font-bold gradient-text mb-2">10x</div>
            <div className="text-white/60">开发效率提升</div>
          </div>
        </div>
      </div>
    </section>
  )
}
