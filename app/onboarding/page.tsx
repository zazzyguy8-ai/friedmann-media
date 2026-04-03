'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { createBrowserClient } from '@/lib/supabase'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import type { GoalOption, TimeOption } from '@/types'

const GOALS: GoalOption[] = [
  '🎯 Focus & productivity',
  '💪 Fitness & health',
  '👥 Social confidence',
  '🎨 Creativity',
  '📚 Learning',
  '⚡ Energy & motivation',
]

const TIME_OPTIONS: { value: TimeOption; label: string; sub: string; icon: string }[] = [
  { value: '5 minutes', label: '5 minutes', sub: 'Quick and easy', icon: '⚡' },
  { value: '15 minutes', label: '15 minutes', sub: 'Balanced', icon: '🎯' },
  { value: '30 minutes', label: '30 minutes', sub: "I'm serious", icon: '🔥' },
]

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction < 0 ? 60 : -60,
    opacity: 0,
  }),
}

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [name, setName] = useState('')
  const [goal, setGoal] = useState<GoalOption | null>(null)
  const [timeAvailable, setTimeAvailable] = useState<TimeOption | null>(null)
  const [nameError, setNameError] = useState('')
  const [saving, setSaving] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    const supabase = createBrowserClient()
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push('/login')
    })
  }, [router])

  const goToStep = (next: number) => {
    setDirection(next > step ? 1 : -1)
    setStep(next)
  }

  const handleNameContinue = () => {
    if (!name.trim()) {
      setNameError('Please enter your name')
      return
    }
    setNameError('')
    goToStep(2)
  }

  const handleGoalSelect = (selected: GoalOption) => {
    setGoal(selected)
    setTimeout(() => goToStep(3), 200)
  }

  const handleTimeSelect = async (selected: TimeOption) => {
    setTimeAvailable(selected)
    setSaving(true)

    const supabase = createBrowserClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      router.push('/login')
      return
    }

    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        name: name.trim(),
        goal: selected ? goal : null,
        time_available: selected,
        onboarding_completed: true,
        trial_start_date: new Date().toISOString(),
      })

    if (error) {
      console.error('Failed to save profile:', error)
      setSaving(false)
      return
    }

    setShowCelebration(true)
    setTimeout(() => {
      router.push('/dashboard')
    }, 2000)
  }

  if (showCelebration) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex flex-col items-center justify-center gap-6">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="flex flex-col items-center gap-4"
        >
          <span className="text-8xl">🎉</span>
          <h2 className="font-display font-bold text-4xl text-[var(--text)]">You&apos;re all set!</h2>
          <p className="font-display text-[var(--muted)] text-xl text-center">
            Your first challenge is ready.
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-10">
          <span className="font-display font-bold text-3xl gradient-text">plou</span>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-10">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1 rounded-full flex-1 transition-all duration-500 ${
                s <= step ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          {step === 1 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-8"
            >
              <div className="text-center">
                <p className="font-mono text-xs text-[var(--muted)] mb-3 uppercase tracking-widest">
                  Step 1 of 3
                </p>
                <h2 className="font-display font-bold text-4xl text-[var(--text)]">
                  What should we call you?
                </h2>
              </div>

              <Input
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={nameError}
                onKeyDown={(e) => e.key === 'Enter' && handleNameContinue()}
                autoFocus
                className="text-lg py-4 text-center"
              />

              <Button variant="primary" size="lg" fullWidth onClick={handleNameContinue}>
                Continue →
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-8"
            >
              <div className="text-center">
                <p className="font-mono text-xs text-[var(--muted)] mb-3 uppercase tracking-widest">
                  Step 2 of 3
                </p>
                <h2 className="font-display font-bold text-4xl text-[var(--text)]">
                  What do you want to improve?
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {GOALS.map((g) => (
                  <motion.button
                    key={g}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleGoalSelect(g)}
                    className={`
                      p-4 rounded-xl text-left font-display font-medium text-sm
                      border transition-all duration-200
                      ${
                        goal === g
                          ? 'border-[var(--accent)] bg-[rgba(91,139,255,0.1)] text-[var(--text)]'
                          : 'border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--text)]'
                      }
                    `}
                  >
                    {g}
                  </motion.button>
                ))}
              </div>

              <button
                onClick={() => goToStep(1)}
                className="font-display text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors text-center"
              >
                ← Back
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-8"
            >
              <div className="text-center">
                <p className="font-mono text-xs text-[var(--muted)] mb-3 uppercase tracking-widest">
                  Step 3 of 3
                </p>
                <h2 className="font-display font-bold text-4xl text-[var(--text)]">
                  How much time do you have daily?
                </h2>
              </div>

              <div className="flex flex-col gap-3">
                {TIME_OPTIONS.map((opt) => (
                  <motion.button
                    key={opt.value}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => !saving && handleTimeSelect(opt.value)}
                    disabled={saving}
                    className={`
                      p-5 rounded-xl text-left border transition-all duration-200 flex items-center gap-4
                      ${
                        timeAvailable === opt.value
                          ? 'border-[var(--accent)] bg-[rgba(91,139,255,0.1)]'
                          : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--accent)]'
                      }
                      disabled:opacity-50
                    `}
                  >
                    <span className="text-3xl">{opt.icon}</span>
                    <div>
                      <p className="font-display font-semibold text-[var(--text)] text-lg">
                        {opt.label}
                      </p>
                      <p className="font-display text-[var(--muted)] text-sm">{opt.sub}</p>
                    </div>
                  </motion.button>
                ))}
              </div>

              <button
                onClick={() => goToStep(2)}
                className="font-display text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors text-center"
              >
                ← Back
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
