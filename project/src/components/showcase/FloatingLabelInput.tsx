import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface FloatingLabelInputProps {
  label?: string
  type?: string
  placeholder?: string
}

export function FloatingLabelInput({
  label = "Email address",
  type = "email",
  placeholder = "you@example.com",
}: FloatingLabelInputProps) {
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState("")

  const isFloated = focused || value.length > 0

  return (
    <div className="relative w-full max-w-xs">
      <motion.label
        animate={{
          y: isFloated ? -24 : 0,
          scale: isFloated ? 0.85 : 1,
          color: focused ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="absolute left-2 top-[14px] origin-left pointer-events-none text-sm font-medium z-10 px-1 bg-background"
      >
        {label}
      </motion.label>
      <motion.div
        animate={{
          borderColor: focused ? "hsl(var(--primary))" : "hsl(var(--border))",
        }}
        className="relative rounded-xl border bg-background overflow-hidden"
      >
        <input
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={isFloated ? placeholder : ""}
          className="w-full px-3 pt-5 pb-2 bg-transparent text-sm outline-none"
        />
        <AnimatePresence>
          {focused && (
            <motion.div
              layoutId="input-focus"
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export const floatingLabelInputCode = `import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function FloatingLabelInput({ label = "Email address", type = "email" }) {
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState("")
  const isFloated = focused || value.length > 0

  return (
    <div className="relative w-full">
      <motion.label
        animate={{
          y: isFloated ? -24 : 0,
          scale: isFloated ? 0.85 : 1,
          color: focused ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="absolute left-2 top-[14px] origin-left pointer-events-none text-sm font-medium z-10 px-1 bg-background"
      >
        {label}
      </motion.label>
      <div className="relative rounded-xl border bg-background overflow-hidden">
        <input
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full px-3 pt-5 pb-2 bg-transparent text-sm outline-none"
        />
        <AnimatePresence>
          {focused && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}`
