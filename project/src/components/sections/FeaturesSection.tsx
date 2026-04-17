import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Zap, Palette, Code as Code2, Accessibility, Moon, Package, Smartphone, Shield } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized for performance with minimal bundle impact. Each component is a single copy-paste away.",
  },
  {
    icon: Palette,
    title: "Fully Customizable",
    description: "Every component accepts props and uses CSS variables. Adapt to any design system effortlessly.",
  },
  {
    icon: Code2,
    title: "TypeScript First",
    description: "Complete type safety with detailed prop interfaces, JSDoc comments, and IntelliSense support.",
  },
  {
    icon: Accessibility,
    title: "Accessible",
    description: "WCAG 2.1 AA compliant. Keyboard navigation, ARIA labels, and screen reader support built in.",
  },
  {
    icon: Moon,
    title: "Dark Mode Native",
    description: "Every component is designed for both light and dark modes using CSS variables automatically.",
  },
  {
    icon: Package,
    title: "No Lock-in",
    description: "Copy the source code directly into your project. You own it. No NPM package dependencies.",
  },
  {
    icon: Smartphone,
    title: "Mobile Responsive",
    description: "All components are tested across devices. Touch-friendly with smooth mobile interactions.",
  },
  {
    icon: Shield,
    title: "Production Ready",
    description: "Used in production by 2,400+ developers and teams shipping real products daily.",
  },
]

export function FeaturesSection() {
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
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Everything you need to ship
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Built with the tools modern developers actually use. No configuration hell, no bloat.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="group p-6 rounded-2xl border border-border/60 bg-card/70 backdrop-blur-sm hover:bg-card/90 transition-colors shadow-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
