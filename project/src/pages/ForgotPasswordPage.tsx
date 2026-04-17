import { useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Zap, ArrowLeft, Mail, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabase"

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="font-bold text-lg tracking-tight">UIverse</span>
        </Link>

        {sent ? (
          /* ── Success state ── */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight mb-3">Check your inbox</h1>
            <p className="text-muted-foreground mb-2">
              We sent a password reset link to
            </p>
            <p className="font-semibold mb-8">{email}</p>
            <p className="text-sm text-muted-foreground mb-8">
              Didn't receive it? Check your spam folder, or{" "}
              <button
                className="text-primary font-medium hover:underline"
                onClick={() => setSent(false)}
              >
                try again
              </button>
              .
            </p>
            <Button asChild variant="outline" className="w-full h-11 rounded-xl gap-2">
              <Link to="/login">
                <ArrowLeft className="w-4 h-4" />
                Back to sign in
              </Link>
            </Button>
          </motion.div>
        ) : (
          /* ── Form state ── */
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-extrabold tracking-tight mb-2">
                Forgot password?
              </h1>
              <p className="text-muted-foreground">
                No worries — enter your email and we'll send you a reset link.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-sm text-destructive">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11 rounded-xl pl-9"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-11 rounded-xl mt-2"
                disabled={loading}
              >
                {loading ? "Sending reset link..." : "Send reset link"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to sign in
              </Link>
            </div>
          </>
        )}
      </motion.div>
    </div>
  )
}
