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
      'Senior human developers execute the build with surgical precision — pixel-perfect UI, clean architecture, and thorough code reviews. AI handles the repetitive heavy lifting so your team can focus on uniqueness.',
  },
  {
    number: '04',
    title: 'Continuous Delivery',
    description: 'Ship, measure, iterate',
    detail:
      'Regular releases with automated quality checks, staging environments, and stakeholder previews. Our iteration loops are tight — feedback on Monday can be live by Wednesday.',
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
    <section id="how-it-works" ref={sectionRef} className="py-28 px-6 bg-[#0d0d14] relative overflow-hidden">
      {/* Background orbs */}
      <div className="orb w-[400px] h-[400px] bg-amber-500/5 -bottom-20 -left-20" aria-hidden="true" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="animate-on-scroll delay-100">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-4 tracking-wide uppercase">
              Process
            </span>
          </div>
          <h2 className="animate-on-scroll delay-200 text-4xl sm:text-5xl font-bold tracking-tight text-cream mb-4">
            How it <span className="text-gradient">works</span>
          </h2>
          <p className="animate-on-scroll delay-300 max-w-xl mx-auto text-cream-muted text-lg leading-relaxed">
            A streamlined engagement model for enterprise teams that need
            consistent delivery — from first call to first deploy.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical connector line (desktop) */}
          <div
            className="hidden lg:block absolute left-[calc(50%-1px)] top-8 bottom-8 w-px"
            style={{
              background:
                'linear-gradient(to bottom, transparent, rgba(245,158,11,0.2) 15%, rgba(245,158,11,0.2) 85%, transparent)',
            }}
            aria-hidden="true"
          />

          <div className="flex flex-col gap-12 lg:gap-0">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0
              return (
                <div
                  key={step.number}
                  className={`animate-on-scroll ${['delay-100', 'delay-200', 'delay-300', 'delay-400'][i]} relative flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-0 ${
                    isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } lg:mb-16 last:mb-0`}
                >
                  {/* Content */}
                  <div className={`w-full lg:w-[calc(50%-3rem)] ${isLeft ? 'lg:pr-12 lg:text-right' : 'lg:pl-12'}`}>
                    <div
                        className={`group p-7 rounded-2xl border border-white/5 bg-[#111118] hover:bg-[#1a1a24] hover:border-amber-500/15 transition-colors duration-200`}
                    >
                      <span className="inline-block text-[11px] font-bold text-amber-500 tracking-widest uppercase mb-2">
                        Step {step.number}
                      </span>
                      <h3 className="text-xl font-semibold text-cream mb-1">{step.title}</h3>
                      <p className="text-sm font-medium text-amber-500/70 mb-3">{step.description}</p>
                      <p className="text-sm text-cream-muted leading-relaxed">{step.detail}</p>
                    </div>
                  </div>

                  {/* Center node */}
                  <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#0d0d14] border-2 border-amber-500/30 items-center justify-center z-10">
                    <span className="text-xs font-bold text-amber-500">{step.number}</span>
                  </div>

                  {/* Empty spacer for the other side */}
                  <div className="hidden lg:block w-[calc(50%-3rem)]" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
