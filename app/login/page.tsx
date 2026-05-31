'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createBrowserClient()
    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password })

    if (signInError) {
      setError('Invalid email or password.')
      setLoading(false)
      return
    }

    if (!data.user) {
      setError('Login failed. Please try again.')
      setLoading(false)
      return
    }

    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-10">
          <Link href="/" className="font-black text-xl text-white tracking-tight">
            DRIP STUDIO
          </Link>
          <h1 className="text-3xl font-black mt-6 mb-2">Sign in</h1>
          <p className="text-[#888888]">Welcome back.</p>
        </div>

        <div className="border border-[#222222] bg-[#111111] p-8">
          {error && (
            <div className="mb-6 px-4 py-3 border border-[#FF3B00]/30 bg-[#FF3B00]/10 text-[#FF3B00] text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
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
                placeholder="Your password"
                className="w-full bg-[#0A0A0A] border border-[#222222] text-white px-4 py-3 text-sm focus:outline-none focus:border-[#FF3B00] transition-colors placeholder-[#444444]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF3B00] text-white font-bold py-4 hover:bg-[#e63500] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Signing in...' : 'Sign in →'}
            </button>
          </form>

          <p className="text-center text-sm text-[#888888] mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-white hover:text-[#FF3B00] transition-colors">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
