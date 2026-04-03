'use client'

import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-display font-medium text-[var(--muted)]">{label}</label>
        )}
        <input
          ref={ref}
          className={`
            w-full px-4 py-3 rounded-xl
            bg-[var(--surface2)] border
            ${error ? 'border-[var(--red)]' : 'border-[var(--border)]'}
            text-[var(--text)] font-display
            placeholder:text-[var(--muted)]
            outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]
            transition-all duration-200
            ${className}
          `}
          {...props}
        />
        {error && <p className="text-xs text-[var(--red)] font-display">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
