import { useEffect } from 'react'
import MSNavBar from '../components/mindshift/MSNavBar'
import MSHero from '../components/mindshift/MSHero'
import MSFeatures from '../components/mindshift/MSFeatures'
import MSHowItWorks from '../components/mindshift/MSHowItWorks'
import MSSocialProof from '../components/mindshift/MSSocialProof'
import MSReachOut from '../components/mindshift/MSReachOut'
import MSFooter from '../components/mindshift/MSFooter'
import { setRouteMetadata } from '../routeMetadata'

interface MindShiftPageProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

export default function MindShiftPage({ theme, onToggleTheme }: MindShiftPageProps) {
  useEffect(() => {
    setRouteMetadata({
      title: 'MindShift — Digital Wellbeing',
      description: 'MindShift helps you interrupt distracting app use and replace it with intentional activities that fit your routine.',
      favicon: `${import.meta.env.BASE_URL}favicon-mindshift.svg`,
    })
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
