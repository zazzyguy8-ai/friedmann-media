import Link from 'next/link'
import type { ReactNode } from 'react'
import { site } from '@/lib/site'

/** Page gutter. One value, used everywhere, so the grid never drifts. */
export function Container({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={`mx-auto w-full max-w-6xl px-6 sm:px-8 ${className}`}>{children}</div>
}

export function Section({
  children,
  className = '',
  id,
}: {
  children: ReactNode
  className?: string
  id?: string
}) {
  return (
    <section id={id} className={`py-20 sm:py-28 lg:py-section ${className}`}>
      {children}
    </section>
  )
}

export function Rule() {
  return <div className="rule" aria-hidden="true" />
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow mb-5">{children}</p>
}

/**
 * The booking button. It is a plain external link rather than an embedded
 * widget so the page carries no third-party script weight, and so a visitor
 * with scripts blocked can still reach the calendar.
 */
export function BookCta({
  variant = 'primary',
  label,
  className = '',
}: {
  variant?: 'primary' | 'ghost'
  label?: string
  className?: string
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200'
  const styles =
    variant === 'primary'
      ? 'bg-content text-bg hover:bg-white'
      : 'border border-line-strong text-content hover:border-accent hover:text-accent'
  return (
    <a
      href={site.bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${styles} ${className}`}
    >
      {label ?? site.bookingLabel}
      <span aria-hidden="true">&rarr;</span>
    </a>
  )
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="text-content underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
    >
      {children}
    </Link>
  )
}

/** Wraps content that fades in as it scrolls into view. See <RevealScript>. */
export function Reveal({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={`reveal ${className}`}>{children}</div>
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  className = '',
}: {
  eyebrow?: string
  title: string
  lead?: string
  className?: string
}) {
  return (
    <div className={`max-w-3xl ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="display-sm text-3xl sm:text-4xl lg:text-[2.75rem]">{title}</h2>
      {lead && <p className="prose-body mt-6 max-w-prose text-base sm:text-lg">{lead}</p>}
    </div>
  )
}

/** An estimate, marked as one. Never used to dress up a measured result. */
export function EstimateNote({ children }: { children: ReactNode }) {
  return (
    <p className="mt-6 border-l-2 border-line-strong pl-4 text-sm leading-relaxed text-muted-dim">
      <span className="font-mono text-[0.6875rem] uppercase tracking-widest text-muted-dim">
        Illustration
      </span>
      <br />
      {children}
    </p>
  )
}
