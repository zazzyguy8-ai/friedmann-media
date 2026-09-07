'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { nav, site } from '@/lib/site'
import { BookCta, Container } from './ui'

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Close the mobile menu on navigation - otherwise it stays open over the
  // new page, which on a phone looks like the link did nothing.
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Stop the page behind the menu from scrolling while it is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'border-b border-line bg-bg/85 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <Container>
        <div className="flex h-16 items-center justify-between sm:h-20">
          <Link
            href="/"
            className="text-[0.9375rem] font-medium tracking-tight text-content"
            aria-label={`${site.name} home`}
          >
            {site.name}
            <span className="text-accent">.</span>
          </Link>

          <nav className="hidden items-center gap-9 md:flex" aria-label="Main">
            {nav.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`text-sm transition-colors ${
                    active ? 'text-content' : 'text-muted hover:text-content'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="hidden md:block">
            <BookCta label="Book a call" className="px-5 py-2.5 text-[0.8125rem]" />
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="-mr-2 p-2 text-content md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span className="relative block h-4 w-6" aria-hidden="true">
              <span
                className={`absolute left-0 block h-px w-6 bg-current transition-transform duration-300 ${
                  open ? 'top-2 rotate-45' : 'top-1'
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-6 bg-current transition-transform duration-300 ${
                  open ? 'top-2 -rotate-45' : 'top-[11px]'
                }`}
              />
            </span>
          </button>
        </div>
      </Container>

      {open && (
        <div id="mobile-menu" className="md:hidden">
          <Container>
            <nav className="flex flex-col gap-1 pb-8 pt-2" aria-label="Main">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="border-b border-line py-4 text-lg text-content"
                >
                  {item.label}
                </Link>
              ))}
              <BookCta className="mt-6 w-full" />
            </nav>
          </Container>
        </div>
      )}
    </header>
  )
}
