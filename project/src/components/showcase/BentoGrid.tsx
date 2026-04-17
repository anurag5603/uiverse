import { motion } from "framer-motion"
import { Zap, Star, TrendingUp, Users } from "lucide-react"

export function BentoGrid() {
  return (
    <div className="grid grid-cols-3 gap-3 max-w-lg">
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        className="col-span-2 row-span-1 p-5 rounded-2xl bg-primary text-primary-foreground"
      >
        <Zap className="w-5 h-5 mb-3" strokeWidth={2.5} />
        <h3 className="font-semibold text-sm">Lightning Fast</h3>
        <p className="text-xs text-primary-foreground/70 mt-1">Copy-paste components</p>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        className="col-span-1 p-5 rounded-2xl bg-card border border-border"
      >
        <div className="text-2xl font-extrabold">4.9</div>
        <div className="flex mt-1">
          {[1, 2, 3].map((s) => (
            <Star key={s} className="w-3 h-3 fill-chart-4 text-chart-4" />
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2">Rating</p>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        className="col-span-1 p-5 rounded-2xl bg-card border border-border"
      >
        <Users className="w-5 h-5 text-primary mb-3" />
        <div className="text-xl font-bold">2.4k</div>
        <p className="text-xs text-muted-foreground">Developers</p>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        className="col-span-2 p-5 rounded-2xl bg-muted/50 border border-border"
      >
        <TrendingUp className="w-5 h-5 text-chart-2 mb-3" />
        <h3 className="font-semibold text-sm">Ship 10x faster</h3>
        <p className="text-xs text-muted-foreground mt-1">Production-ready components</p>
      </motion.div>
    </div>
  )
}

export const bentoGridCode = `import { motion } from "framer-motion"

export function BentoGrid() {
  return (
    <div className="grid grid-cols-3 gap-3">
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        className="col-span-2 p-5 rounded-2xl bg-primary text-primary-foreground"
      >
        {/* Wide card */}
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        className="col-span-1 p-5 rounded-2xl bg-card border border-border"
      >
        {/* Narrow card */}
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        className="col-span-1 p-5 rounded-2xl bg-card border border-border"
      >
        {/* Narrow card */}
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        className="col-span-2 p-5 rounded-2xl bg-muted/50 border border-border"
      >
        {/* Wide card */}
      </motion.div>
    </div>
  )
}`
