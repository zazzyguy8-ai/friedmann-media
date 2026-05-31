'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createBrowserClient } from '@/lib/supabase'
import type { Generation, VideoStyle, VideoFormat } from '@/types'
import { STYLE_LABELS, FORMAT_LABELS } from '@/types'

const ALL_STYLES: VideoStyle[] = ['streetwear', 'luxury', 'y2k', 'minimalist']
const ALL_FORMATS: VideoFormat[] = ['hook_ad', 'lifestyle_clip', 'product_showcase']

export default function HistoryPage() {
  const router = useRouter()
  const [generations, setGenerations] = useState<Generation[]>([])
  const [loading, setLoading] = useState(true)
  const [credits, setCredits] = useState(0)
  const [filterStyle, setFilterStyle] = useState<VideoStyle | 'all'>('all')
  const [filterFormat, setFilterFormat] = useState<VideoFormat | 'all'>('all')
  const [downloadingId, setDownloadingId] = useState<string | null>(null)

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

    const { data } = await supabase
      .from('generations')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    setGenerations(data || [])
    setLoading(false)
  }, [router])

  useEffect(() => {
    loadData()
  }, [loadData])

  const filtered = generations.filter((g) => {
    if (filterStyle !== 'all' && g.style !== filterStyle) return false
    if (filterFormat !== 'all' && g.format !== filterFormat) return false
    return true
  })

  const handleDownload = async (url: string, genId: string, idx: number) => {
    setDownloadingId(`${genId}-${idx}`)
    try {
      const res = await fetch(url)
      const blob = await res.blob()
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = `drip-studio-${genId.slice(0, 8)}-${idx + 1}.mp4`
      a.click()
    } catch {
      window.open(url, '_blank')
    } finally {
      setDownloadingId(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#222222] border-t-[#FF3B00] rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-[#222222]">
        <span className="font-black text-xl tracking-tight">DRIP STUDIO</span>
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="text-[#888888] hover:text-white transition-colors text-sm">
            New Ad
          </Link>
          <div className="flex items-center gap-2 bg-[#111111] border border-[#222222] px-3 py-1.5">
            <span className="text-[#FF3B00] font-bold text-sm">{credits}</span>
            <span className="text-[#888888] text-xs">credits</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-8 py-12">
        <div className="flex items-start justify-between mb-10">
          <div>
            <h1 className="text-4xl font-black mb-2">History</h1>
            <p className="text-[#888888]">{generations.length} generation{generations.length !== 1 ? 's' : ''} total</p>
          </div>
          <Link
            href="/dashboard"
            className="bg-[#FF3B00] text-white font-bold px-6 py-3 hover:bg-[#e63500] transition-colors text-sm"
          >
            + New Ad
          </Link>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-8 flex-wrap">
          <div className="flex items-center gap-0 border border-[#222222]">
            <button
              onClick={() => setFilterStyle('all')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors border-r border-[#222222] ${
                filterStyle === 'all' ? 'bg-[#FF3B00] text-white' : 'text-[#888888] hover:text-white'
              }`}
            >
              All styles
            </button>
            {ALL_STYLES.map((s) => (
              <button
                key={s}
                onClick={() => setFilterStyle(s)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors border-r last:border-r-0 border-[#222222] ${
                  filterStyle === s ? 'bg-[#FF3B00] text-white' : 'text-[#888888] hover:text-white'
                }`}
              >
                {STYLE_LABELS[s]}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-0 border border-[#222222]">
            <button
              onClick={() => setFilterFormat('all')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors border-r border-[#222222] ${
                filterFormat === 'all' ? 'bg-[#FF3B00] text-white' : 'text-[#888888] hover:text-white'
              }`}
            >
              All formats
            </button>
            {ALL_FORMATS.map((f) => (
              <button
                key={f}
                onClick={() => setFilterFormat(f)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors border-r last:border-r-0 border-[#222222] ${
                  filterFormat === f ? 'bg-[#FF3B00] text-white' : 'text-[#888888] hover:text-white'
                }`}
              >
                {FORMAT_LABELS[f]}
              </button>
            ))}
          </div>
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="border border-[#222222] bg-[#111111] p-16 text-center">
            <p className="text-[#888888] mb-4">No generations found.</p>
            <Link
              href="/dashboard"
              className="inline-block bg-[#FF3B00] text-white font-bold px-6 py-3 hover:bg-[#e63500] transition-colors"
            >
              Create your first ad →
            </Link>
          </div>
        )}

        {/* Grid */}
        <div className="space-y-6">
          {filtered.map((gen) => (
            <div key={gen.id} className="border border-[#222222] bg-[#111111]">
              {/* Generation header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#222222]">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#888888]">
                    {new Date(gen.created_at).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric'
                    })}
                  </span>
                  <span className="text-xs bg-[#222222] px-2 py-0.5 font-bold uppercase tracking-wider">
                    {STYLE_LABELS[gen.style]}
                  </span>
                  <span className="text-xs bg-[#222222] px-2 py-0.5 font-bold uppercase tracking-wider">
                    {FORMAT_LABELS[gen.format]}
                  </span>
                </div>
                <div className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 ${
                  gen.status === 'completed' ? 'text-green-400 bg-green-500/10' :
                  gen.status === 'failed' ? 'text-red-400 bg-red-500/10' :
                  'text-[#FF3B00] bg-[#FF3B00]/10'
                }`}>
                  {gen.status}
                </div>
              </div>

              {/* Videos */}
              {gen.status === 'completed' && gen.video_urls?.length > 0 ? (
                <div className="grid grid-cols-3 divide-x divide-[#222222]">
                  {gen.video_urls.map((url, i) => (
                    <div key={i} className="p-4">
                      <div className="aspect-[9/16] bg-[#0A0A0A] mb-3 relative overflow-hidden">
                        <video
                          src={url}
                          className="w-full h-full object-cover"
                          playsInline
                          preload="metadata"
                        />
                      </div>
                      <button
                        onClick={() => handleDownload(url, gen.id, i)}
                        disabled={downloadingId === `${gen.id}-${i}`}
                        className="w-full border border-[#222222] text-[#888888] text-xs font-bold py-2 hover:border-[#FF3B00] hover:text-[#FF3B00] transition-colors disabled:opacity-50"
                      >
                        {downloadingId === `${gen.id}-${i}` ? '...' : '↓ Download'}
                      </button>
                    </div>
                  ))}
                </div>
              ) : gen.status === 'processing' || gen.status === 'pending' ? (
                <div className="px-6 py-8 flex items-center gap-3">
                  <div className="w-4 h-4 border-2 border-[#222222] border-t-[#FF3B00] rounded-full animate-spin" />
                  <span className="text-[#888888] text-sm">Processing...</span>
                  <Link href={`/results/${gen.id}`} className="ml-auto text-[#FF3B00] text-sm hover:underline">
                    View →
                  </Link>
                </div>
              ) : (
                <div className="px-6 py-8">
                  <span className="text-red-400 text-sm">Generation failed</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
