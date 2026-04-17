import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Zap, Menu, X, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from "@/contexts/AuthContext"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Components", href: "/components" },
  { label: "Docs", href: "/docs" },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const { scrollY } = useScroll()
  const location = useLocation()
  const { user } = useAuth()

  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1])

  React.useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  return (
    <>
      <motion.header className="fixed top-0 inset-x-0 z-50">
        <motion.div
          className="absolute inset-0 bg-background/90 backdrop-blur-md border-b border-border"
          style={{ opacity: bgOpacity }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Zap className="w-4 h-4 text-primary-foreground" strokeWidth={2.5} />
                </div>
                <div className="absolute inset-0 rounded-lg bg-primary opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-300" />
              </div>
              <span className="font-bold text-lg tracking-tight">UIverse</span>
            </Link>

            {/* Desktop nav — animated active indicator */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "relative px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    location.pathname === link.href
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {location.pathname === link.href && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 bg-accent rounded-md"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              ))}
            </nav>

            {/* Desktop actions */}
            <div className="hidden md:flex items-center gap-3">
              <ModeToggle />
              {user ? (
                <Button asChild size="sm">
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/login">Sign in</Link>
                  </Button>
                  <Button size="sm" asChild className="gap-1.5">
                    <Link to="/signup">
                      <Sparkles className="w-3.5 h-3.5" />
                      Get Started
                    </Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile hamburger — icon rotates */}
            <div className="md:hidden flex items-center gap-2">
              <ModeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={mobileOpen ? "x" : "menu"}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.15 }}
                  >
                    {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </motion.div>
                </AnimatePresence>
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu — slides down with AnimatePresence */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed top-16 inset-x-0 z-40 bg-background/95 backdrop-blur-md border-b border-border shadow-lg md:hidden overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                >
                  <Link
                    to={link.href}
                    className={cn(
                      "block px-4 py-3 rounded-md text-sm font-medium transition-colors",
                      location.pathname === link.href
                        ? "bg-accent text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="border-t border-border mt-2 pt-4 flex flex-col gap-2"
              >
                {user ? (
                  <Button asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" asChild>
                      <Link to="/login">Sign in</Link>
                    </Button>
                    <Button asChild>
                      <Link to="/signup">Get Started Free</Link>
                    </Button>
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
