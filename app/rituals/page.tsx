'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { createBrowserClientInstance as createBrowserClient } from '@/lib/supabase-browser'
import { getDailyRitual, RITUALS } from '@/lib/rituals'
import { Ritual } from '@/types'

function RitualCard({ ritual, isToday, onComplete }: { ritual: Ritual; isToday: boolean; onComplete?: () => void }) {
  const [expanded, setExpanded] = useState(isToday)
  const [completed, setCompleted] = useState(false)

  const categoryColors: Record<string, string> = {
    discipline: 'rgba(90,120,64,0.5)',
    focus: 'rgba(74,96,128,0.5)',
    emotional: 'rgba(112,128,168,0.5)',
    creative: 'rgba(128,80,160,0.5)',
    reflection: 'rgba(64,64,96,0.5)',
    power: 'rgba(176,64,32,0.5)',
    shadow: 'rgba(30,30,50,0.8)',
  }

  return (
    <motion.div
      layout
      className={`border transition-all ${isToday ? 'border-[var(--border-gold)] card-gold' : 'border-[var(--border)] card-arcane'}`}
    >
      <button className="w-full text-left p-6 flex items-start gap-4" onClick={() => setExpanded(!expanded)}>
        <div className="flex flex-col items-center gap-2 shrink-0">
          {isToday && <span className="font-mono text-[var(--gold)] text-xs tracking-ritual">TODAY</span>}
          <span className="font-mono text-xs px-2 py-1"
            style={{ background: categoryColors[ritual.category] || 'rgba(64,64,80,0.5)', color: 'var(--silver)' }}>
            {ritual.category.toUpperCase()}
          </span>
        </div>
        <div className="flex-1">
          <h3 className="font-cinzel text-silver text-base tracking-ritual mb-1" style={{ letterSpacing: '0.12em' }}>
            {ritual.name}
          </h3>
          <p className="font-mono text-[var(--silver-dim)] text-xs">{ritual.duration}</p>
        </div>
        <span className="text-[var(--silver-dim)] text-sm mt-1">{expanded ? '−' : '+'}</span>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 flex flex-col gap-5">
              <div className="divider-silver" />

              <div>
                <p className="font-mono text-[var(--silver-dim)] text-xs tracking-ritual mb-2">INTENTION</p>
                <p className="font-garamond text-[var(--text)] text-base italic leading-relaxed">{ritual.intention}</p>
              </div>

              <div>
                <p className="font-mono text-[var(--silver-dim)] text-xs tracking-ritual mb-3">THE PRACTICE</p>
                <div className="flex flex-col gap-3">
                  {ritual.steps.map((step) => (
                    <div key={step.order} className="flex gap-4">
                      <span className="font-cinzel-decorative text-gold text-sm shrink-0 mt-0.5 opacity-60">
                        {['I', 'II', 'III', 'IV', 'V', 'VI'][step.order - 1]}
                      </span>
                      <div>
                        <p className="font-garamond text-[var(--text)] text-base italic leading-relaxed">
                          {step.instruction}
                        </p>
                        {step.duration && (
                          <p className="font-mono text-[var(--text-dim)] text-xs mt-1">{step.duration}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {ritual.elements.length > 0 && (
                <div>
                  <p className="font-mono text-[var(--silver-dim)] text-xs tracking-ritual mb-2">ELEMENTS</p>
                  <div className="flex flex-wrap gap-2">
                    {ritual.elements.map((el) => (
                      <span key={el} className="font-garamond text-[var(--silver-dim)] text-sm italic px-3 py-1 border border-[var(--border)]">
                        {el}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {isToday && !completed && onComplete && (
                <button
                  onClick={() => { setCompleted(true); onComplete() }}
                  className="font-cinzel text-xs tracking-arcane px-6 py-3 border border-[var(--border-gold)] text-gold hover:bg-[rgba(201,169,110,0.08)] transition-all self-start"
                  style={{ letterSpacing: '0.2em' }}
                >
                  MARK COMPLETE
                </button>
              )}

              {completed && (
                <p className="font-garamond text-gold italic text-sm">The ritual is complete. +50 XP.</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function RitualsPage() {
  const router = useRouter()
  const supabase = createBrowserClient()
  const [, setArchetypeKey] = useState<string>('')
  const [rituals, setRituals] = useState<Ritual[]>([])
  const [todayRitual, setTodayRitual] = useState<Ritual | null>(null)
  const [loading, setLoading] = useState(true)
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      const { data: profile } = await supabase
        .from('profiles')
        .select('archetype_key, streak')
        .eq('id', user.id)
        .single()

      if (!profile?.archetype_key) { router.push('/initiation'); return }

      const key = profile.archetype_key
      setArchetypeKey(key)
      setStreak(profile.streak || 0)

      const today = getDailyRitual(key)
      setTodayRitual(today)

      const others = RITUALS.filter((r) => r.key !== today.key)
      setRituals(others)
      setLoading(false)
    }
    load()
  }, [])

  async function handleComplete() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    const newStreak = streak + 1
    setStreak(newStreak)
    await supabase.from('profiles').update({
      streak: newStreak,
      last_ritual_at: new Date().toISOString(),
    }).eq('id', user.id)

    await supabase.from('ritual_logs').insert({
      user_id: user.id,
      ritual_key: todayRitual?.key,
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <p className="font-cinzel text-[var(--silver-dim)] text-sm tracking-ritual animate-pulse-glow">
          Preparing your rituals...
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-obsidian">
      <div className="fixed inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 30% at 30% 0%, rgba(20,10,40,0.3) 0%, transparent 60%)' }}
      />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 border-b border-[var(--border)]"
        style={{ background: 'rgba(5,5,7,0.85)', backdropFilter: 'blur(20px)' }}>
        <Link href="/portal" className="font-cinzel-decorative text-gold text-sm tracking-arcane glow-text-gold">ARCANUM</Link>
        <div className="flex items-center gap-6">
          <Link href="/portal" className="font-cinzel text-[var(--silver-dim)] text-xs tracking-ritual hover:text-silver transition-colors">Portal</Link>
          <Link href="/archive" className="font-cinzel text-[var(--silver-dim)] text-xs tracking-ritual hover:text-silver transition-colors">Archive</Link>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="mb-12">
          <div className="flex items-center justify-between mb-2">
            <p className="font-mono text-[var(--silver-dim)] text-xs tracking-arcane uppercase">The Ritual Chamber</p>
            <div className="flex items-center gap-2">
              <span className="font-mono text-gold text-xs tracking-ritual">{streak}</span>
              <span className="font-garamond text-[var(--silver-dim)] text-sm italic">day streak</span>
            </div>
          </div>
          <h1 className="font-cinzel font-bold text-3xl text-silver" style={{ letterSpacing: '0.06em' }}>
            Your Rituals
          </h1>
          <p className="font-garamond text-[var(--silver-dim)] text-lg italic mt-2 leading-relaxed">
            Calibrated to your archetype. Performed in private. The practice is the power.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {todayRitual && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <RitualCard ritual={todayRitual} isToday onComplete={handleComplete} />
            </motion.div>
          )}

          <div className="divider-arcane my-4" />

          <p className="font-mono text-[var(--silver-dim)] text-xs tracking-ritual uppercase mb-2">All Practices</p>

          {rituals.map((ritual, i) => (
            <motion.div key={ritual.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}>
              <RitualCard ritual={ritual} isToday={false} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
