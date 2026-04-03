'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { createBrowserClient } from '@/lib/supabase'
import StreakCounter from '@/components/ui/StreakCounter'
import CalendarStrip from '@/components/ui/CalendarStrip'
import ChallengeCard from '@/components/ui/ChallengeCard'
import type { Profile, Challenge, DayStatus } from '@/types'

function getInitials(name: string | null): string {
  if (!name) return '?'
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

function calculateStreak(challenges: Challenge[]): number {
  const sorted = [...challenges]
    .filter((c) => c.completed)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  if (sorted.length === 0) return 0

  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

  // Streak only counts if today or yesterday has been completed
  const latestDate = sorted[0].date
  if (latestDate !== today && latestDate !== yesterday) return 0

  let streak = 0
  let currentDate = latestDate === today ? new Date() : new Date(Date.now() - 86400000)

  for (const c of sorted) {
    const challengeDate = c.date
    const expectedDate = new Date(currentDate).toISOString().split('T')[0]
    if (challengeDate === expectedDate) {
      streak++
      currentDate = new Date(currentDate.getTime() - 86400000)
    } else {
      break
    }
  }

  return streak
}

function getLast7Days(challenges: Challenge[]): DayStatus[] {
  const days: DayStatus[] = []
  const today = new Date()
  const completedDates = new Set(challenges.filter((c) => c.completed).map((c) => c.date))
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const dateStr = d.toISOString().split('T')[0]
    days.push({
      date: dateStr,
      completed: completedDates.has(dateStr),
      is_today: i === 0,
      label: dayLabels[d.getDay()],
    })
  }

  return days
}

function missedYesterday(challenges: Challenge[]): boolean {
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
  const today = new Date().toISOString().split('T')[0]
  const todayChallenge = challenges.find((c) => c.date === today && c.completed)
  if (todayChallenge) return false // streak alive
  const yesterdayChallenge = challenges.find((c) => c.date === yesterday)
  return !yesterdayChallenge || !yesterdayChallenge.completed
}

export default function DashboardPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [streak, setStreak] = useState(0)
  const [calendarDays, setCalendarDays] = useState<DayStatus[]>([])
  const [loading, setLoading] = useState(true)
  const [challengeLoading, setChallengeLoading] = useState(false)
  const [error, setError] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [showMissedBanner, setShowMissedBanner] = useState(false)

  const loadData = useCallback(async () => {
    const supabase = createBrowserClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      router.push('/login')
      return
    }

    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError || !profileData) {
      router.push('/onboarding')
      return
    }

    // Check trial
    const trialStart = new Date(profileData.trial_start_date)
    const daysSinceTrial = (Date.now() - trialStart.getTime()) / (1000 * 60 * 60 * 24)
    if (!profileData.is_premium && daysSinceTrial > 7) {
      router.push('/paywall')
      return
    }

    setProfile(profileData)

    // Load challenges (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000).toISOString().split('T')[0]
    const { data: challengesData } = await supabase
      .from('challenges')
      .select('*')
      .eq('user_id', user.id)
      .gte('date', thirtyDaysAgo)
      .order('date', { ascending: false })

    const allChallenges = challengesData || []
    const currentStreak = calculateStreak(allChallenges)
    setStreak(currentStreak)
    setCalendarDays(getLast7Days(allChallenges))

    // Check if missed yesterday
    if (missedYesterday(allChallenges) && allChallenges.length > 0) {
      setShowMissedBanner(true)
    }

    // Find today's challenge
    const today = new Date().toISOString().split('T')[0]
    const todayChallenge = allChallenges.find((c) => c.date === today) || null
    setChallenge(todayChallenge)
    setLoading(false)

    // Generate challenge if not yet generated
    if (!todayChallenge) {
      setChallengeLoading(true)
      try {
        const res = await fetch('/api/generate-challenge', { method: 'POST' })
        const data = await res.json()
        if (data.challenge) {
          setChallenge(data.challenge)
        } else {
          setError('Failed to generate challenge. Try refreshing.')
        }
      } catch {
        setError('Failed to generate challenge. Try refreshing.')
      } finally {
        setChallengeLoading(false)
      }
    }
  }, [router])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleComplete = async () => {
    const res = await fetch('/api/complete-challenge', { method: 'POST' })
    if (!res.ok) throw new Error('Failed to complete')

    setStreak((s) => s + 1)
    setChallenge((prev) => prev ? { ...prev, completed: true, completed_at: new Date().toISOString() } : prev)
    setCalendarDays((prev) =>
      prev.map((d) => (d.is_today ? { ...d, completed: true } : d))
    )
    setShowMissedBanner(false)
  }

  const handleLogout = async () => {
    const supabase = createBrowserClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-[var(--border)] border-t-[var(--accent)] rounded-full animate-spin" />
          <p className="font-mono text-sm text-[var(--muted)]">Loading your challenge...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col">
      {/* Top bar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
        <span className="font-display font-bold text-2xl gradient-text">plou</span>
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center font-display font-semibold text-white text-sm hover:opacity-90 transition-opacity"
          >
            {getInitials(profile?.name || null)}
          </button>

          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-48 bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden shadow-xl z-50"
              >
                <div className="px-4 py-3 border-b border-[var(--border)]">
                  <p className="font-display font-semibold text-sm text-[var(--text)]">{profile?.name}</p>
                  <p className="font-mono text-xs text-[var(--muted)]">
                    {profile?.is_premium ? '✓ Premium' : 'Free trial'}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 text-left font-display text-sm text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface2)] transition-colors"
                >
                  Log out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Missed banner */}
      <AnimatePresence>
        {showMissedBanner && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-6 py-3 bg-[rgba(255,91,91,0.1)] border-b border-[rgba(255,91,91,0.2)] flex items-center justify-center gap-2">
              <span className="text-[var(--red)] font-display text-sm font-medium">
                You missed yesterday. Your streak has been reset.
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center px-6 py-12 gap-12 max-w-2xl mx-auto w-full">
        {/* Streak */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <StreakCounter streak={streak} size="lg" />
        </motion.div>

        {/* Calendar strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="w-full"
        >
          <CalendarStrip days={calendarDays} />
        </motion.div>

        {/* Challenge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="w-full"
        >
          {challengeLoading ? (
            <div className="w-full max-w-lg mx-auto p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex flex-col items-center gap-4">
              <div className="w-6 h-6 border-2 border-[var(--border)] border-t-[var(--accent)] rounded-full animate-spin" />
              <p className="font-mono text-sm text-[var(--muted)]">Generating your challenge...</p>
            </div>
          ) : error ? (
            <div className="w-full max-w-lg mx-auto p-8 rounded-2xl bg-[var(--surface)] border border-[rgba(255,91,91,0.3)] flex flex-col items-center gap-4">
              <p className="font-display text-[var(--red)] text-center">{error}</p>
              <button
                onClick={loadData}
                className="font-display text-sm text-[var(--accent)] hover:underline"
              >
                Try again
              </button>
            </div>
          ) : challenge ? (
            <ChallengeCard
              challengeText={challenge.challenge_text}
              completed={challenge.completed}
              onComplete={handleComplete}
              streak={streak}
            />
          ) : null}
        </motion.div>
      </main>

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  )
}
