import { useEffect, useRef } from 'react'
import { useCardTilt } from '../hooks/useCardTilt'

interface PhilosophyCard {
  icon: React.ReactNode
  title: string
  description: string
}

const cards: PhilosophyCard[] = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: 'Human + AI Collaboration',
    description:
      'We don\'t replace developers with AI — we amplify them. Our AI agents handle the tedious parts while senior humans make the creative decisions that matter.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: 'Obsessed with Detail',
    description:
      'Every interaction, every pixel, every state. We believe great products are built in the margins — the small touches that make users feel cared for.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: 'Startup Agility, Studio Quality',
    description:
      'We\'re a small, focused team that moves fast without sacrificing craft. No layers of management — just direct collaboration and honest communication.',
  },
]

export default function SocialProof() {
  const sectionRef = useRef<HTMLElement>(null)
  const { handleMouseMove: handleTiltMove, handleMouseLeave: handleTiltLeave } = useCardTilt()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.animate-on-scroll').forEach((el) => {
              el.classList.add('visible')
            })
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="why-us" ref={sectionRef} className="py-28 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="animate-on-scroll delay-100">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 border border-amber-500/20 text-amber-500 mb-4 tracking-wide uppercase">
              Our Philosophy
            </span>
          </div>
          <h2 className="animate-on-scroll delay-200 text-4xl sm:text-5xl font-bold tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>
            Why <span className="text-gradient">CheeseCake Labs?</span>
          </h2>
          <p className="animate-on-scroll delay-300 max-w-xl mx-auto text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            We're building something new — a studio where AI and human craft
            come together to create interfaces people genuinely enjoy using.
          </p>
        </div>

        {/* Philosophy cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {cards.map((card, i) => {
            const delayClass = ['delay-200', 'delay-300', 'delay-400'][i]
            return (
              <div
                key={card.title}
                className={`animate-on-scroll ${delayClass} group p-8 rounded-2xl transition-all duration-200`}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-soft)',
                  willChange: 'transform',
                }}
                onMouseMove={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)'
                  handleTiltMove(e)
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-surface)'
                  handleTiltLeave(e)
                }}
              >
                <div className="mb-5 w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center text-amber-500 group-hover:bg-amber-500/15 group-hover:border-amber-500/25 transition-all duration-300">
                  {card.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{card.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{card.description}</p>
              </div>
            )
          })}
        </div>

        {/* Founder vision quote */}
        <div className="animate-on-scroll delay-500 relative max-w-2xl mx-auto text-center">
          <div
            className="p-8 rounded-2xl"
            style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-soft)' }}
          >
            <p className="text-lg italic leading-relaxed mb-4" style={{ color: 'var(--text-primary)' }}>
              "We started CheeseCake Labs because we believe the best products come from
              combining AI's speed with human intuition. We're not the biggest studio — we're
              the one that cares the most about getting the details right."
            </p>
            <p className="text-sm font-medium text-amber-500">— The CheeseCake Labs Team</p>
          </div>
        </div>
      </div>
    </section>
  )
}
