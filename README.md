# Friedmann Media

Marketing site for Friedmann Media — AI enquiry handling for UK private dental
clinics and other high-value local businesses.

Next.js 14 (App Router), TypeScript, Tailwind. Fully static: every route is
prerendered at build time, there is no database, no API route and no runtime
secret.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # typecheck + lint
npm run build      # production build
```

## Before this goes live on the domain

Everything a visitor can act on lives in `lib/site.ts`. Three values in there
are placeholders and must be replaced — they are marked `NEEDS CONFIRMATION`:

| Value | Why it matters |
| --- | --- |
| `bookingUrl` | Every call-to-action on the site points at it. A dead booking link is worse than no button. |
| `founder.name` | Appears in the About page signature and in the JSON-LD. |
| `legal.address`, `legal.companyNumber`, `legal.icoRegistration` | Referenced by the privacy policy. A UK business processing enquiry data generally needs an ICO registration. |

`legal.companyNumber` and `legal.icoRegistration` are `null` by default and the
privacy page simply omits those lines rather than printing a placeholder at a
visitor.

The privacy policy and terms describe how this business actually intends to
operate, but they have not been reviewed by a solicitor. Have them checked
before relying on them.

## Structure

```
app/
  page.tsx              home
  services/             what we build
  dental-clinics/       primary ICP landing page
  pricing/              published pricing
  about/                positioning
  contact/              booking
  privacy/, terms/      legal
  sitemap.ts, robots.ts
components/
  site-header.tsx       nav, mobile menu
  site-footer.tsx
  ui.tsx                layout primitives, CTA, section headings
  legal.tsx             legal page shell
  reveal-script.tsx     scroll reveal (progressive enhancement)
lib/
  site.ts               business identity, contact, booking link
  content.ts            all site copy as data
  seo.tsx               metadata helpers and JSON-LD
```

## Copy rules

`lib/content.ts` is the single source of the site's claims, and it follows one
rule: **no claim about a result we have not measured.**

What the system *does* — replies within a minute, refuses clinical advice, logs
every conversation, honours an opt-out everywhere — is a property of what gets
built and is stated plainly. What it *earned somebody* is not stated at all
unless it is labelled as an illustration with its assumptions shown, which is
what the `<EstimateNote>` component is for.

There are no testimonials, client logos or performance statistics on this site,
because there are none to show yet. Add them when they are real.
