import { useRef, useState } from "react"
import { motion } from "framer-motion"

interface SpotlightCardProps {
  children?: React.ReactNode
}

export function SpotlightCard({ children }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setSpotlight({ x, y, opacity: 1 })
  }

  const handleMouseLeave = () => {
    setSpotlight((prev) => ({ ...prev, opacity: 0 }))
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -4 }}
      className="relative w-full max-w-xs p-6 rounded-2xl border border-border bg-card overflow-hidden cursor-pointer"
    >
      <div
        className="absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(circle 120px at ${spotlight.x}% ${spotlight.y}%, hsl(var(--primary)/0.15), transparent)`,
          opacity: spotlight.opacity,
        }}
      />
      <div className="relative z-10">
        {children ?? (
          <>
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full"
              />
            </div>
            <h3 className="font-semibold mb-2">Spotlight Effect</h3>
            <p className="text-sm text-muted-foreground">Move your cursor over this card to see the spotlight follow.</p>
          </>
        )}
      </div>
    </motion.div>
  )
}

export const spotlightCardCode = `import { useRef, useState } from "react"
import { motion } from "framer-motion"

export function SpotlightCard({ children }) {
  const cardRef = useRef(null)
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 })

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setSpotlight({ x, y, opacity: 1 })
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setSpotlight(p => ({ ...p, opacity: 0 }))}
      whileHover={{ y: -4 }}
      className="relative p-6 rounded-2xl border border-border bg-card overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: \`radial-gradient(circle 120px at \${spotlight.x}% \${spotlight.y}%, hsl(var(--primary)/0.15), transparent)\`,
          opacity: spotlight.opacity,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}`
