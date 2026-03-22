'use client'

import { useState, useMemo, useEffect } from 'react'
import type { Venue } from '@/db/schema'
import { VenueCard } from '../_components/venue-card'
import { SearchBar } from '../_components/search-bar'
import { Truck, SlidersHorizontal } from 'lucide-react'
import { DayTripBanner } from '../_components/day-trip-banner'

export default function FoodTrucksPage() {
  const [allVenues, setAllVenues] = useState<Venue[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/venues?category=food-truck')
      .then((r) => r.json())
      .then((data: Venue[]) => {
        setAllVenues(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    if (!search) return allVenues
    const q = search.toLowerCase()
    return allVenues.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        (v.neighborhood ?? '').toLowerCase().includes(q) ||
        (v.shortDescription ?? '').toLowerCase().includes(q)
    )
  }, [allVenues, search])

  return (
    <div className="pt-20 min-h-[100dvh]">
      <div className="bg-[#161B22] border-b border-[#30363D] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <Truck className="h-6 w-6 text-[#D4A853]" />
            <h1 className="text-3xl font-bold text-[#E6EDF3]">
              Food Trucks in Colorado Springs
            </h1>
          </div>
          <p className="text-[#8B949E] mb-6 max-w-2xl">
            Colorado Springs has a thriving food truck culture. Find food trucks
            at brewery taprooms, the Downtown Food Truck Rally at Acacia Park on
            summer Fridays, and at events across the city.
          </p>
          <SearchBar
            onSearch={setSearch}
            placeholder="Search food trucks, neighborhoods..."
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tip */}
        <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-4 mb-8">
          <p className="text-[#8B949E] text-sm">
            <span className="text-[#D4A853] font-semibold">Tip:</span> Many
            Colorado Springs food trucks rotate through brewery taprooms like
            Bristol Brewing, Goat Patch, and Cerberus. Check their social media
            for weekly schedules.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
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
              No food trucks found matching your search.
            </p>
            <button
              type="button"
              onClick={() => setSearch('')}
              className="mt-4 text-[#D4A853] hover:text-[#E8C97A] text-sm"
            >
              Clear search
            </button>
          </div>
        ) : (
          <>
            <p className="text-[#8B949E] text-sm mb-5">
              Showing {filtered.length} food truck
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
