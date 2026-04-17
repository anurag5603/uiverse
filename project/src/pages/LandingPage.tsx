import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { HeroSection } from "@/components/sections/HeroSection"
import { FeaturesSection } from "@/components/sections/FeaturesSection"
import { TestimonialsSection } from "@/components/sections/TestimonialsSection"
import { PricingSection } from "@/components/sections/PricingSection"
import { FaqSection } from "@/components/sections/FaqSection"
import { NewsletterSection } from "@/components/sections/NewsletterSection"
import { ComponentShowcaseSection } from "@/components/sections/ComponentShowcaseSection"

export function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ComponentShowcaseSection />
        <TestimonialsSection />
        <PricingSection />
        <FaqSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  )
}
