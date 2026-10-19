import { useEffect, useState } from 'react'
import { BrowserRouter, HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import MindShiftPage from './pages/MindShiftPage'
import MindShiftPrivacyPage from './pages/MindShiftPrivacyPage'
import MindShiftTermsPage from './pages/MindShiftTermsPage'
import CheeseCakePage from './pages/CheeseCakePage'

const Router = import.meta.env.VITE_ROUTER_MODE === 'history' ? BrowserRouter : HashRouter

function RouteEffects() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    const canonical = new URL(pathname, 'https://cheesecakelabs.dev').href
    document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', canonical)
    document.querySelector<HTMLMetaElement>('meta[property="og:url"]')?.setAttribute('content', canonical)
  }, [pathname])
  return null
}

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window === 'undefined') return 'dark'
    try {
      return window.localStorage.getItem('theme') === 'light' ? 'light' : 'dark'
    } catch {
      return 'dark'
    }
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      window.localStorage.setItem('theme', theme)
    } catch {
      // Theme changes still work when browser storage is unavailable.
    }
  }, [theme])

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

  return (
    <Router>
      <RouteEffects />
      <div className="min-h-screen font-sans transition-colors duration-200" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/mindshift" replace />} />
          <Route path="/mindshift" element={<MindShiftPage theme={theme} onToggleTheme={toggleTheme} />} />
          <Route path="/mindshift/privacy" element={<MindShiftPrivacyPage theme={theme} onToggleTheme={toggleTheme} />} />
          <Route path="/mindshift/terms" element={<MindShiftTermsPage theme={theme} onToggleTheme={toggleTheme} />} />
          <Route path="/cheesecake" element={<CheeseCakePage theme={theme} onToggleTheme={toggleTheme} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
