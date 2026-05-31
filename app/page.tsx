'use client'

import Link from 'next/link'

const steps = [
  {
    number: '01',
    title: 'Upload',
    desc: 'Drop your product photo. Any angle, any background.',
  },
  {
    number: '02',
    title: 'Choose Style',
    desc: 'Pick a visual direction. Streetwear, Luxury, Y2K, or Minimalist.',
  },
  {
    number: '03',
    title: 'Generate',
    desc: '60 seconds later — 3 ready-to-post video ads.',
  },
]

const plans = [
  {
    name: 'Starter',
    price: '€19',
    credits: '30 credits',
    desc: 'Perfect for small brands just getting started.',
  },
  {
    name: 'Growth',
    price: '€49',
    credits: '100 credits',
    desc: 'For brands scaling their ad output.',
    popular: true,
  },
  {
    name: 'Agency',
    price: '€149',
    credits: '300 credits',
    desc: 'For agencies managing multiple brands.',
  },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-[#222222]">
        <span className="font-black text-xl tracking-tight text-white">DRIP STUDIO</span>
        <Link
          href="/login"
          className="text-[#888888] hover:text-white transition-colors text-sm font-medium"
        >
          Sign in
        </Link>
      </nav>

      {/* Hero */}
      <section className="px-8 pt-32 pb-24 max-w-5xl mx-auto">
        <div className="max-w-3xl">
          <div className="inline-block bg-[#FF3B00] text-white text-xs font-bold tracking-widest uppercase px-3 py-1 mb-8">
            AI Video Ads
          </div>
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-black leading-[0.9] tracking-tight mb-8">
            Turn product photos into scroll-stopping video ads.{' '}
            <span className="text-[#FF3B00]">In 60 seconds.</span>
          </h1>
          <p className="text-[#888888] text-xl mb-12 max-w-xl leading-relaxed">
            Built for clothing brands. Powered by AI. No editor needed.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-[#FF3B00] text-white font-bold text-lg px-10 py-4 hover:bg-[#e63500] transition-colors"
          >
            Start for free →
          </Link>
          <p className="text-[#888888] text-sm mt-4">5 free credits. No credit card required.</p>
        </div>
      </section>

      {/* How it works */}
      <section className="px-8 py-24 border-t border-[#222222]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#888888] text-xs font-bold tracking-widest uppercase mb-12">How it works</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#222222]">
            {steps.map((step, i) => (
              <div
                key={step.number}
                className={`p-8 ${i < steps.length - 1 ? 'border-b md:border-b-0 md:border-r border-[#222222]' : ''}`}
              >
                <span className="text-[#FF3B00] font-black text-4xl block mb-6">{step.number}</span>
                <h3 className="text-white font-bold text-xl mb-3">{step.title}</h3>
                <p className="text-[#888888] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-8 py-24 border-t border-[#222222]">
        <div className="max-w-5xl mx-auto">
          <p className="text-[#888888] text-xs font-bold tracking-widest uppercase mb-4">Pricing</p>
          <h2 className="text-4xl font-black mb-12">Simple, transparent pricing.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-[#222222]">
            {plans.map((plan, i) => (
              <div
                key={plan.name}
                className={`p-8 relative ${i < plans.length - 1 ? 'border-b md:border-b-0 md:border-r border-[#222222]' : ''} ${plan.popular ? 'bg-[#111111]' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#FF3B00]" />
                )}
                {plan.popular && (
                  <span className="text-[#FF3B00] text-xs font-bold tracking-widest uppercase mb-4 block">
                    Most popular
                  </span>
                )}
                <h3 className="text-white font-bold text-xl mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  <span className="text-[#888888] text-sm">/month</span>
                </div>
                <p className="text-[#FF3B00] font-bold text-sm mb-4">{plan.credits}/month</p>
                <p className="text-[#888888] text-sm mb-8 leading-relaxed">{plan.desc}</p>
                <Link
                  href="/signup"
                  className={`block text-center font-bold py-3 px-6 transition-colors ${
                    plan.popular
                      ? 'bg-[#FF3B00] text-white hover:bg-[#e63500]'
                      : 'border border-[#222222] text-white hover:border-[#FF3B00] hover:text-[#FF3B00]'
                  }`}
                >
                  Get started
                </Link>
              </div>
            ))}
          </div>
          <p className="text-[#888888] text-sm mt-6">
            All plans include all 4 styles, all 3 formats, and HD download.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#222222] px-8 py-8 flex items-center justify-between">
        <span className="font-black text-white tracking-tight">DRIP STUDIO</span>
        <p className="text-[#888888] text-xs">
          © {new Date().getFullYear()} DRIP STUDIO. All rights reserved.
        </p>
      </footer>
    </div>
  )
}
