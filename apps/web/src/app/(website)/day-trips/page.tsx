'use client'

import { useState, useEffect } from 'react'
import type { Venue } from '@/db/schema'
import { VenueCard } from '../_components/venue-card'
import { Mountain, ExternalLink } from 'lucide-react'
import { DayTripBanner } from '../_components/day-trip-banner'

export default function DayTripsPage() {
  const [venues, setVenues] = useState<Venue[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/venues?category=adventure')
      .then((r) => r.json())
      .then((data: Venue[]) => {
        setVenues(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="pt-20 min-h-[100dvh]">
      <div className="bg-[#161B22] border-b border-[#30363D] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <Mountain className="h-6 w-6 text-[#D4A853]" />
            <h1 className="text-3xl font-bold text-[#E6EDF3]">
              Day Trips from Colorado Springs
            </h1>
          </div>
          <p className="text-[#8B949E] max-w-2xl">
            Just 1 hour south on Hwy 50 — the Royal Gorge region offers world-class
            white-water rafting, zipline tours, and glamping on the Arkansas River.
            A perfect day trip or weekend adventure from Colorado Springs.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Drive callout */}
        <div className="bg-[#161B22] border border-[#D4A853]/20 rounded-xl p-5 mb-8">
          <div className="flex items-start gap-3">
            <span className="text-[#D4A853] font-semibold text-sm">Worth the Drive —</span>
            <p className="text-[#8B949E] text-sm">
              Canon City is 45 miles southwest via Hwy 50. Pair your Royal Gorge adventure
              with lunch or dinner at{' '}
              <a
                href="/partners/whitewater-bar-grill"
                className="text-[#D4A853] hover:text-[#E8C97A] transition-colors"
              >
                White Water Bar &amp; Grill
              </a>{' '}
              or rooftop cocktails at{' '}
              <a
                href="/partners/rooftop-social"
                className="text-[#D4A853] hover:text-[#E8C97A] transition-colors"
              >
                Rooftop Social
              </a>
              .
            </p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-72 bg-[#161B22] rounded-xl animate-pulse" />
            ))}
          </div>
        ) : venues.length === 0 ? (
          <div className="text-center py-16">
            <Mountain className="h-10 w-10 text-[#30363D] mx-auto mb-4" />
            <p className="text-[#8B949E] text-lg">Adventure partners loading...</p>
          </div>
        ) : (
          <>
            <p className="text-[#8B949E] text-sm mb-5">
              {venues.length} featured adventure partner{venues.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {venues.map((venue) => (
                <VenueCard key={venue.id} venue={venue} />
              ))}
            </div>
          </>
        )}
      </div>
      <DayTripBanner />
    </div>
  )
}
