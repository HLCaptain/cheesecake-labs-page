import { useEffect, useRef } from 'react'

interface Step {
  number: string
  title: string
  description: string
  detail: string
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Discovery',
    description: 'Deep dive into your product',
    detail:
      'We analyze your product requirements, technical stack, user needs, and business goals. A thorough discovery sprint ensures we align on vision and constraints before writing a single line of code.',
  },
  {
    number: '02',
    title: 'AI-Augmented Planning',
    description: 'Plan with practical speed',
    detail:
      'Our AI agents accelerate architecture design, component planning, and technical documentation. What typically takes weeks of back-and-forth is condensed into days of precise, actionable roadmaps.',
  },
  {
    number: '03',
    title: 'Expert Development',
    description: 'Experienced developers, thoughtful delivery',
    detail:
      'Senior human developers execute the build with care — pixel-perfect UI, clean architecture, and thorough code reviews. AI handles repetitive tasks so your team can focus on what makes the product unique.',
  },
  {
    number: '04',
    title: 'Deliver & Optimize',
    description: 'Ship, measure, improve',
    detail:
      'Regular releases with quality checks and staging previews keep stakeholders aligned. We can also help your team adopt better AI workflows and tooling to maintain momentum long after we\'re done.',
  },
]

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)

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
      { threshold: 0.05 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-28 px-6 relative"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="animate-on-scroll delay-100">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 border border-amber-500/20 text-amber-500 mb-4 tracking-wide uppercase">
              Process
            </span>
          </div>
          <h2 className="animate-on-scroll delay-200 text-4xl sm:text-5xl font-bold tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>
            How it <span className="text-gradient">works</span>
          </h2>
          <p className="animate-on-scroll delay-300 max-w-xl mx-auto text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            A straightforward process designed to get from first conversation to
            first deploy with clarity at every step.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-6">
          {steps.map((step, i) => {
            const delayClass = ['delay-100', 'delay-200', 'delay-300', 'delay-400'][i]
            return (
              <div
                key={step.number}
                className={`animate-on-scroll ${delayClass} group p-7 rounded-2xl transition-colors duration-200`}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-soft)',
                  willChange: 'transform',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)' }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-surface)' }}
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-amber-500">{step.number}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{step.title}</h3>
                    <p className="text-sm font-medium text-amber-500/70 mb-2">{step.description}</p>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{step.detail}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
