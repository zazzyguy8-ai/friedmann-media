'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from './Button'
import ProgressBar from './ProgressBar'
import Confetti from './Confetti'

interface ChallengeCardProps {
  challengeText: string
  completed: boolean
  onComplete: () => Promise<void>
  streak: number
}

function getHoursLeftPercent(): number {
  const now = new Date()
  const midnight = new Date()
  midnight.setHours(24, 0, 0, 0)
  const totalMs = 24 * 60 * 60 * 1000
  const elapsedMs = now.getTime() - new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  return (elapsedMs / totalMs) * 100
}

function getHoursLeft(): string {
  const now = new Date()
  const midnight = new Date()
  midnight.setHours(24, 0, 0, 0)
  const diffMs = midnight.getTime() - now.getTime()
  const hours = Math.floor(diffMs / (1000 * 60 * 60))
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
  if (hours > 0) return `${hours}h ${minutes}m left`
  return `${minutes}m left`
}

export default function ChallengeCard({
  challengeText,
  completed: initialCompleted,
  onComplete,
  streak,
}: ChallengeCardProps) {
  const [completed, setCompleted] = useState(initialCompleted)
  const [loading, setLoading] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showMilestone, setShowMilestone] = useState(false)
  const [timeLeft, setTimeLeft] = useState(getHoursLeft())
  const [timePercent, setTimePercent] = useState(getHoursLeftPercent())

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getHoursLeft())
      setTimePercent(getHoursLeftPercent())
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  const handleComplete = async () => {
    if (completed || loading) return
    setLoading(true)
    try {
      await onComplete()
      setCompleted(true)
      setShowConfetti(true)
      const newStreak = streak + 1
      if (newStreak === 7 || newStreak === 14 || newStreak === 30) {
        setShowMilestone(true)
        setTimeout(() => setShowMilestone(false), 2500)
      }
    } finally {
      setLoading(false)
    }
  }

  const milestoneData = () => {
    const s = streak + 1
    if (s === 7) return { emoji: '🔥', text: '7 day streak!', sub: 'One week of consistency.' }
    if (s === 14) return { emoji: '⚡', text: '14 day streak!', sub: 'Two weeks strong.' }
    if (s === 30) return { emoji: '🏆', text: '30 day streak!', sub: 'A full month. Legendary.' }
    return null
  }

  return (
    <>
      <Confetti trigger={showConfetti} onComplete={() => setShowConfetti(false)} />

      <AnimatePresence>
        {showMilestone && milestoneData() && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[var(--bg)]/95 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="flex flex-col items-center gap-4"
            >
              <span className="text-8xl">{milestoneData()!.emoji}</span>
              <h2 className="font-display font-bold text-4xl text-[var(--text)]">
                {milestoneData()!.text}
              </h2>
              <p className="font-display text-[var(--muted)] text-xl">{milestoneData()!.sub}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`
          w-full max-w-lg mx-auto p-8 rounded-2xl
          bg-[var(--surface)] border
          ${completed ? 'border-[var(--green)] shadow-[0_0_30px_rgba(61,224,135,0.1)]' : 'border-[var(--border)] shadow-[0_0_30px_rgba(91,139,255,0.1)]'}
          flex flex-col gap-6
        `}
      >
        <div className="flex justify-start">
          <span
            className="font-display font-bold text-sm text-[var(--text)]"
            style={{ letterSpacing: '0.45em', textTransform: 'uppercase' }}
          >
            H E R E.
          </span>
        </div>

        <span className="font-mono text-xs uppercase tracking-widest text-[var(--muted)]">
          Today&apos;s Challenge
        </span>

        <p className="font-display text-[22px] leading-relaxed text-[var(--text)] text-center">
          {challengeText}
        </p>

        <ProgressBar
          progress={timePercent}
          label={timeLeft}
          color={timePercent > 75 ? 'var(--red)' : timePercent > 50 ? 'var(--yellow)' : 'var(--accent)'}
        />

        <AnimatePresence mode="wait">
          {completed ? (
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full py-4 rounded-xl bg-[rgba(61,224,135,0.1)] border border-[var(--green)] flex items-center justify-center gap-2"
            >
              <span className="font-display font-semibold text-[var(--green)] text-lg">
                Completed today 🎉
              </span>
            </motion.div>
          ) : (
            <motion.div key="button" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Button
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
                onClick={handleComplete}
                className="text-xl"
              >
                I did it ✓
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-center font-mono text-xs text-[var(--muted)]">
          New challenge tomorrow at midnight
        </p>
      </motion.div>
    </>
  )
}
