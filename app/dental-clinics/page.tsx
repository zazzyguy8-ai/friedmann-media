import {
  BookCta,
  Container,
  EstimateNote,
  Reveal,
  Rule,
  Section,
  SectionHeading,
  TextLink,
} from '@/components/ui'
import { illustration, process } from '@/lib/content'
import { JsonLd, pageMeta, serviceSchema } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'AI enquiry handling for private dental clinics',
  description:
    'Implant and aligner enquiries answered in under a minute, qualified, and booked into your practice diary — evenings and weekends included. Built for UK private dental practices.',
  path: '/dental-clinics',
})

const enquiryRoutes = [
  ['Website enquiry form', 'Lands in a shared inbox two people half-check'],
  ['WhatsApp', 'Goes to whichever phone is nearest'],
  ['Instagram and Facebook', 'Nobody formally owns it'],
  ['Missed calls', 'A voicemail, if the caller bothers'],
  ['Treatment page enquiries', 'The highest-value ones, and the most impatient'],
]

const qualifies = [
  'Which treatment they are asking about',
  'How soon they want to be seen',
  'Whether they are an existing patient',
  'Whether they are within travelling distance',
  'When they can actually attend',
  'Anything that needs a clinician, flagged and escalated',
]

export default function DentalClinicsPage() {
  return (
    <>
      <Section className="pt-16 sm:pt-24">
        <Container>
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-5">Private dental clinics</p>
            <h1 className="display text-[2.5rem] leading-[1.05] sm:text-5xl lg:text-6xl">
              Your implant enquiries arrive after 6pm.
            </h1>
            <p className="prose-body mt-8 max-w-xl text-lg">
              So do the aligner enquiries, and the ones about veneers. They arrive when the person
              finally sits down with their phone — which is exactly when your front desk has gone
              home.
            </p>
            <BookCta className="mt-10" />
            <p className="mt-6 text-sm text-muted-dim">
              We will look at your actual enquiry routes on the call.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Container>
        <Rule />
      </Container>

      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-5">
              <SectionHeading
                eyebrow="Where enquiries go"
                title="Five doors into your practice. Nobody owns all five."
                lead="Every practice we look at has the same shape of problem: the enquiries are arriving, they are just arriving somewhere nobody is watching."
              />
            </Reveal>
            <Reveal className="lg:col-span-7">
              <ul className="divide-y divide-line border-y border-line">
                {enquiryRoutes.map(([route, fate]) => (
                  <li key={route} className="py-5">
                    <p className="font-medium tracking-tight">{route}</p>
                    <p className="mt-1 text-sm text-muted-dim">{fate}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-line bg-surface/40">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-5">
              <SectionHeading
                eyebrow="What it establishes"
                title="A short conversation, not a form."
                lead="It asks the questions your treatment coordinator would ask, in the same order, and stops as soon as it has enough to book."
              />
            </Reveal>
            <Reveal className="lg:col-span-7">
              <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
                {qualifies.map((q) => (
                  <li key={q} className="bg-bg p-6 text-sm text-muted">
                    {q}
                  </li>
                ))}
              </ul>
              <p className="prose-body mt-8 max-w-prose text-sm">
                What it will not do is give clinical advice, quote a treatment plan it has not been
                given, or tell somebody whether they are a candidate for implants. That is a
                clinician&rsquo;s job and the system is built to refuse it.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-5">
              <SectionHeading
                eyebrow="Compliance"
                title="Built for a healthcare provider, not a shop."
              />
            </Reveal>
            <Reveal className="lg:col-span-7">
              <ul className="space-y-6">
                {[
                  [
                    'It identifies itself as an assistant',
                    'Patients are told who they are talking to before they say anything about themselves.',
                  ],
                  [
                    'No clinical advice, enforced',
                    'The boundary is written into the system and tested before go-live, not left to judgement in the moment.',
                  ],
                  [
                    'UK GDPR and PECR',
                    'A lawful basis for each message, retention limits you set, a working opt-out honoured everywhere, and a written record of what was sent.',
                  ],
                  [
                    'Everything is logged',
                    'Every conversation is readable in full, so a complaint or a query can be answered from the record rather than from memory.',
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

      <Section className="border-y border-line bg-surface/40">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Getting there"
              title="From first call to live in about a month."
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

      <Section>
        <Container>
          <Reveal className="max-w-3xl">
            <SectionHeading
              eyebrow="Before you ask about ROI"
              title="We will not quote you a number we made up."
            />
            <ul className="mt-8 space-y-3">
              {illustration.assumptions.map((a) => (
                <li key={a} className="flex gap-4 text-sm text-muted">
                  <span aria-hidden="true" className="mt-[0.45rem] h-px w-4 shrink-0 bg-accent" />
                  {a}
                </li>
              ))}
            </ul>
            <EstimateNote>{illustration.point}</EstimateNote>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
              <BookCta />
              <span className="text-sm text-muted-dim">
                Or read the <TextLink href="/pricing">pricing</TextLink> first.
              </span>
            </div>
          </Reveal>
        </Container>
      </Section>

      <JsonLd
        data={serviceSchema({
          name: 'AI enquiry handling for private dental clinics',
          description:
            'AI lead response, qualification and appointment booking built for UK private dental practices, including implant and aligner enquiries received out of hours.',
          path: '/dental-clinics',
        })}
      />
    </>
  )
}
