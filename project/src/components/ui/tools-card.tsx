"use client"

import { useEffect, useRef, useState, useCallback } from "react"

// ─── Google Fonts loader (Vite-safe, no next/font) ──────────────────────────
function useGoogleFonts() {
  useEffect(() => {
    const id = "tools-card-gfonts"
    if (document.getElementById(id)) return
    const link = document.createElement("link")
    link.id = id
    link.rel = "stylesheet"
    link.href =
      "https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700;800&family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap"
    document.head.appendChild(link)
  }, [])
}

// ─── Font CSS variables ───────────────────────────────────────────────────────
const FONTS = {
  syne: "'Syne', sans-serif",
  grotesk: "'Space Grotesk', sans-serif",
  mono: "'Space Mono', monospace",
}

// ─── Tools data ───────────────────────────────────────────────────────────────
const TOOLS = [
  { name: "React",      role: "ui framework",  bg: "#0d1b2a", fg: "#61dafb", letter: "R"  },
  { name: "TypeScript", role: "type safety",   bg: "#0d1a30", fg: "#3b82f6", letter: "TS" },
  { name: "Tailwind",   role: "styling",       bg: "#051a2a", fg: "#38bdf8", letter: "TW" },
  { name: "Next.js",    role: "app framework", bg: "#111",    fg: "#e5e5e5", letter: "N"  },
  { name: "Framer",     role: "motion",        bg: "#100a1e", fg: "#a78bfa", letter: "FM" },
  { name: "Figma",      role: "design",        bg: "#130a1e", fg: "#c084fc", letter: "FG" },
  { name: "Supabase",   role: "database",      bg: "#061a0f", fg: "#34d399", letter: "SB" },
  { name: "Vercel",     role: "deploy",        bg: "#111",    fg: "#d4d4d4", letter: "VC" },
  { name: "shadcn",     role: "components",    bg: "#111",    fg: "#a1a1aa", letter: "SC" },
  { name: "Prisma",     role: "orm",           bg: "#0a1020", fg: "#818cf8", letter: "PR" },
  { name: "pnpm",       role: "packages",      bg: "#1a0e00", fg: "#fb923c", letter: "PN" },
  { name: "Zod",        role: "validation",    bg: "#061a08", fg: "#4ade80", letter: "ZD" },
]

// ─── Neon palette ─────────────────────────────────────────────────────────────
const NEON: [number, number, number][] = [
  [0, 200, 255],
  [160, 0, 255],
  [255, 50, 170],
  [0, 255, 160],
  [255, 170, 0],
  [120, 80, 255],
]

function randomNeon(): [number, number, number] {
  return NEON[Math.floor(Math.random() * NEON.length)]
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

interface CanvasDot {
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

// ─── Banner canvas ────────────────────────────────────────────────────────────
function BannerCanvas({ bannerRef }: { bannerRef: React.RefObject<HTMLDivElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dotsRef   = useRef<CanvasDot[]>([])
  const mouseRef  = useRef<{ x: number; y: number } | null>(null)
  const rafRef    = useRef<number>(0)
  const lastTRef  = useRef<number>(0)
  const visRef    = useRef<boolean>(true)

  const buildDots = useCallback((w: number, h: number): CanvasDot[] => {
    const gap = 10
    const dots: CanvasDot[] = []
    const cols = Math.ceil(w / gap) + 1
    const rows = Math.ceil(h / gap) + 1
    for (let row = 0; row < rows; row++) {
      const stagger = row % 2 === 0 ? 0 : gap / 2
      for (let col = 0; col < cols; col++) {
        dots.push({
          x: col * gap + stagger,
          y: row * gap,
          phase:      Math.random() * Math.PI * 2,
          speed:      0.06 + Math.random() * 0.18,
          hoverAmt:   0,
          colorFrom:  randomNeon(),
          colorTo:    randomNeon(),
          colorT:     Math.random(),
          colorSpeed: 0.4 + Math.random() * 0.4,
        })
      }
    }
    return dots
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let W = 0, H = 0
    let dpr = window.devicePixelRatio || 1

    const resize = () => {
      dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      W = rect.width; H = rect.height
      canvas.width  = W * dpr
      canvas.height = H * dpr
      ctx.scale(dpr, dpr)
      dotsRef.current = buildDots(W, H)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    const io = new IntersectionObserver(
      ([e]) => { visRef.current = e.isIntersecting },
      { threshold: 0 }
    )
    io.observe(canvas)

    // attach mouse/touch to the banner div so the full area is hot
    const banner = bannerRef.current ?? canvas
    const onMM = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const onML = () => { mouseRef.current = null }
    const onTM = (e: TouchEvent) => {
      const r = canvas.getBoundingClientRect(), t = e.touches[0]
      mouseRef.current = { x: t.clientX - r.left, y: t.clientY - r.top }
    }
    const onTE = () => { mouseRef.current = null }
    banner.addEventListener("mousemove", onMM as EventListener)
    banner.addEventListener("mouseleave", onML)
    banner.addEventListener("touchmove", onTM as EventListener, { passive: true })
    banner.addEventListener("touchend", onTE)

    // ── Spec constants ────────────────────────────────────────────────────
    const BASE_R   = 1.5                       // base dot radius
    const HOVER_PX = 48                        // proximity threshold (px)
    const BASE_C: [number, number, number] = [160, 160, 180]

    const draw = (ts: number) => {
      rafRef.current = requestAnimationFrame(draw)
      if (!visRef.current) return

      const dt = Math.min((ts - lastTRef.current) / 1000, 0.1)
      lastTRef.current = ts
      ctx.clearRect(0, 0, W, H)

      const mouse = mouseRef.current
      // hw / hh are the ellipse axes — vignette visible within 52% of each
      const hw = W / 2
      const hh = H / 2

      for (const dot of dotsRef.current) {
        // ── Radial vignette: Math.pow(Math.max(0, 1 - ellipticalDist / 0.52), 1.6)
        // W*0.52 and H*0.52 are the effective visible semi-axes because
        // threshold ell/0.52 = 1 corresponds to ell = 0.52 in normalised space,
        // i.e. a physical offset of 0.52 * hw = W*0.26 from centre each side.
        const nx = (dot.x - hw) / hw   // –1 … 1
        const ny = (dot.y - hh) / hh   // –1 … 1
        const ellipticalDist = Math.sqrt(nx * nx + ny * ny)
        const vig = Math.pow(Math.max(0, 1 - ellipticalDist / 0.52), 1.6)
        if (vig <= 0) continue

        dot.phase += dot.speed * dt
        const shimmer = 0.5 + 0.5 * Math.sin(dot.phase) // 0…1

        // ── Hover within 48px ────────────────────────────────────────────
        let inHover = false
        if (mouse) {
          const dx = dot.x - mouse.x
          const dy = dot.y - mouse.y
          inHover = dx * dx + dy * dy < HOVER_PX * HOVER_PX
        }
        // hoverAmt lerps toward 1 at dt*9
        dot.hoverAmt = lerp(dot.hoverAmt, inHover ? 1 : 0, dt * 9)
        const h = dot.hoverAmt

        if (h > 0.02) {
          // ── Hovered: grow radius +1.8, bloom shadowBlur=hoverAmt*16,
          //    morph colorFrom → colorTo at colorSpeed ──────────────────────
          dot.colorT += dot.colorSpeed * dt
          if (dot.colorT >= 1) {
            dot.colorFrom = dot.colorTo
            dot.colorTo   = randomNeon()
            dot.colorT    = 0
          }
          const cr = Math.round(lerp(dot.colorFrom[0], dot.colorTo[0], dot.colorT))
          const cg = Math.round(lerp(dot.colorFrom[1], dot.colorTo[1], dot.colorT))
          const cb = Math.round(lerp(dot.colorFrom[2], dot.colorTo[2], dot.colorT))

          const dotR    = BASE_R + h * 1.8
          const dotAlpha = vig * lerp(shimmer, 1.0, h)

          ctx.save()
          ctx.shadowBlur  = h * 16                   // bloom
          ctx.shadowColor = `rgba(${cr},${cg},${cb},${(dotAlpha * h).toFixed(3)})`
          ctx.beginPath()
          ctx.arc(dot.x, dot.y, dotR, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${cr},${cg},${cb},${dotAlpha.toFixed(3)})`
          ctx.fill()
          ctx.restore()
        } else {
          // ── Non-hovered: rgba(160,160,180, 0.35–0.65) — no colour ──────
          const alpha = vig * lerp(0.35, 0.65, shimmer)
          ctx.beginPath()
          ctx.arc(dot.x, dot.y, BASE_R, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${BASE_C[0]},${BASE_C[1]},${BASE_C[2]},${alpha.toFixed(3)})`
          ctx.fill()
        }
      }
    }

    lastTRef.current = performance.now()
    rafRef.current   = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect(); io.disconnect()
      banner.removeEventListener("mousemove", onMM as EventListener)
      banner.removeEventListener("mouseleave", onML)
      banner.removeEventListener("touchmove", onTM as EventListener)
      banner.removeEventListener("touchend", onTE)
    }
  }, [buildDots, bannerRef])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  )
}

// ─── Tool chip ────────────────────────────────────────────────────────────────
function ToolChip({ tool }: { tool: typeof TOOLS[number] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 12,
        padding: "9px 10px",
        border: `0.5px solid ${hovered ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.07)"}`,
        background: hovered ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.025)",
        display: "flex",
        alignItems: "flex-start",
        gap: 8,
        cursor: "default",
        transition: "border-color 0.15s, background 0.15s",
        position: "relative",
      }}
    >
      {/* Neon dot top-right — shows on hover */}
      <div
        style={{
          position: "absolute",
          top: 7,
          right: 8,
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: tool.fg,
          boxShadow: `0 0 6px ${tool.fg}`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.2s",
        }}
      />

      {/* Icon badge */}
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: 7,
          background: tool.bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          border: "0.5px solid rgba(255,255,255,0.08)",
        }}
      >
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize: 9,
            fontWeight: 700,
            color: tool.fg,
            lineHeight: 1,
          }}
        >
          {tool.letter}
        </span>
      </div>

      {/* Text */}
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontFamily: FONTS.grotesk,
            fontSize: 12,
            fontWeight: 600,
            color: "#e2e2e2",
            lineHeight: 1.2,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {tool.name}
        </div>
        <div
          style={{
            fontFamily: FONTS.grotesk,
            fontSize: 10,
            fontWeight: 300,
            color: "#666",
            lineHeight: 1.2,
            textTransform: "lowercase",
          }}
        >
          {tool.role}
        </div>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export interface ToolsCardProps {
  className?: string
}

export function ToolsCard({ className = "" }: ToolsCardProps) {
  useGoogleFonts()

  const bannerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      className={className}
      style={{
        display: "block",
        maxWidth: 560,
        width: "100%",
        boxSizing: "border-box",
        borderRadius: 24,
        border: "0.5px solid var(--border, rgba(255,255,255,0.1))",
        overflow: "hidden",
        fontFamily: FONTS.grotesk,
      }}
    >
      {/* ── Dark banner ──────────────────────────────────────────────────────── */}
      <div
        ref={bannerRef}
        style={{
          height: 210,
          background: "#080808",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated dotted canvas */}
        <BannerCanvas bannerRef={bannerRef} />

        {/* Text content — bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 24,
            zIndex: 10,
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              fontFamily: FONTS.mono,
              fontSize: 9,
              fontWeight: 400,
              color: "#555",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: 6,
            }}
          >
            {"// our-stack.ts"}
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: FONTS.syne,
              fontSize: 32,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#f0f0f0",
              lineHeight: 1.1,
              margin: 0,
            }}
          >
            built{" "}
            <span style={{ color: "#555" }}>with</span>
            {" "}intention
            <span style={{ color: "#555" }}>.</span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: FONTS.grotesk,
              fontSize: 12,
              fontWeight: 300,
              color: "#555",
              marginTop: 6,
              marginBottom: 0,
            }}
          >
            every tool, handpicked ✦
          </p>
        </div>
      </div>

      {/* ── Card body ─────────────────────────────────────────────────────────── */}
      <div
        className="bg-background"
        style={{
          padding: "1.25rem 1.5rem 1.5rem",
          width: "100%",
          boxSizing: "border-box",
          borderTop: "0.5px solid var(--border, rgba(255,255,255,0.1))",
        }}
      >
        {/* Section row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <span
            className="text-muted-foreground"
            style={{
              fontFamily: FONTS.mono,
              fontSize: 9,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
            }}
          >
            {"// stack"}
          </span>
          <span
            className="text-foreground"
            style={{
              fontFamily: FONTS.syne,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.04em",
            }}
          >
            {TOOLS.length} tools
          </span>
        </div>

        {/* Tool chips grid — explicit 4 cols, always reliable */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: 7,
            marginBottom: 20,
          }}
        >
          {TOOLS.map((tool) => (
            <ToolChip key={tool.name} tool={tool} />
          ))}
        </div>

        {/* Divider */}
        <div style={{ borderTop: "0.5px solid var(--border, rgba(255,255,255,0.1))", marginBottom: 16 }} />

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Version block */}
          <div>
            <div
              className="text-foreground"
              style={{
                fontFamily: FONTS.syne,
                fontSize: 20,
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              v2.4
            </div>
            <div
              className="text-muted-foreground"
              style={{
                fontFamily: FONTS.mono,
                fontSize: 9,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginTop: 3,
              }}
            >
              current release
            </div>
          </div>

          {/* Status pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              borderRadius: 999,
              padding: "6px 12px",
              border: "1px solid var(--border, rgba(255,255,255,0.1))",
              background: "var(--muted, rgba(255,255,255,0.04))",
            }}
          >
            {/* Pulsing green dot */}
            <span style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#22c55e",
                  display: "block",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#22c55e",
                  animation: "tools-ping 1.4s cubic-bezier(0,0,0.2,1) infinite",
                }}
              />
            </span>
            <span
              className="text-foreground"
              style={{
                fontFamily: FONTS.grotesk,
                fontSize: 11,
                fontWeight: 500,
              }}
            >
              actively shipping
            </span>
          </div>
        </div>
      </div>

      {/* Ping animation keyframes */}
      <style>{`
        @keyframes tools-ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
