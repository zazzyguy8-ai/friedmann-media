import Link from 'next/link'
import {
  BookCta,
  Container,
  EstimateNote,
  Eyebrow,
  Reveal,
  Rule,
  Section,
  SectionHeading,
  TextLink,
} from '@/components/ui'
import { faqs, illustration, pipeline, plans, process, sectors, services } from '@/lib/content'
import { JsonLd, faqSchema } from '@/lib/seo'
import { site } from '@/lib/site'

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Section className="pt-16 sm:pt-24 lg:pt-32">
        <Container>
          <Reveal className="max-w-4xl">
            <Eyebrow>AI automation for UK clinics &amp; local businesses</Eyebrow>
            <h1 className="display text-[2.5rem] leading-[1.05] sm:text-6xl lg:text-7xl">
              Every enquiry answered
              <br />
              <span className="text-muted-dim">in under a minute.</span>
            </h1>
            <p className="prose-body mt-8 max-w-xl text-lg sm:text-xl">
              We build the system that replies to every new enquiry, works out what the person
              actually needs, and books the ones worth your time straight into your diary — at 9pm on
              a Sunday as readily as on a Tuesday morning.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <BookCta />
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-1 py-3 text-sm text-muted transition-colors hover:text-content"
              >
                See what we build <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
            <p className="mt-6 text-sm text-muted-dim">{site.bookingNote}</p>
          </Reveal>
        </Container>
      </Section>

      <Container>
        <Rule />
      </Container>

      {/* The problem */}
      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-5">
              <SectionHeading
                eyebrow="The problem"
                title="The enquiry arrives at 8:40pm. You reply at 9:15 the next morning."
              />
            </Reveal>
            <Reveal className="lg:col-span-7">
              <div className="space-y-6 text-base leading-relaxed text-muted sm:text-lg">
                <p>
                  By then they have messaged two other practices. The one that answered first is the
                  one they are now talking to. Nothing about your clinic was worse — you were just
                  closed.
                </p>
                <p>
                  It is not only the evenings. It is the third enquiry that arrives while reception
                  is on the phone, the Instagram message nobody owns, the form that goes to an inbox
                  two people half-check, and the enquiry from six weeks ago that was never followed
                  up because the week got busy.
                </p>
                <p className="text-content">
                  These are the enquiries for your highest-value work. The people asking about
                  implants and aligners are, almost by definition, the ones shopping around.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* How it works */}
      <Section className="border-y border-line bg-surface/40">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What we build"
              title="One system, six jobs."
              lead="Not a chatbot bolted onto your website. A pipeline that takes an enquiry from wherever it lands to a confirmed appointment in your diary — and stops the moment it needs a human."
            />
          </Reveal>
          <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {pipeline.map((item) => (
              <Reveal key={item.step}>
                <div className="h-full bg-bg p-8 lg:p-10">
                  <span className="font-mono text-xs text-accent">{item.step}</span>
                  <h3 className="mt-5 text-lg font-medium tracking-tight">{item.title}</h3>
                  <p className="prose-body mt-3 text-sm">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Guardrails - the differentiator, and the honest bit */}
      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-5">
              <SectionHeading
                eyebrow="Guardrails"
                title="What it will not do, and why that matters more than what it will."
              />
            </Reveal>
            <Reveal className="lg:col-span-7">
              <ul className="space-y-6">
                {[
                  [
                    'It never gives clinical advice.',
                    'Symptoms, suitability, medication, any clinical opinion — the automation stops and a named human takes over.',
                  ],
                  [
                    'It never pretends to be a person.',
                    'It says what it is at the start of the conversation. For a healthcare provider that is not just honest, it is the safe position.',
                  ],
                  [
                    'It never invents an answer.',
                    'If the information is not in what you gave us, it says it does not know and passes the conversation on, with everything said so far attached.',
                  ],
                  [
                    'It never keeps messaging someone who asked it to stop.',
                    'One opt-out is honoured on every channel, permanently, without anyone having to remember to action it.',
                  ],
                ].map(([title, body]) => (
                  <li key={title} className="border-l border-line-strong pl-6">
                    <p className="font-medium tracking-tight">{title}</p>
                    <p className="prose-body mt-2 text-sm">{body}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Services */}
      <Section className="border-y border-line bg-surface/40">
        <Container>
          <Reveal>
            <SectionHeading eyebrow="Services" title="Three things, done properly." />
          </Reveal>
          <div className="mt-16 space-y-px overflow-hidden rounded-lg border border-line bg-line">
            {services.map((service, i) => (
              <Reveal key={service.slug}>
                <Link
                  href="/services"
                  className="group grid gap-6 bg-bg p-8 transition-colors hover:bg-surface2 sm:grid-cols-12 sm:items-baseline lg:p-10"
                >
                  <span className="font-mono text-xs text-muted-dim sm:col-span-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-xl font-medium tracking-tight sm:col-span-4">
                    {service.title}
                  </h3>
                  <p className="prose-body text-sm sm:col-span-6">{service.summary}</p>
                  <span
                    aria-hidden="true"
                    className="text-muted-dim transition-colors group-hover:text-accent sm:col-span-1 sm:text-right"
                  >
                    &rarr;
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Who it is for */}
      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-5">
              <SectionHeading
                eyebrow="Who this is for"
                title="Businesses where one missed enquiry costs four figures."
                lead="The common thread is not the industry. It is the arithmetic: enquiries arrive faster than a small front desk can answer them, and each one is worth enough to be worth catching."
              />
              <div className="mt-8">
                <TextLink href="/dental-clinics">
                  How this works for private dental clinics
                </TextLink>
              </div>
            </Reveal>
            <Reveal className="lg:col-span-7">
              <ul className="divide-y divide-line border-y border-line">
                {sectors.map((sector) => (
                  <li key={sector.name} className="flex flex-wrap items-baseline gap-x-4 gap-y-1 py-5">
                    <span className="font-medium tracking-tight">{sector.name}</span>
                    <span className="text-sm text-muted-dim">{sector.note}</span>
                  </li>
                ))}
              </ul>
              <EstimateNote>{illustration.point}</EstimateNote>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section className="border-y border-line bg-surface/40">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="How we work"
              title="Five steps, and you can stop at any of them."
              lead="Nothing goes near a patient until you have read it and approved the wording."
            />
          </Reveal>
          <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-line bg-line lg:grid-cols-5">
            {process.map((step) => (
              <Reveal key={step.n}>
                <div className="flex h-full flex-col bg-bg p-8">
                  <span className="font-mono text-xs text-accent">{step.n}</span>
                  <h3 className="mt-5 text-base font-medium tracking-tight">{step.title}</h3>
                  <p className="prose-body mt-3 flex-1 text-sm">{step.body}</p>
                  <p className="mt-6 font-mono text-[0.6875rem] uppercase tracking-widest text-muted-dim">
                    {step.duration}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Pricing summary */}
      <Section>
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Pricing"
              title="A one-off build fee, then a monthly fee to run it."
              lead="Published, because you should not have to sit through a call to find out whether this is in your range."
            />
          </Reveal>
          <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-line bg-line lg:grid-cols-3">
            {plans.map((plan) => (
              <Reveal key={plan.name}>
                <div
                  className={`flex h-full flex-col p-8 lg:p-10 ${
                    plan.featured ? 'bg-surface2' : 'bg-bg'
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-lg font-medium tracking-tight">{plan.name}</h3>
                    {plan.featured && (
                      <span className="rounded-full bg-accent-soft px-3 py-1 text-[0.6875rem] uppercase tracking-widest text-accent">
                        Most take this
                      </span>
                    )}
                  </div>
                  <p className="prose-body mt-3 text-sm">{plan.best}</p>
                  <div className="mt-8">
                    <p className="display-sm text-3xl">{plan.build}</p>
                    <p className="mt-1 text-sm text-muted-dim">one-off build</p>
                    <p className="mt-4 text-lg text-content">
                      {plan.monthly}
                      <span className="text-sm text-muted-dim"> / month to run</span>
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-10">
              <TextLink href="/pricing">Full pricing, and what is not included</TextLink>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* FAQ */}
      <Section className="border-t border-line bg-surface/40">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-4">
              <SectionHeading eyebrow="Questions" title="The ones that come up every time." />
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
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Closing CTA */}
      <Section>
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="display-sm text-3xl sm:text-4xl lg:text-5xl">
              Find out what you are missing.
            </h2>
            <p className="prose-body mx-auto mt-6 max-w-prose text-base sm:text-lg">
              Twenty minutes. We look at how enquiries reach you today and where they stall. If
              there is nothing here worth automating, we will tell you on the call.
            </p>
            <div className="mt-10 flex justify-center">
              <BookCta />
            </div>
            <p className="mt-6 text-sm text-muted-dim">
              Prefer email?{' '}
              <a
                href={`mailto:${site.email}`}
                className="text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-content"
              >
                {site.email}
              </a>
            </p>
          </Reveal>
        </Container>
      </Section>

      <JsonLd data={faqSchema} />
    </>
  )
}
