import { useRef } from "react"
import { motion, useSpring } from "framer-motion"

export function TiltCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const rotateX = useSpring(0, { stiffness: 200, damping: 20 })
  const rotateY = useSpring(0, { stiffness: 200, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    rotateX.set(-dy * 12)
    rotateY.set(dx * 12)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <div style={{ perspective: 800 }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full max-w-xs p-6 rounded-2xl border border-border bg-card cursor-pointer"
      >
        <div
          style={{ transform: "translateZ(20px)" }}
          className="flex flex-col gap-3"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-border flex items-center justify-center">
            <span className="text-xl">🎯</span>
          </div>
          <h3 className="font-semibold">3D Tilt Card</h3>
          <p className="text-sm text-muted-foreground">
            Move your cursor over the card to see the 3D tilt effect.
          </p>
        </div>
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 100%)",
          }}
        />
      </motion.div>
    </div>
  )
}

export const tiltCardCode = `import { useRef } from "react"
import { motion, useSpring } from "framer-motion"

export function TiltCard({ children }) {
  const cardRef = useRef(null)
  const rotateX = useSpring(0, { stiffness: 200, damping: 20 })
  const rotateY = useSpring(0, { stiffness: 200, damping: 20 })

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    rotateX.set(-((e.clientY - cy) / (rect.height / 2)) * 12)
    rotateY.set(((e.clientX - cx) / (rect.width / 2)) * 12)
  }

  return (
    <div style={{ perspective: 800 }}>
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { rotateX.set(0); rotateY.set(0) }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative p-6 rounded-2xl border border-border bg-card cursor-pointer"
      >
        <div style={{ transform: "translateZ(20px)" }}>{children}</div>
      </motion.div>
    </div>
  )
}`
