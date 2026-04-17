import { Link, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { Zap, ArrowLeft, Construction } from "lucide-react"
import { Button } from "@/components/ui/button"

// Human-readable names for known routes
const PAGE_NAMES: Record<string, string> = {
  "/docs": "Documentation",
  "/blog": "Blog",
  "/tutorials": "Tutorials",
  "/changelog": "Changelog",
  "/roadmap": "Roadmap",
  "/request": "Component Request",
  "/about": "About",
  "/terms": "Terms of Service",
  "/privacy": "Privacy Policy",
  "/contact": "Contact",
  "/reset-password": "Reset Password",
}

export function ComingSoonPage() {
  const { pathname } = useLocation()
  const pageName = PAGE_NAMES[pathname] ?? "This page"

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">

      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 mb-16">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <Zap className="w-4 h-4 text-primary-foreground" strokeWidth={2.5} />
        </div>
        <span className="font-bold text-lg tracking-tight">UIverse</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md"
      >
        <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-8">
          <Construction className="w-10 h-10 text-primary" />
        </div>

        <h1 className="text-4xl font-extrabold tracking-tight mb-4">{pageName}</h1>
        <p className="text-xl text-muted-foreground mb-3">Coming soon</p>
        <p className="text-sm text-muted-foreground mb-10 leading-relaxed">
          We're working on this page. Check back soon — or{" "}
          <a
            href="mailto:hello@uiverse.dev"
            className="text-primary hover:underline"
          >
            reach out to us
          </a>{" "}
          if you need something urgently.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild variant="outline" className="rounded-xl gap-2">
            <Link to="/">
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
          </Button>
          <Button asChild className="rounded-xl">
            <Link to="/components">Browse Components</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
