'use client'

import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { isCategoryConsented, hasConsentChoice } from '@/lib/cookie-consent'

/**
 * Conditionally renders Vercel Analytics and Speed Insights only when
 * the user has consented to analytics cookies.
 *
 * GoogleAnalytics is loaded separately in root layout with
 * Consent Mode v2 (always loads, but defaults to denied until consent).
 */
export function ConsentAwareAnalytics() {
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    if (hasConsentChoice() && isCategoryConsented('analytics')) {
      setAllowed(true)
    }

    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail
      setAllowed(detail?.analytics === true)
    }
    window.addEventListener('cookie-consent-updated', handler)
    return () => window.removeEventListener('cookie-consent-updated', handler)
  }, [])

  if (!allowed) return null
  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  )
}
