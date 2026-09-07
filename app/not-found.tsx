import Link from 'next/link'
import { BookCta, Container, Section } from '@/components/ui'

export default function NotFound() {
  return (
    <Section className="pt-24 sm:pt-32">
      <Container>
        <div className="max-w-xl">
          <p className="eyebrow mb-5">404</p>
          <h1 className="display text-4xl sm:text-5xl">This page does not exist.</h1>
          <p className="prose-body mt-6">
            The link may be out of date. Everything we do is on the{' '}
            <Link
              href="/services"
              className="text-content underline decoration-line-strong underline-offset-4 hover:decoration-accent"
            >
              services page
            </Link>
            .
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <BookCta />
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-line-strong px-6 py-3 text-sm text-content transition-colors hover:border-accent hover:text-accent"
            >
              Back to home
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  )
}
