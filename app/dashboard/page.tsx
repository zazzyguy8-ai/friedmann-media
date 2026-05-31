'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createBrowserClient } from '@/lib/supabase'
import type { Profile, VideoStyle, VideoFormat } from '@/types'
import { STYLE_LABELS, STYLE_DESCRIPTIONS, FORMAT_LABELS, FORMAT_DESCRIPTIONS } from '@/types'

const STYLES: VideoStyle[] = ['streetwear', 'luxury', 'y2k', 'minimalist']
const FORMATS: VideoFormat[] = ['hook_ad', 'lifestyle_clip', 'product_showcase']

export default function DashboardPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [showDropdown, setShowDropdown] = useState(false)

  // Upload state
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Style/format selection
  const [selectedStyle, setSelectedStyle] = useState<VideoStyle>('streetwear')
  const [selectedFormat, setSelectedFormat] = useState<VideoFormat>('hook_ad')

  // Generation state
  const [generating, setGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [genError, setGenError] = useState('')

  const loadProfile = useCallback(async () => {
    const supabase = createBrowserClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      router.push('/login')
      return
    }

    let { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (!profileData) {
      // Create profile if it doesn't exist (fallback if DB trigger failed)
      await fetch('/api/profile', { method: 'POST' })
      const { data: newProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
      profileData = newProfile
    }

    if (!profileData) {
      router.push('/login')
      return
    }

    setProfile(profileData)
    setLoading(false)
  }, [router])

  useEffect(() => {
    loadProfile()
  }, [loadProfile])

  // Progress bar simulation during generation
  useEffect(() => {
    if (!generating) {
      setProgress(0)
      return
    }
    setProgress(0)
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 92) {
          clearInterval(interval)
          return 92
        }
        return p + 1
      })
    }, 650)
    return () => clearInterval(interval)
  }, [generating])

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleGenerate = async () => {
    if (!imageFile) return
    if ((profile?.credits ?? 0) < 1) {
      setGenError('Not enough credits. Please upgrade your plan.')
      return
    }

    setGenError('')
    setGenerating(true)

    try {
      // Upload image first
      const supabase = createBrowserClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const ext = imageFile.name.split('.').pop()
      const filename = `${user.id}/${Date.now()}.${ext}`
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filename, imageFile)

      if (uploadError) throw new Error('Failed to upload image')

      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(uploadData.path)

      // Call generate API
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productImageUrl: publicUrl,
          style: selectedStyle,
          format: selectedFormat,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Generation failed')
      }

      router.push(`/results/${data.generationId}`)
    } catch (err) {
      setGenError(err instanceof Error ? err.message : 'Something went wrong')
      setGenerating(false)
    }
  }

  const handleLogout = async () => {
    const supabase = createBrowserClient()
    await supabase.auth.signOut()
    router.push('/')
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
          <Link href="/history" className="text-[#888888] hover:text-white transition-colors text-sm">
            History
          </Link>
          <Link href="/pricing" className="text-[#888888] hover:text-white transition-colors text-sm">
            Upgrade
          </Link>
          <div className="flex items-center gap-2 bg-[#111111] border border-[#222222] px-3 py-1.5">
            <span className="text-[#FF3B00] font-bold text-sm">{profile?.credits ?? 0}</span>
            <span className="text-[#888888] text-xs">credits</span>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-9 h-9 bg-[#111111] border border-[#222222] flex items-center justify-center text-xs font-bold hover:border-[#FF3B00] transition-colors"
            >
              {(profile?.email?.[0] || '?').toUpperCase()}
            </button>
            {showDropdown && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowDropdown(false)}
                />
                <div className="absolute right-0 top-11 w-52 bg-[#111111] border border-[#222222] z-50">
                  <div className="px-4 py-3 border-b border-[#222222]">
                    <p className="text-xs text-[#888888] truncate">{profile?.email}</p>
                    <p className="text-xs text-[#FF3B00] font-bold uppercase mt-0.5">{profile?.plan}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-left text-sm text-[#888888] hover:text-white hover:bg-[#1a1a1a] transition-colors"
                  >
                    Log out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-8 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-black mb-2">Create Video Ad</h1>
          <p className="text-[#888888]">1 credit per generation. You get 3 video variants.</p>
        </div>

        {/* Upload zone */}
        <div className="mb-8">
          <label className="block text-xs font-bold tracking-widest uppercase text-[#888888] mb-3">
            Product Photo
          </label>
          {!imagePreview ? (
            <div
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
              onDragLeave={() => setIsDragging(false)}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed cursor-pointer flex flex-col items-center justify-center py-20 transition-colors ${
                isDragging
                  ? 'border-[#FF3B00] bg-[#FF3B00]/5'
                  : 'border-[#222222] hover:border-[#444444]'
              }`}
            >
              <div className="text-4xl mb-4">↑</div>
              <p className="text-white font-bold mb-1">Drop your product photo here</p>
              <p className="text-[#888888] text-sm">or click to browse — JPG, PNG, WEBP</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          ) : (
            <div className="relative border border-[#222222] group">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={imagePreview}
                  alt="Product"
                  fill
                  className="object-cover"
                />
              </div>
              <button
                onClick={() => { setImageFile(null); setImagePreview(null) }}
                className="absolute top-3 right-3 bg-[#0A0A0A] border border-[#222222] text-white text-xs px-3 py-1.5 hover:border-[#FF3B00] transition-colors"
              >
                Change
              </button>
            </div>
          )}
        </div>

        {/* Style selector */}
        <div className="mb-8">
          <label className="block text-xs font-bold tracking-widest uppercase text-[#888888] mb-3">
            Style
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-[#222222]">
            {STYLES.map((style) => (
              <button
                key={style}
                onClick={() => setSelectedStyle(style)}
                className={`p-5 text-left transition-colors border-r last:border-r-0 border-[#222222] ${
                  selectedStyle === style
                    ? 'bg-[#FF3B00]/10 border-b-2 border-b-[#FF3B00]'
                    : 'hover:bg-[#111111]'
                }`}
              >
                <p className={`font-bold text-sm mb-1 ${selectedStyle === style ? 'text-[#FF3B00]' : 'text-white'}`}>
                  {STYLE_LABELS[style]}
                </p>
                <p className="text-[#888888] text-xs">{STYLE_DESCRIPTIONS[style]}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Format selector */}
        <div className="mb-10">
          <label className="block text-xs font-bold tracking-widest uppercase text-[#888888] mb-3">
            Format
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#222222]">
            {FORMATS.map((format) => (
              <button
                key={format}
                onClick={() => setSelectedFormat(format)}
                className={`p-5 text-left transition-colors border-b md:border-b-0 md:border-r last:border-0 border-[#222222] ${
                  selectedFormat === format
                    ? 'bg-[#FF3B00]/10 border-l-2 border-l-[#FF3B00]'
                    : 'hover:bg-[#111111]'
                }`}
              >
                <p className={`font-bold text-sm mb-1 ${selectedFormat === format ? 'text-[#FF3B00]' : 'text-white'}`}>
                  {FORMAT_LABELS[format]}
                </p>
                <p className="text-[#888888] text-xs">{FORMAT_DESCRIPTIONS[format]}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {genError && (
          <div className="mb-6 px-4 py-3 border border-[#FF3B00]/30 bg-[#FF3B00]/10 text-[#FF3B00] text-sm">
            {genError}
          </div>
        )}

        {/* Generate button */}
        {!generating ? (
          <button
            onClick={handleGenerate}
            disabled={!imageFile || (profile?.credits ?? 0) < 1}
            className="w-full bg-[#FF3B00] text-white font-black text-lg py-5 hover:bg-[#e63500] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Generate Video Ad — 1 Credit
          </button>
        ) : (
          <div className="border border-[#222222] bg-[#111111] p-8">
            <div className="flex items-center justify-between mb-4">
              <p className="font-bold">Generating your ad...</p>
              <span className="text-[#888888] text-sm">{progress}%</span>
            </div>
            <div className="w-full bg-[#222222] h-1.5">
              <div
                className="h-full bg-[#FF3B00] transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-[#888888] text-sm mt-4">This takes about 60 seconds. Don&apos;t close the tab.</p>
          </div>
        )}

        {(profile?.credits ?? 0) < 1 && !generating && (
          <p className="text-center text-[#888888] text-sm mt-4">
            Out of credits.{' '}
            <Link href="/pricing" className="text-[#FF3B00] hover:underline">
              Upgrade your plan →
            </Link>
          </p>
        )}
      </main>
    </div>
  )
}
