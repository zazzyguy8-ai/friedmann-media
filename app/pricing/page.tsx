'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@/lib/supabase'
import { PRICING_PLANS } from '@/types'

export default function PricingPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentPlan, setCurrentPlan] = useState<string>('free')
  const [loading, setLoading] = useState(true)
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createBrowserClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (user) {
        setIsLoggedIn(true)
        const { data: profile } = await supabase
          .from('profiles')
          .select('plan')
          .eq('id', user.id)
          .single()
        if (profile) setCurrentPlan(profile.plan)
      }

      setLoading(false)
    }
    checkAuth()
  }, [])

  const handleSubscribe = async (planId: string, stripePriceId: string) => {
    if (!isLoggedIn) {
      router.push('/signup')
      return
    }

    if (!stripePriceId) {
      alert('Stripe not configured. Set NEXT_PUBLIC_STRIPE_*_PRICE_ID environment variables.')
      return
    }

    setCheckoutLoading(planId)

    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: stripePriceId, planId }),
      })

      const data = await res.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        alert(data.error || 'Something went wrong')
      }
    } catch {
      alert('Failed to create checkout session')
    } finally {
      setCheckoutLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-[#222222]">
        <Link href="/" className="font-black text-xl tracking-tight text-white">
          DRIP STUDIO
        </Link>
        {isLoggedIn ? (
          <Link href="/dashboard" className="text-[#888888] hover:text-white transition-colors text-sm">
            Dashboard
          </Link>
        ) : (
          <Link href="/login" className="text-[#888888] hover:text-white transition-colors text-sm">
            Sign in
          </Link>
        )}
      </nav>

      <main className="max-w-5xl mx-auto px-8 py-16">
        <div className="text-center mb-16">
          <p className="text-[#888888] text-xs font-bold tracking-widest uppercase mb-4">Pricing</p>
          <h1 className="text-5xl font-black mb-4">Simple, transparent pricing.</h1>
          <p className="text-[#888888] text-lg">Start free. Scale when you&apos;re ready.</p>
        </div>

        {/* Free tier */}
        <div className="border border-[#222222] bg-[#111111] p-6 mb-4 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#888888] block mb-1">Free</span>
            <span className="text-white font-bold">5 credits on signup</span>
          </div>
          <div className="text-[#888888] text-sm">
            Try it. No card needed.
          </div>
          <div className="text-2xl font-black text-white">€0</div>
        </div>

        {/* Paid plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#222222]">
          {PRICING_PLANS.map((plan, i) => (
            <div
              key={plan.id}
              className={`p-8 relative ${i < PRICING_PLANS.length - 1 ? 'border-b md:border-b-0 md:border-r border-[#222222]' : ''} ${plan.popular ? 'bg-[#111111]' : ''}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FF3B00]" />
              )}
              {plan.popular && (
                <span className="text-[#FF3B00] text-xs font-bold tracking-widest uppercase mb-4 block">
                  Most popular
                </span>
              )}

              <div className="mb-6">
                <h3 className="text-white font-black text-xl mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black">€{plan.price}</span>
                  <span className="text-[#888888] text-sm">/month</span>
                </div>
                <p className="text-[#FF3B00] font-bold text-sm mt-1">{plan.credits} credits/month</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <span className="text-[#FF3B00] font-bold">✓</span>
                    <span className="text-[#888888]">{feature}</span>
                  </li>
                ))}
              </ul>

              {currentPlan === plan.id ? (
                <div className="w-full text-center py-3 border border-green-500/30 text-green-400 text-sm font-bold uppercase tracking-wider">
                  Current plan
                </div>
              ) : (
                <button
                  onClick={() => handleSubscribe(plan.id, plan.stripePriceId)}
                  disabled={!!checkoutLoading || loading}
                  className={`w-full font-bold py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                    plan.popular
                      ? 'bg-[#FF3B00] text-white hover:bg-[#e63500]'
                      : 'border border-[#222222] text-white hover:border-[#FF3B00] hover:text-[#FF3B00]'
                  }`}
                >
                  {checkoutLoading === plan.id ? 'Loading...' : 'Subscribe →'}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-16 pt-16 border-t border-[#222222]">
          <h2 className="text-2xl font-black mb-8">FAQ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                q: 'What is a credit?',
                a: 'One credit = one generation. Each generation produces 3 video variants with different edits.',
              },
              {
                q: 'Do unused credits roll over?',
                a: 'No. Credits reset each billing cycle.',
              },
              {
                q: 'What formats can I download?',
                a: 'All videos are delivered as MP4 files in 9:16 format, optimized for Instagram Reels and TikTok.',
              },
              {
                q: 'Can I cancel anytime?',
                a: 'Yes. Cancel anytime from your account settings. No questions asked.',
              },
            ].map((item) => (
              <div key={item.q}>
                <p className="font-bold mb-2">{item.q}</p>
                <p className="text-[#888888] text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
