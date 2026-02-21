import { useEffect, useRef } from 'react'

interface Stat {
  value: string
  label: string
  description: string
}

const stats: Stat[] = [
  {
    value: 'Shorter',
    label: 'Delivery Cycles',
    description: 'Compared with traditional outsourcing handoffs',
  },
  {
    value: '50+',
    label: 'Enterprise Projects',
    description: 'Shipped for Fortune 500 and Series B+ companies',
  },
  {
    value: 'Long-term',
    label: 'Partnerships',
    description: 'Many engagements continue across multiple roadmap phases',
  },
]

const testimonial = {
  quote:
    '"CheeseCake Labs helped us ship with more rhythm. We moved from long release cycles to steady weekly progress, while keeping quality high."',
  author: 'VP of Engineering',
  company: 'Global FinTech Enterprise',
}

export default function SocialProof() {
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
    <section id="social-proof" ref={sectionRef} className="py-28 px-6 relative overflow-hidden">
      <div className="orb w-[600px] h-[300px] bg-amber-500/6 top-0 left-1/2 -translate-x-1/2" aria-hidden="true" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="animate-on-scroll delay-100">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 border border-amber-500/20 text-amber-400 mb-4 tracking-wide uppercase">
              Results
            </span>
          </div>
          <h2 className="animate-on-scroll delay-200 text-4xl sm:text-5xl font-bold tracking-tight text-cream mb-4">
            Built for enterprises that need{' '}
            <span className="text-gradient">steady momentum</span>
          </h2>
          <p className="animate-on-scroll delay-300 max-w-xl mx-auto text-cream-muted text-lg leading-relaxed">
            Our clients are large-scale businesses that demand quality,
            reliability, and focused execution without unnecessary process.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {stats.map((stat, i) => {
            const delayClass = ['delay-200', 'delay-300', 'delay-400'][i]
            return (
              <div
                key={stat.label}
                className={`animate-on-scroll ${delayClass} relative p-8 rounded-2xl border border-white/5 bg-[#111118] text-center group hover:border-amber-500/20 hover:bg-[#1a1a24] transition-colors duration-200`}
              >
                <div className="text-5xl font-black text-gradient mb-2">{stat.value}</div>
                <div className="text-base font-semibold text-cream mb-2">{stat.label}</div>
                <p className="text-sm text-cream-muted">{stat.description}</p>
              </div>
            )
          })}
        </div>

        {/* Testimonial */}
        <div className="animate-on-scroll delay-500 relative max-w-3xl mx-auto">
          <div className="relative p-10 rounded-2xl border border-amber-500/15 bg-[#111118] glow-amber">
            {/* Quote mark */}
            <div
              className="absolute -top-4 left-10 text-amber-500/30 text-8xl font-serif leading-none select-none"
              aria-hidden="true"
            >
              "
            </div>
            <blockquote className="relative z-10">
              <p className="text-lg sm:text-xl text-cream leading-relaxed font-medium mb-6">
                {testimonial.quote}
              </p>
              <footer className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 font-bold text-sm">
                  VP
                </div>
                <div>
                  <div className="text-sm font-semibold text-cream">{testimonial.author}</div>
                  <div className="text-xs text-cream-muted">{testimonial.company}</div>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
