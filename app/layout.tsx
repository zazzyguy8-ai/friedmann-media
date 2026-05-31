import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DRIP STUDIO — AI Video Ads for Clothing Brands',
  description: 'Turn product photos into scroll-stopping video ads in 60 seconds. Built for clothing brands. Powered by AI.',
  openGraph: {
    title: 'DRIP STUDIO',
    description: 'AI Video Ad Generator for Clothing Brands',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
