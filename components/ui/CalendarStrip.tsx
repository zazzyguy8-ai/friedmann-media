'use client'

import { motion } from 'framer-motion'
import { DayStatus } from '@/types'

interface CalendarStripProps {
  days: DayStatus[]
}

export default function CalendarStrip({ days }: CalendarStripProps) {
  return (
    <div className="flex items-end gap-2 justify-center">
      {days.map((day, i) => (
        <motion.div
          key={day.date}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="flex flex-col items-center gap-1.5"
        >
          <div
            className={`
              w-10 h-10 rounded-full flex items-center justify-center text-sm
              transition-all duration-200
              ${
                day.is_today
                  ? 'border-2 border-[var(--accent)] shadow-[0_0_12px_rgba(91,139,255,0.4)] bg-[var(--surface2)]'
                  : day.completed
                  ? 'bg-[rgba(61,224,135,0.15)] border border-[var(--green)]'
                  : 'bg-[var(--surface2)] border border-[var(--border)]'
              }
            `}
          >
            {day.completed ? (
              <span className="text-[var(--green)] font-bold">✓</span>
            ) : day.is_today ? (
              <span className="text-[var(--accent)] text-xs font-mono">·</span>
            ) : (
              <span className="text-[var(--muted)] text-xs">·</span>
            )}
          </div>
          <span
            className={`
              font-mono text-xs
              ${day.is_today ? 'text-[var(--accent)]' : 'text-[var(--muted)]'}
            `}
          >
            {day.label}
          </span>
        </motion.div>
      ))}
    </div>
  )
}
