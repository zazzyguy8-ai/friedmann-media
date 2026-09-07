import { LegalPage, LegalSection } from '@/components/legal'
import { pageMeta } from '@/lib/seo'
import { site } from '@/lib/site'

export const metadata = pageMeta({
  title: 'Terms',
  description: `The terms on which ${site.name} provides this website and its services.`,
  path: '/terms',
})

export default function TermsPage() {
  return (
    <LegalPage title="Terms" updated="September 2026">
      <LegalSection heading="This website">
        <p>
          This site describes services offered by {site.legalName}. Nothing on it is an offer
          capable of acceptance, and prices shown are indicative of typical engagements rather than
          a quotation. Work is carried out under a separate written agreement signed by both
          parties.
        </p>
      </LegalSection>

      <LegalSection heading="Prices">
        <p>
          Build fees and monthly fees are stated exclusive of VAT where VAT applies. Third-party
          costs — messaging, AI usage, and any software licences your system depends on — are
          separate and are billed at cost.
        </p>
      </LegalSection>

      <LegalSection heading="The pilot">
        <p>
          Where an engagement includes a 30-day pilot, you may end the engagement at the end of that
          period with nothing further to pay beyond the build fee and any third-party costs already
          incurred. After the pilot, the monthly fee runs on one month&rsquo;s written notice with no
          minimum term.
        </p>
      </LegalSection>

      <LegalSection heading="What we are responsible for">
        <p>
          We are responsible for building and running the system as described in your agreement. We
          are not a clinical, legal or financial adviser, and the systems we build are configured to
          refuse to give advice of that kind and to escalate to a human instead.
        </p>
        <p>
          You remain responsible for the content you give us to work from, for the accuracy of the
          information the system relays on your behalf, and for your own regulatory obligations as a
          provider.
        </p>
      </LegalSection>

      <LegalSection heading="Your data and your system">
        <p>
          Your data is yours. On termination we will export it to you in a usable format and delete
          our copies in line with the data processing agreement, subject to any records we are
          required to keep by law.
        </p>
      </LegalSection>

      <LegalSection heading="Governing law">
        <p>
          These terms and any agreement between us are governed by the laws of England and Wales,
          and the courts of England and Wales have exclusive jurisdiction.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about these terms:{' '}
          <a href={`mailto:${site.email}`} className="text-content underline underline-offset-4">
            {site.email}
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  )
}
