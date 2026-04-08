import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Plou — AI Social Media Expert for Your Business',
  description:
    'Plou learns your business inside out, then becomes your dedicated AI social media strategist. Content ideas, personalized strategy, and always-on advice — built for your brand.',
  keywords: ['social media strategy', 'AI social media manager', 'content ideas', 'social media planner', 'business growth'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
