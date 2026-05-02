import * as React from "react"
import { motion } from "framer-motion"

export interface GlowButtonProps {
  children?: React.ReactNode
  size?: "sm" | "default" | "lg"
  className?: string
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export function GlowButton({
  children = "Click Me",
  onClick,
  size = "default",
  className = "",
  disabled,
}: GlowButtonProps) {

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    default: "px-8 py-3 text-base",
    lg: "px-10 py-4 text-lg"
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial="initial"
      whileHover={disabled ? undefined : "hover"}
      whileTap={disabled ? undefined : "tap"}
      disabled={disabled}
      variants={{
        initial: { scale: 1 },
        hover: { scale: 1.03 },
        tap: { scale: 0.97 }
      }}
      className={`relative rounded-xl font-semibold text-foreground cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:pointer-events-none ${sizeClasses[size]} ${className}`}
    >
      <motion.div
        className="absolute -inset-1 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-600 blur-2xl pointer-events-none"
        variants={{
          initial: { opacity: 0.2, scale: 1 },
          hover: {
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.05, 1],
            transition: { duration: 2, repeat: Infinity, ease: "circInOut" as const }
          }
        }}
      />
      <div className="absolute inset-0 rounded-xl bg-background border border-primary/50 pointer-events-none" />
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}