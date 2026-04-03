import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { stripe, PRICE_MONTHLY, CURRENCY } from '@/lib/stripe'

export async function POST() {
  try {
    const supabase = createServerClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id, name')
      .eq('id', user.id)
      .single()

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      customer: profile?.stripe_customer_id || undefined,
      customer_email: profile?.stripe_customer_id ? undefined : user.email,
      line_items: [
        {
          price_data: {
            currency: CURRENCY,
            product_data: {
              name: 'Plou Premium',
              description: 'Daily AI-powered challenges. Keep your streak alive.',
            },
            unit_amount: PRICE_MONTHLY,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        user_id: user.id,
      },
      success_url: `${appUrl}/dashboard?success=true`,
      cancel_url: `${appUrl}/paywall`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
