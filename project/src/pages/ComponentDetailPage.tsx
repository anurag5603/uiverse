import { useState } from "react"
import { useParams, Link, Navigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Copy, Check, ChevronLeft, Code as Code2, Eye, Lock, Bookmark, BookmarkCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { showcaseComponents } from "@/data/components"
import { ComponentPreview } from "@/components/showcase/ComponentPreview"
import { useAuth } from "@/contexts/AuthContext"
import { useSavedComponents } from "@/hooks/useSavedComponents"
import {
  gradientButtonCode,
  glowButtonCode,
  magneticButtonCode,
  threeDButtonCode,
  glassCardCode,
  spotlightCardCode,
  tiltCardCode,
  animatedBorderCardCode,
  bentoGridCode,
  floatingLabelInputCode,
  animatedToggleCode,
  loaderAnimationsCode,
} from "@/components/showcase/index"

const codeBySlug: Record<string, string> = {
  "gradient-button": gradientButtonCode,
  "glow-button": glowButtonCode,
  "magnetic-button": magneticButtonCode,
  "3d-hover-button": threeDButtonCode,
  "glassmorphism-card": glassCardCode,
  "spotlight-card": spotlightCardCode,
  "3d-tilt-card": tiltCardCode,
  "animated-border-card": animatedBorderCardCode,
  "bento-grid": bentoGridCode,
  "floating-label-input": floatingLabelInputCode,
  "animated-toggle": animatedToggleCode,
  "loader-animations": loaderAnimationsCode,
}

const installationSteps = [
  "Install Framer Motion: npm install framer-motion",
  "Copy the component code into your project",
  "Import and use it in your React component",
]

export function ComponentDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const { user } = useAuth()
  const { isSaved, toggleSave } = useSavedComponents()
  const [copied, setCopied] = useState(false)

  const component = showcaseComponents.find((c) => c.slug === slug)
  if (!component) return <Navigate to="/components" />

  const isLocked = component.tier === "pro" && !user
  const code = codeBySlug[component.slug] ?? "// Code coming soon..."

  const handleCopy = async () => {
    if (isLocked) return
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link
              to="/components"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to components
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-extrabold tracking-tight">{component.name}</h1>
                  {component.new && <Badge className="text-xs rounded-full">New</Badge>}
                  <Badge variant={component.tier === "pro" ? "default" : "outline"} className="text-xs">
                    {component.tier === "pro" ? "Pro" : "Free"}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{component.description}</p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 rounded-xl"
                  onClick={() => toggleSave(component.slug)}
                >
                  {isSaved(component.slug) ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                  {isSaved(component.slug) ? "Saved" : "Save"}
                </Button>
                <Button
                  size="sm"
                  className="gap-2 rounded-xl"
                  onClick={handleCopy}
                  disabled={isLocked}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied!" : "Copy Code"}
                </Button>
              </div>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-6">
              <Tabs defaultValue="preview">
                <TabsList className="rounded-xl">
                  <TabsTrigger value="preview" className="gap-2 rounded-lg">
                    <Eye className="w-4 h-4" />
                    Preview
                  </TabsTrigger>
                  <TabsTrigger value="code" className="gap-2 rounded-lg">
                    <Code2 className="w-4 h-4" />
                    Code
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="preview">
                  <div className="relative mt-4 rounded-2xl border border-border bg-muted/20 min-h-[360px] flex items-center justify-center p-8">
                    {isLocked ? (
                      <div className="text-center">
                        <Lock className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                        <h3 className="font-semibold mb-2">Pro Component</h3>
                        <p className="text-sm text-muted-foreground mb-4 max-w-xs">
                          Upgrade to Pro to access this component and 80+ more premium components.
                        </p>
                        <Button asChild className="rounded-xl">
                          <Link to="/pricing">Unlock with Pro</Link>
                        </Button>
                      </div>
                    ) : (
                      <ComponentPreview componentName={component.previewComponent} />
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="code">
                  <div className="relative mt-4 rounded-2xl border border-border bg-card overflow-hidden">
                    {isLocked && (
                      <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-2xl">
                        <div className="text-center">
                          <Lock className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                          <h3 className="font-semibold mb-2">Unlock Source Code</h3>
                          <Button asChild size="sm" className="rounded-xl">
                            <Link to="/pricing">Upgrade to Pro</Link>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                          {["bg-destructive/50", "bg-chart-5/50", "bg-chart-2/50"].map((c, i) => (
                            <div key={i} className={`w-3 h-3 rounded-full ${c}`} />
                          ))}
                        </div>
                        <span className="text-xs font-mono text-muted-foreground">
                          {component.slug}.tsx
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 gap-1.5 text-xs"
                        onClick={handleCopy}
                        disabled={isLocked}
                      >
                        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? "Copied" : "Copy"}
                      </Button>
                    </div>
                    <pre className="p-6 text-sm font-mono overflow-x-auto max-h-96 text-muted-foreground leading-relaxed">
                      <code>{isLocked ? code.split("\n").slice(0, 8).join("\n") + "\n\n// ...' (unlock to see full code)" : code}</code>
                    </pre>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-semibold mb-4">Installation</h3>
                <div className="space-y-3">
                  {installationSteps.map((step, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-xs font-bold text-primary">{i + 1}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-semibold mb-4">Details</h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Category</dt>
                    <dd className="font-medium capitalize">{component.category.replace("-", " ")}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Tier</dt>
                    <dd>
                      <Badge variant={component.tier === "pro" ? "default" : "outline"} className="text-xs">
                        {component.tier}
                      </Badge>
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Downloads</dt>
                    <dd className="font-medium">{component.downloads?.toLocaleString()}</dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="font-semibold mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {component.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs rounded-full">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {isLocked && (
                <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-transparent p-6 text-center">
                  <h3 className="font-semibold mb-2">Unlock Pro Components</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get access to all 80+ premium components with a Pro plan.
                  </p>
                  <Button asChild className="w-full rounded-xl">
                    <Link to="/pricing">View Pricing Plans</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
