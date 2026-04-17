import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

interface GradientButtonProps {
  children?: React.ReactNode
  onClick?: () => void
}

export function GradientButton({ children = "Get Started", onClick }: GradientButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="relative group px-8 py-3 rounded-xl font-semibold text-white overflow-hidden cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/90 transition-all duration-300" />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/60 to-foreground/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/40 to-primary/20 rounded-xl opacity-0 group-hover:opacity-100 blur-md transition-all duration-300" />
      <span className="relative z-10 flex items-center gap-2">
        <Sparkles className="w-4 h-4" />
        {children}
      </span>
    </motion.button>
  )
}

export const gradientButtonCode = `import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"

export function GradientButton({ children = "Get Started", onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="relative group px-8 py-3 rounded-xl font-semibold text-white overflow-hidden cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/90" />
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/40 to-primary/20 rounded-xl opacity-0 group-hover:opacity-100 blur-md transition-all duration-300" />
      <span className="relative z-10 flex items-center gap-2">
        <Sparkles className="w-4 h-4" />
        {children}
      </span>
    </motion.button>
  )
}`
