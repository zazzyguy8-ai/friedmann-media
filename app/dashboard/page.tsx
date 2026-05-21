'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardRedirect() {
  const router = useRouter()
  useEffect(() => { router.replace('/portal') }, [router])
  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center">
      <p className="font-cinzel text-[var(--silver-dim)] text-sm tracking-ritual animate-pulse-glow">
        Redirecting to the archive...
      </p>
    </div>
  )
}
