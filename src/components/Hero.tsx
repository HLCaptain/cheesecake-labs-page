import { useEffect, useRef } from 'react'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const els = sectionRef.current.querySelectorAll('.hero-fade-up')
    els.forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), 100 + i * 120)
    })
  }, [])

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16"
    >
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Badge */}
        <div className="hero-fade-up mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-amber-500/10 border border-amber-500/20 text-amber-500 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" aria-hidden="true" />
            AI-Powered Development Studio
          </span>
        </div>

        {/* Headline */}
        <h1
          className="hero-fade-up text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.08] mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Where AI meets{' '}
          <br className="hidden sm:block" />
          <span className="text-gradient">thoughtful design.</span>
        </h1>

        {/* Subtext */}
        <p
          className="hero-fade-up max-w-2xl text-lg sm:text-xl leading-relaxed mb-10"
          style={{ color: 'var(--text-muted)' }}
        >
          CheeseCake Labs pairs{' '}
          <span className="font-medium" style={{ color: 'var(--text-primary)' }}>AI agents</span> with{' '}
          <span className="font-medium" style={{ color: 'var(--text-primary)' }}>senior human developers</span> to
          craft polished frontends and apps — with an obsessive eye for detail. We also help teams
          design efficient AI workflows that actually ship.
        </p>

        {/* CTAs */}
        <div className="hero-fade-up flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => scrollTo('#contact')}
            className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-amber-500 text-[#0a0a0f] hover:bg-amber-400 transition-all duration-200 hover:-translate-y-0.5 min-w-[180px]"
          >
            Start a Conversation
          </button>
          <button
            onClick={() => scrollTo('#why-us')}
            className="px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 min-w-[180px]"
            style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border-soft)' }}
          >
            See Our Approach
          </button>
        </div>
      </div>
    </section>
  )
}
