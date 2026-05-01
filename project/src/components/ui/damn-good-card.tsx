"use client"

import { useEffect, useRef, useCallback } from "react"

// ─── Google Fonts ──────────────────────────────────────────────────────────────
function useGoogleFonts() {
  useEffect(() => {
    const id = "damn-good-card-gfonts"
    if (document.getElementById(id)) return
    const link = document.createElement("link")
    link.id = id
    link.rel = "stylesheet"
    link.href =
      "https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Space+Grotesk:wght@300;400;500&display=swap"
    document.head.appendChild(link)
  }, [])
}

// ─── Icon brand colours ────────────────────────────────────────────────────────
const ICONS: { id: string; color: [number, number, number] }[] = [
  { id: "claude", color: [204, 120, 92] },
  { id: "chatgpt", color: [16, 163, 127] },
  { id: "meta", color: [0, 129, 251] },
  { id: "framer", color: [107, 122, 255] },
  { id: "more", color: [102, 102, 102] },
]

// ─── SVG icon paths ────────────────────────────────────────────────────────────
function IconSVG({ id }: { id: string }) {
  switch (id) {
    case "claude":
      return (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-label="Claude">
          <path
            d="M13 4C8.03 4 4 8.03 4 13s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm-.8 13.5L8.5 10h2.1l2.4 5.8 2.4-5.8h2.1l-3.7 7.5h-1.6z"
            fill="#cc785c"
          />
        </svg>
      )
    case "chatgpt":
      return (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-label="ChatGPT">
          <path
            d="M22.2 10.8a5.5 5.5 0 00-.5-4.5 5.6 5.6 0 00-6-2.7A5.5 5.5 0 0011.6 2a5.6 5.6 0 00-5.3 3.9A5.5 5.5 0 003 9.4a5.6 5.6 0 00.7 8.8 5.5 5.5 0 00.5 4.5 5.6 5.6 0 006 2.7 5.5 5.5 0 004.1 1.6 5.6 5.6 0 005.3-3.9 5.5 5.5 0 003.3-3.5 5.6 5.6 0 00-.7-8.8zM14.4 22.6a4.1 4.1 0 01-2.6-.9l.1-.1 4.4-2.5a.7.7 0 00.4-.6v-6.1l1.8 1.1v4.9a4.1 4.1 0 01-4.1 4.2zm-8.8-3.8a4.1 4.1 0 01-.5-2.8l.1.1 4.4 2.5a.7.7 0 00.7 0l5.4-3.1v2.2l-4.4 2.6a4.1 4.1 0 01-5.7-1.5zm-1.1-9.5a4.1 4.1 0 012.1-1.8v5.1a.7.7 0 00.4.6l5.4 3.1-1.9 1.1-4.4-2.5a4.1 4.1 0 01-1.6-5.6zm14.8 3.5L14 9.7l1.9-1.1 4.4 2.5a4.1 4.1 0 01-.6 7.4v-5.1a.7.7 0 00-.4-.6zm1.9-2.8l-.1-.1-4.4-2.5a.7.7 0 00-.7 0L10.6 11V8.8l4.4-2.6a4.1 4.1 0 016 3.4l-.1 4.5-1.8-1zm-11.7 3.9L7.6 13v-2.2L12 8.3a4.1 4.1 0 016 3.4l-.1 1.1-1.7-1v-4.9A4.1 4.1 0 0013 3.4a4.1 4.1 0 00-2.6.9l.1.1L14.9 7a.7.7 0 01.4.6v6.1l-1.8-1.1V7.7l-4.4 2.5a.7.7 0 00-.4.6v5.1l-1.2.7z"
            fill="#10a37f"
          />
        </svg>
      )
    case "meta":
      return (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-label="Meta">
          <path
            d="M4 16.5c0 1.1.24 1.96.67 2.56.43.6 1.05.94 1.83.94.97 0 1.86-.45 2.82-1.74.76-1.02 1.54-2.57 2.1-3.92l.6-1.47.87 1.56c.8 1.43 1.98 3.15 2.95 4.12.75.75 1.56 1.18 2.5 1.18 1.1 0 2.02-.53 2.64-1.53.56-.9.82-2.13.82-3.54 0-1.42-.28-2.6-.84-3.46-.5-.77-1.23-1.2-2.12-1.2-.9 0-1.77.44-2.67 1.35-.52.53-1.07 1.24-1.67 2.17l-.57.88-.56-.89c-.54-.87-1.02-1.5-1.5-2.02-.9-.98-1.8-1.49-2.77-1.49-.86 0-1.63.36-2.2 1.05C4.34 13.5 4 14.9 4 16.5zm-1 0c0-1.83.41-3.52 1.23-4.62.84-1.13 2.05-1.73 3.42-1.73 1.38 0 2.65.7 3.84 1.95.35.38.7.82 1.07 1.33.43-.64.84-1.16 1.23-1.57 1.2-1.25 2.48-1.96 3.9-1.96 1.53 0 2.78.7 3.6 1.97.77 1.2 1.11 2.71 1.11 4.4 0 1.68-.32 3.13-1.1 4.26C21.52 21.3 20.3 22 18.87 22c-1.3 0-2.42-.6-3.44-1.63-1.1-1.1-2.32-2.9-3.16-4.4-.77 1.5-1.56 2.78-2.35 3.7C8.85 21 7.6 22 6 22c-1.19 0-2.21-.5-2.93-1.46C2.37 19.63 3 18.24 3 16.5z"
            fill="#0081fb"
          />
        </svg>
      )
    case "framer":
      return (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-label="Framer">
          <path d="M7 4h12v7H13L7 4zm0 7h6l6 7H7v-7zm0 7h6v4L7 18z" fill="#6b7aff" />
        </svg>
      )
    case "more":
      return (
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-label="More">
          <circle cx="8" cy="13" r="2" fill="#666" />
          <circle cx="13" cy="13" r="2" fill="#666" />
          <circle cx="18" cy="13" r="2" fill="#666" />
        </svg>
      )
    default:
      return null
  }
}

// ─── Particle type ─────────────────────────────────────────────────────────────
interface Particle {
  x: number; y: number
  vx: number; vy: number
  r: number; life: number
  decay: number
}

// ─── Ease helper ───────────────────────────────────────────────────────────────
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

// ─── Main component ────────────────────────────────────────────────────────────
export interface DamnGoodCardProps {
  className?: string
}

export function DamnGoodCard({ className = "" }: DamnGoodCardProps) {
  useGoogleFonts()

  const cardRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const iconRefs = useRef<(HTMLDivElement | null)[]>([])
  const iconRectsRef = useRef<{ cx: number; r: number }[]>([])
  const popAmtRef = useRef<number[]>(ICONS.map(() => 0))
  const rafRef = useRef<number>(0)
  const lastTRef = useRef<number>(0)
  const particlesRef   = useRef<Particle[]>([])
  const visRef         = useRef<boolean>(true)
  // Scales all particle alpha: 1 while sweeping, fades to 0 during pause
  const smokeScaleRef  = useRef<number>(1)

  const scanRef = useRef({
    x: 0,
    dir: 1 as 1 | -1,
    phase: "sweep" as "sweep" | "pause",
    progress: 0,
    spawnerAcc: 0,
  })

  // ── Cache icon centre X relative to card ──────────────────────────────────
  const cacheIconRects = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    const cardRect = card.getBoundingClientRect()
    iconRectsRef.current = iconRefs.current.map((el) => {
      if (!el) return { cx: 0, r: 28 }
      const r = el.getBoundingClientRect()
      return {
        cx: r.left + r.width / 2 - cardRect.left,
        r: r.width / 2,
      }
    })
  }, [])

  useEffect(() => {
    const card = cardRef.current
    const canvas = canvasRef.current
    if (!card || !canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let W = 0, H = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = card.getBoundingClientRect()
      W = rect.width
      H = rect.height
      canvas.width = Math.floor(W * dpr)
      canvas.height = Math.floor(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const ro = new ResizeObserver(() => {
      resize()
      cacheIconRects()
    })
    ro.observe(card)
    resize()
    // ✅ FIX 3: defer first cache — icons must be in DOM first
    setTimeout(cacheIconRects, 100)

    // ✅ FIX 4: use visibility flag, never cancel RAF permanently
    const io = new IntersectionObserver(
      ([e]) => { visRef.current = e.isIntersecting },
      { threshold: 0 }
    )
    io.observe(card)

    // ── Animation constants ──────────────────────────────────────────────
    const DURATION = 4.8
    const PAUSE = 1.2
    const Y_TOP_R = 0.10
    const Y_BOT_R = 0.90
    const BEAM_W = 1.0
    const GLOW_W = 44   // half-width of the halo
    const SPAWN_PER_SEC = 38

    const spawnBurst = (
      scanX: number,
      lineTop: number,
      lineBot: number,
      dir: number
    ) => {
      const count = 5 + Math.floor(Math.random() * 5)
      for (let i = 0; i < count; i++) {
        const offsetX = -dir * (2 + Math.random() * 8)
        const rise = -(0.02 + Math.random() * 0.12)
        particlesRef.current.push({
          x: scanX + offsetX,
          y: lineTop + Math.random() * (lineBot - lineTop),
          vx: -dir * (0.2 + Math.random() * 0.9),
          vy: (Math.random() - 0.5) * 0.35 + rise,
          r: 3 + Math.random() * 4,
          life: 1,
          decay: 0.004 + Math.random() * 0.003,
        })
      }
    }

    const draw = (ts: number) => {
      rafRef.current = requestAnimationFrame(draw)
      // ✅ FIX 4: skip drawing but keep loop alive when off-screen
      if (!visRef.current) return

      const dt = Math.min((ts - lastTRef.current) / 1000, 0.05)
      lastTRef.current = ts

      ctx.clearRect(0, 0, W, H)

      const lineTop = H * Y_TOP_R
      const lineBot = H * Y_BOT_R
      const lineLen = lineBot - lineTop
      const scan = scanRef.current

      // ── Advance scan state ──────────────────────────────────────────
      let moving = false
      if (scan.phase === "sweep") {
        scan.progress = Math.min(scan.progress + dt / DURATION, 1)
        const eased = easeInOutCubic(scan.progress)
        scan.x = scan.dir === 1 ? eased * W : W - eased * W
        moving = true
        // Smoke fully visible while sweeping
        smokeScaleRef.current = Math.min(smokeScaleRef.current + dt * 3, 1)
        if (scan.progress >= 1) {
          scan.phase = "pause"
          scan.progress = 0
        }
      } else {
        scan.progress += dt
        // Fade smoke out smoothly over the pause window
        const fadeSpeed = 1 / PAUSE   // reaches 0 exactly as pause ends
        smokeScaleRef.current = Math.max(smokeScaleRef.current - dt * fadeSpeed, 0)
        if (scan.progress >= PAUSE) {
          scan.phase = "sweep"
          scan.progress = 0
          scan.dir = (scan.dir * -1) as 1 | -1
          // Clear any lingering particles so next sweep starts clean
          particlesRef.current = []
        }
      }

      const scanX = scan.x
      const smokeScale = smokeScaleRef.current

      // ── Spawn exhaust particles ─────────────────────────────────────
      if (moving) {
        scan.spawnerAcc += SPAWN_PER_SEC * dt
        while (scan.spawnerAcc >= 1) {
          spawnBurst(scanX, lineTop, lineBot, scan.dir)
          scan.spawnerAcc -= 1
        }
      }

      // ── Draw particles (before beam so beam renders on top) ─────────
      // ✅ FIX 1 + FIX 6: beginPath() before rect() for correct clip
      ctx.save()
      ctx.beginPath()
      ctx.rect(0, lineTop, W, lineLen)
      ctx.clip()

      const ps = particlesRef.current
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i]
        p.vx *= 0.985
        p.vy += 0.003
        p.x += p.vx
        p.y += p.vy
        p.life -= p.decay
        if (p.life <= 0) { ps.splice(i, 1); continue }

        const age   = 1 - p.life
        const drawR = p.r * (1 + 2.5 * age)
        // Particle's own alpha × global smoke fade scale
        const alpha = p.life * p.life * smokeScale
        if (alpha < 0.002) continue   // skip invisible puffs early

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, drawR)
        grad.addColorStop(0,    `rgba(210,210,225,${(alpha * 0.55).toFixed(3)})`)
        grad.addColorStop(0.35, `rgba(190,190,210,${(alpha * 0.28).toFixed(3)})`)
        grad.addColorStop(0.7,  `rgba(170,170,195,${(alpha * 0.10).toFixed(3)})`)
        grad.addColorStop(1,    `rgba(160,160,190,0)`)

        ctx.beginPath()
        ctx.arc(p.x, p.y, drawR, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      }
      ctx.restore()

      // ── Draw beam (clipped to beam zone) ────────────────────────────
      // ✅ FIX 1: beginPath() before rect() for correct clip
      ctx.save()
      ctx.beginPath()
      ctx.rect(0, lineTop, W, lineLen)
      ctx.clip()

      // ✅ FIX 2: halo uses GLOW_W as half-width on both sides
      const haloGrad = ctx.createLinearGradient(
        scanX - GLOW_W, 0,
        scanX + GLOW_W, 0
      )
      haloGrad.addColorStop(0, "rgba(255,255,255,0)")
      haloGrad.addColorStop(0.35, "rgba(255,255,255,0.03)")
      haloGrad.addColorStop(0.5, "rgba(255,255,255,0.07)")
      haloGrad.addColorStop(0.65, "rgba(255,255,255,0.03)")
      haloGrad.addColorStop(1, "rgba(255,255,255,0)")
      ctx.fillStyle = haloGrad
      // ✅ FIX 2: fillRect covers GLOW_W * 2 total width
      ctx.fillRect(scanX - GLOW_W, lineTop, GLOW_W * 2, lineLen)

      // Core beam
      const beamGrad = ctx.createLinearGradient(0, lineTop, 0, lineBot)
      beamGrad.addColorStop(0, "rgba(255,255,255,0)")
      beamGrad.addColorStop(0.03, "rgba(255,255,255,0.85)")
      beamGrad.addColorStop(0.5, "rgba(255,255,255,1)")
      beamGrad.addColorStop(0.97, "rgba(255,255,255,0.85)")
      beamGrad.addColorStop(1, "rgba(255,255,255,0)")
      ctx.fillStyle = beamGrad
      ctx.fillRect(scanX - BEAM_W / 2, lineTop, BEAM_W, lineLen)

      ctx.restore()

      // ── Crisp tip dots at cut points ────────────────────────────────
      for (const ty of [lineTop, lineBot]) {
        const tipGrad = ctx.createRadialGradient(scanX, ty, 0, scanX, ty, 6)
        tipGrad.addColorStop(0, "rgba(255,255,255,1)")
        tipGrad.addColorStop(0.4, "rgba(255,255,255,0.25)")
        tipGrad.addColorStop(1, "rgba(255,255,255,0)")
        ctx.beginPath()
        ctx.arc(scanX, ty, 6, 0, Math.PI * 2)
        ctx.fillStyle = tipGrad
        ctx.fill()
      }

      // ── Icon pop ────────────────────────────────────────────────────
      const pops = popAmtRef.current
      const rects = iconRectsRef.current
      ICONS.forEach(({ color }, i) => {
        const icon = rects[i]
        if (!icon) return
        const dist = Math.abs(scanX - icon.cx)
        const trigger = icon.r + 22
        const hoverT = dist < trigger
          ? Math.pow(Math.max(0, 1 - dist / trigger), 0.65)
          : 0
        pops[i] += (hoverT - pops[i]) * Math.min(dt * 11, 1)
        const p = pops[i]
        const el = iconRefs.current[i]
        if (!el) return
        const [cr, cg, cb] = color
        el.style.transform = `translateY(${-p * 12}px) scale(${1 + p * 0.18})`
        el.style.borderColor = `rgba(${cr},${cg},${cb},${(0.15 + p * 0.5).toFixed(3)})`
        el.style.boxShadow = `0 0 ${14 * p}px rgba(${cr},${cg},${cb},${(0.28 * p).toFixed(3)}), 0 ${8 * p}px ${18 * p}px rgba(0,0,0,0.45)`
        el.style.zIndex = p > 0.1 ? "20" : "1"
      })
    }

    lastTRef.current = performance.now()
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      io.disconnect()
    }
  }, [cacheIconRects])

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        position: "relative",
        maxWidth: 520,
        minHeight: 400,
        background: "#0a0a0a",
        borderRadius: 20,
        border: "0.5px solid #1e1e1e",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: 28,
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {/* Canvas — z-index 2, pointer-events none */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Icon row */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translateX(-50%) translateY(-64%)",
          display: "flex",
          zIndex: 3,
        }}
      >
        {ICONS.map(({ id }, i) => (
          <div
            key={id}
            ref={(el) => { iconRefs.current[i] = el }}
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "#141414",
              border: "0.5px solid #272727",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginLeft: i === 0 ? 0 : -11,
              flexShrink: 0,
              willChange: "transform",
              transition:
                "transform 0.35s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s, box-shadow 0.3s",
              position: "relative",
            }}
          >
            <IconSVG id={id} />
          </div>
        ))}
      </div>

      {/* Bottom text */}
      <div style={{ position: "relative", zIndex: 10 }}>
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: "-0.5px",
            color: "#f0f0f0",
            margin: 0,
            marginBottom: 8,
            lineHeight: 1.2,
          }}
        >
          Damn good card
        </h2>
        <p
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 13,
            fontWeight: 300,
            lineHeight: 1.6,
            color: "#4a4a4a",
            margin: 0,
            maxWidth: 300,
          }}
        >
          A card that showcases a set of tools that you use to create your product.
        </p>
      </div>
    </div>
  )
}