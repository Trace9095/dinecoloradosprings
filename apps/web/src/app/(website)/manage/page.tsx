'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Mail, ExternalLink, CheckCircle, Crown, Zap, AlertCircle, Loader2 } from 'lucide-react'

type LookupResult = {
  found: boolean
  tier?: string
  name?: string
  slug?: string
  hasStripe?: boolean
}

const TIER_META: Record<string, { label: string; color: string; icon: typeof Zap; price: string }> = {
  premium: {
    label: 'Premium',
    color: '#D4A853',
    icon: Zap,
    price: '$99/mo',
  },
  sponsored: {
    label: 'Sponsored',
    color: '#D4A853',
    icon: Crown,
    price: '$199/mo',
  },
  free: {
    label: 'Free',
    color: '#6B5E50',
    icon: CheckCircle,
    price: 'Free',
  },
}

export default function ManagePage() {
  const [email, setEmail] = useState('')
  const [step, setStep] = useState<'email' | 'result'>('email')
  const [loading, setLoading] = useState(false)
  const [portalLoading, setPortalLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<LookupResult | null>(null)

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch(`/api/stripe/portal?email=${encodeURIComponent(email)}`)
      const data = await res.json() as LookupResult
      setResult(data)
      setStep('result')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleManageBilling() {
    setPortalLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/stripe/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json() as { url?: string; error?: string }
      if (data.url) {
        window.location.href = data.url
      } else {
        setError(data.error ?? 'Unable to open billing portal.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setPortalLoading(false)
    }
  }

  const tier = result?.tier ? (TIER_META[result.tier] ?? TIER_META.free) : null

  return (
    <div style={{ background: '#0D1117', minHeight: '100dvh' }}>
      <div className="px-4 pt-6 pb-2 max-w-lg mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm transition-colors"
          style={{ color: '#9E9080' }}
        >
          <ArrowLeft size={14} />
          Back to Directory
        </Link>
      </div>

      <div className="max-w-lg mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2" style={{ color: '#F0EAE2' }}>
            Manage Your Listing
          </h1>
          <p className="text-sm" style={{ color: '#9E9080' }}>
            View your plan status and manage billing.
          </p>
        </div>

        {step === 'email' && (
          <form
            onSubmit={(e) => { void handleLookup(e) }}
            className="rounded-2xl p-6"
            style={{ background: '#161310', border: '1px solid #3A332A' }}
          >
            <label className="block text-sm font-medium mb-2" style={{ color: '#C8B99A' }}>
              Business Email
            </label>
            <p className="text-xs mb-4" style={{ color: '#6B5E50' }}>
              Enter the email you used when claiming your listing.
            </p>
            <div className="relative mb-4">
              <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: '#6B5E50' }} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full pl-9 pr-4 py-3 rounded-lg text-sm outline-none"
                style={{
                  background: '#0D1117',
                  border: '1px solid #3A332A',
                  color: '#F0EAE2',
                  minHeight: '48px',
                }}
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 mb-4 text-sm" style={{ color: '#FF6B6B' }}>
                <AlertCircle size={14} />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-sm transition-all"
              style={{
                background: '#D4A853',
                color: '#0D1117',
                minHeight: '48px',
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? <Loader2 size={15} className="animate-spin" /> : null}
              {loading ? 'Looking up…' : 'Look Up My Listing'}
            </button>
          </form>
        )}

        {step === 'result' && result && (
          <div className="space-y-4">
            {result.found && tier ? (
              <>
                {/* Plan status card */}
                <div
                  className="rounded-2xl p-6"
                  style={{ background: '#161310', border: `1px solid ${result.tier === 'free' ? '#3A332A' : '#D4A853'}` }}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#6B5E50' }}>
                        Current Plan
                      </p>
                      <div className="flex items-center gap-2">
                        <tier.icon size={18} style={{ color: tier.color }} />
                        <span className="text-xl font-bold" style={{ color: '#F0EAE2' }}>
                          {tier.label}
                        </span>
                        <span className="text-sm" style={{ color: '#9E9080' }}>
                          {tier.price}
                        </span>
                      </div>
                    </div>
                    <span
                      className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded"
                      style={{
                        background: result.tier === 'free' ? '#252118' : '#D4A853',
                        color: result.tier === 'free' ? '#9E9080' : '#0D1117',
                      }}
                    >
                      {result.tier === 'free' ? 'Free' : 'Active'}
                    </span>
                  </div>

                  <div className="py-4" style={{ borderTop: '1px solid #3A332A', borderBottom: '1px solid #3A332A' }}>
                    <div className="flex justify-between text-sm mb-2">
                      <span style={{ color: '#6B5E50' }}>Business</span>
                      <span style={{ color: '#C8B99A' }}>{result.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span style={{ color: '#6B5E50' }}>Email</span>
                      <span style={{ color: '#C8B99A' }}>{email}</span>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    {result.tier !== 'free' && result.hasStripe ? (
                      <button
                        onClick={() => { void handleManageBilling() }}
                        disabled={portalLoading}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-sm transition-all"
                        style={{
                          background: '#D4A853',
                          color: '#0D1117',
                          minHeight: '48px',
                          opacity: portalLoading ? 0.7 : 1,
                        }}
                      >
                        {portalLoading ? <Loader2 size={15} className="animate-spin" /> : <ExternalLink size={15} />}
                        {portalLoading ? 'Opening portal…' : 'Manage Billing'}
                      </button>
                    ) : (
                      <Link
                        href={`/pricing`}
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold text-sm transition-all"
                        style={{ background: '#D4A853', color: '#0D1117', minHeight: '48px' }}
                      >
                        <Zap size={15} />
                        Upgrade to Premium
                      </Link>
                    )}

                    <Link
                      href={result.slug ? `/${result.slug}` : '/'}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium text-sm transition-all"
                      style={{
                        background: '#252118',
                        border: '1px solid #3A332A',
                        color: '#C8B99A',
                        minHeight: '48px',
                      }}
                    >
                      View My Listing
                    </Link>
                  </div>
                </div>

                {/* Upgrade prompt for basic tier */}
                {result.tier === 'free' && (
                  <div
                    className="rounded-xl p-5"
                    style={{ background: '#161310', border: '1px solid #3A332A' }}
                  >
                    <h3 className="text-sm font-semibold mb-1" style={{ color: '#D4A853' }}>
                      Get featured placement
                    </h3>
                    <p className="text-xs mb-3" style={{ color: '#9E9080' }}>
                      Upgrade to Premium for featured placement in search results and category pages. Starting at $99/mo.
                    </p>
                    <Link
                      href="/pricing"
                      className="text-xs font-semibold"
                      style={{ color: '#D4A853' }}
                    >
                      See plans →
                    </Link>
                  </div>
                )}
              </>
            ) : (
              /* No listing found */
              <div
                className="rounded-2xl p-8 text-center"
                style={{ background: '#161310', border: '1px solid #3A332A' }}
              >
                <AlertCircle size={32} className="mx-auto mb-4" style={{ color: '#6B5E50' }} />
                <h2 className="text-lg font-bold mb-2" style={{ color: '#F0EAE2' }}>
                  No listing found
                </h2>
                <p className="text-sm mb-6" style={{ color: '#9E9080' }}>
                  We couldn&apos;t find a claimed listing for <strong style={{ color: '#C8B99A' }}>{email}</strong>.
                  Double-check the email or claim your listing to get started.
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => { setStep('email'); setResult(null); setError(null) }}
                    className="w-full py-3 rounded-lg font-semibold text-sm"
                    style={{ background: '#252118', border: '1px solid #3A332A', color: '#C8B99A', minHeight: '48px' }}
                  >
                    Try a different email
                  </button>
                  <Link
                    href="/add-listing"
                    className="w-full flex items-center justify-center py-3 rounded-lg font-semibold text-sm"
                    style={{ background: '#D4A853', color: '#0D1117', minHeight: '48px' }}
                  >
                    Claim Your Listing
                  </Link>
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 text-sm p-4 rounded-lg" style={{ background: '#1A0A0A', border: '1px solid #5A2020', color: '#FF6B6B' }}>
                <AlertCircle size={14} className="flex-shrink-0" />
                {error}
              </div>
            )}
          </div>
        )}

        {/* Info footer */}
        <p className="text-xs text-center mt-8" style={{ color: '#4A3E32' }}>
          Need help?{' '}
          <a href="mailto:listings@dinecoloradosprings.com" style={{ color: '#D4A853' }}>
            listings@dinecoloradosprings.com
          </a>
        </p>
      </div>
    </div>
  )
}
