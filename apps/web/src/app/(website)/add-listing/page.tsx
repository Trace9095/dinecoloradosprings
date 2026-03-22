'use client'

import type { Metadata } from 'next'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, Building2, Send } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

const CATEGORIES = [
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'brewery', label: 'Brewery' },
  { value: 'cafe', label: 'Cafe / Coffee Shop' },
  { value: 'food-truck', label: 'Food Truck' },
  { value: 'fine-dining', label: 'Fine Dining' },
  { value: 'bar', label: 'Bar & Pub' },
]

const CUISINES = [
  { value: '', label: 'Select cuisine (optional)' },
  { value: 'american', label: 'American' },
  { value: 'mexican', label: 'Mexican' },
  { value: 'italian', label: 'Italian' },
  { value: 'bbq', label: 'BBQ' },
  { value: 'asian', label: 'Asian' },
  { value: 'thai', label: 'Thai' },
  { value: 'german', label: 'German' },
  { value: 'irish', label: 'Irish' },
  { value: 'other', label: 'Other' },
]

const TIERS = [
  {
    value: 'premium',
    label: 'Premium',
    price: '$99/mo',
    description: 'Featured placement + photos + website link',
  },
  {
    value: 'sponsored',
    label: 'Sponsored',
    price: '$199/mo',
    description: 'Top placement + homepage featured + analytics',
  },
]

function AddListingForm() {
  const searchParams = useSearchParams()
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    businessName: '',
    category: 'restaurant',
    cuisine: '',
    address: '',
    phone: '',
    website: '',
    email: '',
    tier: searchParams.get('tier') ?? 'premium',
    message: '',
  })

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/claims', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          name: form.businessName,
          phone: form.phone,
          message: `Business: ${form.businessName}\nCategory: ${form.category}\nCuisine: ${form.cuisine}\nAddress: ${form.address}\nWebsite: ${form.website}\n\n${form.message}`,
          tier: form.tier,
          venueId: null,
        }),
      })
      if (!res.ok) throw new Error('Submission failed')

      // Redirect to Stripe checkout for paid tiers
      if (form.tier === 'premium' || form.tier === 'sponsored') {
        const checkoutRes = await fetch('/api/stripe/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tier: form.tier,
            email: form.email,
            businessName: form.businessName,
            venueSlug: '',
          }),
        })
        if (checkoutRes.ok) {
          const data = await checkoutRes.json() as { url?: string }
          if (data.url) {
            trackEvent('claim_listing', { tier: form.tier, city: 'Colorado Springs' })
            window.location.href = data.url
            return
          }
        }
      }

      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#D4A853]/10 rounded-full mb-6">
          <CheckCircle className="h-8 w-8 text-[#D4A853]" />
        </div>
        <h2 className="text-2xl font-bold text-[#E6EDF3] mb-3">
          Request Received!
        </h2>
        <p className="text-[#8B949E] max-w-sm mx-auto">
          We&apos;ll review your submission and have your listing live within 24–48
          hours. We&apos;ll reach out to {form.email} with next steps.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-xl mx-auto">
      {/* Business name */}
      <div>
        <label className="block text-[#E6EDF3] text-sm font-medium mb-1.5">
          Business Name *
        </label>
        <input
          required
          type="text"
          value={form.businessName}
          onChange={(e) => update('businessName', e.target.value)}
          placeholder="Your restaurant or bar name"
          className="w-full bg-[#1C2333] border border-[#30363D] rounded-xl px-4 py-3 text-[#E6EDF3] placeholder-[#8B949E] text-sm focus:outline-none focus:border-[#D4A853] focus:ring-1 focus:ring-[#D4A853] transition-colors min-h-[44px]"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-[#E6EDF3] text-sm font-medium mb-1.5">
          Category *
        </label>
        <select
          required
          value={form.category}
          onChange={(e) => update('category', e.target.value)}
          className="w-full bg-[#1C2333] border border-[#30363D] rounded-xl px-4 py-3 text-[#E6EDF3] text-sm focus:outline-none focus:border-[#D4A853] transition-colors min-h-[44px]"
        >
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {/* Cuisine */}
      <div>
        <label className="block text-[#E6EDF3] text-sm font-medium mb-1.5">
          Cuisine Type
        </label>
        <select
          value={form.cuisine}
          onChange={(e) => update('cuisine', e.target.value)}
          className="w-full bg-[#1C2333] border border-[#30363D] rounded-xl px-4 py-3 text-[#E6EDF3] text-sm focus:outline-none focus:border-[#D4A853] transition-colors min-h-[44px]"
        >
          {CUISINES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {/* Address */}
      <div>
        <label className="block text-[#E6EDF3] text-sm font-medium mb-1.5">
          Address *
        </label>
        <input
          required
          type="text"
          value={form.address}
          onChange={(e) => update('address', e.target.value)}
          placeholder="123 Main St, Colorado Springs, CO 80903"
          className="w-full bg-[#1C2333] border border-[#30363D] rounded-xl px-4 py-3 text-[#E6EDF3] placeholder-[#8B949E] text-sm focus:outline-none focus:border-[#D4A853] transition-colors min-h-[44px]"
        />
      </div>

      {/* Phone + Website */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-[#E6EDF3] text-sm font-medium mb-1.5">
            Phone
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            placeholder="(719) 555-0100"
            className="w-full bg-[#1C2333] border border-[#30363D] rounded-xl px-4 py-3 text-[#E6EDF3] placeholder-[#8B949E] text-sm focus:outline-none focus:border-[#D4A853] transition-colors min-h-[44px]"
          />
        </div>
        <div>
          <label className="block text-[#E6EDF3] text-sm font-medium mb-1.5">
            Website
          </label>
          <input
            type="url"
            value={form.website}
            onChange={(e) => update('website', e.target.value)}
            placeholder="https://yourrestaurant.com"
            className="w-full bg-[#1C2333] border border-[#30363D] rounded-xl px-4 py-3 text-[#E6EDF3] placeholder-[#8B949E] text-sm focus:outline-none focus:border-[#D4A853] transition-colors min-h-[44px]"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-[#E6EDF3] text-sm font-medium mb-1.5">
          Your Email *
        </label>
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => update('email', e.target.value)}
          placeholder="owner@yourrestaurant.com"
          className="w-full bg-[#1C2333] border border-[#30363D] rounded-xl px-4 py-3 text-[#E6EDF3] placeholder-[#8B949E] text-sm focus:outline-none focus:border-[#D4A853] transition-colors min-h-[44px]"
        />
      </div>

      {/* Tier selection */}
      <div>
        <label className="block text-[#E6EDF3] text-sm font-medium mb-2">
          Listing Tier *
        </label>
        <div className="space-y-2">
          {TIERS.map((tier) => (
            <label
              key={tier.value}
              className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                form.tier === tier.value
                  ? 'border-[#D4A853] bg-[#D4A853]/5'
                  : 'border-[#30363D] bg-[#1C2333] hover:border-[#8B949E]'
              }`}
            >
              <input
                type="radio"
                name="tier"
                value={tier.value}
                checked={form.tier === tier.value}
                onChange={(e) => update('tier', e.target.value)}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                  form.tier === tier.value
                    ? 'border-[#D4A853] bg-[#D4A853]'
                    : 'border-[#30363D]'
                }`}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[#E6EDF3] font-semibold text-sm">
                    {tier.label}
                  </span>
                  <span className="text-[#D4A853] font-bold text-sm">
                    {tier.price}
                  </span>
                </div>
                <p className="text-[#8B949E] text-xs mt-0.5">
                  {tier.description}
                </p>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-[#E6EDF3] text-sm font-medium mb-1.5">
          Additional Info
        </label>
        <textarea
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          placeholder="Anything else we should know about your business..."
          rows={3}
          className="w-full bg-[#1C2333] border border-[#30363D] rounded-xl px-4 py-3 text-[#E6EDF3] placeholder-[#8B949E] text-sm focus:outline-none focus:border-[#D4A853] transition-colors resize-none"
        />
      </div>

      {error && (
        <p className="text-[#F85149] text-sm bg-[#F85149]/10 border border-[#F85149]/20 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-[#D4A853] hover:bg-[#E8C97A] disabled:opacity-50 disabled:cursor-not-allowed text-[#0D1117] font-semibold rounded-xl transition-colors min-h-[52px]"
      >
        {submitting ? (
          'Submitting...'
        ) : (
          <>
            <Send className="h-4 w-4" />
            Submit Listing
          </>
        )}
      </button>
    </form>
  )
}

export default function AddListingPage() {
  return (
    <div className="pt-20 min-h-[100dvh]">
      <div className="bg-[#161B22] border-b border-[#30363D] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[#D4A853]/10 rounded-xl mb-4">
            <Building2 className="h-6 w-6 text-[#D4A853]" />
          </div>
          <h1 className="text-3xl font-bold text-[#E6EDF3] mb-3">
            Add Your Business
          </h1>
          <p className="text-[#8B949E]">
            Get your Colorado Springs restaurant, brewery, or cafe featured in
            our directory. Premium at $99/mo or Sponsored at $199/mo for
            top placement and maximum visibility.
          </p>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Suspense
          fallback={
            <div className="h-96 bg-[#161B22] rounded-xl animate-pulse" />
          }
        >
          <AddListingForm />
        </Suspense>
      </div>
    </div>
  )
}
