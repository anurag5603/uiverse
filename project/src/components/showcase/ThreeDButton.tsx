import { motion } from "framer-motion"

interface ThreeDButtonProps {
  children?: React.ReactNode
}

export function ThreeDButton({ children = "Click Me" }: ThreeDButtonProps) {
  return (
    <div className="relative" style={{ perspective: 400 }}>
      <motion.button
        whileHover={{ rotateX: 15, translateY: -4 }}
        whileTap={{ rotateX: 0, translateY: 0, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative px-8 py-3 rounded-xl font-semibold bg-card border border-border text-foreground cursor-pointer"
      >
        <span className="relative z-10">{children}</span>
        <div
          style={{ transform: "translateZ(-8px) translateY(8px)" }}
          className="absolute inset-0 rounded-xl bg-border"
        />
      </motion.button>
    </div>
  )
}

export const threeDButtonCode = `import { motion } from "framer-motion"

export function ThreeDButton({ children }) {
  return (
    <div className="relative" style={{ perspective: 400 }}>
      <motion.button
        whileHover={{ rotateX: 15, translateY: -4 }}
        whileTap={{ rotateX: 0, translateY: 0, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative px-8 py-3 rounded-xl font-semibold bg-card border border-border cursor-pointer"
      >
        <span className="relative z-10">{children}</span>
        <div
          style={{ transform: "translateZ(-8px) translateY(8px)" }}
          className="absolute inset-0 rounded-xl bg-border"
        />
      </motion.button>
    </div>
  )
}`
