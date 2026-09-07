import { LegalPage, LegalSection } from '@/components/legal'
import { pageMeta } from '@/lib/seo'
import { site } from '@/lib/site'

export const metadata = pageMeta({
  title: 'Privacy policy',
  description: `How ${site.name} collects, uses and stores personal data, and your rights under UK GDPR.`,
  path: '/privacy',
})

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" updated="September 2026">
      <LegalSection heading="Who we are">
        <p>
          {site.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is the data controller for personal
          data collected through {site.domain}. You can reach us at{' '}
          <a href={`mailto:${site.email}`} className="text-content underline underline-offset-4">
            {site.email}
          </a>
          .
        </p>
        <p>Registered address: {site.legal.address}.</p>
        {site.legal.companyNumber && <p>Company number: {site.legal.companyNumber}.</p>}
        {site.legal.icoRegistration && (
          <p>ICO registration number: {site.legal.icoRegistration}.</p>
        )}
      </LegalSection>

      <LegalSection heading="What we collect">
        <p>
          If you book a call, the booking is handled by Cal.com and we receive the name, email
          address and any notes you provide, together with the time you chose.
        </p>
        <p>
          If you email us, we hold that correspondence and the address you sent it from.
        </p>
        <p>
          We do not run advertising or analytics trackers on this website, and it does not set
          cookies for marketing purposes.
        </p>
      </LegalSection>

      <LegalSection heading="Why we use it, and on what basis">
        <p>
          We use your details to respond to your enquiry, hold the call you booked, and carry out
          any work you subsequently ask us to do. The lawful basis is our legitimate interest in
          responding to a business enquiry you initiated, and, where we go on to work together,
          performance of a contract.
        </p>
        <p>
          We do not sell your data, and we do not add you to a marketing list because you booked a
          call.
        </p>
      </LegalSection>

      <LegalSection heading="Who else sees it">
        <p>
          We use a small number of processors to run the business: Cal.com for scheduling, an email
          provider for correspondence, and our hosting provider. Each processes data on our
          instructions under a data processing agreement. We will name them on request.
        </p>
      </LegalSection>

      <LegalSection heading="How long we keep it">
        <p>
          Enquiry correspondence is kept for two years from our last contact, unless you ask us to
          delete it sooner. Records relating to paid work are kept for six years to meet UK
          accounting requirements.
        </p>
      </LegalSection>

      <LegalSection heading="Your rights">
        <p>
          Under UK GDPR you have the right to access the personal data we hold about you, to have it
          corrected or erased, to restrict or object to how we use it, and to receive it in a
          portable form. Write to{' '}
          <a href={`mailto:${site.email}`} className="text-content underline underline-offset-4">
            {site.email}
          </a>{' '}
          and we will respond within one month.
        </p>
        <p>
          If you are not satisfied with our response, you can complain to the Information
          Commissioner&rsquo;s Office at{' '}
          <a
            href="https://ico.org.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-content underline underline-offset-4"
          >
            ico.org.uk
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection heading="Data we process for clients">
        <p>
          When we build and run a system for a client, that client is the data controller for the
          personal data their system handles, and we act as their processor under a written data
          processing agreement. That agreement sets out retention periods, security measures,
          sub-processors and deletion on termination. It is a separate document from this policy.
        </p>
      </LegalSection>
    </LegalPage>
  )
}
