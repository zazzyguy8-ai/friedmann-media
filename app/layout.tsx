import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Plou — Daily challenges that actually stick',
  description:
    'One AI-generated challenge every day based on your goals. Build streaks. Change your life. 7 days free.',
  keywords: ['daily challenges', 'habit building', 'AI', 'productivity', 'streak'],
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
