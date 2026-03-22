export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'
import { getDb } from '@/lib/db'
import { venues } from '@/db/schema'
import { eq, and } from 'drizzle-orm'
import { VenueCard } from '../_components/venue-card'
import { Clock, Info } from 'lucide-react'
import { DayTripBanner } from '../_components/day-trip-banner'
import { parseFeatures } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Happy Hour in Colorado Springs — Best Drink & Food Deals',
  description:
    "Find the best happy hours in Colorado Springs. Phantom Canyon, Jack Quinn's, and more — daily drink specials and food deals.",
  openGraph: {
    title: 'Happy Hour in Colorado Springs — Best Drink & Food Deals',
    description:
      "Find the best happy hours in Colorado Springs with daily drink specials and discounted food.",
  },
}

export default async function HappyHourPage() {
  const db = getDb()
  const allActive = await db
    .select()
    .from(venues)
    .where(eq(venues.active, true))
    .orderBy(venues.displayOrder)

  const happyHourVenues = allActive.filter((v) => {
    const f = parseFeatures(v.features)
    return f.happyHour === true
  })

  return (
    <div className="pt-20 min-h-[100dvh]">
      <div className="bg-[#161B22] border-b border-[#30363D] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="h-6 w-6 text-[#D4A853]" />
            <h1 className="text-3xl font-bold text-[#E6EDF3]">
              Happy Hour in Colorado Springs
            </h1>
          </div>
          <p className="text-[#8B949E] max-w-2xl">
            From Phantom Canyon&apos;s $1-off draft happy hour to Jack
            Quinn&apos;s legendary pub deals — the best after-work spots in
            Colorado Springs.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick reference */}
        <div className="bg-[#161B22] border border-[#D4A853]/20 rounded-xl p-5 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Info className="h-4 w-4 text-[#D4A853]" />
            <span className="text-[#D4A853] font-semibold text-sm">
              Quick Reference — Best Happy Hours
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
            {[
              {
                venue: 'Phantom Canyon Brewing Co',
                hours: 'Mon–Fri 3–6 PM',
                deal: '$1 off all draft beers',
              },
              {
                venue: "Jack Quinn's Irish Pub",
                hours: 'Mon–Fri 4–7 PM',
                deal: 'Discounted pints & pub fare',
              },
              {
                venue: "Machete's House of Knives",
                hours: 'Mon–Fri 3–6 PM',
                deal: 'Margarita & Mexican beer specials',
              },
              {
                venue: 'Cowboys',
                hours: 'Mon–Fri 4–7 PM',
                deal: 'Draft & well drink specials',
              },
            ].map((item) => (
              <div
                key={item.venue}
                className="bg-[#0D1117] rounded-lg p-3 border border-[#30363D]"
              >
                <p className="text-[#E6EDF3] font-medium text-sm">
                  {item.venue}
                </p>
                <p className="text-[#D4A853] text-xs mt-0.5">{item.hours}</p>
                <p className="text-[#8B949E] text-xs mt-0.5">{item.deal}</p>
              </div>
            ))}
          </div>
        </div>

        {happyHourVenues.length === 0 ? (
          <div className="text-center py-16">
            <Clock className="h-10 w-10 text-[#30363D] mx-auto mb-4" />
            <p className="text-[#8B949E] text-lg">
              Happy hour venues loading...
            </p>
          </div>
        ) : (
          <>
            <p className="text-[#8B949E] text-sm mb-5">
              {happyHourVenues.length} venues with happy hour deals
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {happyHourVenues.map((venue) => (
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
