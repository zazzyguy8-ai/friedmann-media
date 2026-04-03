'use client'

import { motion, HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  fullWidth?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const base =
    'relative inline-flex items-center justify-center font-display font-semibold rounded-xl transition-all duration-200 cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary:
      'gradient-bg text-white shadow-lg shadow-[rgba(91,139,255,0.25)] hover:shadow-[rgba(91,139,255,0.4)] hover:opacity-90 active:opacity-80',
    secondary:
      'bg-[var(--surface2)] text-[var(--text)] border border-[var(--border)] hover:border-[var(--accent)] hover:bg-[var(--surface)] active:opacity-80',
    ghost:
      'bg-transparent text-[var(--muted)] hover:text-[var(--text)] hover:bg-[var(--surface2)] active:opacity-80',
    danger:
      'bg-[rgba(255,91,91,0.1)] text-[var(--red)] border border-[rgba(255,91,91,0.2)] hover:bg-[rgba(255,91,91,0.2)] active:opacity-80',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-2.5',
  }

  return (
    <motion.button
      whileTap={disabled || loading ? {} : { scale: 0.97 }}
      disabled={disabled || loading}
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <span className="opacity-70">Loading...</span>
        </>
      ) : (
        children
      )}
    </motion.button>
  )
}
