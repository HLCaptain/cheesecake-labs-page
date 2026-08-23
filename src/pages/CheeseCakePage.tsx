import { useEffect } from 'react'
import NavBar from '../components/NavBar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import HowItWorks from '../components/HowItWorks'
import SocialProof from '../components/SocialProof'
import ReachOut from '../components/ReachOut'
import Footer from '../components/Footer'
import { setRouteMetadata } from '../routeMetadata'

interface CheeseCakePageProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

export default function CheeseCakePage({ theme, onToggleTheme }: CheeseCakePageProps) {
  useEffect(() => {
    setRouteMetadata({
      title: 'CheeseCake Labs — Next-Gen AI Development',
      description: 'CheeseCake Labs pairs AI agents with senior developers to build polished frontends, apps, and practical AI workflows.',
      favicon: `${import.meta.env.BASE_URL}favicon.svg`,
    })
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
