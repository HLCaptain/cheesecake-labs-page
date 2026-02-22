import { useEffect } from 'react'
import MSNavBar from '../components/mindshift/MSNavBar'
import MSHero from '../components/mindshift/MSHero'
import MSFeatures from '../components/mindshift/MSFeatures'
import MSHowItWorks from '../components/mindshift/MSHowItWorks'
import MSSocialProof from '../components/mindshift/MSSocialProof'
import MSReachOut from '../components/mindshift/MSReachOut'
import MSFooter from '../components/mindshift/MSFooter'

interface MindShiftPageProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

export default function MindShiftPage({ theme, onToggleTheme }: MindShiftPageProps) {
  useEffect(() => {
    document.title = 'MindShift — Digital Wellbeing'
    const link = document.querySelector("link[rel='icon']") as HTMLLinkElement | null
    if (link) link.href = '/favicon-mindshift.svg'
  }, [])

  return (
    <>
      <MSNavBar theme={theme} onToggleTheme={onToggleTheme} />
      <main>
        <MSHero theme={theme} />
        <MSFeatures />
        <MSHowItWorks />
        <MSSocialProof />
        <MSReachOut />
      </main>
      <MSFooter />
    </>
  )
}
