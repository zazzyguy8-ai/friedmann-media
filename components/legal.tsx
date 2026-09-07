import type { ReactNode } from 'react'
import { Container, Reveal, Rule, Section } from './ui'

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string
  updated: string
  children: ReactNode
}) {
  return (
    <>
      <Section className="pb-10 pt-16 sm:pt-24">
        <Container>
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-5">Legal</p>
            <h1 className="display text-[2.5rem] sm:text-5xl">{title}</h1>
            <p className="mt-6 font-mono text-xs uppercase tracking-widest text-muted-dim">
              Last updated {updated}
            </p>
          </Reveal>
        </Container>
      </Section>

      <Container>
        <Rule />
      </Container>

      <Section className="pt-14">
        <Container>
          <div className="max-w-prose space-y-10">{children}</div>
        </Container>
      </Section>
    </>
  )
}

export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-medium tracking-tight">{heading}</h2>
      <div className="prose-body mt-4 space-y-4 text-sm">{children}</div>
    </section>
  )
}
