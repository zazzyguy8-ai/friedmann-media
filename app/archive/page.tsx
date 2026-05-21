'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { createBrowserClientInstance as createBrowserClient } from '@/lib/supabase-browser'
import { LORE_ENTRIES } from '@/lib/lore'
import { LoreEntry } from '@/types'

const CATEGORIES = [
  { key: 'all', label: 'All Texts' },
  { key: 'elemental', label: 'Elemental Theory' },
  { key: 'philosophy', label: 'Philosophy' },
  { key: 'order', label: 'The Orders' },
  { key: 'ritual-theory', label: 'Ritual Theory' },
  { key: 'manuscript', label: 'Manuscripts' },
]

function LoreCard({ entry, isPremiumUser, onSelect }: { entry: LoreEntry; isPremiumUser: boolean; onSelect: (e: LoreEntry) => void }) {
  const isAccessible = !entry.isPremium || isPremiumUser

  return (
    <motion.button
      whileHover={{ y: -2 }}
      onClick={() => isAccessible && onSelect(entry)}
      className={`text-left p-6 border transition-all w-full flex gap-4 ${isAccessible ? 'hover:border-[rgba(201,169,110,0.3)]' : 'cursor-default opacity-50'}`}
      style={{ background: 'rgba(10,10,18,0.8)', borderColor: 'rgba(200,207,224,0.07)' }}
    >
      <span className="text-2xl shrink-0 mt-0.5" style={{ color: 'var(--gold-dim)' }}>{entry.symbol}</span>
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-cinzel text-silver text-sm leading-snug" style={{ letterSpacing: '0.06em' }}>
            {entry.title}
          </h3>
          {entry.isPremium && (
            <span className="font-mono text-[var(--gold-dim)] text-xs shrink-0 border border-[var(--border-gold)] px-2 py-0.5">
              SANCTUM
            </span>
          )}
        </div>
        <p className="font-garamond text-[var(--silver-dim)] text-sm italic">{entry.subtitle}</p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {entry.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="font-mono text-[var(--text-dim)] text-xs border border-[var(--border)] px-1.5 py-0.5">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.button>
  )
}

function LoreReader({ entry, onClose }: { entry: LoreEntry; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
      style={{ background: 'rgba(5,5,7,0.95)', backdropFilter: 'blur(20px)' }}
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 30, opacity: 0 }}
        className="w-full max-w-2xl max-h-[85vh] overflow-y-auto border border-[var(--border)] p-8"
        style={{ background: 'rgba(10,10,18,0.99)' }}
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <span className="text-3xl block mb-2" style={{ color: 'var(--gold-dim)' }}>{entry.symbol}</span>
            <p className="font-mono text-[var(--silver-dim)] text-xs tracking-ritual uppercase mb-2">
              {entry.category.replace('-', ' ')}
            </p>
            <h2 className="font-cinzel text-silver text-xl" style={{ letterSpacing: '0.06em' }}>{entry.title}</h2>
            <p className="font-garamond text-[var(--silver-dim)] text-sm italic mt-1">{entry.subtitle}</p>
          </div>
          <button onClick={onClose} className="font-mono text-[var(--text-dim)] text-lg hover:text-silver transition-colors shrink-0">
            ×
          </button>
        </div>

        <div className="divider-arcane mb-6" />

        <div className="font-garamond text-[var(--text)] text-lg italic leading-relaxed whitespace-pre-wrap">
          {entry.content}
        </div>

        <div className="divider-arcane mt-8 mb-4" />
        <div className="flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <span key={tag} className="font-mono text-[var(--text-dim)] text-xs border border-[var(--border)] px-2 py-0.5">
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function ArchivePage() {
  const router = useRouter()
  const supabase = createBrowserClient()
  const [isPremium, setIsPremium] = useState(false)
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('all')
  const [selected, setSelected] = useState<LoreEntry | null>(null)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }
      const { data } = await supabase.from('profiles').select('is_premium').eq('id', user.id).single()
      setIsPremium(data?.is_premium || false)
      setLoading(false)
    }
    load()
  }, [])

  const filtered = LORE_ENTRIES.filter((e) => category === 'all' || e.category === category)

  if (loading) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center">
        <p className="font-cinzel text-[var(--silver-dim)] text-sm tracking-ritual animate-pulse-glow">
          The archive opens...
        </p>
      </div>
    )
  }

  return (
    <>
      <AnimatePresence>
        {selected && (
          <LoreReader entry={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-obsidian">
        <div className="fixed inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 40% 30% at 60% 0%, rgba(10,10,30,0.4) 0%, transparent 60%)' }}
        />

        {/* Nav */}
        <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4 border-b border-[var(--border)]"
          style={{ background: 'rgba(5,5,7,0.85)', backdropFilter: 'blur(20px)' }}>
          <Link href="/portal" className="font-cinzel-decorative text-gold text-sm tracking-arcane glow-text-gold">ARCANUM</Link>
          <div className="flex items-center gap-6">
            <Link href="/portal" className="font-cinzel text-[var(--silver-dim)] text-xs tracking-ritual hover:text-silver transition-colors">Portal</Link>
            <Link href="/rituals" className="font-cinzel text-[var(--silver-dim)] text-xs tracking-ritual hover:text-silver transition-colors">Rituals</Link>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-6 pt-24 pb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="mb-12">
            <p className="font-mono text-[var(--silver-dim)] text-xs tracking-arcane uppercase mb-2">
              The Forbidden Archive
            </p>
            <h1 className="font-cinzel font-bold text-3xl text-silver mb-4" style={{ letterSpacing: '0.06em' }}>
              The Lore Archive
            </h1>
            <p className="font-garamond text-[var(--silver-dim)] text-xl italic leading-relaxed max-w-xl">
              Texts extracted from the seven original Orders. Some are accessible to all initiates.
              Others require Sanctum access.
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex gap-0 border-b border-[var(--border)] mb-8 overflow-x-auto">
            {CATEGORIES.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setCategory(key)}
                className="font-cinzel text-xs tracking-ritual px-4 py-3 border-b-2 transition-all whitespace-nowrap"
                style={{
                  letterSpacing: '0.12em',
                  borderColor: category === key ? 'rgba(201,169,110,0.7)' : 'transparent',
                  color: category === key ? 'var(--gold)' : 'var(--silver-dim)',
                }}>
                {label}
              </button>
            ))}
          </div>

          {!isPremium && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="mb-8 p-5 border border-[var(--border-gold)] card-gold flex items-center justify-between gap-4">
              <p className="font-garamond text-[var(--silver-dim)] text-base italic">
                Sanctum texts require premium access. Unlock the full archive.
              </p>
              <Link href="/portal"
                className="font-cinzel text-xs tracking-arcane px-5 py-2.5 border border-[var(--border-gold)] text-gold hover:bg-[rgba(201,169,110,0.08)] transition-all shrink-0"
                style={{ letterSpacing: '0.18em' }}>
                UNLOCK
              </Link>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border)]">
            {filtered.map((entry, i) => (
              <motion.div key={entry.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}>
                <LoreCard entry={entry} isPremiumUser={isPremium} onSelect={setSelected} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
