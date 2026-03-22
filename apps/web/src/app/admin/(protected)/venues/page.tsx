import { getDb } from '@/lib/db'
import { venues } from '@/db/schema'
import { eq } from 'drizzle-orm'
import Link from 'next/link'
import {
  Plus,
  Edit,
  Star,
  CheckCircle,
  XCircle,
} from 'lucide-react'
import { categoryLabel, priceLabel } from '@/lib/utils'

export default async function AdminVenuesPage() {
  const db = getDb()
  const allVenues = await db.select().from(venues).orderBy(venues.displayOrder)

  return (
    <div className="pt-16 lg:pt-0 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#E6EDF3]">Venues</h1>
          <p className="text-[#8B949E] text-sm mt-1">
            {allVenues.length} total venues
          </p>
        </div>
        <Link
          href="/admin/venues/new"
          className="flex items-center gap-2 px-4 py-2.5 bg-[#D4A853] hover:bg-[#E8C97A] text-[#0D1117] font-semibold text-sm rounded-xl transition-colors min-h-[44px]"
        >
          <Plus className="h-4 w-4" />
          Add Venue
        </Link>
      </div>

      {/* Table */}
      <div className="bg-[#161B22] border border-[#30363D] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#30363D] bg-[#1C2333]">
                <th className="text-left px-4 py-3 text-[#8B949E] font-medium">
                  Name
                </th>
                <th className="text-left px-4 py-3 text-[#8B949E] font-medium hidden sm:table-cell">
                  Category
                </th>
                <th className="text-left px-4 py-3 text-[#8B949E] font-medium">
                  Tier
                </th>
                <th className="text-left px-4 py-3 text-[#8B949E] font-medium hidden md:table-cell">
                  Neighborhood
                </th>
                <th className="text-left px-4 py-3 text-[#8B949E] font-medium hidden lg:table-cell">
                  Featured
                </th>
                <th className="text-left px-4 py-3 text-[#8B949E] font-medium hidden lg:table-cell">
                  Active
                </th>
                <th className="text-right px-4 py-3 text-[#8B949E] font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#30363D]">
              {allVenues.map((venue) => (
                <tr
                  key={venue.id}
                  className="hover:bg-[#1C2333] transition-colors"
                >
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-[#E6EDF3] font-medium leading-tight">
                        {venue.name}
                      </p>
                      <p className="text-[#8B949E] text-xs mt-0.5">
                        {venue.priceRange ? priceLabel(venue.priceRange) : '—'}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="text-[#8B949E] text-xs">
                      {categoryLabel(venue.category)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                        venue.tier === 'sponsored'
                          ? 'bg-[#D4A853]/10 text-[#D4A853]'
                          : venue.tier === 'premium'
                          ? 'bg-[#8B949E]/10 text-[#8B949E]'
                          : 'bg-[#30363D] text-[#8B949E]'
                      }`}
                    >
                      {venue.tier}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="text-[#8B949E] text-xs capitalize">
                      {venue.neighborhood?.replace(/-/g, ' ') ?? '—'}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    {venue.featured ? (
                      <CheckCircle className="h-4 w-4 text-[#D4A853]" />
                    ) : (
                      <XCircle className="h-4 w-4 text-[#30363D]" />
                    )}
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    {venue.active ? (
                      <CheckCircle className="h-4 w-4 text-[#3FB950]" />
                    ) : (
                      <XCircle className="h-4 w-4 text-[#F85149]" />
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/venues/${venue.id}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1C2333] hover:bg-[#30363D] text-[#8B949E] hover:text-[#E6EDF3] text-xs rounded-lg transition-colors min-h-[44px]"
                    >
                      <Edit className="h-3.5 w-3.5" />
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
