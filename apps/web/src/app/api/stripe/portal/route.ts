import { NextRequest, NextResponse } from 'next/server'
import { getStripe, isStripeConfigured } from '@/lib/stripe'
import { getDb } from '@/lib/db'
import { venues } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function POST(req: NextRequest) {
  if (!isStripeConfigured()) {
    return NextResponse.json({ error: 'Stripe is not configured' }, { status: 503 })
  }

  const { email } = await req.json() as { email?: string }
  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  const stripe = getStripe()
  const base = process.env['NEXT_PUBLIC_APP_URL'] ?? 'https://dinecoloradosprings.com'

  // Look up stripeCustomerId from DB first
  const db = getDb()
  let customerId: string | null = null

  const venue = await db.query.venues.findFirst({
    where: eq(venues.claimedByEmail, email),
  })

  if (venue?.stripeCustomerId) {
    customerId = venue.stripeCustomerId
  } else {
    // Fallback: search Stripe directly by email
    const customers = await stripe.customers.list({ email, limit: 1 })
    customerId = customers.data[0]?.id ?? null
  }

  if (!customerId) {
    return NextResponse.json(
      { error: 'No active subscription found for this email' },
      { status: 404 }
    )
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${base}/manage`,
  })

  return NextResponse.json({ url: portalSession.url })
}

// Lookup endpoint — returns plan info for a given email
export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email')
  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  const db = getDb()
  const venue = await db.query.venues.findFirst({
    where: eq(venues.claimedByEmail, email),
  })

  if (!venue) {
    return NextResponse.json({ found: false })
  }

  return NextResponse.json({
    found: true,
    tier: venue.tier,
    name: venue.name,
    slug: venue.slug,
    hasStripe: !!venue.stripeCustomerId,
  })
}
