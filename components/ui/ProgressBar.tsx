'use client'

import { motion } from 'framer-motion'

interface ProgressBarProps {
  progress: number // 0-100
  label?: string
  color?: string
  className?: string
}

export default function ProgressBar({
  progress,
  label,
  color = 'var(--accent)',
  className = '',
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, progress))

  return (
    <div className={`w-full flex flex-col gap-1.5 ${className}`}>
      {label && (
        <div className="flex justify-between items-center">
          <span className="text-xs font-mono text-[var(--muted)]">{label}</span>
          <span className="text-xs font-mono text-[var(--muted)]">{Math.round(clamped)}%</span>
        </div>
      )}
      <div className="w-full h-1.5 bg-[var(--surface2)] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  )
}
