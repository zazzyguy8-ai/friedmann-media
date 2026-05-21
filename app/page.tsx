'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: { x: number; y: number; vx: number; vy: number; opacity: number; size: number; life: number; maxLife: number }[] = []

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -Math.random() * 0.3 - 0.1,
        opacity: Math.random() * 0.4 + 0.05,
        size: Math.random() * 1.5 + 0.3,
        life: Math.random() * 300,
        maxLife: 300 + Math.random() * 200,
      })
    }

    let animId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.life++
        if (p.life > p.maxLife || p.y < -10) {
          p.x = Math.random() * canvas.width
          p.y = canvas.height + 10
          p.life = 0
        }
        const fadeIn = Math.min(p.life / 40, 1)
        const fadeOut = Math.min((p.maxLife - p.life) / 40, 1)
        const alpha = p.opacity * fadeIn * fadeOut
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201, 169, 110, ${alpha})`
        ctx.fill()
      })
      animId = requestAnimationFrame(animate)
    }
    animate()

    const onResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}

function RuneCircle() {
  return (
    <div className="relative w-64 h-64 mx-auto mb-8">
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full animate-rune-rotate opacity-20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="100" cy="100" r="95" stroke="#c9a96e" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="80" stroke="#c9a96e" strokeWidth="0.3" strokeDasharray="4 8" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
          const rad = (angle * Math.PI) / 180
          const x1 = 100 + 80 * Math.cos(rad)
          const y1 = 100 + 80 * Math.sin(rad)
          const x2 = 100 + 95 * Math.cos(rad)
          const y2 = 100 + 95 * Math.sin(rad)
          return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#c9a96e" strokeWidth="0.5" />
        })}
        {[0, 60, 120, 180, 240, 300].map((angle) => {
          const rad = (angle * Math.PI) / 180
          const cx = 100 + 80 * Math.cos(rad)
          const cy = 100 + 80 * Math.sin(rad)
          return <circle key={angle} cx={cx} cy={cy} r="2" fill="#c9a96e" opacity="0.6" />
        })}
      </svg>
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full animate-rune-counter opacity-15"
        fill="none"
      >
        <polygon points="100,10 190,155 10,155" stroke="#c9a96e" strokeWidth="0.4" fill="none" />
        <polygon points="100,190 10,45 190,45" stroke="#c9a96e" strokeWidth="0.4" fill="none" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-cinzel-decorative text-gold text-5xl animate-pulse-glow glow-text-gold">A</span>
      </div>
    </div>
  )
}

const ARCHETYPE_NAMES = [
  'Shadow Scholar',
  'Lunar Seer',
  'Ashborn Monarch',
  'Silent Alchemist',
  'Storm Vessel',
  'Void Oracle',
  'Crimson Saint',
]

function CyclingArchetype() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex((i) => (i + 1) % ARCHETYPE_NAMES.length)
        setVisible(true)
      }, 400)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <span
      className="font-cinzel text-gold-bright inline-block"
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.4s ease',
        letterSpacing: '0.1em',
      }}
    >
      {ARCHETYPE_NAMES[index]}
    </span>
  )
}

export default function LandingPage() {
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const [, setEntered] = useState(false)

  return (
    <div className="min-h-screen bg-obsidian relative overflow-x-hidden">
      <ParticleField />

      {/* Ambient radial gradient */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(40, 20, 5, 0.6) 0%, transparent 70%)',
        }}
      />

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 border-b border-[var(--border)]"
        style={{ background: 'rgba(5, 5, 7, 0.7)', backdropFilter: 'blur(20px)' }}>
        <span className="font-cinzel-decorative text-gold tracking-arcane text-lg glow-text-gold">
          ARCANUM
        </span>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="font-cinzel text-[var(--silver-dim)] hover:text-silver text-sm tracking-ritual transition-colors"
          >
            Return
          </Link>
          <Link
            href="/signup"
            className="font-cinzel text-xs tracking-arcane px-5 py-2.5 border border-[var(--border-gold)] text-gold hover:bg-[var(--glow-gold)] transition-all"
            style={{ letterSpacing: '0.2em' }}
          >
            ENTER
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <motion.section
        style={{ opacity: heroOpacity }}
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="max-w-3xl mx-auto flex flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1.2 }}
          >
            <RuneCircle />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.2 }}
            className="font-mono text-[var(--silver-dim)] text-xs tracking-arcane uppercase mb-6"
          >
            Restricted Archive · Personal Access Only
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 1.4 }}
            className="font-cinzel font-bold text-4xl sm:text-5xl md:text-6xl leading-tight text-silver mb-2"
            style={{ letterSpacing: '0.05em' }}
          >
            You were not meant
            <br />
            <span className="text-gold-gradient glow-text-gold">to find this.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1.2 }}
            className="font-garamond text-[var(--silver-dim)] text-xl sm:text-2xl mt-6 mb-2 italic leading-relaxed max-w-xl"
          >
            And yet, here you are. The archive has been waiting.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0, duration: 1 }}
            className="mt-10 flex flex-col items-center gap-3"
          >
            <Link
              href="/signup"
              className="font-cinzel text-sm tracking-arcane px-10 py-4 border border-[var(--border-gold)] text-gold hover:bg-[rgba(201,169,110,0.08)] transition-all glow-gold"
              style={{ letterSpacing: '0.22em' }}
              onClick={() => setEntered(true)}
            >
              BEGIN INITIATION
            </Link>
            <p className="font-mono text-[var(--text-dim)] text-xs tracking-ritual mt-2">
              Private · Encrypted · Irreversible
            </p>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* SECTION: What Is This */}
      <section className="relative z-10 py-32 px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <div className="divider-arcane mb-10" />
          <p className="font-mono text-[var(--silver-dim)] text-xs tracking-arcane uppercase mb-6">
            What The Archive Reveals
          </p>
          <h2 className="font-cinzel text-3xl sm:text-4xl text-silver mb-6" style={{ letterSpacing: '0.08em' }}>
            Seven Archetypes.<br />One Is Yours.
          </h2>
          <p className="font-garamond text-[var(--silver-dim)] text-xl italic leading-relaxed max-w-2xl mx-auto">
            Through a sequence of initiatory questions, the archive identifies the hidden pattern at the center of your psychology —
            your element, your power, your shadow, your path.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[var(--border)]">
          {[
            { symbol: '◈', label: 'Hidden Archetype', desc: 'Your true psychological and spiritual classification — one of seven ancient patterns.' },
            { symbol: '⬡', label: 'Elemental Affinity', desc: 'The element that governs your instincts, your power, and your shadow.' },
            { symbol: '◎', label: 'Latent Abilities', desc: 'Capabilities you carry that most people around you cannot name or access.' },
            { symbol: '✦', label: 'Daily Rituals', desc: 'Symbolic, psychological practices calibrated precisely to your archetype.' },
            { symbol: '☽', label: 'Energy Profile', desc: 'AI-generated analysis of your emotional patterns, instincts, and tendencies.' },
            { symbol: '♛', label: 'Progression Path', desc: 'A structured path of development from initiate to full archetype mastery.' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="bg-surface p-8 flex gap-5"
            >
              <span className="text-gold text-2xl opacity-60 mt-1">{item.symbol}</span>
              <div>
                <h3 className="font-cinzel text-silver text-sm tracking-ritual mb-2" style={{ letterSpacing: '0.15em' }}>
                  {item.label}
                </h3>
                <p className="font-garamond text-[var(--silver-dim)] text-base italic leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION: The Seven */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="divider-arcane mb-10" />
            <p className="font-mono text-[var(--silver-dim)] text-xs tracking-arcane uppercase mb-6">
              The Seven Classes
            </p>
            <div className="font-cinzel text-3xl sm:text-4xl text-silver mb-2" style={{ letterSpacing: '0.06em' }}>
              Which one are you?
            </div>
            <div className="h-14 flex items-center justify-center mt-4">
              <CyclingArchetype />
            </div>
            <p className="font-garamond text-[var(--silver-dim)] text-lg italic leading-relaxed mt-4 max-w-xl mx-auto">
              Each archetype carries ancient lore, symbolic abilities, elemental power,
              a shadow aspect, and a precise path of development. There are no common ones.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SECTION: How It Works */}
      <section className="relative z-10 py-24 px-6 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="divider-arcane mb-10" />
          <p className="font-mono text-[var(--silver-dim)] text-xs tracking-arcane uppercase mb-10 text-center">
            The Initiation Sequence
          </p>
          <div className="flex flex-col gap-8">
            {[
              { num: 'I', title: 'The Ritual Questions', desc: 'Ten psychological and symbolic questions designed to map the structure of your psyche. Answer without thinking too long.' },
              { num: 'II', title: 'Archetype Classification', desc: 'The archive analyzes your responses and identifies your core archetype — one of seven ancient patterns.' },
              { num: 'III', title: 'Personal Lore Generation', desc: 'AI generates a private document of your archetype: lore, abilities, shadow aspects, and your first ritual.' },
              { num: 'IV', title: 'The Portal', desc: 'Your personal archive. Daily rituals, progression, lore access, and AI energy readings — calibrated to your archetype.' },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.8 }}
                className="flex gap-6"
              >
                <div className="font-cinzel-decorative text-gold text-2xl w-8 shrink-0 glow-text-gold opacity-70">
                  {step.num}
                </div>
                <div>
                  <h3 className="font-cinzel text-silver text-sm tracking-ritual mb-2" style={{ letterSpacing: '0.15em' }}>
                    {step.title}
                  </h3>
                  <p className="font-garamond text-[var(--silver-dim)] text-base italic leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FINAL CTA */}
      <section className="relative z-10 py-32 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-xl mx-auto"
        >
          <div className="divider-arcane mb-12" />
          <p className="font-cinzel text-[var(--silver-dim)] text-xs tracking-arcane uppercase mb-6">
            The Archive Does Not Wait
          </p>
          <h2 className="font-cinzel text-3xl sm:text-4xl text-silver mb-6" style={{ letterSpacing: '0.06em' }}>
            What you carry has always been there.
            <br />
            <span className="text-gold-gradient">Name it.</span>
          </h2>
          <p className="font-garamond text-[var(--silver-dim)] text-xl italic leading-relaxed mb-10">
            The initiation takes twelve minutes. What it reveals will take years to fully understand.
          </p>
          <Link
            href="/signup"
            className="inline-block font-cinzel text-sm tracking-arcane px-12 py-5 border border-[var(--border-gold)] text-gold hover:bg-[rgba(201,169,110,0.08)] transition-all glow-gold"
            style={{ letterSpacing: '0.22em' }}
          >
            ENTER THE ARCHIVE
          </Link>
          <p className="font-mono text-[var(--text-dim)] text-xs tracking-ritual mt-5">
            Free to begin · Premium access available
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[var(--border)] px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-cinzel-decorative text-gold text-sm tracking-arcane glow-text-gold opacity-60">
          ARCANUM
        </span>
        <p className="font-mono text-xs text-[var(--text-dim)]">
          © {new Date().getFullYear()} Arcanum. All readings are private and encrypted.
        </p>
        <div className="flex items-center gap-6">
          <Link href="/privacy" className="font-mono text-xs text-[var(--text-dim)] hover:text-[var(--silver-dim)] transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="font-mono text-xs text-[var(--text-dim)] hover:text-[var(--silver-dim)] transition-colors">
            Terms
          </Link>
        </div>
      </footer>
    </div>
  )
}
