"use client"

import { useEffect, useRef, useState, useCallback } from "react"

// ─── Google Fonts loader ──────────────────────────────────────────────────────
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
  syne:    "'Syne', sans-serif",
  grotesk: "'Space Grotesk', sans-serif",
  mono:    "'Space Mono', monospace",
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
  [0,   200, 255],
  [160, 0,   255],
  [255, 50,  170],
  [0,   255, 160],
  [255, 170, 0  ],
  [120, 80,  255],
]

function randomNeon(): [number, number, number] {
  return NEON[Math.floor(Math.random() * NEON.length)]
}

function lerpNum(a: number, b: number, t: number) {
  return a + (b - a) * t
}

// ─── Dot type ─────────────────────────────────────────────────────────────────
interface CanvasDot {
  x:          number
  y:          number
  phase:      number
  speed:      number
  hoverAmt:   number
  colorFrom:  [number, number, number]
  colorTo:    [number, number, number]
  colorT:     number
  colorSpeed: number
}

// ─── Ripple type ──────────────────────────────────────────────────────────────
interface Ripple {
  x:       number
  y:       number
  r:       number
  maxR:    number
  opacity: number
}

// ─── Detect dark mode ─────────────────────────────────────────────────────────
function isDarkMode(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ||
    document.documentElement.classList.contains("dark")
}

// ─── Banner canvas ────────────────────────────────────────────────────────────
function BannerCanvas({
  bannerRef,
}: {
  bannerRef: React.RefObject<HTMLDivElement | null>
}) {
  const canvasRef     = useRef<HTMLCanvasElement>(null)
  const dotsRef       = useRef<CanvasDot[]>([])
  const ripplesRef    = useRef<Ripple[]>([])
  const mouseRef      = useRef<{ x: number; y: number } | null>(null)
  const lastRippleRef = useRef<number>(0)
  const rafRef        = useRef<number>(0)
  const lastTRef      = useRef<number>(0)
  const visRef        = useRef<boolean>(true)

  const buildDots = useCallback((w: number, h: number): CanvasDot[] => {
    const gap  = 7
    const dots: CanvasDot[] = []
    const cols = Math.ceil(w / gap) + 4
    const rows = Math.ceil(h / gap) + 4
    for (let row = -2; row < rows; row++) {
      const stagger = row % 2 === 0 ? 0 : gap / 2
      for (let col = -2; col < cols; col++) {
        dots.push({
          x:          col * gap + stagger,
          y:          row * gap,
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
    const banner = bannerRef.current
    if (!canvas || !banner) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let W = 0
    let H = 0

    const resize = () => {
      const dpr  = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      W = rect.width
      H = rect.height
      canvas.width  = Math.floor(W * dpr)
      canvas.height = Math.floor(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
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

    // ── Events ────────────────────────────────────────────────────────────
    const spawnRipple = (x: number, y: number) => {
      const now = performance.now()
      if (now - lastRippleRef.current < 80) return
      lastRippleRef.current = now
      ripplesRef.current.push({ x, y, r: 0, maxR: 55, opacity: 0.55 })
      if (ripplesRef.current.length > 8) ripplesRef.current.shift()
    }

    const onMM = (e: MouseEvent) => {
      const r  = canvas.getBoundingClientRect()
      const mx = e.clientX - r.left
      const my = e.clientY - r.top
      mouseRef.current = { x: mx, y: my }
      spawnRipple(mx, my)
    }
    const onML = () => { mouseRef.current = null }
    const onTM = (e: TouchEvent) => {
      const r  = canvas.getBoundingClientRect()
      const t  = e.touches[0]
      const mx = t.clientX - r.left
      const my = t.clientY - r.top
      mouseRef.current = { x: mx, y: my }
      spawnRipple(mx, my)
    }
    const onTE = () => { mouseRef.current = null }

    banner.addEventListener("mousemove",  onMM as EventListener)
    banner.addEventListener("mouseleave", onML)
    banner.addEventListener("touchmove",  onTM as EventListener, { passive: true })
    banner.addEventListener("touchend",   onTE)

    // ── Constants ─────────────────────────────────────────────────────────
    const BASE_R     = 1.5
    const HOVER_PX   = 44
    const RIPPLE_SPD = 90

    const draw = (ts: number) => {
      rafRef.current = requestAnimationFrame(draw)
      if (!visRef.current) return

      const dt = Math.min((ts - lastTRef.current) / 1000, 0.05)
      lastTRef.current = ts
      ctx.clearRect(0, 0, W, H)

      // ── Dot base colour adapts to theme ───────────────────────────────
      const dark  = isDarkMode()
      // Dark mode: light grey dots on dark bg. Light mode: darker dots on light bg.
      const BASE_C: [number, number, number] = dark ? [160, 160, 180] : [80, 80, 100]
      const RIPPLE_STROKE = dark ? "180,180,210" : "100,100,140"

      // ── Age & draw ripple rings ────────────────────────────────────────
      const ripples = ripplesRef.current
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i]
        rp.r      += RIPPLE_SPD * dt
        rp.opacity = 0.55 * (1 - rp.r / rp.maxR)
        if (rp.opacity <= 0.01) { ripples.splice(i, 1); continue }
        ctx.save()
        ctx.beginPath()
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${RIPPLE_STROKE},${rp.opacity.toFixed(3)})`
        ctx.lineWidth   = 0.8
        ctx.stroke()
        ctx.restore()
      }

      const mouse = mouseRef.current
      const t = ts / 1000

      for (const dot of dotsRef.current) {
        // Elliptical mask (~75% area)
        const ex      = (dot.x - W / 2) / (W * 0.489)
        const ey      = (dot.y - H / 2) / (H * 0.489)
        const ellDist = Math.sqrt(ex * ex + ey * ey)
        const vig     = Math.pow(Math.max(0, 1 - ellDist), 1.2)
        if (vig <= 0.005) continue

        const shimmer = 0.5 + 0.5 * Math.sin(dot.phase + t * dot.speed)

        // ── Hover ─────────────────────────────────────────────────────────
        let hoverTarget = 0
        if (mouse) {
          const dx = dot.x - mouse.x
          const dy = dot.y - mouse.y
          if (dx * dx + dy * dy < HOVER_PX * HOVER_PX) hoverTarget = 1
        }
        dot.hoverAmt = lerpNum(dot.hoverAmt, hoverTarget, Math.min(dt * 8, 1))
        const h = dot.hoverAmt

        if (h > 0.02) {
          // ── Hovered: neon morph ────────────────────────────────────────
          dot.colorT += dot.colorSpeed * dt
          if (dot.colorT >= 1) {
            dot.colorFrom = dot.colorTo
            dot.colorTo   = randomNeon()
            dot.colorT    = 0
          }
          const cr = Math.round(lerpNum(dot.colorFrom[0], dot.colorTo[0], dot.colorT))
          const cg = Math.round(lerpNum(dot.colorFrom[1], dot.colorTo[1], dot.colorT))
          const cb = Math.round(lerpNum(dot.colorFrom[2], dot.colorTo[2], dot.colorT))

          const dotAlpha  = Math.min(0.70, vig * lerpNum(shimmer, 0.85, h))
          const glowAlpha = (dotAlpha * h * 0.5).toFixed(3)

          ctx.save()
          ctx.shadowBlur  = h * 7
          ctx.shadowColor = `rgba(${cr},${cg},${cb},${glowAlpha})`
          ctx.beginPath()
          ctx.arc(dot.x, dot.y, BASE_R + h * 1.0, 0, Math.PI * 2)
          ctx.fillStyle   = `rgba(${cr},${cg},${cb},${dotAlpha.toFixed(3)})`
          ctx.fill()
          ctx.restore()
        } else {
          // ── Idle: muted dot ────────────────────────────────────────────
          const alpha = vig * lerpNum(0.30, 0.55, shimmer)
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
      ro.disconnect()
      io.disconnect()
      banner.removeEventListener("mousemove",  onMM as EventListener)
      banner.removeEventListener("mouseleave", onML)
      banner.removeEventListener("touchmove",  onTM as EventListener)
      banner.removeEventListener("touchend",   onTE)
    }
  }, [buildDots, bannerRef])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset:    0,
        width:    "100%",
        height:   "100%",
        display:  "block",
      }}
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
        padding:      "9px 10px",
        // Theme-aware border & bg using CSS custom properties
        border:       `0.5px solid ${hovered
          ? "var(--tools-chip-border-hover, rgba(0,0,0,0.18))"
          : "var(--tools-chip-border, rgba(0,0,0,0.08))"}`,
        background:   hovered
          ? "var(--tools-chip-bg-hover, rgba(0,0,0,0.05))"
          : "var(--tools-chip-bg, rgba(0,0,0,0.025))",
        display:      "flex",
        alignItems:   "flex-start",
        gap:          8,
        cursor:       "default",
        transition:   "border-color 0.15s, background 0.15s",
        position:     "relative",
      }}
    >
      {/* Neon dot — top-right, visible on hover */}
      <div
        style={{
          position:     "absolute",
          top:          7,
          right:        8,
          width:        5,
          height:       5,
          borderRadius: "50%",
          background:   tool.fg,
          boxShadow:    `0 0 6px ${tool.fg}`,
          opacity:      hovered ? 1 : 0,
          transition:   "opacity 0.2s",
        }}
      />

      {/* Icon badge — always dark so the neon letter pops */}
      <div
        style={{
          width:          28,
          height:         28,
          borderRadius:   7,
          background:     tool.bg,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          flexShrink:     0,
          border:         "0.5px solid rgba(255,255,255,0.08)",
        }}
      >
        <span
          style={{
            fontFamily: FONTS.mono,
            fontSize:   9,
            fontWeight: 700,
            color:      tool.fg,
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
            fontFamily:   FONTS.grotesk,
            fontSize:     12,
            fontWeight:   600,
            color:        "var(--foreground)",
            lineHeight:   1.2,
            whiteSpace:   "nowrap",
            overflow:     "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {tool.name}
        </div>
        <div
          style={{
            fontFamily:    FONTS.grotesk,
            fontSize:      10,
            fontWeight:    300,
            color:         "var(--muted-foreground)",
            lineHeight:    1.2,
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
        display:      "block",
        maxWidth:     560,
        width:        "100%",
        boxSizing:    "border-box",
        borderRadius: 24,
        border:       "0.5px solid var(--border)",
        overflow:     "hidden",
        fontFamily:   FONTS.grotesk,
        // Inject chip theme vars — different values for dark vs light
        // These cascade into ToolChip without needing media queries in JS
      }}
    >
      {/* Scoped CSS vars for both colour schemes */}
      <style>{`
        @keyframes tools-ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        /* Dark defaults (most UIs are dark-first) */
        .tools-card-root {
          --tools-chip-border:       rgba(255,255,255,0.07);
          --tools-chip-border-hover: rgba(255,255,255,0.18);
          --tools-chip-bg:           rgba(255,255,255,0.025);
          --tools-chip-bg-hover:     rgba(255,255,255,0.05);
          --tools-banner-bg:         #080808;
          --tools-label-color:       #555;
          --tools-title-color:       #f0f0f0;
          --tools-muted-text:        #555;
        }
        /* Light mode overrides */
        @media (prefers-color-scheme: light) {
          .tools-card-root {
            --tools-chip-border:       rgba(0,0,0,0.08);
            --tools-chip-border-hover: rgba(0,0,0,0.18);
            --tools-chip-bg:           rgba(0,0,0,0.025);
            --tools-chip-bg-hover:     rgba(0,0,0,0.05);
            --tools-banner-bg:         #f0f0f2;
            --tools-label-color:       #888;
            --tools-title-color:       #111;
            --tools-muted-text:        #888;
          }
        }
        /* Tailwind dark class support */
        .dark .tools-card-root {
          --tools-chip-border:       rgba(255,255,255,0.07);
          --tools-chip-border-hover: rgba(255,255,255,0.18);
          --tools-chip-bg:           rgba(255,255,255,0.025);
          --tools-chip-bg-hover:     rgba(255,255,255,0.05);
          --tools-banner-bg:         #080808;
          --tools-label-color:       #555;
          --tools-title-color:       #f0f0f0;
          --tools-muted-text:        #555;
        }
      `}</style>

      {/* Wrapper that carries the scoped vars */}
      <div className="tools-card-root" style={{ display: "contents" }}>

        {/* ── Banner ──────────────────────────────────────────────────────── */}
        <div
          ref={bannerRef}
          style={{
            height:     210,
            background: "var(--tools-banner-bg, #080808)",
            position:   "relative",
            overflow:   "hidden",
            cursor:     "crosshair",
          }}
        >
          <BannerCanvas bannerRef={bannerRef} />

          {/* Bottom-left text */}
          <div
            style={{
              position:      "absolute",
              bottom:        20,
              left:          24,
              zIndex:        10,
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                fontFamily:    FONTS.mono,
                fontSize:      9,
                fontWeight:    400,
                color:         "var(--tools-label-color, #555)",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                marginBottom:  6,
              }}
            >
              {"// our-stack.ts"}
            </div>

            <h1
              style={{
                fontFamily:    FONTS.syne,
                fontSize:      32,
                fontWeight:    800,
                letterSpacing: "-0.03em",
                color:         "var(--tools-title-color, #f0f0f0)",
                lineHeight:    1.1,
                margin:        0,
              }}
            >
              built{" "}
              <span style={{ color: "var(--tools-label-color, #555)" }}>with</span>
              {" "}intention
              <span style={{ color: "var(--tools-label-color, #555)" }}>.</span>
            </h1>

            <p
              style={{
                fontFamily: FONTS.grotesk,
                fontSize:   12,
                fontWeight: 300,
                color:      "var(--tools-muted-text, #555)",
                marginTop:  6,
                marginBottom: 0,
              }}
            >
              every tool, handpicked ✦
            </p>
          </div>
        </div>

        {/* ── Card body ───────────────────────────────────────────────────── */}
        <div
          className="bg-background"
          style={{
            padding:   "1.25rem 1.5rem 1.5rem",
            width:     "100%",
            boxSizing: "border-box",
            borderTop: "0.5px solid var(--border)",
          }}
        >
          {/* Section row */}
          <div
            style={{
              display:        "flex",
              alignItems:     "center",
              justifyContent: "space-between",
              marginBottom:   12,
            }}
          >
            <span
              className="text-muted-foreground"
              style={{
                fontFamily:    FONTS.mono,
                fontSize:      9,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
              }}
            >
              {"// stack"}
            </span>
            <span
              className="text-foreground"
              style={{
                fontFamily:    FONTS.syne,
                fontSize:      11,
                fontWeight:    700,
                letterSpacing: "0.04em",
              }}
            >
              {TOOLS.length} tools
            </span>
          </div>

          {/* Tool chips grid */}
          <div
            style={{
              display:             "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap:                 7,
              marginBottom:        20,
            }}
          >
            {TOOLS.map((tool) => (
              <ToolChip key={tool.name} tool={tool} />
            ))}
          </div>

          {/* Divider */}
          <div
            style={{
              borderTop:    "0.5px solid var(--border)",
              marginBottom: 16,
            }}
          />

          {/* Footer */}
          <div
            style={{
              display:        "flex",
              alignItems:     "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                className="text-foreground"
                style={{
                  fontFamily:    FONTS.syne,
                  fontSize:      20,
                  fontWeight:    800,
                  lineHeight:    1,
                  letterSpacing: "-0.02em",
                }}
              >
                v2.4
              </div>
              <div
                className="text-muted-foreground"
                style={{
                  fontFamily:    FONTS.mono,
                  fontSize:      9,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  marginTop:     3,
                }}
              >
                current release
              </div>
            </div>

            {/* Status pill */}
            <div
              style={{
                display:     "inline-flex",
                alignItems:  "center",
                gap:         6,
                borderRadius: 999,
                padding:     "6px 12px",
                border:      "1px solid var(--border)",
                background:  "var(--muted)",
              }}
            >
              <span
                style={{
                  position:   "relative",
                  display:    "flex",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    width:        7,
                    height:       7,
                    borderRadius: "50%",
                    background:   "#22c55e",
                    display:      "block",
                  }}
                />
                <span
                  style={{
                    position:     "absolute",
                    width:        7,
                    height:       7,
                    borderRadius: "50%",
                    background:   "#22c55e",
                    animation:    "tools-ping 1.4s cubic-bezier(0,0,0.2,1) infinite",
                  }}
                />
              </span>
              <span
                className="text-foreground"
                style={{
                  fontFamily: FONTS.grotesk,
                  fontSize:   11,
                  fontWeight: 500,
                }}
              >
                actively shipping
              </span>
            </div>
          </div>
        </div>

      </div>{/* end .tools-card-root */}
    </div>
  )
}