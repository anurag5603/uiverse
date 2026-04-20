import { motion } from "framer-motion"

export function BarLoader() {
  return (
    <div className="flex items-center justify-center gap-1">
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
  )
}

export const barLoaderCode = `import { motion } from "framer-motion"

export function BarLoader() {
  return (
    <div className="flex items-center justify-center gap-1">
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
  )
}
`
