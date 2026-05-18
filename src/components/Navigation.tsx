interface NavigationProps {
  activeSection: string
}

export default function Navigation({ activeSection }: NavigationProps) {
  const sections = [
    { id: 'hero', label: '概览' },
    { id: 'problem', label: '问题' },
    { id: 'solution', label: '解决方案' },
    { id: 'market', label: '市场' },
    { id: 'business', label: '商业模式' },
    { id: 'product', label: '产品' },
    { id: 'tech', label: '技术' },
    { id: 'competitive', label: '竞争优势' },
    { id: 'roadmap', label: '路线图' },
    { id: 'team', label: '团队' },
    { id: 'financial', label: '财务' },
    { id: 'ask', label: '融资' },
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      })
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="text-xl font-bold gradient-text">KAIROS</div>
          <div className="hidden lg:flex items-center gap-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeSection === section.id
                    ? 'bg-white/10 text-white'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
