import Stripe from 'stripe'

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  const key = process.env['STRIPE_SECRET_KEY']
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set')
  if (!_stripe) {
    _stripe = new Stripe(key, { apiVersion: '2025-02-24.acacia' })
  }
  return _stripe
}

export function isStripeConfigured(): boolean {
  return !!(
    process.env['STRIPE_SECRET_KEY'] &&
    process.env['STRIPE_PREMIUM_PRICE_ID'] &&
    process.env['STRIPE_SPONSORED_PRICE_ID']
  )
}

export const STRIPE_PRICES = {
  premium: process.env['STRIPE_PREMIUM_PRICE_ID'] ?? '',
  sponsored: process.env['STRIPE_SPONSORED_PRICE_ID'] ?? '',
} as const

export type TierKey = keyof typeof STRIPE_PRICES
