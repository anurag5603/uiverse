import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { supabase } from "@/lib/supabase"

/**
 * /auth/callback
 *
 * Supabase redirects here after a successful OAuth login (Google, GitHub, etc.).
 * The URL contains a `code` query param. We exchange it for a session via
 * supabase.auth.exchangeCodeForSession(), then redirect to /dashboard.
 *
 * Add this URL to your Supabase project:
 *   Authentication → URL Configuration → Redirect URLs
 *   → http://localhost:5173/auth/callback   (local dev)
 *   → https://yourdomain.com/auth/callback  (production)
 */
export function AuthCallbackPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleCallback = async () => {
      const url = new URL(window.location.href)
      const code = url.searchParams.get("code")

      if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (error) {
          console.error("OAuth callback error:", error.message)
          navigate("/login?error=" + encodeURIComponent(error.message))
          return
        }
      }

      // Redirect to dashboard on success (or /components if coming from a locked page)
      const next = url.searchParams.get("next") ?? "/dashboard"
      navigate(next, { replace: true })
    }

    handleCallback()
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="w-10 h-10 rounded-full border-2 border-primary/30 border-t-primary"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p className="text-sm text-muted-foreground">Signing you in…</p>
      </motion.div>
    </div>
  )
}
