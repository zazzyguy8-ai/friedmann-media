import Link from 'next/link'
import { nav, site } from '@/lib/site'
import { BookCta, Container, Rule } from './ui'

export function SiteFooter() {
  return (
    <footer className="pb-14 pt-10">
      <Container>
        <Rule />
        <div className="grid gap-12 pt-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="text-[0.9375rem] font-medium tracking-tight">
              {site.name}
              <span className="text-accent">.</span>
            </p>
            <p className="prose-body mt-4 max-w-sm text-sm">{site.tagline}.</p>
            <BookCta className="mt-8" />
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow mb-5">Site</p>
            <ul className="space-y-3 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-muted transition-colors hover:text-content">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className="text-muted transition-colors hover:text-content">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="eyebrow mb-5">Contact</p>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="text-muted transition-colors hover:text-content"
                >
                  {site.email}
                </a>
              </li>
              {site.phone && (
                <li>
                  <a
                    href={`tel:${site.phone.replace(/\s/g, '')}`}
                    className="text-muted transition-colors hover:text-content"
                  >
                    {site.phone}
                  </a>
                </li>
              )}
              <li>
                <Link href="/privacy" className="text-muted transition-colors hover:text-content">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted transition-colors hover:text-content">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-line pt-8 text-xs text-muted-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p>Built and run in-house. United Kingdom.</p>
        </div>
      </Container>
    </footer>
  )
}
