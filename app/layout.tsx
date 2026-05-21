import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ARCANUM — Discover Your Hidden Archetype',
  description:
    'A private system of self-discovery through symbolism, archetypes, and ancient psychology. Enter the archive. Reveal what you are.',
  keywords: ['archetype', 'self-discovery', 'mystical', 'psychology', 'ritual', 'jungian'],
  openGraph: {
    title: 'ARCANUM',
    description: 'You were not meant to find this.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
