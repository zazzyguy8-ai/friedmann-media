'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { createBrowserClientInstance as createBrowserClient } from '@/lib/supabase-browser'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createBrowserClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { data, error: loginError } = await supabase.auth.signInWithPassword({ email, password })
    if (loginError) {
      setError('The archive does not recognise this key.')
      setLoading(false)
      return
    }

    if (data.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('archetype_key')
        .eq('id', data.user.id)
        .single()

      router.push(profile?.archetype_key ? '/portal' : '/initiation')
    }
  }

  return (
    <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 30%, rgba(20,10,40,0.4) 0%, transparent 70%)' }}
      />
      <div className="fixed top-0 left-0 right-0 flex items-center justify-between px-6 py-5 z-10">
        <Link href="/" className="font-cinzel-decorative text-gold text-sm tracking-arcane glow-text-gold">ARCANUM</Link>
        <Link href="/signup" className="font-cinzel text-[var(--silver-dim)] text-xs tracking-ritual hover:text-silver transition-colors">
          Begin initiation
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="relative z-10 w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <div className="font-cinzel-decorative text-gold text-4xl glow-text-gold mb-4 animate-pulse-glow">☽</div>
          <h1 className="font-cinzel text-silver text-xl tracking-ritual mb-2" style={{ letterSpacing: '0.15em' }}>
            Return to the Archive
          </h1>
          <p className="font-garamond text-[var(--silver-dim)] text-base italic">
            The archive remembers you.
          </p>
        </div>

        <div className="divider-arcane mb-8" />

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="font-mono text-[var(--silver-dim)] text-xs tracking-ritual block mb-2">EMAIL ADDRESS</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your address"
              className="input-arcane w-full px-4 py-3 text-base"
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label className="font-mono text-[var(--silver-dim)] text-xs tracking-ritual block mb-2">PASSKEY</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your key"
              className="input-arcane w-full px-4 py-3 text-base"
              required
              autoComplete="current-password"
            />
          </div>

          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="font-garamond text-[var(--crimson-glow)] text-sm italic text-center">
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="font-cinzel text-xs tracking-arcane px-8 py-4 border border-[var(--border-gold)] text-gold hover:bg-[rgba(201,169,110,0.08)] transition-all glow-gold disabled:opacity-40 mt-2"
            style={{ letterSpacing: '0.22em' }}
          >
            {loading ? 'READING THE KEY...' : 'ENTER THE ARCHIVE'}
          </button>
        </form>

        <div className="divider-arcane mt-8 mb-6" />
        <p className="font-garamond text-[var(--text-dim)] text-sm italic text-center">
          No account?{' '}
          <Link href="/signup" className="text-[var(--silver-dim)] hover:text-silver underline transition-colors">
            Begin the initiation.
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
