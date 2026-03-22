'use client'

import { useState, useMemo, useEffect } from 'react'
import type { Venue } from '@/db/schema'
import { VenueCard } from '../_components/venue-card'
import { SearchBar } from '../_components/search-bar'
import { Coffee, SlidersHorizontal } from 'lucide-react'

export default function CafesPage() {
  const [allVenues, setAllVenues] = useState<Venue[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/venues?category=cafe')
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
            <Coffee className="h-6 w-6 text-[#D4A853]" />
            <h1 className="text-3xl font-bold text-[#E6EDF3]">
              Cafes &amp; Coffee Shops in Colorado Springs
            </h1>
          </div>
          <p className="text-[#8B949E] mb-6 max-w-2xl">
            From single-origin pour-overs at Loyal Coffee to cozy neighborhood
            spots in Old Colorado City — Colorado Springs has a thriving
            specialty coffee scene.
          </p>
          <SearchBar
            onSearch={setSearch}
            placeholder="Search cafes, neighborhoods..."
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
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
              No cafes found matching your search.
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
              Showing {filtered.length} {filtered.length === 1 ? 'cafe' : 'cafes'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((venue) => (
                <VenueCard key={venue.id} venue={venue} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
