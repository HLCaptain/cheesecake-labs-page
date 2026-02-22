import { useCallback, useRef } from 'react'

export function useCardTilt(maxDeg = 8) {
  const rafMap = useRef(new Map<HTMLElement, number>())
  const targetMap = useRef(new Map<HTMLElement, { x: number; y: number }>())

  const animate = useCallback((el: HTMLElement) => {
    const target = targetMap.current.get(el)
    if (!target) return

    const currentTransform = el.style.transform
    const currentMatch = currentTransform.match(
      /perspective\(600px\) rotateY\(([-\d.]+)deg\) rotateX\(([-\d.]+)deg\)/,
    )
    const cx = currentMatch ? parseFloat(currentMatch[1]) : 0
    const cy = currentMatch ? parseFloat(currentMatch[2]) : 0

    const lerp = 0.12
    const nx = cx + (target.x - cx) * lerp
    const ny = cy + (target.y - cy) * lerp

    el.style.transform = `perspective(600px) rotateY(${nx}deg) rotateX(${ny}deg)`

    if (Math.abs(target.x - nx) > 0.01 || Math.abs(target.y - ny) > 0.01) {
      rafMap.current.set(el, requestAnimationFrame(() => animate(el)))
    } else {
      el.style.transform = `perspective(600px) rotateY(${target.x}deg) rotateX(${target.y}deg)`
      rafMap.current.delete(el)
    }
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * maxDeg
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * maxDeg

    targetMap.current.set(el, { x, y })

    if (!rafMap.current.has(el)) {
      rafMap.current.set(el, requestAnimationFrame(() => animate(el)))
    }
  }, [maxDeg, animate])

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget
    const raf = rafMap.current.get(el)
    if (raf) cancelAnimationFrame(raf)
    rafMap.current.delete(el)
    targetMap.current.set(el, { x: 0, y: 0 })
    rafMap.current.set(el, requestAnimationFrame(() => animate(el)))
  }, [animate])

  return { handleMouseMove, handleMouseLeave }
}
