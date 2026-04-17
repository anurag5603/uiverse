import { motion } from "framer-motion"

export function AnimatedBorderCard() {
  return (
    <div className="relative p-[2px] rounded-2xl overflow-hidden group cursor-pointer">
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, hsl(var(--primary)) 60deg, transparent 120deg)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      <div className="relative z-10 bg-card rounded-2xl p-6 min-w-[220px]">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
          <motion.div
            className="w-3 h-3 rounded-full bg-primary"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        <h3 className="font-semibold text-sm mb-1">Animated Border</h3>
        <p className="text-xs text-muted-foreground">Rotating gradient border effect</p>
      </div>
    </div>
  )
}

export const animatedBorderCardCode = `import { motion } from "framer-motion"

export function AnimatedBorderCard({ children }) {
  return (
    <div className="relative p-[2px] rounded-2xl overflow-hidden">
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: "conic-gradient(from 0deg, transparent 0deg, hsl(var(--primary)) 60deg, transparent 120deg)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      <div className="relative z-10 bg-card rounded-2xl p-6">
        {children}
      </div>
    </div>
  )
}`
