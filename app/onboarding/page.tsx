'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { createBrowserClient } from '@/lib/supabase'
import type { BusinessProfile } from '@/types'

// ─── Data ────────────────────────────────────────────────────────────────────

const INDUSTRIES = [
  { icon: '🛍️', label: 'Retail & E-commerce' },
  { icon: '🍽️', label: 'Food & Restaurant' },
  { icon: '💪', label: 'Fitness & Wellness' },
  { icon: '💄', label: 'Beauty & Fashion' },
  { icon: '🏠', label: 'Real Estate' },
  { icon: '💻', label: 'Tech & Software' },
  { icon: '📚', label: 'Education & Coaching' },
  { icon: '⚖️', label: 'Legal & Finance' },
  { icon: '🏥', label: 'Health & Medical' },
  { icon: '🎨', label: 'Creative & Design' },
  { icon: '🏗️', label: 'Construction & Trades' },
  { icon: '✈️', label: 'Travel & Hospitality' },
  { icon: '🎵', label: 'Entertainment & Media' },
  { icon: '🐾', label: 'Pets & Animals' },
  { icon: '🌱', label: 'Sustainability & Green' },
  { icon: '⚙️', label: 'Other' },
]

const GOALS = [
  { icon: '📣', label: 'Brand awareness' },
  { icon: '💰', label: 'More sales' },
  { icon: '👥', label: 'Grow followers' },
  { icon: '💬', label: 'Customer engagement' },
  { icon: '🌐', label: 'Website traffic' },
  { icon: '🎯', label: 'Generate leads' },
  { icon: '🤝', label: 'Build community' },
  { icon: '⭐', label: 'Reputation & trust' },
]

const PLATFORMS = [
  { icon: '📸', label: 'Instagram' },
  { icon: '🎵', label: 'TikTok' },
  { icon: '💼', label: 'LinkedIn' },
  { icon: '🐦', label: 'Twitter / X' },
  { icon: '📘', label: 'Facebook' },
  { icon: '▶️', label: 'YouTube' },
  { icon: '📌', label: 'Pinterest' },
]

const BRAND_VOICES = [
  { icon: '👔', label: 'Professional' },
  { icon: '😊', label: 'Friendly & casual' },
  { icon: '💥', label: 'Bold & confident' },
  { icon: '🎓', label: 'Educational' },
  { icon: '🎉', label: 'Playful & fun' },
  { icon: '💎', label: 'Luxurious' },
  { icon: '🌟', label: 'Inspirational' },
  { icon: '🤝', label: 'Authentic & honest' },
]

// ─── Animation variants ──────────────────────────────────────────────────────

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir < 0 ? 60 : -60, opacity: 0 }),
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function ToggleChip({
  icon,
  label,
  selected,
  onClick,
}: {
  icon: string
  label: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-3 rounded-xl border font-display text-sm font-medium transition-all duration-200
        ${selected
          ? 'border-[var(--accent)] bg-[rgba(91,139,255,0.12)] text-[var(--text)]'
          : 'border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--text)]'
        }
      `}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </motion.button>
  )
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [dir, setDir] = useState(1)
  const [saving, setSaving] = useState(false)

  // Business profile state
  const [ownerName, setOwnerName] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [industry, setIndustry] = useState('')
  const [targetAudience, setTargetAudience] = useState('')
  const [goals, setGoals] = useState<string[]>([])
  const [platforms, setPlatforms] = useState<string[]>([])
  const [brandVoice, setBrandVoice] = useState<string[]>([])
  const [competitors, setCompetitors] = useState('')
  const [contentThemes, setContentThemes] = useState('')

  // Error state
  const [error, setError] = useState('')

  useEffect(() => {
    const supabase = createBrowserClient()
    supabase.auth.getUser().then(({ data }: { data: { user: unknown } }) => {
      if (!data.user) router.push('/login')
    })
  }, [router])

  const go = (next: number) => {
    setError('')
    setDir(next > step ? 1 : -1)
    setStep(next)
  }

  const toggleItem = (
    list: string[],
    setList: (v: string[]) => void,
    item: string
  ) => {
    setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item])
  }

  const validateAndGo = (next: number) => {
    if (step === 1) {
      if (!ownerName.trim()) { setError('Please enter your name'); return }
      if (!businessName.trim()) { setError('Please enter your business name'); return }
    }
    if (step === 2 && !industry) {
      setError('Please select your industry')
      return
    }
    if (step === 3 && !targetAudience.trim()) {
      setError('Please describe your target audience')
      return
    }
    if (step === 4 && goals.length === 0) {
      setError('Please select at least one goal')
      return
    }
    if (step === 5 && platforms.length === 0) {
      setError('Please select at least one platform')
      return
    }
    if (step === 6 && brandVoice.length === 0) {
      setError('Please select at least one brand voice')
      return
    }
    go(next)
  }

  const handleFinish = async () => {
    if (!contentThemes.trim()) {
      setError('Please describe your content themes')
      return
    }

    setSaving(true)
    setError('')

    const businessProfile: BusinessProfile = {
      businessName: businessName.trim(),
      ownerName: ownerName.trim(),
      industry,
      targetAudience: targetAudience.trim(),
      goals,
      platforms,
      brandVoice,
      competitors: competitors.trim(),
      contentThemes: contentThemes.trim(),
    }

    const supabase = createBrowserClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) { router.push('/login'); return }

    const { error: dbError } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        name: ownerName.trim(),
        goal: JSON.stringify(businessProfile),
        time_available: null,
        onboarding_completed: true,
      })

    if (dbError) {
      setError('Something went wrong. Please try again.')
      setSaving(false)
      return
    }

    router.push('/dashboard')
  }

  const TOTAL_STEPS = 8

  const stepQuestions: Record<number, string> = {
    1: "Hi! I'm Plou. Let's start with the basics.",
    2: `What industry is ${businessName || 'your business'} in?`,
    3: 'Who is your ideal customer?',
    4: 'What do you want to achieve on social media?',
    5: 'Which platforms are you on, or want to grow on?',
    6: `How should ${businessName || 'your brand'} sound online?`,
    7: 'Who are your main competitors? (optional)',
    8: 'What topics matter most to your audience?',
  }

  if (saving) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex flex-col items-center justify-center gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-6 text-center max-w-sm px-6"
        >
          <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center font-display font-bold text-2xl text-white shadow-lg shadow-[rgba(91,139,255,0.4)]">
            P
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-display font-bold text-3xl text-[var(--text)]">
              Plou is learning your business...
            </h2>
            <p className="font-display text-[var(--muted)]">
              Building your personalized strategy and dashboard.
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-[var(--accent)]"
              />
            ))}
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="font-display font-bold text-3xl gradient-text">plou</span>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-1.5 mb-8">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full flex-1 transition-all duration-500 ${
                i < step ? 'bg-[var(--accent)]' : 'bg-[var(--border)]'
              }`}
            />
          ))}
        </div>

        {/* Plou avatar + question */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center font-display font-bold text-white shrink-0">P</div>
          <div>
            <p className="font-mono text-xs text-[var(--muted)] mb-0.5">
              Step {step} of {TOTAL_STEPS}
            </p>
            <p className="font-display font-semibold text-lg text-[var(--text)]">
              {stepQuestions[step]}
            </p>
          </div>
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="flex flex-col gap-6"
          >
            {/* Step 1: Name + Business name */}
            {step === 1 && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-display text-sm font-medium text-[var(--muted)]">Your name</label>
                  <input
                    type="text"
                    placeholder="e.g. Sarah"
                    value={ownerName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOwnerName(e.target.value)}
                    autoFocus
                    className="w-full px-4 py-3 rounded-xl bg-[var(--surface2)] border border-[var(--border)] text-[var(--text)] font-display placeholder:text-[var(--muted)] outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-display text-sm font-medium text-[var(--muted)]">Business name</label>
                  <input
                    type="text"
                    placeholder="e.g. Bloom Bakery"
                    value={businessName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBusinessName(e.target.value)}
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && validateAndGo(2)}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--surface2)] border border-[var(--border)] text-[var(--text)] font-display placeholder:text-[var(--muted)] outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Industry */}
            {step === 2 && (
              <div className="grid grid-cols-2 gap-2.5">
                {INDUSTRIES.map((ind) => (
                  <motion.button
                    key={ind.label}
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={() => { setIndustry(ind.label); setError('') }}
                    className={`
                      flex items-center gap-2.5 px-4 py-3 rounded-xl border font-display text-sm font-medium text-left transition-all duration-200
                      ${industry === ind.label
                        ? 'border-[var(--accent)] bg-[rgba(91,139,255,0.12)] text-[var(--text)]'
                        : 'border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--text)]'
                      }
                    `}
                  >
                    <span>{ind.icon}</span>
                    <span>{ind.label}</span>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Step 3: Target audience */}
            {step === 3 && (
              <div className="flex flex-col gap-3">
                <textarea
                  rows={4}
                  placeholder={`e.g. Women aged 25-40 who care about healthy eating and want quick, affordable recipes for busy weekdays.`}
                  value={targetAudience}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setTargetAudience(e.target.value)}
                  autoFocus
                  className="w-full px-4 py-3 rounded-xl bg-[var(--surface2)] border border-[var(--border)] text-[var(--text)] font-display placeholder:text-[var(--muted)] outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all resize-none leading-relaxed"
                />
                <p className="font-mono text-xs text-[var(--muted)]">
                  Be specific — age, interests, pain points, lifestyle. The more detail, the better Plou can help you.
                </p>
              </div>
            )}

            {/* Step 4: Goals */}
            {step === 4 && (
              <div className="grid grid-cols-2 gap-2.5">
                {GOALS.map((g) => (
                  <ToggleChip
                    key={g.label}
                    icon={g.icon}
                    label={g.label}
                    selected={goals.includes(g.label)}
                    onClick={() => { toggleItem(goals, setGoals, g.label); setError('') }}
                  />
                ))}
              </div>
            )}

            {/* Step 5: Platforms */}
            {step === 5 && (
              <div className="grid grid-cols-2 gap-2.5">
                {PLATFORMS.map((p) => (
                  <ToggleChip
                    key={p.label}
                    icon={p.icon}
                    label={p.label}
                    selected={platforms.includes(p.label)}
                    onClick={() => { toggleItem(platforms, setPlatforms, p.label); setError('') }}
                  />
                ))}
              </div>
            )}

            {/* Step 6: Brand voice */}
            {step === 6 && (
              <div className="grid grid-cols-2 gap-2.5">
                {BRAND_VOICES.map((v) => (
                  <ToggleChip
                    key={v.label}
                    icon={v.icon}
                    label={v.label}
                    selected={brandVoice.includes(v.label)}
                    onClick={() => { toggleItem(brandVoice, setBrandVoice, v.label); setError('') }}
                  />
                ))}
              </div>
            )}

            {/* Step 7: Competitors (optional) */}
            {step === 7 && (
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="e.g. BrandA, BrandB, Local competitor..."
                  value={competitors}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompetitors(e.target.value)}
                  autoFocus
                  className="w-full px-4 py-3 rounded-xl bg-[var(--surface2)] border border-[var(--border)] text-[var(--text)] font-display placeholder:text-[var(--muted)] outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all"
                />
                <p className="font-mono text-xs text-[var(--muted)]">
                  This is optional — skip it if you&apos;re not sure.
                </p>
              </div>
            )}

            {/* Step 8: Content themes */}
            {step === 8 && (
              <div className="flex flex-col gap-3">
                <textarea
                  rows={4}
                  placeholder={`e.g. Behind-the-scenes of our baking process, healthy recipe tips, customer stories, seasonal specials, quick how-to videos.`}
                  value={contentThemes}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContentThemes(e.target.value)}
                  autoFocus
                  className="w-full px-4 py-3 rounded-xl bg-[var(--surface2)] border border-[var(--border)] text-[var(--text)] font-display placeholder:text-[var(--muted)] outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all resize-none leading-relaxed"
                />
                <p className="font-mono text-xs text-[var(--muted)]">
                  Topics you want to post about regularly — think categories, themes, content types.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Error */}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 font-display text-sm text-[var(--red)]"
          >
            {error}
          </motion.p>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 gap-4">
          {step > 1 ? (
            <button
              onClick={() => go(step - 1)}
              className="font-display text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors flex items-center gap-1"
            >
              ← Back
            </button>
          ) : (
            <div />
          )}

          {step < TOTAL_STEPS ? (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => validateAndGo(step + 1)}
              className="font-display font-semibold text-white gradient-bg px-7 py-3 rounded-xl hover:opacity-90 transition-opacity shadow-md shadow-[rgba(91,139,255,0.25)]"
            >
              {step === 7 ? (competitors.trim() ? 'Continue →' : 'Skip →') : 'Continue →'}
            </motion.button>
          ) : (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleFinish}
              className="font-display font-semibold text-white gradient-bg px-7 py-3 rounded-xl hover:opacity-90 transition-opacity shadow-md shadow-[rgba(91,139,255,0.25)]"
            >
              Meet Plou →
            </motion.button>
          )}
        </div>
      </div>
    </div>
  )
}
