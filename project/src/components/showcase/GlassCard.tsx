import { motion } from "framer-motion"
import { Star, TrendingUp } from "lucide-react"

export function GlassCard() {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative w-full max-w-xs p-6 rounded-2xl border border-border/50 bg-background/40 backdrop-blur-md shadow-xl"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <div className="flex items-center gap-1 text-xs font-medium text-chart-2">
            <TrendingUp className="w-3.5 h-3.5" />
            +12.5%
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-1">Monthly Revenue</p>
        <p className="text-2xl font-bold tracking-tight">$24,521</p>
        <div className="mt-4 flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} className="w-3.5 h-3.5 fill-chart-4 text-chart-4" />
          ))}
          <span className="text-xs text-muted-foreground ml-1">Top performer</span>
        </div>
      </div>
    </motion.div>
  )
}

export const glassCardCode = `import { motion } from "framer-motion"
import { TrendingUp } from "lucide-react"

export function GlassCard() {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative w-full max-w-xs p-6 rounded-2xl border border-border/50 bg-background/40 backdrop-blur-md shadow-xl"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <span className="text-xs font-medium text-green-500">+12.5%</span>
        </div>
        <p className="text-sm text-muted-foreground mb-1">Monthly Revenue</p>
        <p className="text-2xl font-bold">$24,521</p>
      </div>
    </motion.div>
  )
}`
