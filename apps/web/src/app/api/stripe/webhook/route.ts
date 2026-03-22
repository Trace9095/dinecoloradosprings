import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { getDb } from '@/lib/db'
import { venues, listingClaims } from '@/db/schema'
import { eq } from 'drizzle-orm'
import type Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')
  const webhookSecret = process.env['STRIPE_WEBHOOK_SECRET']!

  let event: Stripe.Event
  try {
    event = getStripe().webhooks.constructEvent(body, sig!, webhookSecret)
  } catch {
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 })
  }

  const db = getDb()

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const { venueSlug, tier } = session.metadata ?? {}
      if (venueSlug && tier) {
        await db
          .update(venues)
          .set({
            tier,
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId: session.subscription as string,
            claimedByEmail: session.customer_email ?? undefined,
            featured: tier === 'sponsored',
            updatedAt: new Date(),
          })
          .where(eq(venues.slug, venueSlug))

        // Update claim status
        await db
          .update(listingClaims)
          .set({ status: 'approved', stripeSessionId: session.id })
          .where(eq(listingClaims.stripeSessionId, session.id))
      }
      break
    }
    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription
      await db
        .update(venues)
        .set({ tier: 'free', featured: false, stripeSubscriptionId: null, updatedAt: new Date() })
        .where(eq(venues.stripeSubscriptionId, sub.id))
      break
    }
    case 'customer.subscription.updated': {
      const sub = event.data.object as Stripe.Subscription
      const status = sub.status
      if (status === 'past_due' || status === 'canceled' || status === 'unpaid') {
        await db
          .update(venues)
          .set({ tier: 'free', featured: false, updatedAt: new Date() })
          .where(eq(venues.stripeSubscriptionId, sub.id))
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}
