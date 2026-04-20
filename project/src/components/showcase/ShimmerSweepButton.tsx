import * as React from "react"
import { ArrowUpRight } from "lucide-react"

interface ShimmerSweepButtonProps {
  children?: React.ReactNode
}

export function ShimmerSweepButton({ children = "Shimmer Effect" }: ShimmerSweepButtonProps) {
  return (
    <button className="group relative overflow-hidden gap-2 h-11 px-6 text-base rounded-xl font-medium bg-primary text-primary-foreground dark:bg-white/5 dark:text-white dark:ring-1 dark:ring-white/10 dark:hover:bg-white/10 transition-colors tracking-tight inline-flex items-center justify-center">
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <span className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full bg-white/15 flex-shrink-0">
          <ArrowUpRight className="w-3 h-3" />
        </span>
      </span>
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
    </button>
  )
}

export const shimmerSweepButtonCode = `import { ArrowUpRight } from "lucide-react"

export function ShimmerSweepButton({ children = "Shimmer Effect" }) {
  return (
    <button className="group relative overflow-hidden gap-2 h-11 px-6 text-base rounded-xl font-medium bg-primary text-primary-foreground dark:bg-white/5 dark:text-white dark:ring-1 dark:ring-white/10 dark:hover:bg-white/10 transition-colors tracking-tight inline-flex items-center justify-center">
      <span className="relative z-10 flex items-center gap-2">
        {children}
        <span className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full bg-white/15 flex-shrink-0">
          <ArrowUpRight className="w-3 h-3" />
        </span>
      </span>
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
    </button>
  )
}
`
