import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { LandingPage } from "@/pages/LandingPage"
import { LoginPage } from "@/pages/LoginPage"
import { SignupPage } from "@/pages/SignupPage"
import { ComponentsPage } from "@/pages/ComponentsPage"
import { ComponentDetailPage } from "@/pages/ComponentDetailPage"
import { DashboardPage } from "@/pages/DashboardPage"
import { PricingPage } from "@/pages/PricingPage"
import { ForgotPasswordPage } from "@/pages/ForgotPasswordPage"
import { ComingSoonPage } from "@/pages/ComingSoonPage"

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.2, ease: "easeIn" } },
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  )
}

export function App() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Main routes */}
        <Route path="/"                   element={<P><LandingPage /></P>} />
        <Route path="/login"              element={<P><LoginPage /></P>} />
        <Route path="/signup"             element={<P><SignupPage /></P>} />
        <Route path="/forgot-password"    element={<P><ForgotPasswordPage /></P>} />
        <Route path="/reset-password"     element={<P><ComingSoonPage /></P>} />
        <Route path="/components"         element={<P><ComponentsPage /></P>} />
        <Route path="/components/:slug"   element={<P><ComponentDetailPage /></P>} />
        <Route path="/dashboard"          element={<P><DashboardPage /></P>} />
        <Route path="/pricing"            element={<P><PricingPage /></P>} />

        {/* Navbar stub routes */}
        <Route path="/docs"               element={<P><ComingSoonPage /></P>} />
        <Route path="/blog"               element={<P><ComingSoonPage /></P>} />

        {/* Footer stub routes */}
        <Route path="/tutorials"          element={<P><ComingSoonPage /></P>} />
        <Route path="/changelog"          element={<P><ComingSoonPage /></P>} />
        <Route path="/roadmap"            element={<P><ComingSoonPage /></P>} />
        <Route path="/request"            element={<P><ComingSoonPage /></P>} />
        <Route path="/about"              element={<P><ComingSoonPage /></P>} />
        <Route path="/terms"              element={<P><ComingSoonPage /></P>} />
        <Route path="/privacy"            element={<P><ComingSoonPage /></P>} />
        <Route path="/contact"            element={<P><ComingSoonPage /></P>} />

        {/* Catch-all */}
        <Route path="*"                   element={<P><LandingPage /></P>} />
      </Routes>
    </AnimatePresence>
  )
}

export default App
