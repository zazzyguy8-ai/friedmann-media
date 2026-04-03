'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode
  glow?: boolean
  className?: string
}

export default function Card({ children, glow = false, className = '', ...props }: CardProps) {
  return (
    <motion.div
      className={`
        bg-[var(--surface)] border border-[var(--border)] rounded-2xl
        ${glow ? 'shadow-[0_0_30px_rgba(91,139,255,0.15)]' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  )
}
