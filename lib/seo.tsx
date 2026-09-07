import type { Metadata } from 'next'
import { faqs } from './content'
import { serviceArea, site } from './site'

/**
 * Page metadata in one shape, so every page ends up with a canonical URL, an
 * OpenGraph entry and a Twitter card without each one remembering to.
 */
export function pageMeta({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}): Metadata {
  const url = `${site.url}${path === '/' ? '' : path}`
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url,
      siteName: site.name,
      locale: 'en_GB',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${site.name}`,
      description,
    },
  }
}

/** Renders a JSON-LD block. Kept in one place so the shape stays valid. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // The payload is our own static content, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

export const organisationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${site.url}/#organisation`,
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  email: site.email,
  description: site.description,
  areaServed: serviceArea.map((name) => ({ '@type': 'Country', name })),
  founder: { '@type': 'Person', name: site.founder.name },
  knowsAbout: [
    'AI lead response automation',
    'Appointment booking automation',
    'Enquiry qualification',
    'Dental practice automation',
  ],
}

export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export function serviceSchema({
  name,
  description,
  path,
}: {
  name: string
  description: string
  path: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `${site.url}${path}`,
    provider: { '@id': `${site.url}/#organisation` },
    areaServed: serviceArea.map((n) => ({ '@type': 'Country', name: n })),
  }
}
