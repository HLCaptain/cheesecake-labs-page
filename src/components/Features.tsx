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
      'Ship features 10x faster with AI-augmented development pipelines. Our agents handle the scaffolding, boilerplate, and research so your team focuses on what matters.',
    tag: '10x Faster',
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
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41" />
      </svg>
    ),
    title: 'Attention to Detail',
    description:
      'Pixel-perfect implementations with obsessive focus on UX and interaction design. We sweat the micro-animations, spacing, and transitions that make products feel exceptional.',
    tag: 'Pixel Perfect',
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
        <path d="M1 4v6h6" />
        <path d="M23 20v-6h-6" />
        <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 0 1 3.51 15" />
      </svg>
    ),
    title: 'Faster Iteration',
    description:
      'Rapid feedback loops with continuous delivery for enterprise-grade products. Weekly releases, real-time previews, and instant staging environments keep projects moving.',
    tag: 'Continuous Delivery',
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
    <section id="features" ref={sectionRef} className="py-28 px-6 relative overflow-hidden">
      {/* Subtle background */}
      <div
        className="orb w-[500px] h-[300px] bg-amber-500/5 top-0 right-0"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="animate-on-scroll delay-100">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-4 tracking-wide uppercase">
              Why Choose Us
            </span>
          </div>
          <h2 className="animate-on-scroll delay-200 text-4xl sm:text-5xl font-bold tracking-tight text-cream mb-4">
            Built for enterprises that{' '}
            <span className="text-gradient">refuse to compromise</span>
          </h2>
          <p className="animate-on-scroll delay-300 max-w-xl mx-auto text-cream-muted text-lg leading-relaxed">
            We combine cutting-edge AI tooling with seasoned developers to deliver
            outcomes that feel impossible — on timelines that defy convention.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const delayClass = ['delay-200', 'delay-300', 'delay-400'][i]
            return (
            <article
              key={feature.title}
              className={`animate-on-scroll ${delayClass} group relative p-8 rounded-2xl border-gradient bg-surface hover:bg-[#1a1a24] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/10 cursor-default`}
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
              <h3 className="text-xl font-semibold text-cream mb-3">{feature.title}</h3>

              {/* Description */}
              <p className="text-cream-muted text-sm leading-relaxed">{feature.description}</p>

              {/* Hover shimmer line */}
              <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full" />
            </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
