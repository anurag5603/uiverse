"use client"

import { useEffect, useRef, useCallback } from "react"

// ─── Neon colour palette for hover morphing ─────────────────────────────────
const NEON_PALETTE: [number, number, number][] = [
  [0, 200, 255],
  [180, 0, 255],
  [255, 50, 50],
  [0, 255, 150],
  [255, 180, 0],
  [255, 60, 180],
  [60, 255, 80],
  [255, 120, 0],
  [100, 100, 255],
]

function randomPaletteColor(): [number, number, number] {
  return NEON_PALETTE[Math.floor(Math.random() * NEON_PALETTE.length)]
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function lerpColor(
  from: [number, number, number],
  to: [number, number, number],
  t: number
): [number, number, number] {
  return [lerp(from[0], to[0], t), lerp(from[1], to[1], t), lerp(from[2], to[2], t)]
}

// ─── Per-dot state ────────────────────────────────────────────────────────────
interface Dot {
  x: number
  y: number
  phase: number
  speed: number
  hoverAmt: number
  colorFrom: [number, number, number]
  colorTo: [number, number, number]
  colorT: number
  colorSpeed: number
}

// ─── Props ────────────────────────────────────────────────────────────────────
export interface DottedGlowBackgroundProps {
  className?: string
  gap?: number
  radius?: number
  opacity?: number
  backgroundOpacity?: number
  speedMin?: number
  speedMax?: number
  speedScale?: number
  colorLightVar?: string
  colorDarkVar?: string
  glowColorLightVar?: string
  glowColorDarkVar?: string
}

// ─── Component ────────────────────────────────────────────────────────────────
export function DottedGlowBackground({
  className = "",
  gap = 10,
  radius = 1.6,
  opacity = 1,
  backgroundOpacity = 0,
  speedMin = 0.08,
  speedMax = 0.28,
  speedScale = 1,
  colorLightVar = "--muted-foreground",
  colorDarkVar = "--muted-foreground",
  glowColorLightVar = "--border",
  glowColorDarkVar = "--border",
}: DottedGlowBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotsRef = useRef<Dot[]>([])
  const mouseRef = useRef<{ x: number; y: number } | null>(null)
  const rafRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)
  const visibleRef = useRef<boolean>(true)

  // Resolve a CSS variable to an rgb string
  const resolveCssColor = useCallback((varName: string): string => {
    if (!canvasRef.current) return "rgb(128,128,128)"
    const val = getComputedStyle(canvasRef.current)
      .getPropertyValue(varName)
      .trim()
    // val is in OKLCH or hex — canvas can't parse oklch directly,
    // so we paint a 1×1 div with that color and read back via canvas 2d
    if (!val) return "rgb(128,128,128)"
    // Return as CSS value; canvas will handle hex / rgb / hsl
    // For OKLCH we need the computed color trick
    const tmp = document.createElement("div")
    tmp.style.color = `var(${varName})`
    tmp.style.position = "absolute"
    tmp.style.visibility = "hidden"
    document.body.appendChild(tmp)
    const computed = getComputedStyle(tmp).color
    document.body.removeChild(tmp)
    return computed || "rgb(128,128,128)"
  }, [])

  // Parse "rgb(r, g, b)" → [r, g, b]
  const parseRgb = (s: string): [number, number, number] => {
    const m = s.match(/\d+/g)
    if (!m || m.length < 3) return [128, 128, 128]
    return [+m[0], +m[1], +m[2]]
  }

  // Build the dot grid
  const buildDots = useCallback(
    (w: number, h: number): Dot[] => {
      const dots: Dot[] = []
      const cols = Math.ceil(w / gap) + 1
      const rows = Math.ceil(h / gap) + 1

      for (let row = 0; row < rows; row++) {
        const stagger = row % 2 === 0 ? 0 : gap / 2
        for (let col = 0; col < cols; col++) {
          const x = col * gap + stagger
          const y = row * gap
          dots.push({
            x,
            y,
            phase: Math.random() * Math.PI * 2,
            speed: (speedMin + Math.random() * (speedMax - speedMin)) * speedScale,
            hoverAmt: 0,
            colorFrom: randomPaletteColor(),
            colorTo: randomPaletteColor(),
            colorT: Math.random(),
            colorSpeed: 0.4 + Math.random() * 0.4,
          })
        }
      }
      return dots
    },
    [gap, speedMin, speedMax, speedScale]
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // ── Resize handling ────────────────────────────────────────────────────
    let W = 0
    let H = 0
    let dpr = window.devicePixelRatio || 1

    const resize = () => {
      dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      W = rect.width
      H = rect.height
      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.scale(dpr, dpr)
      dotsRef.current = buildDots(W, H)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    // ── Visibility ────────────────────────────────────────────────────────
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting
      },
      { threshold: 0 }
    )
    io.observe(canvas)

    // ── Mouse / touch ──────────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onMouseLeave = () => {
      mouseRef.current = null
    }
    const onTouchMove = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect()
      const t = e.touches[0]
      mouseRef.current = { x: t.clientX - rect.left, y: t.clientY - rect.top }
    }
    const onTouchEnd = () => {
      mouseRef.current = null
    }

    const parent = canvas.parentElement ?? canvas
    parent.addEventListener("mousemove", onMouseMove)
    parent.addEventListener("mouseleave", onMouseLeave)
    parent.addEventListener("touchmove", onTouchMove, { passive: true })
    parent.addEventListener("touchend", onTouchEnd)

    // ── Draw loop ──────────────────────────────────────────────────────────
    const HOVER_RADIUS = 48

    const draw = (ts: number) => {
      rafRef.current = requestAnimationFrame(draw)
      if (!visibleRef.current) return

      const dt = Math.min((ts - lastTimeRef.current) / 1000, 0.1)
      lastTimeRef.current = ts

      ctx.clearRect(0, 0, W, H)

      // Background
      if (backgroundOpacity > 0) {
        ctx.fillStyle = `rgba(0,0,0,${backgroundOpacity})`
        ctx.fillRect(0, 0, W, H)
      }

      // Resolve base colours once per frame (cheap — just a property read)
      const isDark = document.documentElement.classList.contains("dark")
      const dotColorRaw = resolveCssColor(isDark ? colorDarkVar : colorLightVar)
      const glowColorRaw = resolveCssColor(isDark ? glowColorDarkVar : glowColorLightVar)
      const [dr, dg, db] = parseRgb(dotColorRaw)
      const [gr, gg, gb] = parseRgb(glowColorRaw)

      const mouse = mouseRef.current
      const hw = W / 2
      const hh = H / 2

      for (const dot of dotsRef.current) {
        // ── Vignette ──────────────────────────────────────────────────────
        const nx = (dot.x - hw) / hw // –1 … 1
        const ny = (dot.y - hh) / hh // –1 … 1
        const ellDist = Math.sqrt(nx * nx + ny * ny)
        const vigAmt = Math.pow(Math.max(0, 1 - ellDist / 0.52), 1.6)
        if (vigAmt <= 0) continue

        // ── Shimmer ───────────────────────────────────────────────────────
        dot.phase += dot.speed * dt
        const shimmer = 0.5 + 0.5 * Math.sin(dot.phase) // 0 … 1

        // ── Hover ─────────────────────────────────────────────────────────
        let inHover = false
        if (mouse) {
          const dx = dot.x - mouse.x
          const dy = dot.y - mouse.y
          inHover = dx * dx + dy * dy < HOVER_RADIUS * HOVER_RADIUS
        }
        dot.hoverAmt = lerp(dot.hoverAmt, inHover ? 1 : 0, dt * 9)

        // ── Colour morphing (hover dots only) ─────────────────────────────
        if (dot.hoverAmt > 0.01) {
          dot.colorT += dot.colorSpeed * dt
          if (dot.colorT >= 1) {
            dot.colorFrom = dot.colorTo
            dot.colorTo = randomPaletteColor()
            dot.colorT = 0
          }
        }

        const hColor = lerpColor(dot.colorFrom, dot.colorTo, dot.colorT)

        // ── Final colour ──────────────────────────────────────────────────
        const h = dot.hoverAmt
        const r = lerp(dr, hColor[0], h)
        const g = lerp(dg, hColor[1], h)
        const b = lerp(db, hColor[2], h)

        const brightness = lerp(0.55 + 0.45 * shimmer, 1.0, h)
        const finalOpacity = vigAmt * opacity * brightness
        const finalRadius = radius * (1 + h * 0.8)

        // ── Glow (hovered & partially hovered) ────────────────────────────
        if (h > 0.02) {
          const glowR = lerp(gr, hColor[0], h)
          const glowG = lerp(gg, hColor[1], h)
          const glowB = lerp(gb, hColor[2], h)
          const glowBlur = finalRadius * lerp(2, 7, h)

          ctx.save()
          ctx.shadowBlur = glowBlur
          ctx.shadowColor = `rgba(${Math.round(glowR)},${Math.round(glowG)},${Math.round(glowB)},${(finalOpacity * h).toFixed(3)})`
          ctx.beginPath()
          ctx.arc(dot.x, dot.y, finalRadius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${finalOpacity.toFixed(3)})`
          ctx.fill()
          ctx.restore()
        } else {
          ctx.beginPath()
          ctx.arc(dot.x, dot.y, finalRadius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${finalOpacity.toFixed(3)})`
          ctx.fill()
        }
      }
    }

    lastTimeRef.current = performance.now()
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      io.disconnect()
      parent.removeEventListener("mousemove", onMouseMove)
      parent.removeEventListener("mouseleave", onMouseLeave)
      parent.removeEventListener("touchmove", onTouchMove)
      parent.removeEventListener("touchend", onTouchEnd)
    }
  }, [
    gap,
    radius,
    opacity,
    backgroundOpacity,
    speedMin,
    speedMax,
    speedScale,
    colorLightVar,
    colorDarkVar,
    glowColorLightVar,
    glowColorDarkVar,
    buildDots,
    resolveCssColor,
  ])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      className={className}
      aria-hidden="true"
    />
  )
}
