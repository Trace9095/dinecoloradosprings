'use client'

import { useState, useMemo } from 'react'
import { useEffect } from 'react'
import type { Venue } from '@/db/schema'
import { VenueCard } from '../_components/venue-card'
import { SearchBar } from '../_components/search-bar'
import { UtensilsCrossed, SlidersHorizontal } from 'lucide-react'
import { DayTripBanner } from '../_components/day-trip-banner'

const CUISINES = [
  'All',
  'American',
  'Mexican',
  'Italian',
  'BBQ',
  'Asian',
  'German',
  'Irish',
  'Thai',
]

export default function RestaurantsPage() {
  const [allVenues, setAllVenues] = useState<Venue[]>([])
  const [search, setSearch] = useState('')
  const [cuisine, setCuisine] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/venues?category=restaurant,fine-dining,bar')
      .then((r) => r.json())
      .then((data: Venue[]) => {
        setAllVenues(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    return allVenues.filter((v) => {
      const q = search.toLowerCase()
      const matchesSearch =
        !q ||
        v.name.toLowerCase().includes(q) ||
        (v.cuisine ?? '').toLowerCase().includes(q) ||
        (v.neighborhood ?? '').toLowerCase().includes(q) ||
        (v.shortDescription ?? '').toLowerCase().includes(q)
      const matchesCuisine =
        cuisine === 'All' ||
        (v.cuisine ?? '').toLowerCase() === cuisine.toLowerCase()
      return matchesSearch && matchesCuisine
    })
  }, [allVenues, search, cuisine])

  return (
    <div className="pt-20 min-h-[100dvh]">
      {/* Header */}
      <div className="bg-[#161B22] border-b border-[#30363D] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <UtensilsCrossed className="h-6 w-6 text-[#D4A853]" />
            <h1 className="text-3xl font-bold text-[#E6EDF3]">
              Restaurants in Colorado Springs
            </h1>
          </div>
          <p className="text-[#8B949E] mb-6 max-w-2xl">
            From fine dining at The Broadmoor to beloved neighborhood spots and
            authentic ethnic cuisine — Colorado Springs has it all.
          </p>
          <SearchBar onSearch={setSearch} placeholder="Search restaurants, cuisines, neighborhoods..." />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cuisine filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-8">
          {CUISINES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCuisine(c)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all min-h-[44px] ${
                cuisine === c
                  ? 'bg-[#D4A853] text-[#0D1117]'
                  : 'bg-[#161B22] text-[#8B949E] border border-[#30363D] hover:text-[#E6EDF3] hover:border-[#8B949E]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-72 bg-[#161B22] rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <SlidersHorizontal className="h-10 w-10 text-[#30363D] mx-auto mb-4" />
            <p className="text-[#8B949E] text-lg">
              No restaurants found matching your search.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch('')
                setCuisine('All')
              }}
              className="mt-4 text-[#D4A853] hover:text-[#E8C97A] text-sm"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <p className="text-[#8B949E] text-sm mb-5">
              Showing {filtered.length} restaurant
              {filtered.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((venue) => (
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
