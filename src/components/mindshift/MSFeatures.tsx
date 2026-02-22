import { useEffect, useRef } from 'react'

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  tag: string
}

const features: Feature[] = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
        aria-hidden="true"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
    title: 'Customizable App Blocking',
    description:
      'Choose exactly which social media apps to block and set specific time ranges — block apps at night to encourage sleep, during study hours for focus, or whenever you want a distraction-free window.',
    tag: 'Core Feature',
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
        aria-hidden="true"
      >
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 01-3.46 0" />
      </svg>
    ),
    title: 'Smart Activity Prompts',
    description:
      'When you try to open a blocked app, MindShift suggests a scheduled activity instead — giving you a positive, engaging alternative right when you need it most.',
    tag: 'Motivate',
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: 'Scheduled Activity Suggestions',
    description:
      'Receive and schedule personalized habit recommendations — like working out from 5–7 PM or reading before bed. MindShift fills your free time with activities that feel rewarding, not empty.',
    tag: 'Engage',
  },
]

export default function MSFeatures() {
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
      { threshold: 0.1 },
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="ms-features" ref={sectionRef} className="py-28 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="animate-on-scroll delay-100">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-teal-500/10 border border-teal-500/20 text-teal-500 mb-4 tracking-wide uppercase">
              Core Features
            </span>
          </div>
          <h2 className="animate-on-scroll delay-200 text-4xl sm:text-5xl font-bold tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>
            Tools for a{' '}
            <span className="text-gradient-teal">balanced digital life</span>
          </h2>
          <p className="animate-on-scroll delay-300 max-w-xl mx-auto text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            MindShift goes beyond generic screen time trackers by combining customizable
            app blocking with personalized activity recommendations.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const delayClass = ['delay-200', 'delay-300', 'delay-400'][i]
            return (
              <article
                key={feature.title}
                className={`animate-on-scroll ${delayClass} group relative p-8 rounded-2xl transition-all duration-200 cursor-default`}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-soft)',
                }}
              >
                {/* Icon */}
                <div className="mb-6 w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/15 flex items-center justify-center text-teal-500 group-hover:bg-teal-500/15 group-hover:border-teal-500/25 transition-all duration-300">
                  {feature.icon}
                </div>

                {/* Tag */}
                <span className="inline-block text-[11px] font-semibold text-teal-500 tracking-widest uppercase mb-3">
                  {feature.tag}
                </span>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{feature.title}</h3>

                {/* Description */}
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{feature.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
