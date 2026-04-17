import { useRef } from "react"
import { motion, useSpring } from "framer-motion"

interface MagneticButtonProps {
  children?: React.ReactNode
}

export function MagneticButton({ children = "Magnetic" }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useSpring(0, { stiffness: 200, damping: 15 })
  const y = useSpring(0, { stiffness: 200, damping: 15 })

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * 0.3)
    y.set((e.clientY - cy) * 0.3)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.95 }}
      className="relative px-8 py-3 rounded-xl font-semibold bg-primary text-primary-foreground cursor-pointer overflow-hidden group"
    >
      <motion.div
        className="absolute inset-0 bg-primary-foreground/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

export const magneticButtonCode = `import { useRef } from "react"
import { motion, useSpring } from "framer-motion"

export function MagneticButton({ children }) {
  const ref = useRef(null)
  const x = useSpring(0, { stiffness: 200, damping: 15 })
  const y = useSpring(0, { stiffness: 200, damping: 15 })

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    x.set((e.clientX - cx) * 0.3)
    y.set((e.clientY - cy) * 0.3)
  }

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      whileTap={{ scale: 0.95 }}
      className="px-8 py-3 rounded-xl font-semibold bg-primary text-primary-foreground cursor-pointer"
    >
      {children}
    </motion.button>
  )
}`
