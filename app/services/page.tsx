import { BookCta, Container, Reveal, Rule, Section, SectionHeading } from '@/components/ui'
import { pipeline, services } from '@/lib/content'
import { JsonLd, pageMeta, serviceSchema } from '@/lib/seo'

export const metadata = pageMeta({
  title: 'Services',
  description:
    'AI lead response and qualification, appointment booking into your live diary, and follow-up that stops the moment someone replies. Built for UK clinics and high-value local businesses.',
  path: '/services',
})

export default function ServicesPage() {
  return (
    <>
      <Section className="pt-16 sm:pt-24">
        <Container>
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-5">Services</p>
            <h1 className="display text-[2.5rem] sm:text-5xl lg:text-6xl">
              Three things, done properly.
            </h1>
            <p className="prose-body mt-8 max-w-xl text-lg">
              We do not build a bit of everything. We build the enquiry-to-appointment path, and we
              build it so it holds up on a Sunday night when nobody is watching it.
            </p>
            <BookCta className="mt-10" />
          </Reveal>
        </Container>
      </Section>

      <Container>
        <Rule />
      </Container>

      {services.map((service, i) => (
        <Section key={service.slug} className={i % 2 === 1 ? 'border-y border-line bg-surface/40' : ''}>
          <Container>
            <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
              <Reveal className="lg:col-span-5">
                <span className="font-mono text-xs text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="display-sm mt-5 text-3xl sm:text-4xl">{service.title}</h2>
                <p className="prose-body mt-6 max-w-prose">{service.summary}</p>
              </Reveal>
              <Reveal className="lg:col-span-7">
                <p className="max-w-prose text-base leading-relaxed text-muted sm:text-lg">
                  {service.detail}
                </p>
                <ul className="mt-10 divide-y divide-line border-y border-line">
                  {service.includes.map((item) => (
                    <li key={item} className="flex gap-4 py-4 text-sm">
                      <span aria-hidden="true" className="mt-[0.4rem] h-px w-4 shrink-0 bg-accent" />
                      <span className="text-muted">{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </Container>
        </Section>
      ))}

      <Section className="border-t border-line">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="End to end"
              title="How the three fit together."
              lead="One enquiry, six stages, one system. Each stage can hand back to a human at any point."
            />
          </Reveal>
          <ol className="mt-16 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {pipeline.map((item) => (
              <Reveal key={item.step}>
                <li className="h-full bg-bg p-8 lg:p-10">
                  <span className="font-mono text-xs text-accent">{item.step}</span>
                  <h3 className="mt-5 text-lg font-medium tracking-tight">{item.title}</h3>
                  <p className="prose-body mt-3 text-sm">{item.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
          <Reveal>
            <div className="mt-16 flex justify-center">
              <BookCta />
            </div>
          </Reveal>
        </Container>
      </Section>

      <JsonLd
        data={serviceSchema({
          name: 'AI lead response, qualification and appointment booking',
          description:
            'AI systems that answer every enquiry within a minute, qualify it, and book it into a live diary, for UK clinics and high-value local businesses.',
          path: '/services',
        })}
      />
    </>
  )
}
