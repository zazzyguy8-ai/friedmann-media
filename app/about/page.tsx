import { BookCta, Container, Reveal, Rule, Section, SectionHeading } from '@/components/ui'
import { pageMeta } from '@/lib/seo'
import { site } from '@/lib/site'

export const metadata = pageMeta({
  title: 'About',
  description:
    'A small studio that builds one thing: the system that answers, qualifies and books your enquiries. No account managers, no retainer for work nobody can point to.',
  path: '/about',
})

export default function AboutPage() {
  return (
    <>
      <Section className="pt-16 sm:pt-24">
        <Container>
          <Reveal className="max-w-3xl">
            <p className="eyebrow mb-5">About</p>
            <h1 className="display text-[2.5rem] sm:text-5xl lg:text-6xl">
              A small studio that builds one thing.
            </h1>
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
              <SectionHeading eyebrow="How we work" title="Deliberately narrow." />
            </Reveal>
            <Reveal className="lg:col-span-7">
              <div className="max-w-prose space-y-6 text-base leading-relaxed text-muted sm:text-lg">
                <p>
                  {site.name} builds AI systems that handle the enquiry-to-appointment path for UK
                  clinics and other businesses where a single enquiry is worth four figures.
                </p>
                <p>
                  That is the whole list. We do not do content, we do not do ads, and we do not sell
                  a monthly retainer for work nobody can point to at the end of the month. If your
                  problem is not enquiries going unanswered, we are not the right people and we
                  would rather say so on the first call than three invoices in.
                </p>
                <p>
                  You deal with the person who builds it. There is no account manager between you
                  and the system, which means changes take days rather than a sprint cycle.
                </p>
                <p className="text-content">
                  We would rather build one system properly for a practice that needed it than sell
                  ten that get switched off in month three.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-line bg-surface/40">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-5">
              <SectionHeading
                eyebrow="What we will not do"
                title="The things that make this worth trusting."
              />
            </Reveal>
            <Reveal className="lg:col-span-7">
              <ul className="space-y-6">
                {[
                  [
                    'We will not quote you a return we have not measured',
                    'Any number we put in front of you is either from your own data or clearly labelled as an illustration with its assumptions shown.',
                  ],
                  [
                    'We will not send anything you have not approved',
                    'Every message the system can send is read and signed off by you before it goes live.',
                  ],
                  [
                    'We will not build something you cannot leave',
                    'One month notice, no minimum term after the pilot, and your data is yours to take.',
                  ],
                  [
                    'We will not take the work if it is not the right fit',
                    'The audit is free partly so we can both find that out before money changes hands.',
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

      <Section>
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="display-sm text-3xl sm:text-4xl">Have a look at your own numbers.</h2>
            <p className="prose-body mx-auto mt-6 max-w-prose">
              Twenty minutes, and you will leave the call knowing how many enquiries you are
              currently not answering — whether or not you work with us.
            </p>
            <div className="mt-10 flex justify-center">
              <BookCta />
            </div>
            <p className="mt-8 text-sm text-muted-dim">
              {site.founder.name}, {site.founder.role} &middot; {site.name}
            </p>
          </Reveal>
        </Container>
      </Section>
    </>
  )
}
