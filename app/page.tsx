'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useSpring, useTransform } from 'framer-motion'

function AnimatedStreak() {
  const spring = useSpring(0, { stiffness: 60, damping: 15 })
  const display = useTransform(spring, (v) => Math.round(v))
  const [value, setValue] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      spring.set(47)
    }, 500)
    return () => clearTimeout(timer)
  }, [spring])

  useEffect(() => {
    const unsubscribe = display.onChange((v) => setValue(v))
    return unsubscribe
  }, [display])

  return (
    <div className="flex items-center gap-2 justify-center">
      <span className="text-3xl">🔥</span>
      <span className="font-mono font-medium text-5xl text-[var(--text)]">{value}</span>
      <span className="font-display text-[var(--muted)] text-lg">day streak</span>
    </div>
  )
}

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
            Login
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
          className="flex flex-col items-center gap-8 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--border)] mb-2">
            <span className="text-sm">✨</span>
            <span className="font-mono text-xs text-[var(--muted)]">AI-powered daily challenges</span>
          </div>

          <h1 className="font-display font-bold text-5xl sm:text-6xl md:text-7xl leading-tight text-[var(--text)]">
            1 challenge.{' '}
            <span className="gradient-text">every day.</span>
            <br />
            no excuses.
          </h1>

          <p className="font-display text-xl text-[var(--muted)] max-w-lg">
            Small actions. Big changes. Powered by AI.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <Link
              href="/signup"
              className="font-display font-semibold text-white gradient-bg px-8 py-4 rounded-xl text-lg hover:opacity-90 active:opacity-80 transition-opacity shadow-lg shadow-[rgba(91,139,255,0.3)] flex items-center gap-2"
            >
              Start for free →
            </Link>
            <a
              href="#how-it-works"
              className="font-display font-medium text-[var(--muted)] hover:text-[var(--text)] transition-colors px-6 py-4 rounded-xl border border-[var(--border)] hover:border-[var(--accent)] bg-[var(--surface)]"
            >
              See how it works
            </a>
          </div>

          <p className="font-mono text-xs text-[var(--muted)]">
            100% free · No credit card required · Start in 60 seconds
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)]"
          >
            <AnimatedStreak />
          </motion.div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="how-it-works" className="px-6 py-24 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--text)] mb-4">
            How it works
          </h2>
          <p className="font-display text-[var(--muted)] text-lg">Simple. Effective. Addictive.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: '🎯',
              title: 'Personalized',
              desc: 'AI generates challenges based on your goals and available time.',
            },
            {
              icon: '🔥',
              title: 'Streak system',
              desc: 'Miss one day and it resets. That\'s the point. Consistency wins.',
            },
            {
              icon: '⚡',
              title: '5 minutes',
              desc: 'Every challenge is completable in under 30 minutes. No excuses.',
            },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
            >
              <span className="text-4xl block mb-4">{feature.icon}</span>
              <h3 className="font-display font-semibold text-xl text-[var(--text)] mb-2">
                {feature.title}
              </h3>
              <p className="font-display text-[var(--muted)] leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Social proof */}
      <section className="px-6 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto"
        >
          <div className="text-2xl mb-2">⭐⭐⭐⭐⭐</div>
          <p className="font-display font-semibold text-[var(--text)] text-xl">
            Join 2,400+ people building better habits
          </p>
          <p className="font-mono text-sm text-[var(--muted)] mt-2">
            Average streak: 12 days · Best streak: 147 days
          </p>
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
            Ready to start?
          </h2>
          <p className="font-display text-[var(--muted)] text-lg mb-8">
            One small challenge tomorrow morning. That&apos;s all it takes.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 font-display font-semibold text-white gradient-bg px-10 py-4 rounded-xl text-xl hover:opacity-90 active:opacity-80 transition-opacity shadow-lg shadow-[rgba(91,139,255,0.3)]"
          >
            Start for free →
          </Link>
          <p className="font-mono text-xs text-[var(--muted)] mt-6">
            100% free · No credit card required · Start in 60 seconds
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
          <Link
            href="/privacy"
            className="font-display text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="font-display text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors"
          >
            Terms
          </Link>
        </div>
      </footer>
    </div>
  )
}
