import { NextRequest, NextResponse } from 'next/server'
import { getStripe, STRIPE_PRICES } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  const { tier, venueSlug, email, businessName } = await req.json()

  if (!tier || !email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const priceId = STRIPE_PRICES[tier as keyof typeof STRIPE_PRICES]
  if (!priceId) {
    return NextResponse.json({ error: 'Invalid tier or price not configured' }, { status: 400 })
  }

  const stripe = getStripe()
  const base = process.env['NEXT_PUBLIC_APP_URL'] ?? 'https://dinecoloradosprings.com'

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer_email: email,
    line_items: [{ price: priceId, quantity: 1 }],
    metadata: { venueSlug: venueSlug ?? '', tier, businessName: businessName ?? '' },
    success_url: `${base}/${venueSlug ?? ''}?claimed=true`,
    cancel_url: `${base}/pricing`,
  })

  return NextResponse.json({ url: session.url })
}
