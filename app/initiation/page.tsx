'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { createBrowserClientInstance as createBrowserClient } from '@/lib/supabase-browser'

const QUESTIONS = [
  {
    id: 1,
    question: 'You stand at the edge of a vast darkness. What rises in you first?',
    answers: [
      { id: 'A', text: 'A hunger that has no name — the dark knows something.' },
      { id: 'B', text: 'A quiet understanding. You have been here before.' },
      { id: 'C', text: 'The will to command it. This dark belongs to no one yet.' },
      { id: 'D', text: 'Patience. Darkness is simply another teacher.' },
      { id: 'E', text: 'Electricity. The chaos calls to you like recognition.' },
      { id: 'F', text: 'Nothing. You already are the dark.' },
      { id: 'G', text: 'A pain that feels, strangely, sacred.' },
    ],
  },
  {
    id: 2,
    question: 'Which force claims your deepest nature?',
    answers: [
      { id: 'A', text: 'Forbidden knowledge — what they told you not to look for.' },
      { id: 'B', text: 'The tides of emotion and intuition beneath the surface.' },
      { id: 'C', text: 'Fire that devours and transforms without apology.' },
      { id: 'D', text: 'The slow certainty of stone — permanence through patience.' },
      { id: 'E', text: 'The violence of storm — chaos as a form of honesty.' },
      { id: 'F', text: 'The infinite silence between stars.' },
      { id: 'G', text: 'Blood — raw, sacred, and incapable of lying.' },
    ],
  },
  {
    id: 3,
    question: 'What do you believe suffering ultimately reveals?',
    answers: [
      { id: 'A', text: 'Hidden patterns — the truth the comfortable cannot see.' },
      { id: 'B', text: 'The true depth of feeling — how much you are capable of.' },
      { id: 'C', text: 'Strength — what survives the fire was always gold.' },
      { id: 'D', text: 'The next stage of becoming — it is a chrysalis.' },
      { id: 'E', text: 'Power — the storm that does not kill makes you the storm.' },
      { id: 'F', text: 'The illusion of self — and the freedom on the other side.' },
      { id: 'G', text: 'Sacred meaning — nothing is wasted if it is felt completely.' },
    ],
  },
  {
    id: 4,
    question: 'Which power calls to you most deeply?',
    answers: [
      { id: 'A', text: 'To understand what no one else can — to see beneath the surface.' },
      { id: 'B', text: 'To feel the truth before it arrives — to know through the body.' },
      { id: 'C', text: 'To rule — to shape what happens through absolute authority.' },
      { id: 'D', text: 'To transmute pain into mastery — to build from what would break others.' },
      { id: 'E', text: 'To be the force that cannot be controlled — the ungovernable current.' },
      { id: 'F', text: 'To perceive reality without illusion — to see what is, exactly.' },
      { id: 'G', text: 'To love so completely it terrifies even you.' },
    ],
  },
  {
    id: 5,
    question: 'When alone in absolute darkness, what rises?',
    answers: [
      { id: 'A', text: 'Clarity — the questions that daylight makes too loud to hear.' },
      { id: 'B', text: 'Grief — the feelings you cannot carry when others are watching.' },
      { id: 'C', text: 'Ambition — the visions of what you are building.' },
      { id: 'D', text: 'Peace — the darkness is simply where you live.' },
      { id: 'E', text: 'Electricity — the ideas come faster in the dark.' },
      { id: 'F', text: 'Nothingness. A relief.' },
      { id: 'G', text: 'Intensity — the feeling that this moment is somehow holy.' },
    ],
  },
  {
    id: 6,
    question: 'What is your truest relationship to control?',
    answers: [
      { id: 'A', text: 'I study the systems that control, then dismantle them from within.' },
      { id: 'B', text: 'I release control — it is resistance, and I prefer to flow.' },
      { id: 'C', text: 'I am control. Everything bends to a will that does not apologise.' },
      { id: 'D', text: 'I cultivate control through discipline accumulated over years.' },
      { id: 'E', text: 'Control is for those who fear their own power.' },
      { id: 'F', text: 'Control is an illusion. I stopped needing it.' },
      { id: 'G', text: 'I lose control and find myself most completely in the loss.' },
    ],
  },
  {
    id: 7,
    question: 'Which ancient force calls to you most?',
    answers: [
      { id: 'A', text: 'The Library of What Was Forbidden.' },
      { id: 'B', text: 'The Moon in Her Fullness.' },
      { id: 'C', text: 'The Sun at Its Absolute Zenith.' },
      { id: 'D', text: 'The Stone That Remembers Everything.' },
      { id: 'E', text: 'The Storm That Destroys to Create.' },
      { id: 'F', text: 'The Void Before Creation.' },
      { id: 'G', text: 'The Sacred Wound That Became Medicine.' },
    ],
  },
  {
    id: 8,
    question: 'What kind of darkness draws you?',
    answers: [
      { id: 'A', text: 'The darkness of forbidden archives — what was sealed, and why.' },
      { id: 'B', text: 'The darkness behind closed eyes, full of visions.' },
      { id: 'C', text: 'The darkness before the dawn of a reign.' },
      { id: 'D', text: 'The darkness inside a chrysalis — transformation mid-process.' },
      { id: 'E', text: 'The darkness of a thundercloud building toward release.' },
      { id: 'F', text: 'The absolute dark — void of even the idea of light.' },
      { id: 'G', text: 'The darkness that lives in the chest, warm and dense and real.' },
    ],
  },
  {
    id: 9,
    question: 'Choose your deepest flaw — the one you recognise completely:',
    answers: [
      { id: 'A', text: 'I understand too much and connect too little.' },
      { id: 'B', text: 'I lose myself in others\' pain as if it were my own.' },
      { id: 'C', text: 'I believe I cannot be defeated — until something proves otherwise.' },
      { id: 'D', text: 'My patience looks like coldness to those who need warmth.' },
      { id: 'E', text: 'I destroy things without fully intending to.' },
      { id: 'F', text: 'I have become so still that people can no longer reach me.' },
      { id: 'G', text: 'I give myself to those who cannot hold what I offer.' },
    ],
  },
  {
    id: 10,
    question: 'The world ends. You are the last one standing. What do you do?',
    answers: [
      { id: 'A', text: 'I have already calculated three outcomes. I choose the least false one.' },
      { id: 'B', text: 'I weep for it completely, then listen for what comes after.' },
      { id: 'C', text: 'I begin rebuilding it — in my image, this time.' },
      { id: 'D', text: 'I become the ash. I was always the material the next world needed.' },
      { id: 'E', text: 'I was the storm that broke it. I will be the lightning that starts again.' },
      { id: 'F', text: 'I was never fully part of it. I simply continue.' },
      { id: 'G', text: 'I hold the hands of those who are afraid. That is the whole point.' },
    ],
  },
]

function ProgressRunes({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2 justify-center">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="transition-all duration-500"
          style={{
            width: i < current ? '20px' : '6px',
            height: '2px',
            background: i < current
              ? 'rgba(201, 169, 110, 0.8)'
              : 'rgba(200, 207, 224, 0.15)',
          }}
        />
      ))}
    </div>
  )
}

export default function InitiationPage() {
  const router = useRouter()
  const supabase = createBrowserClient()
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [selected, setSelected] = useState<string | null>(null)
  const [phase, setPhase] = useState<'quiz' | 'loading' | 'done'>('quiz')
  const [loadingText, setLoadingText] = useState(0)

  const loadingMessages = [
    'The archive receives your answers...',
    'Mapping elemental affinities...',
    'Tracing your psychological pattern...',
    'Identifying your hidden archetype...',
    'Generating your personal lore...',
    'The reading is almost complete...',
  ]

  useEffect(() => {
    if (phase !== 'loading') return
    const interval = setInterval(() => {
      setLoadingText((t) => {
        if (t >= loadingMessages.length - 1) return t
        return t + 1
      })
    }, 2200)
    return () => clearInterval(interval)
  }, [phase])

  function handleSelect(answerId: string) {
    setSelected(answerId)
    setTimeout(() => advance(answerId), 600)
  }

  async function advance(answerId: string) {
    const newAnswers = { ...answers, [QUESTIONS[currentQ].id]: answerId }
    setAnswers(newAnswers)
    setSelected(null)

    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ((q) => q + 1)
    } else {
      setPhase('loading')
      await submitQuiz(newAnswers)
    }
  }

  async function submitQuiz(finalAnswers: Record<number, string>) {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/login'); return }

      const res = await fetch('/api/archetype', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: finalAnswers, userId: user.id }),
      })

      if (!res.ok) throw new Error('Generation failed')
      setPhase('done')
      setTimeout(() => router.push('/portal?reveal=true'), 1800)
    } catch {
      router.push('/portal')
    }
  }

  const q = QUESTIONS[currentQ]

  if (phase === 'loading' || phase === 'done') {
    return (
      <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center px-6 text-center">
        <div
          className="fixed inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(40,20,5,0.6) 0%, transparent 70%)' }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 flex flex-col items-center gap-8"
        >
          <div className="relative w-32 h-32">
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-rune-rotate" fill="none">
              <circle cx="50" cy="50" r="45" stroke="#c9a96e" strokeWidth="0.5" strokeDasharray="3 6" />
            </svg>
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-rune-counter" fill="none">
              <polygon points="50,5 95,77 5,77" stroke="#c9a96e" strokeWidth="0.4" fill="none" opacity="0.4" />
              <polygon points="50,95 5,23 95,23" stroke="#c9a96e" strokeWidth="0.4" fill="none" opacity="0.4" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-cinzel-decorative text-gold text-3xl animate-pulse-glow">◈</span>
            </div>
          </div>

          <div>
            <p className="font-mono text-[var(--silver-dim)] text-xs tracking-arcane uppercase mb-3">
              Sanctum Analysis
            </p>
            <AnimatePresence mode="wait">
              <motion.p
                key={loadingText}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="font-cinzel text-silver text-lg"
                style={{ letterSpacing: '0.06em' }}
              >
                {phase === 'done' ? 'Your archetype has been revealed.' : loadingMessages[loadingText]}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="flex gap-1.5">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                className="w-1.5 h-1.5 rounded-full bg-gold"
              />
            ))}
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-obsidian flex flex-col relative overflow-hidden">
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(20,10,40,0.4) 0%, transparent 70%)' }}
      />

      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-20 flex items-center justify-between px-6 py-4">
        <span className="font-cinzel-decorative text-gold text-sm glow-text-gold">ARCANUM</span>
        <div className="flex flex-col items-center gap-1.5">
          <ProgressRunes current={currentQ + 1} total={QUESTIONS.length} />
          <span className="font-mono text-[var(--text-dim)] text-xs tracking-ritual">
            {currentQ + 1} / {QUESTIONS.length}
          </span>
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-10">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              {/* Question number */}
              <div className="flex items-center gap-4 mb-8">
                <div className="divider-arcane flex-1" />
                <span className="font-cinzel-decorative text-gold text-sm glow-text-gold opacity-60">
                  {['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][currentQ]}
                </span>
                <div className="divider-arcane flex-1" />
              </div>

              {/* Question text */}
              <h2 className="font-cinzel text-silver text-xl sm:text-2xl text-center mb-10 leading-relaxed"
                style={{ letterSpacing: '0.05em' }}>
                {q.question}
              </h2>

              {/* Answers */}
              <div className="flex flex-col gap-3">
                {q.answers.map((answer) => (
                  <motion.button
                    key={answer.id}
                    onClick={() => handleSelect(answer.id)}
                    disabled={selected !== null}
                    whileHover={{ x: 4 }}
                    className="text-left px-6 py-4 border transition-all duration-300 flex items-start gap-4 group"
                    style={{
                      borderColor: selected === answer.id
                        ? 'rgba(201, 169, 110, 0.7)'
                        : 'rgba(200, 207, 224, 0.08)',
                      background: selected === answer.id
                        ? 'rgba(201, 169, 110, 0.06)'
                        : 'transparent',
                    }}
                  >
                    <span className="font-mono text-[var(--gold-dim)] text-xs mt-1 shrink-0 group-hover:text-gold transition-colors">
                      {answer.id}
                    </span>
                    <span className="font-garamond text-[var(--silver-dim)] text-base italic leading-relaxed group-hover:text-silver transition-colors">
                      {answer.text}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
