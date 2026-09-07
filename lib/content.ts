/**
 * The site's copy, kept as data so the same facts cannot drift between the
 * home page, the service page and the industry page.
 *
 * A rule that applies to everything in this file: no claim about results we
 * have not measured. What the system *does* (replies in under a minute, logs
 * every conversation, hands off to a human) is a property of what we build and
 * can be stated plainly. What it *earned* somebody is not, unless it is marked
 * as an illustration with its assumptions shown.
 */

export interface Capability {
  step: string
  title: string
  body: string
}

/** The core product, in the order it actually runs. */
export const pipeline: Capability[] = [
  {
    step: '01',
    title: 'Capture',
    body:
      'Website forms, WhatsApp, Instagram and Facebook messages, and missed calls all land in one place instead of four inboxes nobody owns.',
  },
  {
    step: '02',
    title: 'Respond',
    body:
      'Every enquiry gets a written reply in under a minute, at 9pm on a Sunday as readily as on a Tuesday morning. The reply references what they actually asked about.',
  },
  {
    step: '03',
    title: 'Qualify',
    body:
      'A short, human conversation establishes what they want, how soon, whether they have been seen before, and whether they are in your catchment area.',
  },
  {
    step: '04',
    title: 'Book',
    body:
      'Qualified enquiries are offered real slots from your live diary and booked directly into it. No double-entry, no callback queue.',
  },
  {
    step: '05',
    title: 'Follow up',
    body:
      'Enquiries that go quiet get a small number of timed nudges. Booked patients get reminders. No-shows get one honest offer to rebook.',
  },
  {
    step: '06',
    title: 'Hand off',
    body:
      'Anything clinical, unusual, or upset stops the automation and reaches a named human, with the full conversation attached.',
  },
]

export interface Service {
  slug: string
  title: string
  summary: string
  detail: string
  includes: string[]
}

export const services: Service[] = [
  {
    slug: 'lead-response',
    title: 'AI lead response & qualification',
    summary:
      'The core system. Answers every new enquiry in under a minute, works out what they need, and passes on only what is worth your time.',
    detail:
      'Most enquiries to a private clinic arrive outside the hours your front desk can cover, and most of them are comparing you against two or three other practices while they wait. This closes that gap. The reply is written from your own information - your treatments, your prices if you publish them, your policies - and it never invents an answer it does not have.',
    includes: [
      'Website enquiry form, WhatsApp, Instagram and Facebook Messenger',
      'Reply written and sent in under 60 seconds, any hour',
      'Qualification: treatment interest, urgency, location, prior patient, availability',
      'Refuses to give clinical advice, and says so plainly',
      'Escalation to a named human with the full transcript',
      'Every conversation logged and readable',
    ],
  },
  {
    slug: 'appointment-booking',
    title: 'Appointment booking',
    summary:
      'Qualified enquiries are offered real slots and booked into the diary you already use.',
    detail:
      'Booking is where most enquiry automation quietly fails: it collects a name and a phone number, then drops the person into a callback list that somebody has to work through by hand. This writes into your live diary, so the slot the patient is offered is a slot that actually exists.',
    includes: [
      'Reads live availability from your practice diary or calendar',
      'Books, reschedules and cancels without staff involvement',
      'Confirmation by email and SMS',
      'Reminders before the appointment',
      'No-show recovery: one honest offer to rebook',
      'Rules you set for what may never be booked automatically',
    ],
  },
  {
    slug: 'follow-up',
    title: 'Follow-up & reactivation',
    summary:
      'The enquiries that went quiet, and the patients you have not seen in two years, contacted properly rather than not at all.',
    detail:
      'Every clinic has a list of people who asked about a treatment, did not book, and were never contacted again. Working that list by hand is the first thing that gets dropped in a busy week. This runs it on a schedule, stops the moment somebody replies or opts out, and never sends more than the small number of messages you approved.',
    includes: [
      'Timed follow-up for unbooked enquiries, capped and stoppable',
      'Recall for patients overdue a check-up',
      'Stops immediately on a reply or an opt-out',
      'Opt-out honoured across every channel, permanently',
      'Written to comply with UK PECR and UK GDPR',
      'You approve the message before anything sends',
    ],
  },
]

export interface Sector {
  name: string
  note: string
}

/**
 * Who this is worth building for. The common thread is not the industry, it is
 * the arithmetic: a single enquiry is worth four figures or more, and enquiries
 * arrive faster than a small front desk can answer them.
 */
export const sectors: Sector[] = [
  { name: 'Private dental clinics', note: 'Implants, aligners, cosmetic treatment plans' },
  { name: 'Aesthetics & cosmetic clinics', note: 'Consultation-led, high enquiry volume' },
  { name: 'Private physiotherapy & chiropractic', note: 'Course-of-treatment bookings' },
  { name: 'Veterinary practices', note: 'Out-of-hours enquiries, high emotional urgency' },
  { name: 'Law firms', note: 'Family, conveyancing, private client' },
  { name: 'Estate & letting agents', note: 'Valuation and viewing requests' },
  { name: 'Home improvement', note: 'Kitchens, bathrooms, windows, extensions' },
]

export interface Step {
  n: string
  title: string
  body: string
  duration: string
}

export const process: Step[] = [
  {
    n: '01',
    title: 'A 20-minute call',
    body:
      'You tell us how enquiries reach you now and what happens to them. If there is nothing here worth automating, we will say so on the call.',
    duration: '20 minutes',
  },
  {
    n: '02',
    title: 'Enquiry audit',
    body:
      'We map every route an enquiry can take into your business, and where each one currently stalls. You get the map whether or not you go ahead.',
    duration: 'Free, about a week',
  },
  {
    n: '03',
    title: 'Build',
    body:
      'We build against your treatments, your policies and your diary. You see the conversation flows and approve the wording before anything goes near a patient.',
    duration: '2-3 weeks',
  },
  {
    n: '04',
    title: '30-day pilot',
    body:
      'It runs live on your real enquiries while you read every conversation it has. If it is not doing the job by day 30, you stop and owe nothing further.',
    duration: '30 days',
  },
  {
    n: '05',
    title: 'Run and improve',
    body:
      'Monthly maintenance: monitoring, wording changes, new treatments, and a monthly report of what actually came through.',
    duration: 'Ongoing',
  },
]

export interface Plan {
  name: string
  build: string
  monthly: string
  best: string
  features: string[]
  featured?: boolean
}

export const plans: Plan[] = [
  {
    name: 'Pilot',
    build: '£1,500',
    monthly: '£300',
    best: 'A single practice testing whether this is worth doing at all.',
    features: [
      'Website form and WhatsApp',
      'Qualification and handoff',
      'Booking into one calendar',
      'Conversation log',
      'Email support',
    ],
  },
  {
    name: 'Practice',
    build: '£2,500',
    monthly: '£600',
    best: 'A busy private clinic where missed enquiries are costing real treatment plans.',
    featured: true,
    features: [
      'Everything in Pilot',
      'Instagram, Facebook and missed-call capture',
      'Practice-management or diary integration',
      'Follow-up and no-show recovery',
      'Reactivation campaigns',
      'Monthly report and review call',
    ],
  },
  {
    name: 'Multi-site',
    build: 'From £4,000',
    monthly: 'From £1,000',
    best: 'Several locations, or an integration that does not exist yet.',
    features: [
      'Everything in Practice',
      'Routing across locations',
      'Custom integrations',
      'Consolidated reporting',
      'Priority support',
    ],
  },
]

/** Stated plainly, because being vague about it wastes everybody's first call. */
export const pricingNotes = [
  'Build fee is one-off. Monthly covers hosting, monitoring, changes and support.',
  'Monthly starts when the system goes live, not when the build starts.',
  'Third-party costs - messaging, AI usage, your practice software - are billed at cost and are typically £30-£90 a month depending on volume.',
  'One month notice on the monthly fee. No minimum term after the pilot.',
  'If the 30-day pilot does not do the job, you stop there.',
]

export interface Faq {
  q: string
  a: string
}

export const faqs: Faq[] = [
  {
    q: 'Will it sound like a robot?',
    a: 'It writes in your practice’s voice, using your own wording, and it says at the start that it is an assistant rather than pretending to be a member of staff. Patients are told plainly who they are talking to - that is both the honest thing to do and, for a healthcare provider, the safe one.',
  },
  {
    q: 'Does it give clinical or medical advice?',
    a: 'No. It is built to refuse. Anything that touches symptoms, suitability, medication or a clinical opinion stops the automation and goes to a human. That boundary is written into the system and tested before it goes live.',
  },
  {
    q: 'Is it GDPR compliant?',
    a: 'It is built for UK GDPR and PECR: a lawful basis for each message, a working opt-out honoured across every channel, data retention limits you set, and a written record of what was sent to whom. We will also give you the processing detail your own privacy notice needs.',
  },
  {
    q: 'What happens when it does not know the answer?',
    a: 'It says it does not know and passes the conversation to a named person, with everything said so far attached. It is not permitted to guess. That rule is more important to the system working than any of the clever parts.',
  },
  {
    q: 'Does it work with our practice management software?',
    a: 'If your system has an API or a calendar we can read and write, yes. If it does not, we will tell you that on the audit rather than after you have paid for a build. Where a direct integration is not possible we book into a linked calendar instead.',
  },
  {
    q: 'Are you replacing our receptionist?',
    a: 'No. It covers the hours and the volume they cannot - evenings, weekends, and the third enquiry that arrives while they are on the phone. Everything it cannot handle goes to them with the context already gathered.',
  },
  {
    q: 'How long until it is live?',
    a: 'Typically two to three weeks from the audit to a working system, then a 30-day pilot on your real enquiries.',
  },
  {
    q: 'What if it does not work for us?',
    a: 'That is what the pilot is for. Thirty days, live, with you reading the conversations. If it is not earning its place by the end of it, you stop and there is nothing further to pay.',
  },
]

/**
 * Illustrative only. These are the assumptions a clinic can check against
 * their own numbers - not a claim about what any client achieved. Every place
 * this is rendered must label it as an illustration.
 */
export const illustration = {
  assumptions: [
    'Your clinic receives enquiries outside staffed hours',
    'A booked high-value treatment plan is worth four figures',
    'You know roughly how many enquiries never got a reply last month',
  ],
  point:
    'The only number that matters is your own: how many enquiries arrived last month, and how many got an answer the same day. We work that out with you on the audit, from your data, before anyone talks about return on investment.',
}
