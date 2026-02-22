import { useEffect, useRef } from 'react'
import { useCardTilt } from '../../hooks/useCardTilt'

interface Card {
  icon: React.ReactNode
  title: string
  description: string
}

const cards: Card[] = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: 'For Individuals',
    description:
      'Take charge of your daily habits. Block distracting apps, journal your thoughts, and track the habits that matter most — all in one beautiful app.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: 'For Companies',
    description:
      'Offer MindShift as a wellbeing benefit to your employees. The admin dashboard lets HR teams track engagement, set team goals, and support mental health at scale.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
      </svg>
    ),
    title: 'For Schools',
    description:
      'Help students stay focused during study hours by blocking distracting apps on their devices. Teachers and administrators can manage policies from a central dashboard.',
  },
]

export default function MSSocialProof() {
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
    <section id="ms-who-its-for" ref={sectionRef} className="py-28 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="animate-on-scroll delay-100">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-teal-500/10 border border-teal-500/20 text-teal-500 mb-4 tracking-wide uppercase">
              Who It's For
            </span>
          </div>
          <h2 className="animate-on-scroll delay-200 text-4xl sm:text-5xl font-bold tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>
            Built for <span className="text-gradient-teal">everyone who cares</span>
          </h2>
          <p className="animate-on-scroll delay-300 max-w-xl mx-auto text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Whether you're an individual seeking balance, a company investing
            in employee wellbeing, or a school protecting students — MindShift adapts to you.
          </p>
        </div>

        {/* Cards */}
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
                onMouseMove={handleTiltMove}
                onMouseLeave={handleTiltLeave}
              >
                <div className="mb-5 w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/15 flex items-center justify-center text-teal-500 group-hover:bg-teal-500/15 group-hover:border-teal-500/25 transition-all duration-300">
                  {card.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{card.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{card.description}</p>
              </div>
            )
          })}
        </div>

        {/* Vision quote */}
        <div className="animate-on-scroll delay-500 relative max-w-2xl mx-auto text-center">
          <div
            className="p-8 rounded-2xl"
            style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-soft)' }}
          >
            <p className="text-lg italic leading-relaxed mb-4" style={{ color: 'var(--text-primary)' }}>
              "We built MindShift because we believe technology should empower people,
              not enslave them. Our mission is to help everyone — from students to
              professionals — reclaim their time and build habits that last."
            </p>
            <p className="text-sm font-medium text-teal-500">— The MindShift Team</p>
          </div>
        </div>
      </div>
    </section>
  )
}
