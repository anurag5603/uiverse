import { useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Zap, ArrowRight } from "lucide-react"
import { supabase } from "@/lib/supabase"

export function AuthCallbackPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleCallback = async () => {
      const url = new URL(window.location.href)
      const code = url.searchParams.get("code")
      const error = url.searchParams.get("error")
      const errorDescription = url.searchParams.get("error_description")

      // Handle error from OAuth provider
      if (error) {
        console.error("OAuth error:", error, errorDescription)
        navigate("/login?error=" + encodeURIComponent(errorDescription ?? error))
        return
      }

      // PKCE flow — exchange code for session
      if (code) {
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
        if (exchangeError) {
          console.error("Exchange error:", exchangeError.message)
          navigate("/login?error=" + encodeURIComponent(exchangeError.message))
          return
        }
        const next = url.searchParams.get("next") ?? "/"
        navigate(next, { replace: true })
        return
      }

      // Implicit flow — access_token in hash fragment
      const hashParams = new URLSearchParams(window.location.hash.replace("#", ""))
      const accessToken = hashParams.get("access_token")
      const refreshToken = hashParams.get("refresh_token")

      if (accessToken && refreshToken) {
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        })
        if (sessionError) {
          console.error("Session error:", sessionError.message)
          navigate("/login?error=" + encodeURIComponent(sessionError.message))
          return
        }
        navigate("/", { replace: true })
        return
      }

      // Fallback — let onAuthStateChange handle it
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        navigate("/", { replace: true })
      } else {
        navigate("/login", { replace: true })
      }
    }

    handleCallback()
  }, [navigate])

  return (
    <div className="min-h-screen flex">
      {/* Left decorative panel — same as LoginPage */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-card border-r border-border">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>
        <div className="relative z-10 flex flex-col justify-center p-16">
          <Link to="/" className="flex items-center gap-2 mb-16">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-lg tracking-tight">UIverse</span>
          </Link>
          <h2 className="text-4xl font-extrabold tracking-tight mb-4">
            Build stunning UIs in minutes
          </h2>
          <p className="text-muted-foreground text-lg mb-12">
            Access 100+ premium animated components. Copy, customize, and ship.
          </p>
          <div className="space-y-4">
            {["Save your favorite components", "Access premium code", "Get new components weekly"].map((f) => (
              <div key={f} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <ArrowRight className="w-3 h-3 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side — loading state */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md flex flex-col items-center gap-6"
        >
          {/* Logo (mobile only) */}
          <Link to="/" className="flex items-center gap-2 mb-2 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-lg tracking-tight">UIverse</span>
          </Link>

          {/* Spinner */}
          <div className="relative flex items-center justify-center">
            <motion.div
              className="w-14 h-14 rounded-full border-[3px] border-border border-t-primary"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" strokeWidth={2.5} />
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight mb-1">Signing you in</h1>
            <p className="text-sm text-muted-foreground">Please wait, verifying your account…</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}