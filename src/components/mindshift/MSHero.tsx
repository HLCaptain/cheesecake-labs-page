import { useCallback, useEffect, useRef } from 'react'

interface MSHeroProps {
  theme: 'dark' | 'light'
}

export default function MSHero({ theme }: MSHeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -1, y: -1 })
  const rafId = useRef<number>(0)
  const themeRef = useRef(theme)

  useEffect(() => {
    themeRef.current = theme
  }, [theme])

  /* Floating orbs rendered on <canvas> — calm, organic motion */
  useEffect(() => {
    const canvas = canvasRef.current
    const section = sectionRef.current
    if (!canvas || !section) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const ORB_COUNT = 18
    const INFLUENCE = 200

    interface Orb {
      x: number
      y: number
      radius: number
      baseAlpha: number
      vx: number
      vy: number
      phase: number
      speed: number
    }

    let orbs: Orb[] = []
    let w = 0
    let h = 0

    const getThemeColor = () => {
      return themeRef.current === 'dark'
        ? [20, 184, 166] as [number, number, number]
        : [13, 148, 136] as [number, number, number]
    }

    const initOrbs = () => {
      orbs = Array.from({ length: ORB_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        radius: 20 + Math.random() * 60,
        baseAlpha: 0.03 + Math.random() * 0.07,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        phase: Math.random() * Math.PI * 2,
        speed: 0.002 + Math.random() * 0.004,
      }))
    }

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = section.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (orbs.length === 0) initOrbs()
    }

    let time = 0
    const draw = () => {
      const color = getThemeColor()
      ctx.clearRect(0, 0, w, h)

      const mx = mouse.current.x
      const my = mouse.current.y
      time += 1

      for (const orb of orbs) {
        orb.phase += orb.speed
        orb.x += orb.vx + Math.sin(orb.phase) * 0.2
        orb.y += orb.vy + Math.cos(orb.phase * 0.7) * 0.15

        // Wrap around edges
        if (orb.x < -orb.radius) orb.x = w + orb.radius
        if (orb.x > w + orb.radius) orb.x = -orb.radius
        if (orb.y < -orb.radius) orb.y = h + orb.radius
        if (orb.y > h + orb.radius) orb.y = -orb.radius

        let alpha = orb.baseAlpha
        let r = orb.radius

        // Mouse interaction — gentle attraction glow
        if (mx >= 0 && my >= 0) {
          const dist = Math.hypot(orb.x - mx, orb.y - my)
          if (dist < INFLUENCE) {
            const t = 1 - dist / INFLUENCE
            alpha += 0.12 * t
            r += 8 * t
          }
        }

        // Pulsing effect
        const pulse = Math.sin(time * 0.01 + orb.phase) * 0.02
        alpha += pulse

        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, r)
        gradient.addColorStop(0, `rgba(${color[0]},${color[1]},${color[2]},${alpha * 1.5})`)
        gradient.addColorStop(0.5, `rgba(${color[0]},${color[1]},${color[2]},${alpha * 0.6})`)
        gradient.addColorStop(1, `rgba(${color[0]},${color[1]},${color[2]},0)`)

        ctx.beginPath()
        ctx.arc(orb.x, orb.y, r, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      }

      rafId.current = requestAnimationFrame(draw)
    }

    resize()
    rafId.current = requestAnimationFrame(draw)

    const ro = new ResizeObserver(resize)
    ro.observe(section)

    return () => {
      cancelAnimationFrame(rafId.current)
      ro.disconnect()
    }
  }, [])

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    mouse.current.x = e.clientX - rect.left
    mouse.current.y = e.clientY - rect.top
  }, [])

  const handlePointerLeave = useCallback(() => {
    mouse.current.x = -1
    mouse.current.y = -1
  }, [])

  useEffect(() => {
    if (!sectionRef.current) return
    const els = sectionRef.current.querySelectorAll('.hero-fade-up')
    els.forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), 100 + i * 120)
    })
  }, [])

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16 overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" aria-hidden="true" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Badge */}
        <div className="hero-fade-up mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-teal-500/10 border border-teal-500/20 text-teal-500 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" aria-hidden="true" />
            Coming Soon — Currently in Prototyping
          </span>
        </div>

        {/* Headline */}
        <h1
          className="hero-fade-up text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.08] mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Your time,{' '}
          <br className="hidden sm:block" />
          <span className="text-gradient-teal">your choice.</span>
        </h1>

        {/* Subtext */}
        <p
          className="hero-fade-up max-w-2xl text-lg sm:text-xl leading-relaxed mb-10"
          style={{ color: 'var(--text-muted)' }}
        >
          🧠 MindShift helps you{' '}
          <span className="font-medium" style={{ color: 'var(--text-primary)' }}>build a healthier daily routine</span> by
          blocking distracting apps during set times and replacing them with{' '}
          <span className="font-medium" style={{ color: 'var(--text-primary)' }}>personalized activity suggestions</span> —
          so you can spend your time on what truly matters.
        </p>

        {/* CTAs */}
        <div className="hero-fade-up flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => scrollTo('#ms-contact')}
            className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-teal-500 text-white hover:bg-teal-400 active:scale-95 transition-all duration-200 min-w-[180px]"
          >
            Join the Waitlist
          </button>
          <button
            onClick={() => scrollTo('#ms-features')}
            className="px-6 py-3.5 rounded-xl font-semibold text-sm active:scale-95 transition-all duration-200 min-w-[180px]"
            style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border-soft)' }}
          >
            Explore Features
          </button>
        </div>
      </div>
    </section>
  )
}
