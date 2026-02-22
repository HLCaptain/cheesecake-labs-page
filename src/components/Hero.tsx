import { useCallback, useEffect, useRef } from 'react'

interface HeroProps {
  theme: 'dark' | 'light'
}

export default function Hero({ theme }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -1, y: -1 })
  const rafId = useRef<number>(0)
  const themeRef = useRef(theme)

  useEffect(() => {
    themeRef.current = theme
  }, [theme])

  /* Interactive dot grid rendered on <canvas> */
  useEffect(() => {
    const canvas = canvasRef.current
    const section = sectionRef.current
    if (!canvas || !section) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const GAP = 32
    const BASE_RADIUS = 1
    const MAX_RADIUS = 3
    const INFLUENCE = 150

    const getThemeColors = () => {
      return themeRef.current === 'dark' 
        ? { color: [245, 158, 11] as [number, number, number], baseAlpha: 0.25 }
        : { color: [31, 41, 55] as [number, number, number], baseAlpha: 0.5 }
    }

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = section.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = () => {
      const { color: dotColor, baseAlpha: initAlpha } = getThemeColors()
      const w = canvas.width / (window.devicePixelRatio || 1)
      const h = canvas.height / (window.devicePixelRatio || 1)
      ctx.clearRect(0, 0, w, h)

      const mx = mouse.current.x
      const my = mouse.current.y

      for (let x = GAP; x < w; x += GAP) {
        for (let y = GAP; y < h; y += GAP) {
          let radius = BASE_RADIUS
          let alpha = initAlpha

          if (mx >= 0 && my >= 0) {
            const dist = Math.hypot(x - mx, y - my)
            if (dist < INFLUENCE) {
              const t = 1 - dist / INFLUENCE
              radius = BASE_RADIUS + (MAX_RADIUS - BASE_RADIUS) * t
              alpha = initAlpha + 0.55 * t
            }
          }

          ctx.beginPath()
          ctx.arc(x, y, radius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${dotColor[0]},${dotColor[1]},${dotColor[2]},${alpha})`
          ctx.fill()
        }
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

  /* Track pointer in pixel coords relative to section */
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
      {/* Interactive dot grid */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" aria-hidden="true" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Badge */}
        <div className="hero-fade-up mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-amber-500/10 border border-amber-500/20 text-amber-500 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" aria-hidden="true" />
            AI-Powered Development Studio
          </span>
        </div>

        {/* Headline */}
        <h1
          className="hero-fade-up text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.08] mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          Where AI meets{' '}
          <br className="hidden sm:block" />
          <span className="text-gradient">thoughtful design.</span>
        </h1>

        {/* Subtext */}
        <p
          className="hero-fade-up max-w-2xl text-lg sm:text-xl leading-relaxed mb-10"
          style={{ color: 'var(--text-muted)' }}
        >
          CheeseCake Labs pairs{' '}
          <span className="font-medium" style={{ color: 'var(--text-primary)' }}>AI agents</span> with{' '}
          <span className="font-medium" style={{ color: 'var(--text-primary)' }}>senior human developers</span> to
          craft polished frontends and apps — with an obsessive eye for detail. We also help teams
          design efficient AI workflows that actually ship.
        </p>

        {/* CTAs */}
        <div className="hero-fade-up flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => scrollTo('#contact')}
            className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-amber-500 text-[#0a0a0f] hover:bg-amber-400 active:scale-95 transition-all duration-200 min-w-[180px]"
          >
            Start a Conversation
          </button>
          <button
            onClick={() => scrollTo('#why-us')}
            className="px-6 py-3.5 rounded-xl font-semibold text-sm active:scale-95 transition-all duration-200 min-w-[180px]"
            style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)', border: '1px solid var(--border-soft)' }}
          >
            See Our Approach
          </button>
        </div>
      </div>
    </section>
  )
}
