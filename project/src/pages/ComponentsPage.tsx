import { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Lock, Star, Download, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { showcaseComponents } from "@/data/components"
import { ComponentPreview } from "@/components/showcase/ComponentPreview"
import { cn } from "@/lib/utils"
import type { ComponentCategory } from "@/types"

const categories: { id: ComponentCategory | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "buttons", label: "Buttons" },
  { id: "cards", label: "Cards" },
  { id: "layout", label: "Layout" },
  { id: "forms", label: "Forms" },
  { id: "ui-elements", label: "UI Elements" },
]

export function ComponentsPage() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState<ComponentCategory | "all">("all")
  const [filter, setFilter] = useState<"all" | "free" | "pro">("all")

  const filtered = useMemo(() => {
    return showcaseComponents.filter((c) => {
      const matchSearch =
        !search ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.description.toLowerCase().includes(search.toLowerCase()) ||
        c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      const matchCategory = category === "all" || c.category === category
      const matchFilter = filter === "all" || c.tier === filter
      return matchSearch && matchCategory && matchFilter
    })
  }, [search, category, filter])

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <Badge variant="outline" className="mb-4 gap-2 rounded-full">
                <Sparkles className="w-3.5 h-3.5" />
                {showcaseComponents.length}+ Components
              </Badge>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
                Component Library
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Production-ready React components with stunning animations. Copy, customize, ship.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search components..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 h-11 rounded-xl"
                />
              </div>
              <div className="flex gap-2">
                {(["all", "free", "pro"] as const).map((f) => (
                  <Button
                    key={f}
                    variant={filter === f ? "default" : "outline"}
                    size="sm"
                    onClick={() => setFilter(f)}
                    className="h-11 rounded-xl capitalize"
                  >
                    {f === "all" ? "All" : f === "free" ? "Free" : "Pro"}
                  </Button>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="flex gap-2 flex-wrap mb-8 justify-center">
            {categories.map((cat, i) => (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => setCategory(cat.id)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-all border",
                  category === cat.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent text-muted-foreground border-border hover:text-foreground hover:bg-accent/50"
                )}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-muted-foreground">No components found for "{search}"</p>
            </motion.div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((component, i) => (
                  <motion.div
                    key={component.id}
                    layout
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.88 }}
                    transition={{ duration: 0.25, delay: i * 0.03 }}
                  >
                    <ComponentCard component={component} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

function ComponentCard({ component }: { component: typeof showcaseComponents[0] }) {
  const isLocked = component.tier === "pro"

  return (
    <Link to={`/components/${component.slug}`}>
      <motion.div
        whileHover={{ y: -4 }}
        className="group rounded-2xl border border-border/60 bg-card/70 backdrop-blur-sm overflow-hidden cursor-pointer shadow-sm"
      >
        <div className="relative h-48 bg-muted/30 flex items-center justify-center overflow-hidden p-6">
          {isLocked ? (
            <>
              <div className="opacity-30 pointer-events-none scale-75">
                <ComponentPreview componentName={component.previewComponent} />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-sm">
                <div className="text-center">
                  <Lock className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                  <Badge className="text-xs">Pro</Badge>
                </div>
              </div>
            </>
          ) : (
            <div className="pointer-events-none scale-90">
              <ComponentPreview componentName={component.previewComponent} />
            </div>
          )}
          {component.new && (
            <Badge className="absolute top-3 left-3 text-xs rounded-full">New</Badge>
          )}
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{component.name}</h3>
            <Badge variant={isLocked ? "default" : "outline"} className="text-xs shrink-0">
              {isLocked ? "Pro" : "Free"}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{component.description}</p>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Download className="w-3 h-3" />
              {component.downloads?.toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3" />
              {component.likes}
            </span>
            <div className="flex gap-1 ml-auto flex-wrap">
              {component.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
