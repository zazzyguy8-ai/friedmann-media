'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { createBrowserClient } from '@/lib/supabase'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!email) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Invalid email'
    if (!password) newErrors.password = 'Password is required'
    else if (password.length < 8) newErrors.password = 'Password must be at least 8 characters'
    if (!confirmPassword) newErrors.confirmPassword = 'Please confirm your password'
    else if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match'
    return newErrors
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)
    setErrors({})

    const supabase = createBrowserClient()

    // Race signup against a timeout
    const signUpPromise = supabase.auth.signUp({ email, password })
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out. Please try again.')), 10000)
    )

    let signUpResult
    try {
      signUpResult = await Promise.race([signUpPromise, timeoutPromise])
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong'
      setErrors({ global: message })
      setLoading(false)
      return
    }

    if (signUpResult.error) {
      // If user already exists, try signing in directly
      if (signUpResult.error.message.includes('already registered')) {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
        if (!signInError) {
          router.push('/onboarding')
          return
        }
      }
      setErrors({ global: signUpResult.error.message })
      setLoading(false)
      return
    }

    // Try to sign in immediately
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
    if (!signInError) {
      router.push('/onboarding')
      return
    }

    // If sign in fails (email not confirmed), send to login with message
    setErrors({ global: 'Account created! Please log in.' })
    setLoading(false)
    router.push('/login')
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
          <h1 className="font-display font-bold text-3xl text-[var(--text)]">Create your account</h1>
          <p className="font-display text-[var(--muted)] mt-2">Free forever. Start in 60 seconds.</p>
        </div>

        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 flex flex-col gap-5">
          {errors.global && (
            <div className="px-4 py-3 rounded-xl bg-[rgba(255,91,91,0.1)] border border-[rgba(255,91,91,0.2)] text-[var(--red)] text-sm font-display">
              {errors.global}
            </div>
          )}

          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              autoComplete="email"
            />
            <Input
              label="Password"
              type="password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              autoComplete="new-password"
            />
            <Input
              label="Confirm password"
              type="password"
              placeholder="Repeat your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
              autoComplete="new-password"
            />

            <Button type="submit" variant="primary" size="lg" fullWidth loading={loading} className="mt-2">
              Create account →
            </Button>
          </form>

          <p className="text-center font-display text-sm text-[var(--muted)]">
            Already have an account?{' '}
            <Link href="/login" className="text-[var(--accent)] hover:underline">
              Log in
            </Link>
          </p>
        </div>

        <p className="text-center font-mono text-xs text-[var(--muted)] mt-6">
          100% free · No credit card required · Start in 60 seconds
        </p>
      </motion.div>
    </div>
  )
}
