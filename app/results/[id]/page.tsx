'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { createBrowserClient } from '@/lib/supabase'
import type { Generation } from '@/types'
import { STYLE_LABELS, FORMAT_LABELS } from '@/types'

export default function ResultsPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [generation, setGeneration] = useState<Generation | null>(null)
  const [loading, setLoading] = useState(true)
  const [polling, setPolling] = useState(false)
  const [credits, setCredits] = useState<number>(0)
  const [downloadingIdx, setDownloadingIdx] = useState<number | null>(null)

  const fetchGeneration = useCallback(async () => {
    const supabase = createBrowserClient()
    const { data } = await supabase
      .from('generations')
      .select('*')
      .eq('id', id)
      .single()

    return data as Generation | null
  }, [id])

  const loadData = useCallback(async () => {
    const supabase = createBrowserClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
      return
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('credits')
      .eq('id', user.id)
      .single()
    if (profile) setCredits(profile.credits)

    const gen = await fetchGeneration()
    if (!gen) {
      router.push('/dashboard')
      return
    }

    setGeneration(gen)
    setLoading(false)

    if (gen.status === 'pending' || gen.status === 'processing') {
      setPolling(true)
    }
  }, [router, fetchGeneration])

  useEffect(() => {
    loadData()
  }, [loadData])

  // Poll for completion
  useEffect(() => {
    if (!polling) return

    const interval = setInterval(async () => {
      const gen = await fetchGeneration()
      if (!gen) return

      setGeneration(gen)

      if (gen.status === 'completed' || gen.status === 'failed') {
        setPolling(false)
        clearInterval(interval)
        // Refresh credits
        const supabase = createBrowserClient()
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('credits')
            .eq('id', user.id)
            .single()
          if (profile) setCredits(profile.credits)
        }
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [polling, fetchGeneration])

  const handleDownload = async (url: string, index: number) => {
    setDownloadingIdx(index)
    try {
      const res = await fetch(url)
      const blob = await res.blob()
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = `drip-studio-ad-${index + 1}.mp4`
      a.click()
    } catch {
      window.open(url, '_blank')
    } finally {
      setDownloadingIdx(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#222222] border-t-[#FF3B00] rounded-full animate-spin" />
      </div>
    )
  }

  const isProcessing = generation?.status === 'pending' || generation?.status === 'processing'
  const isFailed = generation?.status === 'failed'
  const isCompleted = generation?.status === 'completed'

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-[#222222]">
        <span className="font-black text-xl tracking-tight">DRIP STUDIO</span>
        <div className="flex items-center gap-6">
          <Link href="/history" className="text-[#888888] hover:text-white transition-colors text-sm">
            History
          </Link>
          <div className="flex items-center gap-2 bg-[#111111] border border-[#222222] px-3 py-1.5">
            <span className="text-[#FF3B00] font-bold text-sm">{credits}</span>
            <span className="text-[#888888] text-xs">credits</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[#888888] text-sm mb-10">
          <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
          <span>/</span>
          <span className="text-white">Results</span>
        </div>

        {/* Generation info */}
        {generation && (
          <div className="flex items-center gap-4 mb-10">
            <div>
              <h1 className="text-3xl font-black mb-1">
                {isProcessing && 'Generating your ads...'}
                {isCompleted && 'Your video ads are ready.'}
                {isFailed && 'Generation failed.'}
              </h1>
              <div className="flex items-center gap-4 text-[#888888] text-sm">
                <span>Style: <span className="text-white">{STYLE_LABELS[generation.style]}</span></span>
                <span>Format: <span className="text-white">{FORMAT_LABELS[generation.format]}</span></span>
              </div>
            </div>
            <div className={`ml-auto px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${
              isCompleted ? 'bg-green-500/10 text-green-400 border border-green-500/30' :
              isFailed ? 'bg-red-500/10 text-red-400 border border-red-500/30' :
              'bg-[#FF3B00]/10 text-[#FF3B00] border border-[#FF3B00]/30'
            }`}>
              {generation.status}
            </div>
          </div>
        )}

        {/* Processing state */}
        {isProcessing && (
          <div className="border border-[#222222] bg-[#111111] p-12 flex flex-col items-center text-center mb-8">
            <div className="w-8 h-8 border-2 border-[#222222] border-t-[#FF3B00] rounded-full animate-spin mb-6" />
            <p className="text-white font-bold text-xl mb-2">Generating your video ads...</p>
            <p className="text-[#888888]">This takes about 60 seconds. We&apos;ll update automatically.</p>
          </div>
        )}

        {/* Failed state */}
        {isFailed && (
          <div className="border border-red-500/30 bg-red-500/10 p-8 mb-8">
            <p className="text-red-400 font-bold mb-2">Generation failed</p>
            <p className="text-[#888888] text-sm mb-4">Something went wrong during generation. Your credit has been refunded.</p>
            <Link
              href="/dashboard"
              className="inline-block bg-[#FF3B00] text-white font-bold px-6 py-3 hover:bg-[#e63500] transition-colors"
            >
              Try again →
            </Link>
          </div>
        )}

        {/* Videos grid */}
        {isCompleted && generation?.video_urls && generation.video_urls.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {generation.video_urls.map((url, i) => (
              <div key={i} className="border border-[#222222] bg-[#111111] overflow-hidden">
                <div className="relative aspect-[9/16] bg-[#0A0A0A]">
                  <video
                    src={url}
                    className="w-full h-full object-cover"
                    controls
                    playsInline
                    preload="metadata"
                  />
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <p className="text-[#888888] text-xs font-bold uppercase tracking-wider">Variant {i + 1}</p>
                  <button
                    onClick={() => handleDownload(url, i)}
                    disabled={downloadingIdx === i}
                    className="w-full border border-[#222222] text-white text-sm font-bold py-2.5 hover:border-[#FF3B00] hover:text-[#FF3B00] transition-colors disabled:opacity-50"
                  >
                    {downloadingIdx === i ? 'Downloading...' : '↓ Download MP4'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="bg-[#FF3B00] text-white font-bold px-8 py-4 hover:bg-[#e63500] transition-colors"
          >
            Generate more →
          </Link>
          <Link
            href="/history"
            className="border border-[#222222] text-[#888888] font-bold px-8 py-4 hover:border-[#444444] hover:text-white transition-colors"
          >
            View history
          </Link>
        </div>
      </main>
    </div>
  )
}
