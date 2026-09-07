/**
 * Single source of truth for everything about the business that appears on the
 * site: name, contact details, booking link, pricing, legal identity.
 *
 * Anything a visitor could act on lives here rather than being scattered
 * through the pages, so it can be corrected in one place. Values marked
 * NEEDS CONFIRMATION are placeholders that must be replaced before the site is
 * pointed at the live domain - they are the kind of detail a prospect (or the
 * ICO) will check.
 */

export const site = {
  name: 'Friedmann Media',
  /** Used in <title> suffixes and JSON-LD. */
  legalName: 'Friedmann Media',
  domain: 'friedmann-media.com',
  url: 'https://friedmann-media.com',
  tagline: 'AI enquiry handling for UK clinics and high-value local businesses',
  description:
    'We build AI systems that answer every enquiry in under a minute, qualify it, and book it into your diary - for UK private dental clinics and other high-value local businesses.',

  /**
   * Every call-to-action on the site points here. NEEDS CONFIRMATION - replace
   * with the real Cal.com event link before launch; a dead booking link is
   * worse than no button at all.
   */
  bookingUrl: 'https://cal.com/friedmann-media/intro',
  bookingLabel: 'Book a 20-minute call',
  /** Shown next to the CTA so the visitor knows what they are agreeing to. */
  bookingNote: '20 minutes, no pitch deck. We look at how enquiries reach you today.',

  email: 'hello@friedmann-media.com',
  /** Optional. Leave null to hide the phone line rather than invent one. */
  phone: null as string | null,

  founder: {
    /** NEEDS CONFIRMATION - appears in the About page signature and in JSON-LD. */
    name: 'Richard Friedmann',
    role: 'Founder',
  },

  /**
   * NEEDS CONFIRMATION. A UK-facing business site that processes enquiry data
   * needs a real postal address and, in most cases, an ICO registration
   * number. Both are referenced from the privacy policy.
   */
  legal: {
    address: 'Address to be confirmed',
    companyNumber: null as string | null,
    icoRegistration: null as string | null,
  },

  social: {
    linkedin: null as string | null,
  },
} as const

/** Primary market, used in copy and in the JSON-LD service area. */
export const serviceArea = ['United Kingdom'] as const

export const nav = [
  { href: '/services', label: 'Services' },
  { href: '/dental-clinics', label: 'Dental clinics' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
] as const
