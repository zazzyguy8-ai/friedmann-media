'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { createBrowserClient } from '@/lib/supabase'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [forgotSent, setForgotSent] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    if (!email) newErrors.email = 'Email is required'
    if (!password) newErrors.password = 'Password is required'
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    setErrors({})

    const supabase = createBrowserClient()
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setErrors({ global: error.message })
      setLoading(false)
      return
    }

    if (!data.user) {
      setErrors({ global: 'Login failed. Please try again.' })
      setLoading(false)
      return
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('onboarding_completed')
      .eq('id', data.user.id)
      .single()

    if (!profile?.onboarding_completed) {
      router.push('/onboarding')
      return
    }

    router.push('/dashboard')
  }

  const handleForgotPassword = async () => {
    if (!email) {
      setErrors({ email: 'Enter your email above first' })
      return
    }
    const supabase = createBrowserClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    })
    if (error) {
      setErrors({ global: error.message })
    } else {
      setForgotSent(true)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link href="/" className="font-display font-bold text-3xl gradient-text inline-block mb-6">
            plou
          </Link>
          <h1 className="font-display font-bold text-3xl text-[var(--text)]">Welcome back</h1>
          <p className="font-display text-[var(--muted)] mt-2">Your AI social media expert is waiting.</p>
        </div>

        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 flex flex-col gap-5">
          {errors.global && (
            <div className="px-4 py-3 rounded-xl bg-[rgba(255,91,91,0.1)] border border-[rgba(255,91,91,0.2)] text-[var(--red)] text-sm font-display">
              {errors.global}
            </div>
          )}

          {forgotSent && (
            <div className="px-4 py-3 rounded-xl bg-[rgba(61,224,135,0.1)] border border-[rgba(61,224,135,0.2)] text-[var(--green)] text-sm font-display">
              Password reset link sent! Check your email.
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              autoComplete="email"
            />
            <div className="flex flex-col gap-1.5">
              <Input
                label="Password"
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={handleForgotPassword}
                className="self-end font-display text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <Button type="submit" variant="primary" size="lg" fullWidth loading={loading} className="mt-2">
              Log in →
            </Button>
          </form>

          <p className="text-center font-display text-sm text-[var(--muted)]">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-[var(--accent)] hover:underline">
              Sign up free
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
