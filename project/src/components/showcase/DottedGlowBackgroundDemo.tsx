import { DottedGlowBackground } from "@/components/ui/dotted-glow-background"

export function DottedGlowBackgroundDemo() {
  return (
    <div
      className="size-60 md:size-96 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl overflow-hidden relative"
      style={{ background: "hsl(var(--card, 0 0% 100%) / 1)" }}
    >
      {/* Animated dotted canvas – sits behind everything */}
      <DottedGlowBackground
        className="pointer-events-none"
        opacity={1}
        gap={10}
        radius={1.6}
        backgroundOpacity={0}
        speedMin={0.08}
        speedMax={0.28}
      />

      {/* Centred logo / icon */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none select-none">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
          style={{
            background:
              "linear-gradient(135deg, rgba(0,200,255,0.15) 0%, rgba(180,0,255,0.15) 100%)",
            border: "1px solid rgba(180,0,255,0.25)",
            backdropFilter: "blur(8px)",
          }}
        >
          {/* Simple UIverse-style logo mark */}
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            aria-label="UIverse logo"
          >
            <circle cx="14" cy="14" r="5" fill="url(#dg-grad)" />
            <circle
              cx="14"
              cy="14"
              r="10"
              stroke="url(#dg-grad)"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="dg-grad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#00C8FF" />
                <stop offset="100%" stopColor="#B400FF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Bottom label bar */}
      <div
        className="absolute bottom-0 inset-x-0 z-20 px-4 py-3 flex items-center justify-between"
        style={{
          background: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <span
          className="text-xs font-semibold tracking-wide"
          style={{ color: "rgba(255,255,255,0.85)" }}
        >
          Dotted Glow Background
        </span>
        <span
          className="text-[10px] font-mono px-2 py-0.5 rounded-full"
          style={{
            background: "rgba(0,200,255,0.15)",
            color: "#00C8FF",
            border: "1px solid rgba(0,200,255,0.3)",
          }}
        >
          canvas
        </span>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Source code string (shown in the Code tab)
// ─────────────────────────────────────────────────────────────────────────────
export const dottedGlowBackgroundCode = `"use client"

import { useEffect, useRef, useCallback } from "react"

const NEON_PALETTE = [
  [0, 200, 255], [180, 0, 255], [255, 50, 50],
  [0, 255, 150], [255, 180, 0], [255, 60, 180],
  [60, 255, 80], [255, 120, 0], [100, 100, 255],
]

function randomPaletteColor() {
  return NEON_PALETTE[Math.floor(Math.random() * NEON_PALETTE.length)]
}
function lerp(a, b, t) { return a + (b - a) * t }
function lerpColor(from, to, t) {
  return [lerp(from[0], to[0], t), lerp(from[1], to[1], t), lerp(from[2], to[2], t)]
}

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
}) {
  const canvasRef = useRef(null)
  const dotsRef = useRef([])
  const mouseRef = useRef(null)
  const rafRef = useRef(0)
  const lastTimeRef = useRef(0)
  const visibleRef = useRef(true)

  const resolveCssColor = useCallback((varName) => {
    const tmp = document.createElement("div")
    tmp.style.color = \`var(\${varName})\`
    tmp.style.position = "absolute"
    tmp.style.visibility = "hidden"
    document.body.appendChild(tmp)
    const computed = getComputedStyle(tmp).color
    document.body.removeChild(tmp)
    return computed || "rgb(128,128,128)"
  }, [])

  const parseRgb = (s) => {
    const m = s.match(/\\d+/g)
    if (!m || m.length < 3) return [128, 128, 128]
    return [+m[0], +m[1], +m[2]]
  }

  const buildDots = useCallback((w, h) => {
    const dots = []
    const cols = Math.ceil(w / gap) + 1
    const rows = Math.ceil(h / gap) + 1
    for (let row = 0; row < rows; row++) {
      const stagger = row % 2 === 0 ? 0 : gap / 2
      for (let col = 0; col < cols; col++) {
        dots.push({
          x: col * gap + stagger,
          y: row * gap,
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
  }, [gap, speedMin, speedMax, speedScale])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    let W = 0, H = 0, dpr = window.devicePixelRatio || 1

    const resize = () => {
      dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      W = rect.width; H = rect.height
      canvas.width = W * dpr; canvas.height = H * dpr
      ctx.scale(dpr, dpr)
      dotsRef.current = buildDots(W, H)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas); resize()

    const io = new IntersectionObserver(([e]) => { visibleRef.current = e.isIntersecting }, { threshold: 0 })
    io.observe(canvas)

    const parent = canvas.parentElement ?? canvas
    const onMM = (e) => { const r = canvas.getBoundingClientRect(); mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top } }
    const onML = () => { mouseRef.current = null }
    const onTM = (e) => { const r = canvas.getBoundingClientRect(), t = e.touches[0]; mouseRef.current = { x: t.clientX - r.left, y: t.clientY - r.top } }
    const onTE = () => { mouseRef.current = null }
    parent.addEventListener("mousemove", onMM)
    parent.addEventListener("mouseleave", onML)
    parent.addEventListener("touchmove", onTM, { passive: true })
    parent.addEventListener("touchend", onTE)

    const HR = 48
    const draw = (ts) => {
      rafRef.current = requestAnimationFrame(draw)
      if (!visibleRef.current) return
      const dt = Math.min((ts - lastTimeRef.current) / 1000, 0.1)
      lastTimeRef.current = ts
      ctx.clearRect(0, 0, W, H)
      if (backgroundOpacity > 0) { ctx.fillStyle = \`rgba(0,0,0,\${backgroundOpacity})\`; ctx.fillRect(0, 0, W, H) }
      const isDark = document.documentElement.classList.contains("dark")
      const [dr, dg, db] = parseRgb(resolveCssColor(isDark ? colorDarkVar : colorLightVar))
      const [gr, gg, gb] = parseRgb(resolveCssColor(isDark ? glowColorDarkVar : glowColorLightVar))
      const mouse = mouseRef.current
      const hw = W / 2, hh = H / 2
      for (const dot of dotsRef.current) {
        const nx = (dot.x - hw) / hw, ny = (dot.y - hh) / hh
        const vigAmt = Math.pow(Math.max(0, 1 - Math.sqrt(nx * nx + ny * ny) / 0.52), 1.6)
        if (vigAmt <= 0) continue
        dot.phase += dot.speed * dt
        const shimmer = 0.5 + 0.5 * Math.sin(dot.phase)
        const inHover = mouse && (dot.x - mouse.x) ** 2 + (dot.y - mouse.y) ** 2 < HR * HR
        dot.hoverAmt = lerp(dot.hoverAmt, inHover ? 1 : 0, dt * 9)
        if (dot.hoverAmt > 0.01) {
          dot.colorT += dot.colorSpeed * dt
          if (dot.colorT >= 1) { dot.colorFrom = dot.colorTo; dot.colorTo = randomPaletteColor(); dot.colorT = 0 }
        }
        const hc = lerpColor(dot.colorFrom, dot.colorTo, dot.colorT)
        const h = dot.hoverAmt
        const r = lerp(dr, hc[0], h), g = lerp(dg, hc[1], h), b = lerp(db, hc[2], h)
        const finalOpacity = vigAmt * opacity * lerp(0.55 + 0.45 * shimmer, 1.0, h)
        const finalRadius = radius * (1 + h * 0.8)
        if (h > 0.02) {
          ctx.save()
          ctx.shadowBlur = finalRadius * lerp(2, 7, h)
          ctx.shadowColor = \`rgba(\${Math.round(lerp(gr, hc[0], h))},\${Math.round(lerp(gg, hc[1], h))},\${Math.round(lerp(gb, hc[2], h))},\${(finalOpacity * h).toFixed(3)})\`
          ctx.beginPath(); ctx.arc(dot.x, dot.y, finalRadius, 0, Math.PI * 2)
          ctx.fillStyle = \`rgba(\${Math.round(r)},\${Math.round(g)},\${Math.round(b)},\${finalOpacity.toFixed(3)})\`
          ctx.fill(); ctx.restore()
        } else {
          ctx.beginPath(); ctx.arc(dot.x, dot.y, finalRadius, 0, Math.PI * 2)
          ctx.fillStyle = \`rgba(\${Math.round(r)},\${Math.round(g)},\${Math.round(b)},\${finalOpacity.toFixed(3)})\`
          ctx.fill()
        }
      }
    }
    lastTimeRef.current = performance.now()
    rafRef.current = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(rafRef.current); ro.disconnect(); io.disconnect()
      parent.removeEventListener("mousemove", onMM); parent.removeEventListener("mouseleave", onML)
      parent.removeEventListener("touchmove", onTM); parent.removeEventListener("touchend", onTE)
    }
  }, [gap, radius, opacity, backgroundOpacity, speedMin, speedMax, speedScale, colorLightVar, colorDarkVar, glowColorLightVar, glowColorDarkVar, buildDots, resolveCssColor])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      className={className}
      aria-hidden="true"
    />
  )
}

// ── Demo wrapper ──────────────────────────────────────────────────────────────
export function DottedGlowBackgroundDemo() {
  return (
    <div className="size-60 md:size-96 rounded-tl-3xl rounded-br-3xl rounded-bl-3xl overflow-hidden relative bg-card">
      <DottedGlowBackground
        className="pointer-events-none"
        opacity={1} gap={10} radius={1.6}
        backgroundOpacity={0} speedMin={0.08} speedMax={0.28}
      />
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <img src="/logo.svg" alt="Logo" className="w-14 h-14" />
      </div>
      <div className="absolute bottom-0 inset-x-0 z-20 px-4 py-3 flex items-center justify-between"
        style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(12px)" }}>
        <span className="text-xs font-semibold text-white/85">Dotted Glow Background</span>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full text-cyan-400 border border-cyan-400/30 bg-cyan-400/10">canvas</span>
      </div>
    </div>
  )
}`
