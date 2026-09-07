import { BookCta, Container, Reveal, Rule, Section } from '@/components/ui'
import { process } from '@/lib/content'
import { pageMeta } from '@/lib/seo'
import { site } from '@/lib/site'

export const metadata = pageMeta({
  title: 'Book a call',
  description:
    'Twenty minutes to look at how enquiries reach your business today and where they stall. No pitch deck, no obligation.',
  path: '/contact',
})

export default function ContactPage() {
  return (
    <>
      <Section className="pt-16 sm:pt-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-6">
              <p className="eyebrow mb-5">Book a call</p>
              <h1 className="display text-[2.5rem] sm:text-5xl">
                Twenty minutes.
                <br />
                <span className="text-muted-dim">No pitch deck.</span>
              </h1>
              <p className="prose-body mt-8 max-w-prose text-lg">
                We will go through how enquiries reach you now — every route, including the ones
                nobody officially owns — and where they stall. You will leave with that map whether
                or not you go any further.
              </p>
              <BookCta className="mt-10" />
              <p className="mt-8 text-sm text-muted-dim">
                Prefer to write first?{' '}
                <a
                  href={`mailto:${site.email}`}
                  className="text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-content"
                >
                  {site.email}
                </a>
              </p>
            </Reveal>

            <Reveal className="lg:col-span-6">
              <div className="rounded-lg border border-line bg-surface/60 p-8 lg:p-10">
                <p className="eyebrow mb-6">What happens on the call</p>
                <ul className="space-y-5">
                  {[
                    'How enquiries currently reach you, and who owns each route',
                    'Roughly how many arrive outside staffed hours',
                    'What happens to the ones that are not answered same-day',
                    'Whether your diary or practice software can be written to',
                    'A straight answer on whether this is worth building for you',
                  ].map((item) => (
                    <li key={item} className="flex gap-4 text-sm text-muted">
                      <span
                        aria-hidden="true"
                        className="mt-[0.45rem] h-px w-4 shrink-0 bg-accent"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 border-t border-line pt-6 text-sm text-muted-dim">
                  If there is nothing here worth automating for you, we will say so on the call
                  rather than send a proposal.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Container>
        <Rule />
      </Container>

      <Section>
        <Container>
          <Reveal>
            <p className="eyebrow mb-5">And then</p>
            <h2 className="display-sm max-w-2xl text-3xl sm:text-4xl">
              The call is step one of five.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line lg:grid-cols-5">
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
    </>
  )
}
