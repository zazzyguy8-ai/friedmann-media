import { BookCta, Container, Reveal, Rule, Section, SectionHeading } from '@/components/ui'
import { faqs, plans, pricingNotes } from '@/lib/content'
import { pageMeta } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Pricing',
  description:
    'A one-off build fee from £1,500 and a monthly fee from £300 to run it. Published in full, including what is not included and what the third-party costs actually are.',
  path: '/pricing',
})

export default function PricingPage() {
  return (
    <>
      <Section className="pt-16 sm:pt-24">
        <Container>
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-5">Pricing</p>
            <h1 className="display text-[2.5rem] sm:text-5xl lg:text-6xl">
              A build fee, then a monthly fee.
            </h1>
            <p className="prose-body mt-8 max-w-xl text-lg">
              Published, because you should not have to sit through a discovery call to find out
              whether we are in your range. If we are not, this page saves us both an hour.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Container>
        <Rule />
      </Container>

      <Section>
        <Container>
          <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line lg:grid-cols-3">
            {plans.map((plan) => (
              <Reveal key={plan.name}>
                <div
                  className={`flex h-full flex-col p-8 lg:p-10 ${
                    plan.featured ? 'bg-surface2' : 'bg-bg'
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h2 className="text-lg font-medium tracking-tight">{plan.name}</h2>
                    {plan.featured && (
                      <span className="rounded-full bg-accent-soft px-3 py-1 text-[0.6875rem] uppercase tracking-widest text-accent">
                        Most take this
                      </span>
                    )}
                  </div>
                  <p className="prose-body mt-3 text-sm">{plan.best}</p>

                  <div className="mt-8 border-t border-line pt-8">
                    <p className="display-sm text-4xl">{plan.build}</p>
                    <p className="mt-1 text-sm text-muted-dim">one-off build</p>
                    <p className="mt-5 text-xl text-content">
                      {plan.monthly}
                      <span className="text-sm text-muted-dim"> / month to run</span>
                    </p>
                  </div>

                  <ul className="mt-8 flex-1 space-y-3 border-t border-line pt-8">
                    {plan.features.map((f) => (
                      <li key={f} className="flex gap-3 text-sm text-muted">
                        <span
                          aria-hidden="true"
                          className="mt-[0.45rem] h-px w-3 shrink-0 bg-accent"
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <BookCta
                    variant={plan.featured ? 'primary' : 'ghost'}
                    label="Book a call"
                    className="mt-10 w-full"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-y border-line bg-surface/40">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-5">
              <SectionHeading
                eyebrow="The small print, up front"
                title="What the numbers above do and do not cover."
              />
            </Reveal>
            <Reveal className="lg:col-span-7">
              <ul className="divide-y divide-line border-y border-line">
                {pricingNotes.map((note) => (
                  <li key={note} className="py-5 text-sm leading-relaxed text-muted">
                    {note}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-4">
              <SectionHeading eyebrow="Questions" title="Before you book." />
            </Reveal>
            <Reveal className="lg:col-span-8">
              <div className="divide-y divide-line border-y border-line">
                {faqs.map((faq) => (
                  <details key={faq.q} className="group py-6">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-base font-medium tracking-tight marker:hidden">
                      {faq.q}
                      <span
                        aria-hidden="true"
                        className="mt-1 shrink-0 text-muted-dim transition-transform duration-200 group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="prose-body mt-4 max-w-prose text-sm">{faq.a}</p>
                  </details>
                ))}
              </div>
              <div className="mt-12">
                <BookCta />
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

    </>
  )
}
