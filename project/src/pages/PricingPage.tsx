import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { PricingSection } from "@/components/sections/PricingSection"
import { FaqSection } from "@/components/sections/FaqSection"

export function PricingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <PricingSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  )
}
