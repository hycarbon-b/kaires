import { useState, useEffect } from 'react'
import Hero from './sections/Hero'
import Problem from './sections/Problem'
import Solution from './sections/Solution'
import Market from './sections/Market'
import Business from './sections/Business'
import Product from './sections/Product'
import Tech from './sections/Tech'
import Competitive from './sections/Competitive'
import Roadmap from './sections/Roadmap'
import Team from './sections/Team'
import Financial from './sections/Financial'
import Ask from './sections/Ask'
import Navigation from './components/Navigation'

function App() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]')
      const scrollY = window.scrollY

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 100
        const sectionHeight = (section as HTMLElement).offsetHeight
        const sectionId = section.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveSection(sectionId || '')
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation activeSection={activeSection} />
      <Hero />
      <Problem />
      <Solution />
      <Market />
      <Business />
      <Product />
      <Tech />
      <Competitive />
      <Roadmap />
      <Team />
      <Financial />
      <Ask />
    </div>
  )
}

export default App
