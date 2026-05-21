'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function OnboardingRedirect() {
  const router = useRouter()
  useEffect(() => { router.replace('/initiation') }, [router])
  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center">
      <p className="font-cinzel text-[var(--silver-dim)] text-sm tracking-ritual animate-pulse-glow">
        The initiation awaits...
      </p>
    </div>
  )
}
