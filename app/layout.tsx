import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { RevealScript } from '@/components/reveal-script'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { JsonLd, organisationSchema } from '@/lib/seo'
import { site } from '@/lib/site'
import './globals.css'

// Self-hosted, so there is no render-blocking request to a font CDN and no
// third party sees the visitor's IP.
const sans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-sans',
  weight: '100 900',
  display: 'swap',
})

const mono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-mono',
  weight: '100 900',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    'AI lead response',
    'AI appointment booking',
    'dental practice automation UK',
    'AI receptionist for clinics',
    'enquiry qualification automation',
    'AI automation agency UK',
  ],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  alternates: { canonical: site.url },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
}

export const viewport = {
  themeColor: '#08090a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${sans.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-content focus:px-5 focus:py-2 focus:text-sm focus:text-bg"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="pt-16 sm:pt-20">
          {children}
        </main>
        <SiteFooter />
        <RevealScript />
        <JsonLd data={organisationSchema} />
      </body>
    </html>
  )
}
