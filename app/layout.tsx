import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Plou — One AI for your entire online presence',
  description:
    'Tell Plou about your business. It becomes your social media strategist, website builder, and AI chatbot — all personalized to your brand. Join the waitlist.',
  keywords: ['AI social media manager', 'website builder AI', 'chatbot builder', 'social media strategy', 'business growth', 'content ideas'],
  openGraph: {
    title: 'Plou — One AI for your entire online presence',
    description: 'Social media strategy, website builder, and AI chatbot — all personalized to your business.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plou — One AI for your entire online presence',
    description: 'Social media strategy, website builder, and AI chatbot — all personalized to your business.',
  },
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
