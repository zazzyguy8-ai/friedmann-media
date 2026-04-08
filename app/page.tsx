'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const FEATURES = [
  {
    icon: '🎯',
    title: 'Deep business interview',
    desc: 'Plou asks the right questions — your industry, audience, goals, platforms, and voice. Nothing generic.',
  },
  {
    icon: '🧠',
    title: 'Plou becomes your expert',
    desc: 'After learning your business, Plou rebuilds itself specifically for you. Every answer is tailored.',
  },
  {
    icon: '📅',
    title: 'Content ideas & calendar',
    desc: 'Get platform-native post ideas, hooks, and captions generated for your specific audience.',
  },
  {
    icon: '📈',
    title: 'Personalized strategy',
    desc: 'A full social media strategy — content pillars, posting schedule, 30-day plan — built for your business.',
  },
  {
    icon: '💬',
    title: 'Always-on AI advisor',
    desc: 'Chat with Plou anytime. Ask for a caption, a campaign idea, or a competitor analysis. Instant answers.',
  },
  {
    icon: '🚀',
    title: 'Platform expertise',
    desc: 'Instagram, TikTok, LinkedIn, Twitter/X, Facebook, YouTube — Plou knows what works on each one.',
  },
]

const STEPS = [
  {
    number: '01',
    title: 'Tell Plou about your business',
    desc: 'Answer a focused set of questions about your industry, audience, goals, and brand voice.',
  },
  {
    number: '02',
    title: 'Plou rebuilds itself for you',
    desc: 'Plou uses your answers to become a dedicated AI social media expert — built around your business.',
  },
  {
    number: '03',
    title: 'Get your strategy & start growing',
    desc: 'Access content ideas, a personalized strategy, and a 24/7 AI advisor who knows your brand inside out.',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] relative overflow-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-[var(--border)] bg-[var(--bg)]/80 backdrop-blur-sm">
        <span className="font-display font-bold text-2xl gradient-text">plou</span>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="font-display font-medium text-[var(--muted)] hover:text-[var(--text)] transition-colors px-4 py-2"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="font-display font-semibold text-white gradient-bg px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-[rgba(91,139,255,0.25)]"
          >
            Start free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-8 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--border)]">
            <span className="text-sm">✨</span>
            <span className="font-mono text-xs text-[var(--muted)]">AI social media expert — built for your business</span>
          </div>

          <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl leading-tight text-[var(--text)]">
            Meet <span className="gradient-text">Plou.</span>
            <br />
            Your social media{' '}
            <span className="gradient-text">expert.</span>
          </h1>

          <p className="font-display text-xl text-[var(--muted)] max-w-2xl leading-relaxed">
            Plou learns everything about your business — then rebuilds itself as your dedicated AI social media strategist, content creator, and growth advisor.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <Link
              href="/signup"
              className="font-display font-semibold text-white gradient-bg px-8 py-4 rounded-xl text-lg hover:opacity-90 active:opacity-80 transition-opacity shadow-lg shadow-[rgba(91,139,255,0.3)] flex items-center gap-2"
            >
              Talk to Plou — it&apos;s free →
            </Link>
            <a
              href="#how-it-works"
              className="font-display font-medium text-[var(--muted)] hover:text-[var(--text)] transition-colors px-6 py-4 rounded-xl border border-[var(--border)] hover:border-[var(--accent)] bg-[var(--surface)]"
            >
              See how it works
            </a>
          </div>

          <p className="font-mono text-xs text-[var(--muted)]">
            100% free · No credit card · Ready in 5 minutes
          </p>

          {/* Preview card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="w-full max-w-lg mt-4 p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] text-left"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full gradient-bg flex items-center justify-center text-white font-display font-bold text-sm">P</div>
              <div>
                <p className="font-display font-semibold text-[var(--text)] text-sm">Plou</p>
                <p className="font-mono text-xs text-[var(--muted)]">Your AI social media expert</p>
              </div>
            </div>
            <p className="font-display text-[var(--text)] text-sm leading-relaxed">
              "Hi! I'm Plou. Tell me about your business and I'll build you a complete social media strategy — content ideas, posting schedule, captions, and a growth plan tailored exactly to your brand."
            </p>
            <div className="mt-4 flex items-center gap-2 px-4 py-3 rounded-xl bg-[var(--surface2)] border border-[var(--border)]">
              <span className="font-display text-sm text-[var(--muted)] flex-1">Start by telling Plou about your business...</span>
              <span className="text-[var(--accent)]">→</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="px-6 py-24 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-mono text-xs text-[var(--muted)] uppercase tracking-widest mb-4">How it works</p>
          <h2 className="font-display font-bold text-4xl text-[var(--text)] mb-4">
            Three steps to your own AI expert
          </h2>
          <p className="font-display text-[var(--muted)] text-lg max-w-lg mx-auto">
            Plou is not a generic tool. It becomes your business.
          </p>
        </motion.div>

        <div className="flex flex-col gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex items-start gap-6 p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
            >
              <span className="font-mono text-3xl font-bold gradient-text shrink-0">{step.number}</span>
              <div>
                <h3 className="font-display font-semibold text-xl text-[var(--text)] mb-2">{step.title}</h3>
                <p className="font-display text-[var(--muted)] leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-12 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="font-mono text-xs text-[var(--muted)] uppercase tracking-widest mb-4">What Plou does</p>
          <h2 className="font-display font-bold text-4xl text-[var(--text)]">
            Everything your social media needs
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
            >
              <span className="text-3xl block mb-4">{f.icon}</span>
              <h3 className="font-display font-semibold text-lg text-[var(--text)] mb-2">{f.title}</h3>
              <p className="font-display text-[var(--muted)] text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Platforms */}
      <section className="px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <p className="font-mono text-xs text-[var(--muted)] uppercase tracking-widest mb-6">Platforms covered</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {['Instagram', 'TikTok', 'LinkedIn', 'Twitter / X', 'Facebook', 'YouTube', 'Pinterest'].map((p) => (
              <span
                key={p}
                className="px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--border)] font-display text-sm text-[var(--muted)]"
              >
                {p}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto p-12 rounded-2xl bg-[var(--surface)] border border-[var(--border)]"
        >
          <h2 className="font-display font-bold text-4xl text-[var(--text)] mb-4">
            Ready to grow your business online?
          </h2>
          <p className="font-display text-[var(--muted)] text-lg mb-8">
            Tell Plou about your business. It takes 5 minutes. The results last forever.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 font-display font-semibold text-white gradient-bg px-10 py-4 rounded-xl text-xl hover:opacity-90 active:opacity-80 transition-opacity shadow-lg shadow-[rgba(91,139,255,0.3)]"
          >
            Meet Plou — it&apos;s free →
          </Link>
          <p className="font-mono text-xs text-[var(--muted)] mt-6">
            100% free · No credit card required · Ready in 5 minutes
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-display font-bold text-xl gradient-text">plou</span>
        <p className="font-mono text-xs text-[var(--muted)]">
          © {new Date().getFullYear()} Plou. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="font-display text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="font-display text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors">
            Terms
          </Link>
        </div>
      </footer>
    </div>
  )
}
