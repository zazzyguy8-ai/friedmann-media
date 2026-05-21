'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { createBrowserClientInstance as createBrowserClient } from '@/lib/supabase-browser'

export default function SignupPage() {
  const router = useRouter()
  const supabase = createBrowserClient()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !email || !password) return
    setLoading(true)
    setError('')

    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { name } },
      })
      if (signUpError) throw signUpError

      if (signUpData.user) {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
        if (signInError) throw signInError

        await supabase.from('profiles').upsert({
          id: signUpData.user.id,
          name,
          xp: 0,
          level: 1,
          streak: 0,
          is_premium: false,
        })
        router.push('/initiation')
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'The archive is not yet ready for you.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 30%, rgba(40,20,5,0.5) 0%, transparent 70%)' }}
      />
      <div className="fixed top-0 left-0 right-0 flex items-center justify-between px-6 py-5 z-10">
        <Link href="/" className="font-cinzel-decorative text-gold text-sm tracking-arcane glow-text-gold">ARCANUM</Link>
        <Link href="/login" className="font-cinzel text-[var(--silver-dim)] text-xs tracking-ritual hover:text-silver transition-colors">
          Already initiated?
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className="relative z-10 w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <div className="font-cinzel-decorative text-gold text-4xl glow-text-gold mb-4 animate-pulse-glow">◈</div>
          <h1 className="font-cinzel text-silver text-xl tracking-ritual mb-2" style={{ letterSpacing: '0.15em' }}>
            Begin Initiation
          </h1>
          <p className="font-garamond text-[var(--silver-dim)] text-base italic">
            The archive requires only your name and a key.
          </p>
        </div>

        <div className="divider-arcane mb-8" />

        <form onSubmit={handleSignup} className="flex flex-col gap-5">
          {[
            { label: 'YOUR NAME', value: name, set: setName, type: 'text', placeholder: 'What do you call yourself?', auto: 'name' },
            { label: 'EMAIL ADDRESS', value: email, set: setEmail, type: 'email', placeholder: 'Your private address', auto: 'email' },
            { label: 'PASSKEY', value: password, set: setPassword, type: 'password', placeholder: 'Minimum 8 characters', auto: 'new-password' },
          ].map(({ label, value, set, type, placeholder, auto }) => (
            <div key={label}>
              <label className="font-mono text-[var(--silver-dim)] text-xs tracking-ritual block mb-2">{label}</label>
              <input
                type={type}
                value={value}
                onChange={(e) => set(e.target.value)}
                placeholder={placeholder}
                className="input-arcane w-full px-4 py-3 text-base"
                required
                autoComplete={auto}
                minLength={type === 'password' ? 8 : undefined}
              />
            </div>
          ))}

          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="font-garamond text-[var(--crimson-glow)] text-sm italic text-center">
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="font-cinzel text-xs tracking-arcane px-8 py-4 border border-[var(--border-gold)] text-gold hover:bg-[rgba(201,169,110,0.08)] transition-all glow-gold disabled:opacity-40 disabled:cursor-not-allowed mt-2"
            style={{ letterSpacing: '0.22em' }}
          >
            {loading ? 'THE ARCHIVE READS YOU...' : 'OPEN THE GATE'}
          </button>
        </form>

        <div className="divider-arcane mt-8 mb-6" />
        <p className="font-garamond text-[var(--silver-dim)] text-sm italic text-center leading-relaxed">
          This is a private system of personal reflection and symbolic psychology.
          Your readings are encrypted and never shared.
        </p>
      </motion.div>
    </div>
  )
}
