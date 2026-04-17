import { motion } from "framer-motion"

export function LoaderAnimations() {
  return (
    <div className="flex items-center justify-center gap-8">
      <motion.div
        className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />

      <div className="flex items-center gap-1">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-6 bg-primary rounded-full"
            animate={{ scaleY: [1, 2, 1] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-primary"
            animate={{ y: [0, -10, 0], opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  )
}

export const loaderAnimationsCode = `import { motion } from "framer-motion"

// Spinner
<motion.div
  className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary"
  animate={{ rotate: 360 }}
  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
/>

// Bar loader
{[0, 1, 2, 3].map((i) => (
  <motion.div
    key={i}
    className="w-1.5 h-6 bg-primary rounded-full"
    animate={{ scaleY: [1, 2, 1] }}
    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
  />
))}

// Dots loader
{[0, 1, 2].map((i) => (
  <motion.div
    key={i}
    className="w-2.5 h-2.5 rounded-full bg-primary"
    animate={{ y: [0, -10, 0], opacity: [0.4, 1, 0.4] }}
    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
  />
))}`
