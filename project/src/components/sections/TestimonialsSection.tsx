import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Star } from "lucide-react"
import { testimonials } from "@/data/components"

// Duplicate for seamless infinite loop
const allTestimonials = [...testimonials, ...testimonials, ...testimonials]

export function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-32 overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Loved by developers
          </h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of developers shipping faster with UIverse.
          </p>
        </motion.div>
      </div>

      {/* Infinite scrolling marquee — two rows scrolling in opposite directions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="space-y-4"
      >
        {/* Row 1 — scrolls left */}
        <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            className="flex gap-4 shrink-0"
            animate={{ x: ["0%", "-33.333%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{ width: "max-content" }}
          >
            {allTestimonials.map((t, i) => (
              <TestimonialCard key={`a-${i}`} testimonial={t} />
            ))}
          </motion.div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <motion.div
            className="flex gap-4 shrink-0"
            animate={{ x: ["-33.333%", "0%"] }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
            style={{ width: "max-content" }}
          >
            {[...allTestimonials].reverse().map((t, i) => (
              <TestimonialCard key={`b-${i}`} testimonial={t} />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

function TestimonialCard({ testimonial: t }: { testimonial: typeof testimonials[0] }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="w-80 shrink-0 p-6 rounded-2xl border border-border/60 bg-card/70 backdrop-blur-sm flex flex-col gap-4 cursor-default shadow-sm"
    >
      <div className="flex">
        {Array.from({ length: t.rating }).map((_, j) => (
          <Star key={j} className="w-4 h-4 fill-foreground text-foreground" />
        ))}
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground flex-1">"{t.content}"</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
          {t.avatar}
        </div>
        <div>
          <p className="text-sm font-semibold">{t.name}</p>
          <p className="text-xs text-muted-foreground">
            {t.role} · {t.company}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
