'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'

const FEATURES = [
  { icon: '🧠', title: 'Learns your business', desc: 'Answer 8 questions. Plou builds a complete profile of your brand, audience, and goals — then rebuilds itself as your dedicated expert.', tag: 'Setup' },
  { icon: '💬', title: 'Always-on AI advisor', desc: 'Ask for a caption, a campaign idea, a competitor breakdown, or a weekly posting plan. Instant, business-specific answers.', tag: 'Social media' },
  { icon: '💡', title: 'Content ideas on demand', desc: 'Generate 6 platform-native content ideas tailored to your exact audience — Instagram Reels, LinkedIn posts, TikToks, and more.', tag: 'Content' },
  { icon: '📈', title: 'Full social media strategy', desc: 'Content pillars, posting schedule, quick wins, and a 30-day action plan. All specific to your business. Ready in seconds.', tag: 'Strategy' },
  { icon: '🌐', title: 'Website builder', desc: 'Describe your style. Plou generates a complete, professional website — real copy, real design, real code. Download and launch.', tag: 'Web' },
  { icon: '🤖', title: 'AI chatbot for your site', desc: 'A branded chat widget with pre-programmed answers about your business. Copy one line of code. Works on any website instantly.', tag: 'Chatbot' },
]

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  )
}

function DashboardMockup() {
  return (
    <div className="w-full max-w-3xl mx-auto rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl shadow-[rgba(0,0,0,0.5)]">
      <div className="flex items-center gap-2 px-4 py-3 bg-[var(--surface2)] border-b border-[var(--border)]">
        <span className="w-3 h-3 rounded-full bg-[rgba(255,91,91,0.5)]" />
        <span className="w-3 h-3 rounded-full bg-[rgba(255,209,61,0.5)]" />
        <span className="w-3 h-3 rounded-full bg-[rgba(61,224,135,0.5)]" />
        <div className="flex-1 mx-3 px-3 py-1 rounded-md bg-[var(--surface)] border border-[var(--border)] font-mono text-xs text-[var(--muted)]">app.plou.ai</div>
      </div>
      <div className="flex items-center justify-between px-5 py-3 bg-[var(--bg)] border-b border-[var(--border)]">
        <span className="font-display font-bold text-lg gradient-text">plou</span>
        <div className="hidden sm:flex items-center gap-1 bg-[var(--surface)] border border-[var(--border)] p-1 rounded-xl">
          {['💬 Chat', '💡 Ideas', '📈 Strategy', '🌐 Website', '🤖 Chatbot'].map((t, i) => (
            <span key={t} className={`font-display text-xs px-2.5 py-1.5 rounded-lg ${i === 0 ? 'gradient-bg text-white font-semibold' : 'text-[var(--muted)]'}`}>{t}</span>
          ))}
        </div>
        <div className="w-8 h-8 rounded-full gradient-bg" />
      </div>
      <div className="bg-[var(--bg)] px-5 py-5 flex flex-col gap-4">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center font-display font-bold text-white text-xs shrink-0">P</div>
          <div className="max-w-[72%] px-4 py-3 rounded-2xl rounded-tl-sm bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] font-display text-xs leading-relaxed">
            Hey Sarah! I&apos;ve gone through everything about Bloom Bakery. Ready to help you grow on Instagram and TikTok. What do you want to work on first?
          </div>
        </div>
        <div className="flex gap-3 flex-row-reverse">
          <div className="w-8 h-8 rounded-full bg-[var(--surface2)] border border-[var(--border)] flex items-center justify-center font-display text-xs text-[var(--muted)] shrink-0">You</div>
          <div className="max-w-[60%] px-4 py-3 rounded-2xl rounded-tr-sm gradient-bg text-white font-display text-xs leading-relaxed">Write me a caption for our new sourdough launch</div>
        </div>
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center font-display font-bold text-white text-xs shrink-0">P</div>
          <div className="max-w-[75%] px-4 py-3 rounded-2xl rounded-tl-sm bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] font-display text-xs leading-relaxed">
            <span className="text-[var(--accent)] font-semibold block mb-1">Ready to post ✓</span>
            Three years of trial runs, 47 failed loaves, and one perfect crust. Our sourdough is finally here — and it&apos;s worth every early morning. Link in bio to pre-order. 🍞
            <span className="text-[var(--muted)] block mt-1.5">#sourdough #artisanbread #bloombakery #freshbaked</span>
          </div>
        </div>
        <div className="mt-1 flex items-center gap-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl px-4 py-2.5">
          <span className="flex-1 font-display text-xs text-[var(--muted)]">Ask Plou about Bloom Bakery...</span>
          <span className="gradient-bg text-white rounded-lg px-3 py-1.5 font-display text-xs font-semibold">Send</span>
        </div>
      </div>
    </div>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(91,139,255,0.12) 0%, transparent 70%)' }} />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-md">
        <span className="font-display font-bold text-2xl gradient-text">plou</span>
        <Link href="/onboarding" className="font-display font-semibold text-sm text-white gradient-bg px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-[rgba(91,139,255,0.2)]">
          Try Plou free →
        </Link>
      </nav>

      <div className="relative z-10">

        {/* Hero */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col items-center gap-7 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--border)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] animate-pulse" />
              <span className="font-mono text-xs text-[var(--muted)]">Free to use · No sign up needed</span>
            </div>

            <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl leading-[1.08] text-[var(--text)] tracking-tight">
              One AI that runs
              <br />your <span className="gradient-text">entire online</span>
              <br />presence.
            </h1>

            <p className="font-display text-lg sm:text-xl text-[var(--muted)] max-w-2xl leading-relaxed">
              Tell Plou about your business. It learns your brand, audience, and goals — then becomes your dedicated social media strategist, website builder, and AI chatbot.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2">
              {['Social media strategy', 'Content ideas', 'AI chat advisor', 'Website builder', 'Chatbot for your site'].map((f) => (
                <span key={f} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--surface)] border border-[var(--border)] font-display text-xs text-[var(--muted)]">
                  <span className="text-[var(--green)] font-bold">✓</span> {f}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
              <Link href="/onboarding" className="font-display font-semibold text-white gradient-bg px-9 py-4 rounded-xl text-lg hover:opacity-90 active:opacity-80 transition-opacity shadow-lg shadow-[rgba(91,139,255,0.3)]">
                Try Plou free — 5 minutes →
              </Link>
              <a href="#how-it-works" className="font-display font-medium text-[var(--muted)] hover:text-[var(--text)] transition-colors px-6 py-4 rounded-xl border border-[var(--border)] hover:border-[var(--accent)] bg-[var(--surface)]">
                See how it works
              </a>
            </div>
            <p className="font-mono text-xs text-[var(--muted)]">No sign up · No credit card · Works in 5 minutes</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} className="mt-16 w-full max-w-4xl mx-auto px-2">
            <DashboardMockup />
          </motion.div>
        </section>

        {/* Features */}
        <section className="px-6 py-24 max-w-6xl mx-auto">
          <FadeIn className="text-center mb-14">
            <p className="font-mono text-xs text-[var(--muted)] uppercase tracking-widest mb-3">Everything in one place</p>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-[var(--text)]">Built for business owners,<br />not marketers</h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.07}>
                <div className="h-full p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <span className="text-4xl">{f.icon}</span>
                    <span className="font-mono text-xs text-[var(--muted)] px-2 py-1 rounded-full bg-[var(--surface2)] border border-[var(--border)]">{f.tag}</span>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-[var(--text)] mb-1.5">{f.title}</h3>
                    <p className="font-display text-sm text-[var(--muted)] leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="px-6 py-20 max-w-4xl mx-auto">
          <FadeIn className="text-center mb-14">
            <p className="font-mono text-xs text-[var(--muted)] uppercase tracking-widest mb-3">How it works</p>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-[var(--text)]">Ready in 5 minutes</h2>
          </FadeIn>
          <div className="flex flex-col gap-4">
            {[
              { num: '01', title: 'Tell Plou about your business', desc: 'Answer 8 focused questions — your industry, audience, goals, platforms, and brand voice. Takes under 5 minutes.' },
              { num: '02', title: 'Plou rebuilds itself for you', desc: 'Plou uses everything you told it to become a dedicated AI expert — not a generic chatbot. Your brand, your audience, your goals.' },
              { num: '03', title: 'Grow, create, and automate', desc: 'Chat with your AI advisor, generate content, launch a website, and deploy a chatbot. All from one place.' },
            ].map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.1}>
                <div className="flex items-start gap-6 p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors">
                  <span className="font-mono font-bold text-3xl gradient-text shrink-0">{step.num}</span>
                  <div>
                    <h3 className="font-display font-semibold text-xl text-[var(--text)] mb-1.5">{step.title}</h3>
                    <p className="font-display text-[var(--muted)] leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* Platforms */}
        <section className="px-6 py-16 text-center">
          <FadeIn>
            <p className="font-mono text-xs text-[var(--muted)] uppercase tracking-widest mb-6">Platform expertise</p>
            <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-2xl mx-auto">
              {['Instagram', 'TikTok', 'LinkedIn', 'Twitter / X', 'Facebook', 'YouTube', 'Pinterest'].map((p) => (
                <span key={p} className="px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--border)] font-display text-sm text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--text)] transition-all cursor-default">{p}</span>
              ))}
            </div>
          </FadeIn>
        </section>

        {/* Final CTA */}
        <section className="px-6 py-28 text-center">
          <FadeIn>
            <div className="max-w-2xl mx-auto flex flex-col items-center gap-8 p-10 sm:p-14 rounded-3xl bg-[var(--surface)] border border-[var(--border)]" style={{ boxShadow: '0 0 80px rgba(91,139,255,0.07)' }}>
              <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center font-display font-bold text-2xl text-white shadow-lg shadow-[rgba(91,139,255,0.4)]">P</div>
              <div>
                <h2 className="font-display font-bold text-4xl sm:text-5xl text-[var(--text)] mb-4">Ready to grow?</h2>
                <p className="font-display text-[var(--muted)] text-lg leading-relaxed">
                  No sign up. No credit card. Just tell Plou about your business and get your own AI social media expert, website builder, and chatbot in 5 minutes.
                </p>
              </div>
              <Link href="/onboarding" className="font-display font-semibold text-white gradient-bg px-10 py-4 rounded-xl text-xl hover:opacity-90 active:opacity-80 transition-opacity shadow-lg shadow-[rgba(91,139,255,0.3)]">
                Try Plou free →
              </Link>
              <p className="font-mono text-xs text-[var(--muted)]">No sign up · No credit card · 5 minutes</p>
            </div>
          </FadeIn>
        </section>

        {/* Footer */}
        <footer className="border-t border-[var(--border)] px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-display font-bold text-xl gradient-text">plou</span>
          <p className="font-mono text-xs text-[var(--muted)]">© {new Date().getFullYear()} Plou. All rights reserved.</p>
          <p className="font-mono text-xs text-[var(--muted)]">Built for business owners who want to grow.</p>
        </footer>

      </div>
    </div>
  )
}
