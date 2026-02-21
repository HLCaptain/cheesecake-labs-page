import { useEffect, useState } from 'react'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import SocialProof from './components/SocialProof'
import ReachOut from './components/ReachOut'
import Footer from './components/Footer'

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark'
    const savedTheme = window.localStorage.getItem('theme')
    return savedTheme === 'light' ? 'light' : 'dark'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <div className="min-h-screen font-sans transition-colors duration-200" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      <NavBar theme={theme} onToggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))} />
      <main>
        <Hero theme={theme} />
        <Features />
        <HowItWorks />
        <SocialProof />
        <ReachOut />
      </main>
      <Footer />
    </div>
  )
}

export default App
