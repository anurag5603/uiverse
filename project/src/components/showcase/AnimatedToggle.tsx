import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedToggleProps {
  defaultChecked?: boolean
  label?: string
}

export function AnimatedToggle({ defaultChecked = false, label = "Enable notifications" }: AnimatedToggleProps) {
  const [checked, setChecked] = useState(defaultChecked)

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setChecked(!checked)}
        role="switch"
        aria-checked={checked}
        className={cn(
          "relative w-12 h-6 rounded-full transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-ring outline-none",
          checked ? "bg-primary" : "bg-muted"
        )}
      >
        <motion.div
          layout
          className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm"
          animate={{ x: checked ? 24 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
      {label && <span className="text-sm font-medium">{label}</span>}
    </div>
  )
}

export const animatedToggleCode = `import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function AnimatedToggle({ defaultChecked = false, label }) {
  const [checked, setChecked] = useState(defaultChecked)

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setChecked(!checked)}
        role="switch"
        aria-checked={checked}
        className={cn(
          "relative w-12 h-6 rounded-full transition-colors duration-300",
          checked ? "bg-primary" : "bg-muted"
        )}
      >
        <motion.div
          layout
          className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm"
          animate={{ x: checked ? 24 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
      {label && <span className="text-sm font-medium">{label}</span>}
    </div>
  )
}`
