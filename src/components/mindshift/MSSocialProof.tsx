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
    title: 'The Challenge',
    description:
      'Many people spend more time on social media than they intend to, leaving less room for the activities they actually enjoy. MindShift is here to help you find that balance.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    ),
    title: 'Why Alternatives Fall Short',
    description:
      'Existing tools like screen time trackers or browser blockers tend to fade into the background after a few weeks. They don\'t enforce real habit changes. MindShift is different — it actively blocks apps and takes action when you open them, keeping you on track.',
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
              Our Mission
            </span>
          </div>
          <h2 className="animate-on-scroll delay-200 text-4xl sm:text-5xl font-bold tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>
            Why <span className="text-gradient-teal">MindShift</span>?
          </h2>
          <p className="animate-on-scroll delay-300 max-w-xl mx-auto text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            We noticed that many people around us wanted to spend less time on social media
            but struggled to make it happen. MindShift is our answer to that challenge.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 max-w-4xl mx-auto">
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
              not hold them back. Our goal is to help everyone regain control of their
              time and discover activities that truly feel rewarding."
            </p>
            <p className="text-sm font-medium text-teal-500">— The MindShift Team</p>
          </div>
        </div>
      </div>
    </section>
  )
}
