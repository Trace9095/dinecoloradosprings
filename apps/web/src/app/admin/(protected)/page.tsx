import { getDb } from '@/lib/db'
import { venues, listingClaims } from '@/db/schema'
import { eq, count } from 'drizzle-orm'
import Link from 'next/link'
import {
  Store,
  Tag,
  Star,
  Clock,
  ChevronRight,
  TrendingUp,
} from 'lucide-react'

export default async function AdminDashboardPage() {
  const db = getDb()

  const [totalVenues, freeVenues, premiumVenues, sponsoredVenues, featuredVenues, pendingClaims, recentClaims] =
    await Promise.all([
      db.select({ count: count() }).from(venues),
      db.select({ count: count() }).from(venues).where(eq(venues.tier, 'free')),
      db.select({ count: count() }).from(venues).where(eq(venues.tier, 'premium')),
      db.select({ count: count() }).from(venues).where(eq(venues.tier, 'sponsored')),
      db.select({ count: count() }).from(venues).where(eq(venues.featured, true)),
      db.select({ count: count() }).from(listingClaims).where(eq(listingClaims.status, 'pending')),
      db.select().from(listingClaims).orderBy(listingClaims.createdAt).limit(5),
    ])

  const stats = [
    {
      label: 'Total Venues',
      value: totalVenues[0]?.count ?? 0,
      icon: Store,
      href: '/admin/venues',
      color: 'text-[#D4A853]',
      bg: 'bg-[#D4A853]/10',
    },
    {
      label: 'Premium Listings',
      value: premiumVenues[0]?.count ?? 0,
      icon: TrendingUp,
      href: '/admin/venues',
      color: 'text-[#8B949E]',
      bg: 'bg-[#8B949E]/10',
    },
    {
      label: 'Sponsored Listings',
      value: sponsoredVenues[0]?.count ?? 0,
      icon: Star,
      href: '/admin/venues',
      color: 'text-[#D4A853]',
      bg: 'bg-[#D4A853]/10',
    },
    {
      label: 'Pending Claims',
      value: pendingClaims[0]?.count ?? 0,
      icon: Tag,
      href: '/admin/claims',
      color: 'text-[#E3B341]',
      bg: 'bg-[#E3B341]/10',
    },
  ]

  return (
    <div className="pt-16 lg:pt-0 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#E6EDF3]">Dashboard</h1>
        <p className="text-[#8B949E] text-sm mt-1">
          Dine Colorado Springs — Admin Overview
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-[#161B22] border border-[#30363D] hover:border-[#D4A853]/40 rounded-xl p-5 transition-all group"
            >
              <div className={`inline-flex p-2 ${stat.bg} rounded-lg mb-3`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div className="text-3xl font-bold text-[#E6EDF3] mb-1">
                {stat.value}
              </div>
              <div className="text-[#8B949E] text-xs">{stat.label}</div>
            </Link>
          )
        })}
      </div>

      {/* Tier breakdown */}
      <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-5">
        <h2 className="text-[#E6EDF3] font-semibold mb-4">Venue Tier Breakdown</h2>
        <div className="space-y-3">
          {[
            { label: 'Free', count: freeVenues[0]?.count ?? 0, total: totalVenues[0]?.count ?? 1, color: 'bg-[#30363D]' },
            { label: 'Premium', count: premiumVenues[0]?.count ?? 0, total: totalVenues[0]?.count ?? 1, color: 'bg-[#8B949E]' },
            { label: 'Sponsored', count: sponsoredVenues[0]?.count ?? 0, total: totalVenues[0]?.count ?? 1, color: 'bg-[#D4A853]' },
          ].map((tier) => {
            const total = totalVenues[0]?.count ?? 1
            const pct = total > 0 ? Math.round((tier.count / total) * 100) : 0
            return (
              <div key={tier.label}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-[#8B949E]">{tier.label}</span>
                  <span className="text-[#E6EDF3] font-medium">
                    {tier.count} ({pct}%)
                  </span>
                </div>
                <div className="h-2 bg-[#1C2333] rounded-full overflow-hidden">
                  <div
                    className={`h-full ${tier.color} rounded-full transition-all`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent claims */}
      <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[#E6EDF3] font-semibold">Recent Claims</h2>
          <Link
            href="/admin/claims"
            className="flex items-center gap-1 text-[#D4A853] hover:text-[#E8C97A] text-sm transition-colors min-h-[44px]"
          >
            View all
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        {recentClaims.length === 0 ? (
          <p className="text-[#8B949E] text-sm">No claims yet.</p>
        ) : (
          <div className="space-y-3">
            {recentClaims.map((claim) => (
              <div
                key={claim.id}
                className="flex items-center justify-between py-2 border-b border-[#30363D] last:border-0"
              >
                <div>
                  <p className="text-[#E6EDF3] text-sm font-medium">
                    {claim.name ?? 'Unnamed Business'}
                  </p>
                  <p className="text-[#8B949E] text-xs">{claim.email}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                      claim.tier === 'sponsored'
                        ? 'bg-[#D4A853]/10 text-[#D4A853]'
                        : 'bg-[#8B949E]/10 text-[#8B949E]'
                    }`}
                  >
                    {claim.tier}
                  </span>
                  <div className="flex items-center gap-1 justify-end mt-1">
                    <Clock className="h-3 w-3 text-[#8B949E]" />
                    <span className="text-[#8B949E] text-xs">
                      {new Date(claim.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/admin/venues/new"
          className="flex items-center gap-3 p-4 bg-[#161B22] hover:bg-[#1C2333] border border-[#30363D] hover:border-[#D4A853]/40 rounded-xl transition-all group min-h-[44px]"
        >
          <Store className="h-5 w-5 text-[#D4A853]" />
          <div>
            <p className="text-[#E6EDF3] font-medium text-sm group-hover:text-[#D4A853] transition-colors">
              Add New Venue
            </p>
            <p className="text-[#8B949E] text-xs">
              Add a restaurant or business
            </p>
          </div>
          <ChevronRight className="h-4 w-4 text-[#8B949E] ml-auto" />
        </Link>
        <Link
          href="/admin/claims"
          className="flex items-center gap-3 p-4 bg-[#161B22] hover:bg-[#1C2333] border border-[#30363D] hover:border-[#D4A853]/40 rounded-xl transition-all group min-h-[44px]"
        >
          <Tag className="h-5 w-5 text-[#E3B341]" />
          <div>
            <p className="text-[#E6EDF3] font-medium text-sm group-hover:text-[#D4A853] transition-colors">
              Review Claims
            </p>
            <p className="text-[#8B949E] text-xs">
              {pendingClaims[0]?.count ?? 0} pending approval
            </p>
          </div>
          <ChevronRight className="h-4 w-4 text-[#8B949E] ml-auto" />
        </Link>
      </div>
    </div>
  )
}
