import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-01-27.acacia',
})

export const STRIPE_PREMIUM_PRICE_ID = process.env.STRIPE_PREMIUM_PRICE_ID!

export async function createCheckoutSession(userId: string, userEmail: string) {
  const session = await stripe.checkout.sessions.create({
    customer_email: userEmail,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: STRIPE_PREMIUM_PRICE_ID,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/portal?premium=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/portal?premium=cancel`,
    metadata: {
      userId,
    },
    subscription_data: {
      metadata: {
        userId,
      },
    },
  })
  return session
}
