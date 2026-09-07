'use client'

import { useEffect } from 'react'

/**
 * Adds the scroll reveal to elements with `.reveal`.
 *
 * The `js` class on <html> is what switches the CSS from "always visible" to
 * "fade in when observed", so the content is never hidden for a visitor
 * without JavaScript - a crawler or a blocked script must still see the copy.
 */
export function RevealScript() {
  useEffect(() => {
    const root = document.documentElement
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || typeof IntersectionObserver === 'undefined') return

    root.classList.add('js')
    const targets = Array.from(document.querySelectorAll('.reveal'))

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )

    for (const el of targets) observer.observe(el)
    return () => {
      observer.disconnect()
      root.classList.remove('js')
    }
  }, [])

  return null
}
