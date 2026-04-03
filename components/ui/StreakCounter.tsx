'use client'

import { useEffect, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

function AnimatedNumber({ value, className }: { value: number; className?: string }) {
  const spring = useSpring(0, { stiffness: 100, damping: 20 })
  const display = useTransform(spring, (v) => Math.round(v))
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    spring.set(value)
  }, [spring, value])

  useEffect(() => {
    const unsubscribe = display.onChange((v) => setDisplayValue(v))
    return unsubscribe
  }, [display])

  return <span className={className}>{displayValue}</span>
}

interface StreakCounterProps {
  streak: number
  size?: 'sm' | 'lg'
}

export default function StreakCounter({ streak, size = 'lg' }: StreakCounterProps) {
  const motivationalLine = () => {
    if (streak === 0) return 'Start your streak today.'
    if (streak < 7) return 'Keep going!'
    if (streak < 14) return 'One week strong 🔥'
    if (streak < 30) return 'Two weeks! You\'re building something real.'
    return 'A month. Most people quit by now. You didn\'t.'
  }

  if (size === 'sm') {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xl">🔥</span>
        <span className="font-mono font-medium text-[var(--text)]">{streak}</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-3">
        <motion.span
          className="text-5xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          🔥
        </motion.span>
        <AnimatedNumber
          value={streak}
          className="font-mono font-medium text-[80px] leading-none text-[var(--text)]"
        />
      </div>
      <p className="font-display text-[var(--muted)] text-lg">day streak</p>
      <motion.p
        key={streak}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-[var(--text)] text-sm text-center mt-1"
      >
        {motivationalLine()}
      </motion.p>
    </div>
  )
}
