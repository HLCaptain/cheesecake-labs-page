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
