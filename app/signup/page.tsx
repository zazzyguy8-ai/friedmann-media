'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@/lib/supabase'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    const supabase = createBrowserClient()

    const { data, error: signUpError } = await supabase.auth.signUp({ email, password })

    if (signUpError) {
      if (signUpError.message.includes('already registered')) {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
        if (!signInError) {
          router.push('/dashboard')
          return
        }
      }
      setError(signUpError.message)
      setLoading(false)
      return
    }

    if (data.user) {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
      if (!signInError) {
        router.push('/dashboard')
        return
      }
    }

    setError('Account created. Please check your email to confirm.')
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-10">
          <Link href="/" className="font-black text-xl text-white tracking-tight">
            DRIP STUDIO
          </Link>
          <h1 className="text-3xl font-black mt-6 mb-2">Create account</h1>
          <p className="text-[#888888]">5 free credits to start. No card required.</p>
        </div>

        <div className="border border-[#222222] bg-[#111111] p-8">
          {error && (
            <div className="mb-6 px-4 py-3 border border-[#FF3B00]/30 bg-[#FF3B00]/10 text-[#FF3B00] text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="flex flex-col gap-5">
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-[#888888] mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@brand.com"
                className="w-full bg-[#0A0A0A] border border-[#222222] text-white px-4 py-3 text-sm focus:outline-none focus:border-[#FF3B00] transition-colors placeholder-[#444444]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-[#888888] mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="At least 8 characters"
                className="w-full bg-[#0A0A0A] border border-[#222222] text-white px-4 py-3 text-sm focus:outline-none focus:border-[#FF3B00] transition-colors placeholder-[#444444]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold tracking-widest uppercase text-[#888888] mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Repeat password"
                className="w-full bg-[#0A0A0A] border border-[#222222] text-white px-4 py-3 text-sm focus:outline-none focus:border-[#FF3B00] transition-colors placeholder-[#444444]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF3B00] text-white font-bold py-4 hover:bg-[#e63500] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Creating account...' : 'Create account →'}
            </button>
          </form>

          <p className="text-center text-sm text-[#888888] mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-white hover:text-[#FF3B00] transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
