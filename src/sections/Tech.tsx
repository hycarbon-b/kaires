export default function Tech() {
  return (
    <section id="tech" className="min-h-screen flex items-center py-24 px-6">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">技术架构</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-6">
            企业级技术栈，确保高性能、高可用、高安全
          </p>
          <div className="max-w-4xl mx-auto">
            <p className="text-white/60 leading-relaxed">
              技术是我们的核心竞争力。我们选择Go语言作为后端开发语言，充分利用其原生协程和高并发特性；前端采用React 19和TypeScript，保证开发效率和代码质量；数据库支持SQLite、MySQL、PostgreSQL三种方案，满足不同规模企业的需求。整个系统采用云原生架构，支持Docker容器化部署和Kubernetes编排，可以轻松实现水平扩展和弹性伸缩。这些技术选型都经过了生产环境的充分验证，能够支撑百万级用户规模。
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10">
            <h3 className="text-2xl font-bold mb-6 text-white">后端架构</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-white mb-1">Go 1.22+</div>
                  <div className="text-sm text-white/60">高性能并发处理，原生协程支持</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-white mb-1">Gin Web Framework</div>
                  <div className="text-sm text-white/60">轻量级高性能HTTP框架</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-white mb-1">GORM v2</div>
                  <div className="text-sm text-white/60">强大的ORM，支持多种数据库</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-white mb-1">Redis缓存</div>
                  <div className="text-sm text-white/60">高速缓存，降低数据库压力</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10">
            <h3 className="text-2xl font-bold mb-6 text-white">前端架构</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-white mb-1">React 19</div>
                  <div className="text-sm text-white/60">现代化UI框架，组件化开发</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-white mb-1">TypeScript</div>
                  <div className="text-sm text-white/60">类型安全，减少运行时错误</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-white mb-1">Rsbuild + Vite</div>
                  <div className="text-sm text-white/60">快速构建工具，极速开发体验</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-white mb-1">Tailwind CSS</div>
                  <div className="text-sm text-white/60">原子化CSS，高度可定制</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-10 rounded-2xl bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-blue-900/20 border border-white/10 mb-16">
          <h3 className="text-2xl font-bold mb-8 text-white text-center">核心技术能力</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="text-3xl mb-3">⚡</div>
              <h4 className="font-bold text-white mb-2">高性能</h4>
              <ul className="text-sm text-white/70 space-y-1">
                <li>• 单机10万+ QPS</li>
                <li>• 平均延迟 &lt;50ms</li>
                <li>• 流式响应优化</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="text-3xl mb-3">🛡️</div>
              <h4 className="font-bold text-white mb-2">高可用</h4>
              <ul className="text-sm text-white/70 space-y-1">
                <li>• 99.99% SLA保证</li>
                <li>• 自动故障切换</li>
                <li>• 多区域部署</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="text-3xl mb-3">🔒</div>
              <h4 className="font-bold text-white mb-2">高安全</h4>
              <ul className="text-sm text-white/70 space-y-1">
                <li>• 端到端加密</li>
                <li>• OAuth 2.0 / JWT</li>
                <li>• WebAuthn支持</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="text-3xl mb-3">📈</div>
              <h4 className="font-bold text-white mb-2">可扩展</h4>
              <ul className="text-sm text-white/70 space-y-1">
                <li>• 水平扩展</li>
                <li>• 插件化架构</li>
                <li>• 微服务支持</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="text-3xl mb-3">🔍</div>
              <h4 className="font-bold text-white mb-2">可观测</h4>
              <ul className="text-sm text-white/70 space-y-1">
                <li>• 实时监控</li>
                <li>• 链路追踪</li>
                <li>• 日志聚合</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="text-3xl mb-3">🌐</div>
              <h4 className="font-bold text-white mb-2">多租户</h4>
              <ul className="text-sm text-white/70 space-y-1">
                <li>• 数据隔离</li>
                <li>• 权限管理</li>
                <li>• 资源配额</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-2xl font-bold mb-6 text-white">技术护城河</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🧠</span>
                <div>
                  <div className="font-semibold text-white mb-1">智能调度算法</div>
                  <div className="text-sm text-white/60">基于机器学习的请求路由优化</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">📊</span>
                <div>
                  <div className="font-semibold text-white mb-1">大数据分析</div>
                  <div className="text-sm text-white/60">积累的用户行为数据和模型性能数据</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔌</span>
                <div>
                  <div className="font-semibold text-white mb-1">全模型适配</div>
                  <div className="text-sm text-white/60">40+主流AI服务商深度集成</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-2xl font-bold mb-6 text-white">技术专利布局</h3>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-white/5">
                <div className="text-white/90">AI API智能路由方法（申请中）</div>
              </div>
              <div className="p-3 rounded-lg bg-white/5">
                <div className="text-white/90">多模型成本优化系统（申请中）</div>
              </div>
              <div className="p-3 rounded-lg bg-white/5">
                <div className="text-white/90">分布式AI请求调度算法（规划）</div>
              </div>
              <div className="p-3 rounded-lg bg-white/5">
                <div className="text-white/90">AI应用低代码生成平台（规划）</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
