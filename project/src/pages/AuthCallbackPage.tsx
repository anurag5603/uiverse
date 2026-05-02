import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
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