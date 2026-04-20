import { motion } from "framer-motion"

export function SpinnerLoader() {
  return (
    <motion.div
      className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  )
}

export const spinnerLoaderCode = `import { motion } from "framer-motion"

export function SpinnerLoader() {
  return (
    <motion.div
      className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  )
}
`
