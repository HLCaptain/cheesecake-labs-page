import NavBar from './components/NavBar'
import Hero from './components/Hero'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import SocialProof from './components/SocialProof'
import ReachOut from './components/ReachOut'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-cream font-sans">
      <NavBar />
      <main>
        <Hero />
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
