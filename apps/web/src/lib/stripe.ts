import Stripe from 'stripe'

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env['STRIPE_SECRET_KEY']!, {
      apiVersion: '2025-02-24.acacia',
    })
  }
  return _stripe
}

export const STRIPE_PRICES = {
  premium: process.env['STRIPE_PREMIUM_PRICE_ID'] ?? '',
  sponsored: process.env['STRIPE_SPONSORED_PRICE_ID'] ?? '',
} as const

export type TierKey = keyof typeof STRIPE_PRICES
