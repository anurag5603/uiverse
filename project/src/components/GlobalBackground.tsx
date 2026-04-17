import { motion } from "framer-motion"

/**
 * GlobalBackground
 * Fixed behind all content. Three layers:
 *  1. Animated radial gradient orbs (slow, drifting)
 *  2. 40px grid overlay (very subtle, adapts to light/dark)
 *  3. Edge vignette to fade the grid out
 *
 * All layers are pointer-events-none and z-[-1] so they never
 * interfere with interactive content.
 */

interface Orb {
  className: string
  /** keyframe path the orb drifts along — [x0, x1, x2, x0] pixels */
  x: number[]
  /** keyframe path for vertical drift */
  y: number[]
  duration: number
}

const orbs: Orb[] = [
  {
    // Top-left — primary tint
    className:
      "absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.12)_0%,transparent_70%)]",
    x: [0, 40, -20, 0],
    y: [0, -30, 50, 0],
    duration: 28,
  },
  {
    // Top-right — blue/violet tint
    className:
      "absolute -top-20 right-0 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,oklch(0.7_0.15_260/0.09)_0%,transparent_70%)]",
    x: [0, -50, 30, 0],
    y: [0, 40, -20, 0],
    duration: 35,
  },
  {
    // Centre — warm accent
    className:
      "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[radial-gradient(ellipse,hsl(var(--primary)/0.07)_0%,transparent_70%)]",
    x: [0, 20, -30, 0],
    y: [0, -20, 10, 0],
    duration: 40,
  },
  {
    // Bottom-left — emerald tint
    className:
      "absolute bottom-0 -left-20 w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,oklch(0.7_0.15_160/0.08)_0%,transparent_70%)]",
    x: [0, 30, -10, 0],
    y: [0, -40, 20, 0],
    duration: 32,
  },
  {
    // Bottom-right — rose tint
    className:
      "absolute -bottom-20 -right-20 w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,oklch(0.7_0.15_0/0.07)_0%,transparent_70%)]",
    x: [0, -30, 20, 0],
    y: [0, 30, -15, 0],
    duration: 38,
  },
]

export function GlobalBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Layer 1 — animated orbs */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={orb.className}
          animate={{ x: orb.x, y: orb.y }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            // stagger start so they don't all move in sync
            delay: i * 3,
          }}
        />
      ))}

      {/* Layer 2 — 40px grid */}
      <div
        className="absolute inset-0 opacity-[0.25] dark:opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(to right, var(--border) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Layer 3 — radial vignette to fade grid edges */}
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_40%,transparent_100%)]" />
    </div>
  )
}
