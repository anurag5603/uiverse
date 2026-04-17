import { useRef } from "react"
import { Link } from "react-router-dom"
import { motion, useInView } from "framer-motion"
import { ArrowRight, Lock, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GradientButton } from "@/components/showcase/GradientButton"
import { GlassCard } from "@/components/showcase/GlassCard"
import { AnimatedBorderCard } from "@/components/showcase/AnimatedBorderCard"

export function ComponentShowcaseSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-32 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4 gap-2 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            Featured Components
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Built for modern interfaces
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Every component is crafted with attention to motion, accessibility, and developer experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="p-8 rounded-2xl border border-border bg-card flex flex-col gap-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-1">Gradient Button</h3>
                <p className="text-sm text-muted-foreground">Animated gradient with hover glow</p>
              </div>
              <Badge variant="outline" className="text-xs">Free</Badge>
            </div>
            <div className="flex-1 flex items-center justify-center py-8">
              <GradientButton />
            </div>
            <Link
              to="/components/gradient-button"
              className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
            >
              View component <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="p-8 rounded-2xl border border-border bg-card flex flex-col gap-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-1">Glassmorphism Card</h3>
                <p className="text-sm text-muted-foreground">Frosted glass with backdrop blur</p>
              </div>
              <Badge variant="outline" className="text-xs">Free</Badge>
            </div>
            <div className="flex-1 flex items-center justify-center py-4">
              <GlassCard />
            </div>
            <Link
              to="/components/glassmorphism-card"
              className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
            >
              View component <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="p-8 rounded-2xl border border-border bg-card flex flex-col gap-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-1">Animated Border Card</h3>
                <p className="text-sm text-muted-foreground">Continuously animated gradient border</p>
              </div>
              <Badge variant="outline" className="text-xs">Free</Badge>
            </div>
            <div className="flex-1 flex items-center justify-center py-8">
              <AnimatedBorderCard />
            </div>
            <Link
              to="/components/animated-border-card"
              className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
            >
              View component <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="relative p-8 rounded-2xl border border-border bg-card flex flex-col gap-6 overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-1">Spotlight Card</h3>
                <p className="text-sm text-muted-foreground">Dynamic cursor spotlight effect</p>
              </div>
              <Badge className="text-xs gap-1">
                <Lock className="w-3 h-3" />
                Pro
              </Badge>
            </div>
            <div className="flex-1 flex items-center justify-center py-8 select-none">
              <div className="relative w-full max-w-sm h-32 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-border flex items-center justify-center overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),hsl(var(--primary)/0.15),transparent_60%)]" />
                <p className="text-sm font-medium z-10">Hover to see effect</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center rounded-2xl">
              <div className="text-center">
                <Lock className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm font-medium mb-3">Pro Component</p>
                <Button size="sm" asChild>
                  <Link to="/signup">Unlock with Pro</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center"
        >
          <Button size="lg" variant="outline" asChild className="rounded-xl h-12 px-8 gap-2">
            <Link to="/components">
              Browse all components
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
