import { useState, useRef } from "react"
import { Link } from "react-router-dom"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Check, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { pricingPlans } from "@/data/components"
import type { BillingInterval } from "@/types"

export function PricingSection() {
  const [interval, setInterval] = useState<BillingInterval>("monthly")
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-32 relative" id="pricing" ref={ref}>
      {/* Subtle radial glow */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4 gap-2 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            Pricing
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Start free. Upgrade when you need more.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-1 p-1 bg-muted rounded-xl">
            {(["monthly", "yearly"] as const).map((i) => (
              <motion.button
                key={i}
                onClick={() => setInterval(i)}
                className={cn(
                  "relative px-5 py-2 rounded-lg text-sm font-medium transition-colors",
                  interval === i ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
                whileTap={{ scale: 0.97 }}
              >
                {interval === i && (
                  <motion.div
                    layoutId="billing-pill"
                    className="absolute inset-0 bg-background rounded-lg shadow-sm"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  {i === "monthly" ? "Monthly" : "Yearly"}
                  {i === "yearly" && (
                    <span className="ml-2 text-xs text-primary font-semibold">-20%</span>
                  )}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingPlans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              whileHover={plan.popular ? { y: -6, scale: 1.02 } : { y: -4 }}
              className={cn(
                "relative p-8 rounded-2xl border flex flex-col transition-shadow",
                plan.popular
                  ? "border-primary bg-primary text-primary-foreground shadow-2xl shadow-primary/20 scale-[1.02]"
                  : "border-border bg-card hover:shadow-xl hover:shadow-primary/5"
              )}
            >
              {/* Popular glow ring */}
              {plan.popular && (
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-primary via-primary/50 to-transparent opacity-20 pointer-events-none" />
              )}

              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge
                    className={cn(
                      "text-xs px-3 py-1 rounded-full",
                      plan.popular
                        ? "bg-background text-foreground"
                        : "bg-primary text-primary-foreground"
                    )}
                  >
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-bold text-lg mb-1">{plan.name}</h3>
                <p className={cn("text-sm", plan.popular ? "text-primary-foreground/80" : "text-muted-foreground")}>
                  {plan.description}
                </p>
              </div>

              {/* Animated price flip */}
              <div className="mb-8 h-14 flex items-end gap-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={interval + plan.id}
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="text-4xl font-extrabold"
                  >
                    ${plan.id === "lifetime" ? plan.lifetime : plan.price[interval]}
                  </motion.span>
                </AnimatePresence>
                {plan.id !== "lifetime" && (
                  <span className={cn("text-sm mb-1.5", plan.popular ? "text-primary-foreground/70" : "text-muted-foreground")}>
                    /{interval === "monthly" ? "mo" : "yr"}
                  </span>
                )}
                {plan.id === "lifetime" && (
                  <span className={cn("text-sm mb-1.5", plan.popular ? "text-primary-foreground/70" : "text-muted-foreground")}>
                    one-time
                  </span>
                )}
              </div>

              <ul className="space-y-3 flex-1 mb-8">
                {plan.features.map((feature) => (
                  <motion.li
                    key={feature}
                    className="flex items-start gap-3 text-sm"
                    initial={{ opacity: 0, x: -8 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.12 + 0.3 }}
                  >
                    <Check
                      className={cn(
                        "w-4 h-4 mt-0.5 shrink-0",
                        plan.popular ? "text-primary-foreground" : "text-primary"
                      )}
                    />
                    <span className={plan.popular ? "text-primary-foreground/90" : ""}>{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <Button
                asChild
                variant={plan.popular ? "secondary" : "default"}
                className="w-full rounded-xl h-11"
              >
                <Link to="/signup">{plan.cta}</Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
