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
import { FREE_SLUGS } from "@/lib/freeComponents"
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
  spinnerLoaderCode,
  barLoaderCode,
  dotsLoaderCode,
  shimmerSweepButtonCode,
  dottedGlowBackgroundCode,
  toolsCardCode,
  damnGoodCardCode,
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
  "spinner-loader": spinnerLoaderCode,
  "bar-loader": barLoaderCode,
  "dots-loader": dotsLoaderCode,
  "shimmer-sweep-button": shimmerSweepButtonCode,
  "dotted-glow-background": dottedGlowBackgroundCode,
  "tools-card": toolsCardCode,
  "damn-good-card": damnGoodCardCode,
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

  // Locked when not in the free set and not signed in
  const isLocked = !FREE_SLUGS.has(component.slug) && !user
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
                  <div className="relative mt-4 rounded-2xl border border-border bg-muted/20 min-h-[360px] flex items-center justify-center p-8 overflow-hidden">
                    {isLocked ? (
                      <>
                        <div className="opacity-20 pointer-events-none scale-75">
                          <ComponentPreview componentName={component.previewComponent} />
                        </div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-sm gap-4">
                          <Lock className="w-8 h-8 text-muted-foreground" />
                          <div className="text-center">
                            <p className="font-semibold mb-1">Sign in to view this component</p>
                            <p className="text-sm text-muted-foreground mb-4">Create a free account to unlock all components.</p>
                          </div>
                          <div className="flex gap-3">
                            <Button asChild variant="outline" size="sm" className="rounded-xl">
                              <Link to="/login">Sign in</Link>
                            </Button>
                            <Button asChild size="sm" className="rounded-xl">
                              <Link to="/signup">Create account</Link>
                            </Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <ComponentPreview componentName={component.previewComponent} />
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="code">
                  <div className="relative mt-4 rounded-2xl border border-border bg-card overflow-hidden">
                    {isLocked && (
                      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm rounded-2xl gap-3">
                        <Lock className="w-7 h-7 text-muted-foreground" />
                        <div className="text-center">
                          <p className="font-semibold mb-1">Sign in to view source code</p>
                          <p className="text-sm text-muted-foreground mb-4">Free for all registered users.</p>
                        </div>
                        <div className="flex gap-3">
                          <Button asChild variant="outline" size="sm" className="rounded-xl">
                            <Link to="/login">Sign in</Link>
                          </Button>
                          <Button asChild size="sm" className="rounded-xl">
                            <Link to="/signup">Create account</Link>
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
                      <code>{isLocked ? "// Sign in to view source code" : code}</code>
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
                  <Lock className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                  <h3 className="font-semibold mb-1">Unlock All Components</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Sign in for free to access all components and their source code.
                  </p>
                  <div className="flex flex-col gap-2">
                    <Button asChild className="w-full rounded-xl">
                      <Link to="/signup">Create free account</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full rounded-xl">
                      <Link to="/login">Sign in</Link>
                    </Button>
                  </div>
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
