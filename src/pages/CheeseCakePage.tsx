import { useEffect } from 'react'
import NavBar from '../components/NavBar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import SocialProof from '../components/SocialProof'
import ReachOut from '../components/ReachOut'
import Footer from '../components/Footer'

interface CheeseCakePageProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

export default function CheeseCakePage({ theme, onToggleTheme }: CheeseCakePageProps) {
  useEffect(() => {
    document.title = 'CheeseCake Labs — Next-Gen AI Development'
    const link = document.querySelector("link[rel='icon']") as HTMLLinkElement | null
    if (link) link.href = '/favicon.svg'
  }, [])

  return (
    <>
      <NavBar theme={theme} onToggleTheme={onToggleTheme} />
      <main>
        <Hero theme={theme} />
        <Features />
        <HowItWorks />
        <SocialProof />
        <ReachOut />
      </main>
      <Footer />
    </>
  )
}
