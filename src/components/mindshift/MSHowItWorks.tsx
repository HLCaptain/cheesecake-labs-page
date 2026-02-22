import { useEffect, useRef } from 'react'
import { useCardTilt } from '../../hooks/useCardTilt'

interface Step {
  number: string
  title: string
  description: string
  detail: string
}

const steps: Step[] = [
  {
    number: '01',
    title: 'Choose Your Apps',
    description: 'Take control of your screen time',
    detail:
      'Select which social media apps you want to block. MindShift lets you customize your blocklist so you only restrict the apps you choose — flexible, precise, and fully in your control.',
  },
  {
    number: '02',
    title: 'Set Blocking Schedules',
    description: 'Block apps when it matters most',
    detail:
      'Define specific time ranges for blocking — like nighttime to encourage better sleep, study hours for focus, or whenever you tend to lose track of time. Flexible rules that fit your routine.',
  },
  {
    number: '03',
    title: 'Get Activity Suggestions',
    description: 'Discover something better to do',
    detail:
      'Receive personalized activity recommendations you can schedule throughout your day — like working out from 5–7 PM, reading, or picking up a hobby. When you try to open a blocked app, MindShift suggests these activities instead.',
  },
  {
    number: '04',
    title: 'Build Better Habits',
    description: 'Make the shift stick',
    detail:
      'Over time, MindShift helps you build a healthier lifestyle by replacing screen time with enjoyable, purposeful activities. Track your progress and see how small changes add up to lasting well-being.',
  },
]

export default function MSHowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const { handleMouseMove, handleMouseLeave } = useCardTilt()

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
      id="ms-how-it-works"
      ref={sectionRef}
      className="py-28 px-6 relative"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="animate-on-scroll delay-100">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-teal-500/10 border border-teal-500/20 text-teal-500 mb-4 tracking-wide uppercase">
              How It Works
            </span>
          </div>
          <h2 className="animate-on-scroll delay-200 text-4xl sm:text-5xl font-bold tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>
            Your path to{' '}
            <span className="text-gradient-teal">better habits</span>
          </h2>
          <p className="animate-on-scroll delay-300 max-w-xl mx-auto text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            A simple, guided journey from digital chaos to mindful focus —
            in just four steps.
          </p>
        </div>

        {/* Steps */}
        <div className="flex flex-col gap-6">
          {steps.map((step, i) => {
            const delayClass = ['delay-100', 'delay-200', 'delay-300', 'delay-400'][i]
            return (
              <div
                key={step.number}
                className={`animate-on-scroll ${delayClass} group p-7 rounded-2xl transition-all duration-200`}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-soft)',
                  willChange: 'transform',
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                    <span className="text-xs font-bold text-teal-500">{step.number}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{step.title}</h3>
                    <p className="text-sm font-medium text-teal-500/70 mb-2">{step.description}</p>
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
