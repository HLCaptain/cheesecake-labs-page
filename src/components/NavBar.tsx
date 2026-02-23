import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Contact', href: '#contact' },
]

interface NavBarProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  )
}

export default function NavBar({ theme, onToggleTheme }: NavBarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
      style={scrolled ? { backgroundColor: 'color-mix(in srgb, var(--bg-primary) 90%, transparent)', borderBottom: '1px solid var(--border-soft)' } : undefined}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          className="flex items-center gap-2.5 group"
          aria-label="CheeseCake Labs — Home"
        >
          <span
            className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-base transition-all duration-300 group-hover:bg-amber-500/20 group-hover:border-amber-500/40"
            aria-hidden="true"
          >
            🍰
          </span>
          <span className="font-semibold text-sm tracking-tight" style={{ color: 'var(--text-primary)' }}>
            CheeseCake <span className="text-amber-500">Labs</span>
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm hover:text-amber-500 transition-colors duration-200 relative group"
                style={{ color: 'var(--text-muted)' }}
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-amber-500 transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
          <li>
            <Link
              to="/mindshift"
              className="text-sm hover:text-amber-500 transition-colors duration-200 relative group"
              style={{ color: 'var(--text-muted)' }}
            >
              🧠 MindShift
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-amber-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          </li>
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleTheme}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-200 hover:bg-amber-500/10"
            style={{ border: '1px solid var(--border-soft)', color: 'var(--text-muted)' }}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-amber-500 text-[#0a0a0f] hover:bg-amber-400 active:scale-95 transition-all duration-200"
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-200 hover:bg-amber-500/10"
            style={{ border: '1px solid var(--border-soft)', color: 'var(--text-muted)' }}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            className="flex flex-col gap-1.5 p-2 rounded-md transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className={`w-5 h-0.5 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ backgroundColor: 'var(--text-primary)' }} />
            <span className={`w-5 h-0.5 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} style={{ backgroundColor: 'var(--text-primary)' }} />
            <span className={`w-5 h-0.5 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ backgroundColor: 'var(--text-primary)' }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ backgroundColor: 'var(--bg-surface)', borderTop: '1px solid var(--border-soft)' }}
      >
        <ul className="flex flex-col px-6 py-4 gap-4" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm hover:text-amber-500 transition-colors duration-200 block py-1"
                style={{ color: 'var(--text-muted)' }}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              to="/mindshift"
              className="text-sm hover:text-amber-500 transition-colors duration-200 block py-1"
              style={{ color: 'var(--text-muted)' }}
              onClick={() => setMenuOpen(false)}
            >
              🧠 MindShift
            </Link>
          </li>
          <li>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="inline-block px-4 py-2 text-sm font-medium rounded-lg bg-amber-500 text-[#0a0a0f] hover:bg-amber-400 transition-all duration-200 mt-2"
            >
              Get in Touch
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
