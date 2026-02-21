import { useEffect, useRef } from 'react'

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const els = [badgeRef.current, headlineRef.current, subRef.current, ctaRef.current]
    els.forEach((el, i) => {
      if (!el) return
      el.style.opacity = '0'
      el.style.transform = 'translateY(20px)'
      setTimeout(() => {
        if (!el) return
        el.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out'
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, 100 + i * 120)
    })
  }, [])

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden px-6 pt-16"
    >
      {/* Background orbs */}
      <div
        className="orb w-[600px] h-[600px] bg-amber-500/8 -top-32 -left-40"
        aria-hidden="true"
      />
      <div
        className="orb w-[500px] h-[500px] bg-amber-600/6 top-20 -right-48"
        aria-hidden="true"
      />
      <div
        className="orb w-[400px] h-[400px] bg-amber-500/5 bottom-0 left-1/4"
        aria-hidden="true"
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(245,240,232,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(245,240,232,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* Badge */}
        <div ref={badgeRef} className="mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-amber-500/10 border border-amber-500/20 text-amber-400 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" aria-hidden="true" />
            AI + Human Product Development
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-6"
        >
          Build Better{' '}
          <br className="hidden sm:block" />
          <span className="text-gradient">Products, Iteratively.</span>
        </h1>

        {/* Subtext */}
        <p
          ref={subRef}
          className="max-w-2xl text-lg sm:text-xl text-cream-muted leading-relaxed mb-10"
        >
          CheeseCake Labs fuses{' '}
          <span className="text-cream font-medium">AI agents</span> with{' '}
          <span className="text-cream font-medium">senior human developers</span> to
          deliver frontend and app development for enterprise teams — with
          careful attention to detail.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => scrollTo('#contact')}
            className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-amber-500 text-[#0a0a0f] hover:bg-amber-400 transition-all duration-200 shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 hover:-translate-y-0.5 min-w-[160px]"
          >
            Get Started
          </button>
          <button
            onClick={() => scrollTo('#how-it-works')}
            className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-white/5 text-cream border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 hover:-translate-y-0.5 min-w-[160px]"
          >
            See How It Works
          </button>
        </div>

        {/* Trust strip */}
        <div className="mt-16 flex flex-col items-center gap-4">
          <p className="text-xs text-cream-muted tracking-widest uppercase">
            Trusted by product teams at
          </p>
          <div className="flex items-center gap-6 sm:gap-10 opacity-40 flex-wrap justify-center">
            {['Fortune 500', 'Series B+', 'Enterprise', 'Scale-ups'].map((label) => (
              <span key={label} className="text-sm font-semibold text-cream-muted tracking-tight">
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs text-cream-muted tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-cream-muted to-transparent" />
      </div>
    </section>
  )
}
