'use client'

import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { createBrowserClient } from '@/lib/supabase'
import type { BusinessProfile, Message, ContentIdea } from '@/types'

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = 'chat' | 'ideas' | 'strategy'

interface Strategy {
  overview: string
  pillars: { name: string; description: string }[]
  postingSchedule: { platform: string; frequency: string; bestTimes: string; formats: string[] }[]
  quickWins: string[]
  thirtyDayPlan: string
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getInitials(name: string | null): string {
  if (!name) return '?'
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Spinner() {
  return (
    <div className="w-5 h-5 border-2 border-[var(--border)] border-t-[var(--accent)] rounded-full animate-spin" />
  )
}

function PlouAvatar() {
  return (
    <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center font-display font-bold text-white text-sm shrink-0">
      P
    </div>
  )
}

function ChatMessage({ message }: { message: Message }) {
  const isPlou = message.role === 'assistant'
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isPlou ? '' : 'flex-row-reverse'}`}
    >
      {isPlou ? (
        <PlouAvatar />
      ) : (
        <div className="w-8 h-8 rounded-full bg-[var(--surface2)] border border-[var(--border)] flex items-center justify-center font-display text-xs text-[var(--muted)] shrink-0">
          You
        </div>
      )}
      <div
        className={`max-w-[75%] px-4 py-3 rounded-2xl font-display text-sm leading-relaxed whitespace-pre-wrap ${
          isPlou
            ? 'bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] rounded-tl-sm'
            : 'gradient-bg text-white rounded-tr-sm'
        }`}
      >
        {message.content}
      </div>
    </motion.div>
  )
}

function IdeaCard({ idea, index }: { idea: ContentIdea; index: number }) {
  const platformColors: Record<string, string> = {
    Instagram: 'rgba(131,58,180,0.15)',
    TikTok: 'rgba(255,255,255,0.07)',
    LinkedIn: 'rgba(0,119,181,0.15)',
    'Twitter / X': 'rgba(29,161,242,0.12)',
    Facebook: 'rgba(24,119,242,0.12)',
    YouTube: 'rgba(255,0,0,0.12)',
    Pinterest: 'rgba(230,0,35,0.12)',
  }
  const bg = platformColors[idea.platform] || 'rgba(91,139,255,0.1)'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className="p-5 rounded-2xl bg-[var(--surface)] border border-[var(--border)] flex flex-col gap-3 hover:border-[var(--accent)] transition-colors"
    >
      <div className="flex items-center justify-between">
        <span
          className="px-3 py-1 rounded-full text-xs font-mono font-medium text-[var(--text)]"
          style={{ background: bg }}
        >
          {idea.platform}
        </span>
        <span className="px-2 py-0.5 rounded-full bg-[var(--surface2)] border border-[var(--border)] font-mono text-xs text-[var(--muted)]">
          {idea.type}
        </span>
      </div>
      <div>
        <h3 className="font-display font-semibold text-[var(--text)] mb-1.5">{idea.title}</h3>
        <p className="font-mono text-xs text-[var(--accent)] italic mb-2">"{idea.hook}"</p>
        <p className="font-display text-sm text-[var(--muted)] leading-relaxed">{idea.description}</p>
      </div>
    </motion.div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<BusinessProfile | null>(null)
  const [ownerName, setOwnerName] = useState('')
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<Tab>('chat')
  const [showDropdown, setShowDropdown] = useState(false)

  // Chat state
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Ideas state
  const [ideas, setIdeas] = useState<ContentIdea[]>([])
  const [ideasLoading, setIdeasLoading] = useState(false)
  const [ideasGenerated, setIdeasGenerated] = useState(false)

  // Strategy state
  const [strategy, setStrategy] = useState<Strategy | null>(null)
  const [strategyLoading, setStrategyLoading] = useState(false)
  const [strategyGenerated, setStrategyGenerated] = useState(false)

  // ── Load data ─────────────────────────────────────────────────────────────

  const loadData = useCallback(async () => {
    const supabase = createBrowserClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) { router.push('/login'); return }

    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError || !profileData) { router.push('/onboarding'); return }
    if (!profileData.onboarding_completed) { router.push('/onboarding'); return }

    let businessProfile: BusinessProfile
    try {
      businessProfile = JSON.parse(profileData.goal || '') as BusinessProfile
    } catch {
      router.push('/onboarding')
      return
    }

    if (!businessProfile?.businessName) {
      router.push('/onboarding')
      return
    }

    setProfile(businessProfile)
    setOwnerName(profileData.name || '')
    setLoading(false)

    const firstName = (profileData.name || '').split(' ')[0] || 'there'
    const platformsPreview = businessProfile.platforms.slice(0, 2).join(' and ')
    const more = businessProfile.platforms.length > 2 ? ' and more' : ''

    const greeting = `Hey ${firstName}! I'm Plou — I've gone through everything you told me about ${businessProfile.businessName} and I'm ready to help you grow on ${platformsPreview}${more}.

Your audience is ${businessProfile.targetAudience} and your brand voice is ${businessProfile.brandVoice.join(', ')}. That gives me a lot to work with.

What do you want to tackle first? I can write captions, build a weekly content plan, come up with campaign ideas, or tell you exactly what to post this week.`

    setMessages([{ role: 'assistant', content: greeting }])
  }, [router])

  useEffect(() => {
    loadData()
  }, [loadData])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, sending])

  // ── Chat ──────────────────────────────────────────────────────────────────

  const sendMessage = async () => {
    if (!input.trim() || sending) return

    const userMessage: Message = { role: 'user', content: input.trim() }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setSending(true)

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }

    try {
      const res = await fetch('/api/plou', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      })
      const data = await res.json()
      if (data.content) {
        setMessages([...updatedMessages, { role: 'assistant', content: data.content }])
      }
    } catch {
      setMessages([...updatedMessages, {
        role: 'assistant',
        content: "Sorry, something went wrong on my end. Try sending that again.",
      }])
    } finally {
      setSending(false)
    }
  }

  // ── Ideas ─────────────────────────────────────────────────────────────────

  const generateIdeas = async () => {
    setIdeasLoading(true)
    try {
      const res = await fetch('/api/plou-ideas', { method: 'POST' })
      const data = await res.json()
      if (data.ideas) {
        setIdeas(data.ideas)
        setIdeasGenerated(true)
      }
    } catch {
      // silently fail - user can retry
    } finally {
      setIdeasLoading(false)
    }
  }

  // ── Strategy ──────────────────────────────────────────────────────────────

  const generateStrategy = async () => {
    setStrategyLoading(true)
    try {
      const res = await fetch('/api/plou-strategy', { method: 'POST' })
      const data = await res.json()
      if (data.strategy) {
        setStrategy(data.strategy)
        setStrategyGenerated(true)
      }
    } catch {
      // silently fail - user can retry
    } finally {
      setStrategyLoading(false)
    }
  }

  // ── Logout ────────────────────────────────────────────────────────────────

  const handleLogout = async () => {
    const supabase = createBrowserClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  // ── Loading screen ────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center font-display font-bold text-xl text-white shadow-lg shadow-[rgba(91,139,255,0.3)]">P</div>
          <p className="font-mono text-sm text-[var(--muted)]">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col">

      {/* ── Top nav ─────────────────────────────────────────────────────── */}
      <nav className="flex items-center justify-between px-5 py-3 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-sm sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <span className="font-display font-bold text-xl gradient-text">plou</span>
          {profile && (
            <span className="hidden sm:block font-mono text-xs text-[var(--muted)] border-l border-[var(--border)] pl-3">
              {profile.businessName}
            </span>
          )}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-[var(--surface)] border border-[var(--border)] p-1 rounded-xl">
          {(['chat', 'ideas', 'strategy'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`font-display text-sm px-3 py-1.5 rounded-lg transition-all duration-200 ${
                tab === t
                  ? 'gradient-bg text-white font-semibold shadow-sm'
                  : 'text-[var(--muted)] hover:text-[var(--text)]'
              }`}
            >
              {t === 'chat' ? '💬 Chat' : t === 'ideas' ? '💡 Ideas' : '📈 Strategy'}
            </button>
          ))}
        </div>

        {/* Avatar */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-9 h-9 rounded-full gradient-bg flex items-center justify-center font-display font-semibold text-white text-xs hover:opacity-90 transition-opacity"
          >
            {getInitials(ownerName)}
          </button>

          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.95 }}
                transition={{ duration: 0.14 }}
                className="absolute right-0 top-11 w-52 bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden shadow-xl z-50"
              >
                <div className="px-4 py-3 border-b border-[var(--border)]">
                  <p className="font-display font-semibold text-sm text-[var(--text)]">{ownerName}</p>
                  <p className="font-mono text-xs text-[var(--muted)] truncate">{profile?.businessName}</p>
                </div>
                <button
                  onClick={() => { setShowDropdown(false); router.push('/onboarding') }}
                  className="w-full px-4 py-3 text-left font-display text-sm text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface2)] transition-colors"
                >
                  Update business profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 text-left font-display text-sm text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface2)] transition-colors"
                >
                  Log out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <main className="flex-1 overflow-hidden">

        {/* ── CHAT TAB ──────────────────────────────────────────────────── */}
        {tab === 'chat' && (
          <div className="h-[calc(100vh-57px)] flex flex-col max-w-3xl mx-auto w-full px-4">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-5">
              {messages.map((msg: Message, i: number) => (
                <ChatMessage key={i} message={msg} />
              ))}
              {sending && (
                <div className="flex gap-3">
                  <PlouAvatar />
                  <div className="px-4 py-3.5 rounded-2xl rounded-tl-sm bg-[var(--surface)] border border-[var(--border)] flex items-center gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, delay: i * 0.18, repeat: Infinity }}
                        className="w-1.5 h-1.5 rounded-full bg-[var(--muted)]"
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Suggested prompts shown only at the very start */}
            {messages.length === 1 && !sending && (
              <div className="pb-3">
                <p className="font-mono text-xs text-[var(--muted)] mb-2 text-center">Try asking:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {[
                    'Write me a caption for Instagram',
                    'What should I post this week?',
                    'Give me 5 content ideas',
                    `How do I grow on ${profile?.platforms?.[0] || 'social media'}?`,
                  ].map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => setInput(prompt)}
                      className="px-3 py-1.5 rounded-full bg-[var(--surface)] border border-[var(--border)] font-display text-xs text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--text)] transition-all"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input area */}
            <div className="pb-4">
              <div className="flex items-end gap-2 bg-[var(--surface)] border border-[var(--border)] rounded-2xl px-4 py-3 focus-within:border-[var(--accent)] transition-colors">
                <textarea
                  ref={textareaRef}
                  rows={1}
                  placeholder={`Ask Plou about ${profile?.businessName || 'your business'}...`}
                  value={input}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setInput(e.target.value)
                    e.target.style.height = 'auto'
                    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
                  }}
                  onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      sendMessage()
                    }
                  }}
                  className="flex-1 bg-transparent font-display text-sm text-[var(--text)] placeholder:text-[var(--muted)] outline-none resize-none leading-relaxed"
                  style={{ maxHeight: '120px' }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || sending}
                  className="gradient-bg text-white rounded-xl px-4 py-2 font-display text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-40 shrink-0"
                >
                  Send
                </button>
              </div>
              <p className="font-mono text-xs text-[var(--muted)] text-center mt-2">
                Enter to send · Shift+Enter for new line
              </p>
            </div>
          </div>
        )}

        {/* ── IDEAS TAB ─────────────────────────────────────────────────── */}
        {tab === 'ideas' && (
          <div className="max-w-4xl mx-auto px-4 py-8 overflow-y-auto h-[calc(100vh-57px)]">
            <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-bold text-2xl text-[var(--text)]">Content ideas</h2>
                <p className="font-display text-sm text-[var(--muted)] mt-1">
                  6 platform-native ideas tailored to {profile?.businessName}
                </p>
              </div>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={generateIdeas}
                disabled={ideasLoading}
                className="flex items-center gap-2 font-display font-semibold text-white gradient-bg px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60 shadow-md shadow-[rgba(91,139,255,0.2)] shrink-0"
              >
                {ideasLoading ? (
                  <><Spinner /><span>Generating...</span></>
                ) : (
                  <span>{ideasGenerated ? '↺ Regenerate ideas' : '✨ Generate ideas'}</span>
                )}
              </motion.button>
            </div>

            {!ideasGenerated && !ideasLoading && (
              <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                <span className="text-5xl">💡</span>
                <p className="font-display font-semibold text-xl text-[var(--text)]">Ready to spark ideas</p>
                <p className="font-display text-[var(--muted)] max-w-sm">
                  Plou will generate 6 content ideas tailored specifically to {profile?.businessName} and your audience.
                </p>
              </div>
            )}

            {ideasLoading && (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <Spinner />
                <p className="font-display text-[var(--muted)]">Generating ideas for {profile?.businessName}...</p>
              </div>
            )}

            {ideasGenerated && !ideasLoading && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ideas.map((idea: ContentIdea, i: number) => (
                  <IdeaCard key={i} idea={idea} index={i} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── STRATEGY TAB ──────────────────────────────────────────────── */}
        {tab === 'strategy' && (
          <div className="max-w-3xl mx-auto px-4 py-8 overflow-y-auto h-[calc(100vh-57px)]">
            <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-bold text-2xl text-[var(--text)]">Your strategy</h2>
                <p className="font-display text-sm text-[var(--muted)] mt-1">
                  Personalized for {profile?.businessName}
                </p>
              </div>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={generateStrategy}
                disabled={strategyLoading}
                className="flex items-center gap-2 font-display font-semibold text-white gradient-bg px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60 shadow-md shadow-[rgba(91,139,255,0.2)] shrink-0"
              >
                {strategyLoading ? (
                  <><Spinner /><span>Building...</span></>
                ) : (
                  <span>{strategyGenerated ? '↺ Rebuild strategy' : '📈 Build my strategy'}</span>
                )}
              </motion.button>
            </div>

            {!strategyGenerated && !strategyLoading && (
              <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                <span className="text-5xl">📈</span>
                <p className="font-display font-semibold text-xl text-[var(--text)]">Your strategy is waiting</p>
                <p className="font-display text-[var(--muted)] max-w-sm">
                  Plou will build a complete social media strategy — content pillars, posting schedule, quick wins, and a 30-day plan.
                </p>
              </div>
            )}

            {strategyLoading && (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <Spinner />
                <p className="font-display text-[var(--muted)]">Building your strategy...</p>
              </div>
            )}

            {strategyGenerated && strategy && (
              <div className="flex flex-col gap-5 pb-8">

                {/* Overview */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-2xl bg-[var(--surface)] border"
                  style={{ borderColor: 'rgba(91,139,255,0.35)' }}
                >
                  <p className="font-mono text-xs text-[var(--accent)] uppercase tracking-widest mb-2">Strategic overview</p>
                  <p className="font-display text-[var(--text)] leading-relaxed">{strategy.overview}</p>
                </motion.div>

                {/* Content pillars */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 }}
                  className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]"
                >
                  <p className="font-mono text-xs text-[var(--muted)] uppercase tracking-widest mb-4">Content pillars</p>
                  <div className="flex flex-col gap-3.5">
                    {strategy.pillars.map((pillar: { name: string; description: string }, i: number) => (
                      <div key={i} className="flex gap-3.5">
                        <span className="font-mono text-[var(--accent)] text-sm font-bold shrink-0 mt-0.5">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <div>
                          <p className="font-display font-semibold text-[var(--text)] text-sm">{pillar.name}</p>
                          <p className="font-display text-[var(--muted)] text-sm leading-relaxed">{pillar.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Posting schedule */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.13 }}
                  className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]"
                >
                  <p className="font-mono text-xs text-[var(--muted)] uppercase tracking-widest mb-4">Posting schedule</p>
                  <div className="flex flex-col gap-3">
                    {strategy.postingSchedule.map((s: { platform: string; frequency: string; bestTimes: string; formats: string[] }, i: number) => (
                      <div key={i} className="p-4 rounded-xl bg-[var(--surface2)] border border-[var(--border)] flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <p className="font-display font-semibold text-[var(--text)] text-sm">{s.platform}</p>
                          <span className="font-mono text-xs text-[var(--accent)]">{s.frequency}</span>
                        </div>
                        <p className="font-display text-xs text-[var(--muted)]">Best times: {s.bestTimes}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {s.formats.map((f: string, j: number) => (
                            <span key={j} className="px-2 py-0.5 rounded-full bg-[var(--surface)] border border-[var(--border)] font-mono text-xs text-[var(--muted)]">
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Quick wins */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 }}
                  className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]"
                >
                  <p className="font-mono text-xs text-[var(--muted)] uppercase tracking-widest mb-4">Quick wins — do this week</p>
                  <div className="flex flex-col gap-2.5">
                    {strategy.quickWins.map((win: string, i: number) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="text-[var(--green)] shrink-0 mt-0.5 font-bold">✓</span>
                        <p className="font-display text-sm text-[var(--text)] leading-relaxed">{win}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* 30-day plan */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 }}
                  className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]"
                >
                  <p className="font-mono text-xs text-[var(--muted)] uppercase tracking-widest mb-3">30-day action plan</p>
                  <p className="font-display text-[var(--text)] leading-relaxed">{strategy.thirtyDayPlan}</p>
                </motion.div>

              </div>
            )}
          </div>
        )}
      </main>

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div className="fixed inset-0 z-30" onClick={() => setShowDropdown(false)} />
      )}
    </div>
  )
}
