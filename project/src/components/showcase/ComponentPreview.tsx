import {
  GradientButton,
  GlowButton,
  MagneticButton,
  ThreeDButton,
  GlassCard,
  SpotlightCard,
  TiltCard,
  AnimatedBorderCard,
  BentoGrid,
  FloatingLabelInput,
  AnimatedToggle,
  LoaderAnimations,
} from "./index"

const componentMap: Record<string, React.ComponentType> = {
  GradientButton,
  GlowButton,
  MagneticButton,
  ThreeDButton,
  GlassCard,
  SpotlightCard,
  TiltCard,
  AnimatedBorderCard,
  BentoGrid,
  FloatingLabelInput,
  AnimatedToggle,
  LoaderAnimations,
}

const codeMap: Record<string, string> = {}

interface ComponentPreviewProps {
  componentName: string
  className?: string
}

export function ComponentPreview({ componentName, className }: ComponentPreviewProps) {
  const Component = componentMap[componentName]
  if (!Component) return <div className="text-sm text-muted-foreground">Preview unavailable</div>
  return (
    <div className={className}>
      <Component />
    </div>
  )
}

export { componentMap, codeMap }
