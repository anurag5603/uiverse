import { Link } from "react-router-dom"
import { motion, type Variants } from "framer-motion"
import { ArrowRight, Sparkles, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Local depth layer — adds an extra bottom-edge gradient fade unique to hero */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-background/80 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col items-center gap-6">
          <motion.div variants={item}>
            <Badge variant="outline" className="gap-2 px-4 py-1.5 text-sm rounded-full border-border">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-muted-foreground">100+ Premium UI Components</span>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            </Badge>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-balance leading-[1.05]"
          >
            Build interfaces{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/80 to-foreground/60">
                that wow
              </span>
              <motion.span
                className="absolute bottom-1 left-0 right-0 h-[6px] rounded-full bg-primary/30"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
              />
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-xl text-muted-foreground max-w-2xl leading-relaxed text-balance"
          >
            Production-ready React components with stunning animations. Copy, paste, ship. Stop rebuilding the same components and start building your product.
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <Button size="lg" className="gap-2 h-12 px-8 text-base rounded-xl" asChild>
              <Link to="/components">
                Browse Components
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-8 text-base rounded-xl" asChild>
              <Link to="/signup">Get Started Free</Link>
            </Button>
          </motion.div>

          <motion.div
            variants={item}
            className="flex items-center gap-6 pt-4 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <div className="flex">
                {["SC", "MR", "PP", "JK", "EV"].map((initials, i) => (
                  <div
                    key={initials}
                    className="w-7 h-7 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-semibold"
                    style={{ marginLeft: i === 0 ? 0 : -8 }}
                  >
                    {initials[0]}
                  </div>
                ))}
              </div>
              <span>2,400+ developers</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-foreground text-foreground" />
                ))}
              </div>
              <span>5.0 rating</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          className="mt-20 relative"
        >
          <div className="relative rounded-2xl border border-border bg-card overflow-hidden shadow-2xl">
            <div className="bg-muted/50 border-b border-border px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                {["bg-destructive/70", "bg-chart-5/70", "bg-chart-2/70"].map((c, i) => (
                  <div key={i} className={`w-3 h-3 rounded-full ${c}`} />
                ))}
              </div>
              <div className="flex-1 text-center">
                <div className="inline-flex items-center gap-2 bg-background/80 rounded-md px-3 py-1 text-xs text-muted-foreground font-mono">
                  uiverse.dev/components
                </div>
              </div>
            </div>
            <PreviewGrid />
          </div>
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
        </motion.div>
      </div>
    </section>
  )
}

function PreviewGrid() {
  const cards = [
    { color: "from-blue-500/20 to-cyan-500/20", label: "Glassmorphism Card" },
    { color: "from-primary/20 to-primary/10", label: "Gradient Button" },
    { color: "from-orange-500/20 to-amber-500/20", label: "3D Tilt Card" },
    { color: "from-green-500/20 to-emerald-500/20", label: "Spotlight Card" },
    { color: "from-rose-500/20 to-pink-500/20", label: "Animated Border" },
    { color: "from-violet-500/20 to-purple-500/20", label: "Bento Grid" },
  ]

  return (
    <div className="p-6 grid grid-cols-2 sm:grid-cols-3 gap-4 bg-background/30 backdrop-blur-[2px]">
      {cards.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0 + i * 0.08, duration: 0.4 }}
          whileHover={{ scale: 1.02, y: -2 }}
          className={`h-28 rounded-xl bg-gradient-to-br ${card.color} border border-border/50 flex items-end p-3 cursor-pointer`}
        >
          <span className="text-xs font-medium text-muted-foreground">{card.label}</span>
        </motion.div>
      ))}
    </div>
  )
}
