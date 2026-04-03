'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { createBrowserClient } from '@/lib/supabase'
import Button from '@/components/ui/Button'

export default function PaywallPage() {
  const router = useRouter()
  const [streak, setStreak] = useState(0)
  const [loading, setLoading] = useState(true)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const supabase = createBrowserClient()
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        router.push('/login')
        return
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('is_premium')
        .eq('id', data.user.id)
        .single()

      if (profile?.is_premium) {
        router.push('/dashboard')
        return
      }

      // Get streak from challenges
      const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000).toISOString().split('T')[0]
      const { data: challenges } = await supabase
        .from('challenges')
        .select('date, completed')
        .eq('user_id', data.user.id)
        .gte('date', thirtyDaysAgo)
        .eq('completed', true)
        .order('date', { ascending: false })

      if (challenges && challenges.length > 0) {
        let s = 0
        let currentDate = new Date()
        for (const c of challenges) {
          const expected = new Date(currentDate).toISOString().split('T')[0]
          if (c.date === expected) {
            s++
            currentDate = new Date(currentDate.getTime() - 86400000)
          } else {
            break
          }
        }
        setStreak(s)
      }

      setLoading(false)
    })
  }, [router])

  const handleCheckout = async () => {
    setCheckoutLoading(true)
    setError('')
    try {
      const res = await fetch('/api/stripe/checkout', { method: 'POST' })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError(data.error || 'Failed to start checkout')
        setCheckoutLoading(false)
      }
    } catch {
      setError('Something went wrong. Please try again.')
      setCheckoutLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[var(--border)] border-t-[var(--accent)] rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md text-center"
      >
        <Link href="/" className="font-display font-bold text-3xl gradient-text inline-block mb-10">
          plou
        </Link>

        <div className="flex flex-col items-center gap-6 mb-10">
          <h1 className="font-display font-bold text-4xl text-[var(--text)]">
            Your free trial has ended.
          </h1>
          <p className="font-display text-[var(--muted)] text-lg">
            Keep your streak alive. Don&apos;t let your progress disappear.
          </p>

          {streak > 0 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)]"
            >
              <span className="text-4xl">🔥</span>
              <div className="text-left">
                <span className="font-mono font-medium text-4xl text-[var(--text)]">{streak}</span>
                <p className="font-display text-sm text-[var(--muted)]">day streak at risk</p>
              </div>
            </motion.div>
          )}
        </div>

        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 flex flex-col gap-6">
          <ul className="flex flex-col gap-3 text-left">
            {[
              'Daily AI-generated challenges',
              'Streak tracking forever',
              'Personalized to your goals',
              'New challenge every day',
            ].map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <span className="text-[var(--green)] font-bold text-lg">✓</span>
                <span className="font-display text-[var(--text)]">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="border-t border-[var(--border)] pt-6 flex flex-col items-center gap-1">
            <div className="flex items-baseline gap-1">
              <span className="font-mono font-medium text-5xl text-[var(--text)]">€4.99</span>
              <span className="font-display text-[var(--muted)]">/month</span>
            </div>
            <p className="font-mono text-sm text-[var(--muted)]">Less than a coffee a week</p>
          </div>

          {error && (
            <div className="px-4 py-3 rounded-xl bg-[rgba(255,91,91,0.1)] border border-[rgba(255,91,91,0.2)] text-[var(--red)] text-sm font-display">
              {error}
            </div>
          )}

          <Button
            variant="primary"
            size="lg"
            fullWidth
            loading={checkoutLoading}
            onClick={handleCheckout}
            className="text-lg"
          >
            Continue my streak →
          </Button>

          <p className="font-mono text-xs text-[var(--muted)] text-center">
            Cancel anytime. No questions asked.
          </p>

          <div className="flex items-center justify-center gap-2 border-t border-[var(--border)] pt-4">
            <svg className="w-4 h-4 text-[var(--muted)]" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-mono text-xs text-[var(--muted)]">Secure payment by Stripe</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
