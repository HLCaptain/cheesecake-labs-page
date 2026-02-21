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
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: 'Accelerated Development',
    description:
      'AI agents handle scaffolding, boilerplate, and research while senior developers focus on architecture and product decisions. Move faster without cutting corners.',
    tag: 'Fast Start',
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
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: 'Attention to Detail',
    description:
      'Thoughtful implementation with careful UX craft. We tune interactions, spacing, and states so products feel polished and reliable in daily use.',
    tag: 'Polished UX',
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
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: 'AI Workflow Consulting',
    description:
      'Beyond building products, we help teams design and implement efficient AI workflows — from choosing the right tools to optimizing development pipelines.',
    tag: 'Optimize',
  },
]

export default function Features() {
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
    <section id="features" ref={sectionRef} className="py-28 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="animate-on-scroll delay-100">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 border border-amber-500/20 text-amber-500 mb-4 tracking-wide uppercase">
              What We Do
            </span>
          </div>
          <h2 className="animate-on-scroll delay-200 text-4xl sm:text-5xl font-bold tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>
            Built for teams that value{' '}
            <span className="text-gradient">craft and momentum</span>
          </h2>
          <p className="animate-on-scroll delay-300 max-w-xl mx-auto text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            We combine AI tooling with experienced developers to help teams
            ship quality frontend products with steady progress.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const delayClass = ['delay-200', 'delay-300', 'delay-400'][i]
            return (
              <article
                key={feature.title}
                className={`animate-on-scroll ${delayClass} group relative p-8 rounded-2xl transition-colors duration-200 cursor-default`}
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-soft)',
                  willChange: 'transform',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)' }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-surface)' }}
              >
                {/* Icon */}
                <div className="mb-6 w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center text-amber-500 group-hover:bg-amber-500/15 group-hover:border-amber-500/25 transition-all duration-300">
                  {feature.icon}
                </div>

                {/* Tag */}
                <span className="inline-block text-[11px] font-semibold text-amber-500 tracking-widest uppercase mb-3">
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
