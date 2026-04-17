import { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  Bookmark,
  CreditCard,
  Settings,
  LogOut,
  Zap,
  Package,
  Star,
  ArrowRight,
  Crown,
  Download,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ModeToggle } from "@/components/mode-toggle"
import { useAuth } from "@/contexts/AuthContext"
import { showcaseComponents } from "@/data/components"
import { useSavedComponents } from "@/hooks/useSavedComponents"
import { usePreferences } from "@/hooks/usePreferences"
import { cn } from "@/lib/utils"

type DashboardTab = "overview" | "saved" | "billing" | "settings"

export function DashboardPage() {
  const { user, loading, signOut } = useAuth()
  const [activeTab, setActiveTab] = useState<DashboardTab>("overview")
  const { savedSlugs } = useSavedComponents()

  // Derive the actual saved component objects from the stored slugs
  const savedComponents = showcaseComponents.filter((c) => savedSlugs.includes(c.slug))

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    )
  }

  if (!user) return <Navigate to="/login" />

  const navItems = [
    { id: "overview" as const, label: "Overview", icon: LayoutDashboard },
    { id: "saved" as const, label: "Saved", icon: Bookmark },
    { id: "billing" as const, label: "Billing", icon: CreditCard },
    { id: "settings" as const, label: "Settings", icon: Settings },
  ]

  const stats = [
    { label: "Components Saved", value: savedComponents.length, icon: Bookmark, delta: savedComponents.length === 0 ? "None saved yet" : `${savedComponents.length} component${savedComponents.length === 1 ? "" : "s"}` },
    { label: "Free Components", value: savedComponents.filter(c => c.tier === "free").length, icon: Download, delta: "in your library" },
    { label: "Pro Components", value: savedComponents.filter(c => c.tier === "pro").length, icon: Package, delta: "unlocked items" },
    { label: "Plan", value: "Free", icon: Crown, delta: "Upgrade to Pro" },
  ]

  return (
    <div className="min-h-screen flex">
      <aside className="hidden md:flex w-64 h-screen sticky top-0 flex-col border-r border-border bg-card/30">
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-lg tracking-tight">UIverse</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                activeTab === item.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border space-y-3">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold shrink-0">
              {user.email?.[0]?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{user.email}</p>
              <p className="text-xs text-muted-foreground">Free plan</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
            onClick={signOut}
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </Button>
        </div>
      </aside>

      <div className="flex-1 overflow-auto">
        <div className="sticky top-0 z-10 bg-background/90 backdrop-blur-md border-b border-border px-6 py-4 flex items-center justify-between">
          <h1 className="font-semibold capitalize">{activeTab}</h1>
          <div className="flex items-center gap-3">
            <ModeToggle />
            <Button size="sm" asChild className="rounded-xl gap-1.5">
              <Link to="/pricing">
                <Crown className="w-3.5 h-3.5" />
                Upgrade to Pro
              </Link>
            </Button>
          </div>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {activeTab === "overview" && <OverviewTab stats={stats} savedComponents={savedComponents} />}
              {activeTab === "saved" && <SavedTab savedComponents={savedComponents} />}
              {activeTab === "billing" && <BillingTab />}
              {activeTab === "settings" && <SettingsTab user={user} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

function OverviewTab({
  stats,
  savedComponents,
}: {
  stats: Array<{ label: string; value: string | number; icon: React.ElementType; delta: string }>
  savedComponents: typeof showcaseComponents
}) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="p-5 rounded-2xl border border-border/60 bg-card/70 backdrop-blur-sm shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <stat.icon className="w-4 h-4 text-primary" />
              </div>
            </div>
            <p className="text-2xl font-bold mb-1">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.delta}</p>
          </motion.div>
        ))}
      </div>

      <div className="rounded-2xl border border-border/60 bg-card/70 backdrop-blur-sm p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold">Recently Saved</h3>
          <Button variant="ghost" size="sm" className="gap-1 text-xs">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
        {savedComponents.length === 0 ? (
          <div className="text-center py-8">
            <Bookmark className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No saved components yet</p>
            <Button asChild size="sm" className="mt-4 rounded-xl">
              <Link to="/components">Browse Components</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {savedComponents.map((c) => (
              <Link
                key={c.id}
                to={`/components/${c.slug}`}
                className="flex items-center gap-4 p-3 rounded-xl border border-border hover:bg-accent/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Package className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{c.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{c.category}</p>
                </div>
                <Badge variant="outline" className="text-xs shrink-0">
                  {c.tier}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-6 backdrop-blur-sm">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Crown className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-1">Unlock Pro Components</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get access to 80+ premium components, unlimited saves, and priority support.
            </p>
            <Button asChild size="sm" className="rounded-xl gap-1.5">
              <Link to="/pricing">
                <Star className="w-3.5 h-3.5" />
                View Pro Plans
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function SavedTab({ savedComponents }: { savedComponents: typeof showcaseComponents }) {
  return (
    <div className="space-y-4">
      {savedComponents.length === 0 ? (
        <div className="text-center py-20">
          <Bookmark className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold mb-2">No saved components</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Browse the library and save components for quick access.
          </p>
          <Button asChild className="rounded-xl">
            <Link to="/components">Browse Components</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedComponents.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={`/components/${c.slug}`}
                className="block p-5 rounded-2xl border border-border bg-card hover:bg-accent/20 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                  <Badge variant="outline" className="text-xs">{c.tier}</Badge>
                </div>
                <h3 className="font-semibold text-sm mb-1">{c.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{c.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

function BillingTab() {
  return (
    <div className="max-w-2xl space-y-6">
      <div className="p-6 rounded-2xl border border-border bg-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Current Plan</h3>
          <Badge variant="outline">Free</Badge>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          You're on the free plan. Upgrade to Pro to unlock all premium components.
        </p>
        <div className="space-y-3 mb-6">
          {["20 free components", "Basic documentation", "Community support"].map((f) => (
            <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              {f}
            </div>
          ))}
        </div>
        <Button asChild className="rounded-xl gap-1.5">
          <Link to="/pricing">
            <Crown className="w-4 h-4" />
            Upgrade to Pro — $19/mo
          </Link>
        </Button>
      </div>

      <div className="p-6 rounded-2xl border border-border bg-card">
        <h3 className="font-semibold mb-4">Billing History</h3>
        <div className="text-center py-8">
          <CreditCard className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No billing history yet.</p>
        </div>
      </div>
    </div>
  )
}

function SettingsTab({ user }: { user: { email?: string } }) {
  const { preferences, togglePreference } = usePreferences()

  const prefItems: { key: keyof typeof preferences; label: string }[] = [
    { key: "emailNotifications", label: "Email notifications" },
    { key: "componentAlerts", label: "New component alerts" },
    { key: "weeklyDigest", label: "Weekly digest" },
  ]

  return (
    <div className="max-w-2xl space-y-6">
      <div className="p-6 rounded-2xl border border-border bg-card">
        <h3 className="font-semibold mb-4">Profile</h3>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-xl font-bold">
            {user.email?.[0]?.toUpperCase()}
          </div>
          <div>
            <p className="font-medium">{user.email?.split("@")[0]}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <Button variant="outline" className="rounded-xl">Edit Profile</Button>
      </div>

      <div className="p-6 rounded-2xl border border-border bg-card">
        <h3 className="font-semibold mb-4">Preferences</h3>
        <div className="space-y-4">
          {prefItems.map(({ key, label }) => {
            const active = preferences[key]
            return (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm">{label}</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={active}
                  aria-label={label}
                  onClick={() => togglePreference(key)}
                  className={cn(
                    "w-10 h-5 rounded-full relative flex items-center px-0.5 transition-colors duration-200",
                    active ? "bg-primary" : "bg-muted"
                  )}
                >
                  <motion.div
                    layout
                    className="w-4 h-4 rounded-full bg-white shadow-sm"
                    animate={{ x: active ? 20 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>
            )
          })}
        </div>
      </div>

      <div className="p-6 rounded-2xl border border-destructive/20 bg-destructive/5">
        <h3 className="font-semibold text-destructive mb-2">Danger Zone</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Permanently delete your account and all associated data.
        </p>
        <Button variant="destructive" size="sm" className="rounded-xl">Delete Account</Button>
      </div>
    </div>
  )
}
