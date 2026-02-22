import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import MindShiftPage from './pages/MindShiftPage'
import CheeseCakePage from './pages/CheeseCakePage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

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

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen font-sans transition-colors duration-200" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/mindshift" replace />} />
          <Route path="/mindshift" element={<MindShiftPage theme={theme} onToggleTheme={toggleTheme} />} />
          <Route path="/cheesecake" element={<CheeseCakePage theme={theme} onToggleTheme={toggleTheme} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
