'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { createBrowserClientInstance as createBrowserClient } from '@/lib/supabase-browser'
import { getArchetype } from '@/lib/archetypes'
import { UserProfile, Archetype, GeneratedArchetypeData } from '@/types'

function XPBar({ xp, level }: { xp: number; level: number }) {
  const xpForLevel = level * 200
  const percent = Math.min((xp % xpForLevel) / xpForLevel * 100, 100)
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center">
        <span className="font-mono text-[var(--silver-dim)] text-xs tracking-ritual">LEVEL {level}</span>
        <span className="font-mono text-[var(--silver-dim)] text-xs">{xp} XP</span>
      </div>
      <div className="h-px bg-[var(--border)] relative overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
          className="absolute inset-y-0 left-0 progress-arcane"
        />
      </div>
    </div>
  )
}

function ArchetypeReveal({ archetype, data, name }: { archetype: Archetype; data: GeneratedArchetypeData; name: string }) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const timings = [600, 1800, 3000, 4200]
    const timers = timings.map((t, i) => setTimeout(() => setPhase(i + 1), t))
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="fixed inset-0 bg-obsidian z-50 flex flex-col items-center justify-center px-6 text-center">
      <div className="fixed inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 60% 50% at 50% 40%, ${archetype.glowColor} 0%, transparent 70%)` }}
      />

      {phase >= 1 && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
          className="font-mono text-[var(--silver-dim)] text-xs tracking-arcane uppercase mb-6">
          The archive has read you, {name}
        </motion.p>
      )}

      {phase >= 2 && (
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }} className="mb-4">
          <div className="font-cinzel-decorative text-8xl mb-4 animate-pulse-glow"
            style={{ color: archetype.color, textShadow: `0 0 40px ${archetype.glowColor}` }}>
            {archetype.symbol}
          </div>
        </motion.div>
      )}

      {phase >= 3 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <p className="font-mono text-[var(--silver-dim)] text-xs tracking-arcane uppercase mb-2">
            Your Archetype
          </p>
          <h1 className="font-cinzel font-bold text-4xl sm:text-5xl text-silver mb-2" style={{ letterSpacing: '0.08em' }}>
            {archetype.name}
          </h1>
          <p className="font-garamond text-[var(--gold)] text-xl italic">{archetype.title}</p>
        </motion.div>
      )}

      {phase >= 4 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.3 }}
          className="mt-10">
          <p className="font-garamond text-[var(--silver-dim)] text-lg italic max-w-md leading-relaxed mb-8">
            {data.prophecy}
          </p>
          <motion.button
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            onClick={() => window.location.replace('/portal')}
            className="font-cinzel text-xs tracking-arcane px-10 py-4 border border-[var(--border-gold)] text-gold hover:bg-[rgba(201,169,110,0.08)] transition-all glow-gold"
            style={{ letterSpacing: '0.22em' }}
          >
            ENTER YOUR PORTAL
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}

function PortalContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createBrowserClient()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [archetype, setArchetype] = useState<Archetype | null>(null)
  const [loading, setLoading] = useState(true)
  const [showReveal, setShowReveal] = useState(false)
  const [premiumLoading, setPremiumLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'abilities' | 'shadow' | 'path'>('overview')

  const isReveal = searchParams.get('reveal') === 'true'
  const isPremiumSuccess = searchParams.get('premium') === 'success'

  useEffect(() => {
    loadProfile()
  }, [])

  useEffect(() => {
    if (!loading && profile?.archetype_key && isReveal) {
      setShowReveal(true)
    }
    if (isPremiumSuccess) {
      loadProfile()
    }
  }, [loading, profile, isReveal, isPremiumSuccess])

  async function loadProfile() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/login'); return }

    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (!data) { router.push('/initiation'); return }
    if (!data.archetype_key) { router.push('/initiation'); return }

    setProfile(data as UserProfile)
    setArchetype(getArchetype(data.archetype_key) || null)
    setLoading(false)
  }

  async function startCheckout() {
    setPremiumLoading(true)
    try {
      const res = await fetch('/api/create-checkout-session', { method: 'POST' })
      const { url } = await res.json()
      if (url) window.location.href = url
    } catch { setPremiumLoading(false) }
  }

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <div className="font-cinzel text-[var(--silver-dim)] text-sm tracking-ritual animate-pulse-glow">
          The archive opens...
        </div>
      </div>
    )
  }

  if (!profile || !archetype) return null

  const data = profile.archetype_data as GeneratedArchetypeData

  return (
    <>
      {showReveal && data && (
        <ArchetypeReveal archetype={archetype} data={data} name={profile.name || 'Initiate'} />
      )}

      <div className="min-h-screen bg-obsidian relative">
        <div className="fixed inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 70% 40% at 70% 0%, ${archetype.glowColor.replace('0.35', '0.12')} 0%, transparent 60%)` }}
        />

        {/* Nav */}
        <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 border-b border-[var(--border)]"
          style={{ background: 'rgba(5,5,7,0.85)', backdropFilter: 'blur(20px)' }}>
          <span className="font-cinzel-decorative text-gold text-sm tracking-arcane glow-text-gold">ARCANUM</span>
          <div className="flex items-center gap-6">
            <Link href="/rituals" className="font-cinzel text-[var(--silver-dim)] text-xs tracking-ritual hover:text-silver transition-colors">
              Rituals
            </Link>
            <Link href="/archive" className="font-cinzel text-[var(--silver-dim)] text-xs tracking-ritual hover:text-silver transition-colors">
              Archive
            </Link>
            <button onClick={signOut} className="font-mono text-[var(--text-dim)] text-xs hover:text-[var(--silver-dim)] transition-colors">
              Exit
            </button>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-6 pt-24 pb-16">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="mb-12">
            <p className="font-mono text-[var(--silver-dim)] text-xs tracking-arcane uppercase mb-2">
              Welcome back, {profile.name}
            </p>
            <div className="flex items-end gap-4 mb-6">
              <span className="font-cinzel-decorative text-5xl animate-pulse-glow"
                style={{ color: archetype.color, textShadow: `0 0 30px ${archetype.glowColor}` }}>
                {archetype.symbol}
              </span>
              <div>
                <h1 className="font-cinzel font-bold text-3xl sm:text-4xl text-silver" style={{ letterSpacing: '0.06em' }}>
                  {archetype.name}
                </h1>
                <p className="font-garamond text-gold italic text-lg">{archetype.title}</p>
              </div>
            </div>
            <XPBar xp={profile.xp} level={profile.level} />
          </motion.div>

          {/* Premium Banner */}
          {!profile.is_premium && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="mb-8 p-5 border border-[var(--border-gold)] card-gold flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-cinzel text-gold text-sm tracking-ritual mb-1" style={{ letterSpacing: '0.12em' }}>
                  ARCANUM SANCTUM
                </p>
                <p className="font-garamond text-[var(--silver-dim)] text-base italic">
                  Unlock AI energy readings, advanced shadow analysis, and the full lore archive.
                </p>
              </div>
              <button
                onClick={startCheckout}
                disabled={premiumLoading}
                className="font-cinzel text-xs tracking-arcane px-6 py-3 border border-[var(--border-gold)] text-gold hover:bg-[rgba(201,169,110,0.08)] transition-all shrink-0 disabled:opacity-40"
                style={{ letterSpacing: '0.2em' }}
              >
                {premiumLoading ? 'OPENING...' : 'UNLOCK · $9.99/MO'}
              </button>
            </motion.div>
          )}

          {isPremiumSuccess && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="mb-8 p-5 border border-[var(--border-gold)] card-gold">
              <p className="font-cinzel text-gold text-sm tracking-ritual text-center" style={{ letterSpacing: '0.12em' }}>
                THE SANCTUM IS OPEN. YOUR ACCESS IS COMPLETE.
              </p>
            </motion.div>
          )}

          {/* Tabs */}
          <div className="flex gap-0 border-b border-[var(--border)] mb-8 overflow-x-auto">
            {[
              { key: 'overview', label: 'Overview' },
              { key: 'abilities', label: 'Abilities' },
              { key: 'shadow', label: 'Shadow' },
              { key: 'path', label: 'Path' },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as never)}
                className="font-cinzel text-xs tracking-ritual px-5 py-3 border-b-2 transition-all whitespace-nowrap"
                style={{
                  letterSpacing: '0.12em',
                  borderColor: activeTab === key ? 'rgba(201,169,110,0.7)' : 'transparent',
                  color: activeTab === key ? 'var(--gold)' : 'var(--silver-dim)',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              {activeTab === 'overview' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Lore */}
                  <div className="md:col-span-2 card-arcane p-6 border border-[var(--border)]">
                    <p className="font-mono text-[var(--silver-dim)] text-xs tracking-ritual mb-4">YOUR READING</p>
                    <p className="font-garamond text-[var(--text)] text-lg italic leading-relaxed">
                      {data?.personalLore || archetype.lore.split('\n\n')[0]}
                    </p>
                  </div>

                  {/* Energy Signature */}
                  <div className="card-arcane p-6 border border-[var(--border)]">
                    <p className="font-mono text-[var(--silver-dim)] text-xs tracking-ritual mb-3">ENERGY SIGNATURE</p>
                    <p className="font-garamond text-[var(--text)] text-base italic leading-relaxed">
                      {data?.energySignature || 'An intensity that is immediately apparent.'}
                    </p>
                  </div>

                  {/* Hidden Trait */}
                  <div className="card-arcane p-6 border border-[var(--border)]">
                    <p className="font-mono text-[var(--silver-dim)] text-xs tracking-ritual mb-3">HIDDEN TRAIT</p>
                    <p className="font-garamond text-[var(--text)] text-base italic leading-relaxed">
                      {data?.hiddenTrait || 'A quality that has not yet found its name.'}
                    </p>
                  </div>

                  {/* Cosmic Role */}
                  <div className="md:col-span-2 card-arcane p-6 border border-[var(--border)]">
                    <p className="font-mono text-[var(--silver-dim)] text-xs tracking-ritual mb-3">COSMIC ROLE</p>
                    <p className="font-garamond text-[var(--text)] text-lg italic leading-relaxed">
                      {data?.cosmicRole || archetype.emotionalProfile}
                    </p>
                  </div>

                  {/* Prophecy */}
                  <div className="md:col-span-2 border border-[var(--border-gold)] card-gold p-6 text-center">
                    <p className="font-mono text-[var(--gold-dim)] text-xs tracking-arcane mb-3">THE ORACLE SPEAKS</p>
                    <p className="font-cinzel text-gold text-lg" style={{ letterSpacing: '0.05em' }}>
                      &ldquo;{data?.prophecy || 'What you have been building in private is almost ready.'}&rdquo;
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'abilities' && (
                <div className="flex flex-col gap-4">
                  <div className="card-arcane p-6 border border-[var(--border)] mb-2">
                    <p className="font-mono text-[var(--silver-dim)] text-xs tracking-ritual mb-3">PRIMARY ABILITY</p>
                    <p className="font-garamond text-[var(--text)] text-lg italic leading-relaxed">
                      {data?.primaryAbility || archetype.abilities[0]?.description}
                    </p>
                  </div>
                  {archetype.abilities.map((ability) => (
                    <div key={ability.name} className="card-arcane p-5 border border-[var(--border)] flex gap-4">
                      <div className="shrink-0">
                        <span className="font-mono text-xs tracking-ritual px-2 py-1 border"
                          style={{
                            borderColor: ability.tier === 'mastered' ? 'rgba(201,169,110,0.4)' : ability.tier === 'awakened' ? 'rgba(200,207,224,0.2)' : 'rgba(200,207,224,0.1)',
                            color: ability.tier === 'mastered' ? 'var(--gold)' : ability.tier === 'awakened' ? 'var(--silver)' : 'var(--silver-dim)',
                          }}>
                          {ability.tier.toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-cinzel text-silver text-sm tracking-ritual mb-2" style={{ letterSpacing: '0.12em' }}>
                          {ability.name}
                        </h3>
                        <p className="font-garamond text-[var(--silver-dim)] text-base italic leading-relaxed">
                          {ability.description}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="card-arcane p-5 border border-[var(--border)]">
                    <p className="font-mono text-[var(--silver-dim)] text-xs tracking-ritual mb-3">RARE QUALITY</p>
                    <p className="font-garamond text-[var(--text)] text-base italic leading-relaxed">
                      {data?.rareQuality || archetype.rareEvolution.description}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'shadow' && (
                <div className="flex flex-col gap-6">
                  <div className="p-6 border border-[rgba(154,26,50,0.3)] glow-crimson"
                    style={{ background: 'rgba(10,5,8,0.9)' }}>
                    <p className="font-mono text-[var(--crimson-glow)] text-xs tracking-ritual mb-4">SHADOW ASPECT</p>
                    <p className="font-garamond text-[var(--text)] text-lg italic leading-relaxed">
                      {data?.shadowAspect || archetype.weaknesses[0]}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <p className="font-mono text-[var(--silver-dim)] text-xs tracking-ritual">KNOWN WEAKNESSES</p>
                    {archetype.weaknesses.map((w, i) => (
                      <div key={i} className="card-arcane p-4 border border-[var(--border)] flex gap-3">
                        <span className="text-[var(--crimson-glow)] mt-0.5">✦</span>
                        <p className="font-garamond text-[var(--silver-dim)] text-base italic">{w}</p>
                      </div>
                    ))}
                  </div>
                  <div className="card-arcane p-6 border border-[var(--border)]">
                    <p className="font-mono text-[var(--silver-dim)] text-xs tracking-ritual mb-4">THE DEEP LORE</p>
                    <p className="font-garamond text-[var(--text)] text-base italic leading-relaxed">
                      {archetype.loreDeep}
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'path' && (
                <div className="flex flex-col gap-5">
                  <div className="card-arcane p-6 border border-[var(--border)] mb-2">
                    <p className="font-mono text-[var(--silver-dim)] text-xs tracking-ritual mb-4">YOUR FIRST RITUAL</p>
                    <p className="font-garamond text-[var(--text)] text-base italic leading-relaxed">
                      {data?.firstRitual || 'Begin with twenty minutes of complete silence before any engagement tomorrow. Notice what arrives when you stop performing yourself.'}
                    </p>
                    <Link href="/rituals"
                      className="inline-block mt-5 font-cinzel text-xs tracking-ritual text-gold hover:text-gold-bright transition-colors border-b border-[var(--border-gold)]"
                      style={{ letterSpacing: '0.12em' }}>
                      SEE ALL RITUALS →
                    </Link>
                  </div>

                  {archetype.progressionPath.map((stage) => (
                    <div key={stage.level}
                      className={`card-arcane p-5 border transition-all ${profile.level >= stage.level ? 'border-[var(--border-gold)]' : 'border-[var(--border)] opacity-40'}`}>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-xs text-[var(--gold-dim)]">LEVEL {stage.level}</span>
                        {profile.level >= stage.level && (
                          <span className="font-mono text-xs text-gold tracking-ritual">UNLOCKED</span>
                        )}
                      </div>
                      <h3 className="font-cinzel text-silver text-sm tracking-ritual mb-2" style={{ letterSpacing: '0.12em' }}>
                        {stage.title}
                      </h3>
                      <p className="font-garamond text-[var(--silver-dim)] text-base italic">{stage.description}</p>
                    </div>
                  ))}

                  <div className="card-arcane p-6 border border-[var(--border)]">
                    <p className="font-mono text-[var(--silver-dim)] text-xs tracking-ritual mb-3">RARE EVOLUTION</p>
                    <h3 className="font-cinzel text-gold text-base tracking-ritual mb-2" style={{ letterSpacing: '0.12em' }}>
                      {archetype.rareEvolution.name}
                    </h3>
                    <p className="font-garamond text-[var(--silver-dim)] text-base italic leading-relaxed">
                      {archetype.rareEvolution.description}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* AI Reading Section */}
          {profile.is_premium && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="mt-12">
              <div className="divider-arcane mb-8" />
              <p className="font-mono text-[var(--silver-dim)] text-xs tracking-arcane uppercase mb-4">
                AI Energy Reading
              </p>
              <AIReadingPanel archetypeKey={profile.archetype_key || ''} />
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function AIReadingPanel({ archetypeKey }: { archetypeKey: string }) {
  const [reading, setReading] = useState('')
  const [loading, setLoading] = useState(false)
  const [type, setType] = useState<'energy' | 'shadow' | 'path'>('energy')

  async function generateReading() {
    setLoading(true)
    setReading('')
    try {
      const res = await fetch('/api/reading', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ readingType: type }),
      })
      const data = await res.json()
      setReading(data.reading || '')
    } catch { setReading('The archive is silent at this moment.') }
    finally { setLoading(false) }
  }

  return (
    <div className="card-gold border border-[var(--border-gold)] p-6">
      <div className="flex gap-3 mb-6 flex-wrap">
        {[
          { key: 'energy', label: 'Energy Report' },
          { key: 'shadow', label: 'Shadow Analysis' },
          { key: 'path', label: 'Path Reading' },
        ].map(({ key, label }) => (
          <button key={key} onClick={() => setType(key as never)}
            className="font-cinzel text-xs tracking-ritual px-4 py-2 border transition-all"
            style={{
              letterSpacing: '0.12em',
              borderColor: type === key ? 'rgba(201,169,110,0.6)' : 'rgba(200,207,224,0.1)',
              color: type === key ? 'var(--gold)' : 'var(--silver-dim)',
            }}>
            {label}
          </button>
        ))}
      </div>

      {reading && (
        <div className="mb-6">
          <p className="font-garamond text-[var(--text)] text-base italic leading-relaxed">{reading}</p>
        </div>
      )}

      <button onClick={generateReading} disabled={loading}
        className="font-cinzel text-xs tracking-arcane px-6 py-3 border border-[var(--border-gold)] text-gold hover:bg-[rgba(201,169,110,0.08)] transition-all disabled:opacity-40"
        style={{ letterSpacing: '0.2em' }}>
        {loading ? 'THE ARCHIVE SPEAKS...' : 'GENERATE READING'}
      </button>
    </div>
  )
}

export default function PortalPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <div className="font-cinzel text-[var(--silver-dim)] text-sm tracking-ritual animate-pulse-glow">
          The archive opens...
        </div>
      </div>
    }>
      <PortalContent />
    </Suspense>
  )
}
