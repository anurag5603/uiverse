export type ComponentCategory =
  | "buttons"
  | "cards"
  | "layout"
  | "forms"
  | "ui-elements"
  | "navigation"
  | "data-display"

export type ComponentTier = "free" | "pro"

export interface ShowcaseComponent {
  id: string
  slug: string
  name: string
  description: string
  category: ComponentCategory
  tier: ComponentTier
  tags: string[]
  previewComponent: string
  featured?: boolean
  new?: boolean
  downloads?: number
  likes?: number
}

export interface PricingPlan {
  id: string
  name: string
  price: { monthly: number; yearly: number }
  lifetime?: number
  description: string
  features: string[]
  cta: string
  popular?: boolean
  badge?: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  avatar: string
  content: string
  rating: number
}

export interface FaqItem {
  question: string
  answer: string
}

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export type BillingInterval = "monthly" | "yearly"

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  tier: "free" | "pro" | "lifetime"
  createdAt: string
}
