import { motion } from "framer-motion"

interface GlowButtonProps {
  children?: React.ReactNode
  onClick?: () => void
}

export function GlowButton({ children = "Click Me", onClick }: GlowButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="relative px-8 py-3 rounded-xl font-semibold border border-primary/50 text-foreground bg-background overflow-hidden cursor-pointer group"
    >
      <motion.div
        className="absolute inset-0 rounded-xl"
        animate={{
          boxShadow: [
            "0 0 0px 0px hsl(var(--primary)/0.3)",
            "0 0 20px 4px hsl(var(--primary)/0.4)",
            "0 0 0px 0px hsl(var(--primary)/0.3)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

export const glowButtonCode = `import { motion } from "framer-motion"

export function GlowButton({ children = "Click Me", onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="relative px-8 py-3 rounded-xl font-semibold border border-primary/50 text-foreground bg-background overflow-hidden cursor-pointer"
    >
      <motion.div
        className="absolute inset-0 rounded-xl"
        animate={{
          boxShadow: [
            "0 0 0px 0px hsl(var(--primary)/0.3)",
            "0 0 20px 4px hsl(var(--primary)/0.4)",
            "0 0 0px 0px hsl(var(--primary)/0.3)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}`
