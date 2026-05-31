import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createAdminClient } from '@/lib/supabase-server'

const PLAN_CREDITS: Record<string, number> = {
  starter: 30,
  growth: 100,
  agency: 300,
}

export async function POST(request: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!stripeKey || !webhookSecret) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 })
  }

  const stripe = new Stripe(stripeKey)
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature error:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const admin = createAdminClient()

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const userId = session.metadata?.userId
    const planId = session.metadata?.planId

    if (!userId || !planId) {
      return NextResponse.json({ error: 'Missing metadata' }, { status: 400 })
    }

    const credits = PLAN_CREDITS[planId] || 0

    await admin
      .from('profiles')
      .update({ plan: planId, credits })
      .eq('id', userId)

    await admin.from('credit_transactions').insert({
      user_id: userId,
      amount: credits,
      reason: `purchase_${planId}`,
    })
  }

  if (event.type === 'invoice.payment_succeeded') {
    // A production app would handle subscription renewals here
    // by looking up user via stored stripe_customer_id
  }

  return NextResponse.json({ received: true })
}
