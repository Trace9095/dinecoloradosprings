import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getDb } from '@/lib/db'
import { venues } from '@/db/schema'
import { eq } from 'drizzle-orm'
import {
  MapPin,
  Phone,
  Globe,
  Clock,
  TreePine,
  Music,
  Tag,
  ChevronLeft,
  ExternalLink,
  Star,
  Instagram,
} from 'lucide-react'
import { categoryLabel, priceLabel, parseFeatures } from '@/lib/utils'
import { DayTripBanner } from '../_components/day-trip-banner'
export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const db = getDb()
    const allVenues = await db
      .select({ slug: venues.slug })
      .from(venues)
      .where(eq(venues.active, true))
    return allVenues.map((v) => ({ slug: v.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const db = getDb()
  const [venue] = await db.select().from(venues).where(eq(venues.slug, slug))
  if (!venue) return { title: 'Not Found' }

  return {
    title: `${venue.name} — Colorado Springs Dining`,
    description:
      venue.shortDescription ??
      `${venue.name} in Colorado Springs, CO. ${categoryLabel(venue.category)} serving ${venue.cuisine ?? 'great food'}.`,
    openGraph: {
      title: venue.name,
      description: venue.shortDescription ?? venue.description ?? '',
      type: 'website',
    },
  }
}

function buildJsonLd(venue: {
  name: string
  description: string | null
  address: string | null
  phone: string | null
  website: string | null
  priceRange: number | null
  cuisine: string | null
  hours: string | null
  category: string
}) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': venue.category === 'brewery' ? 'BreweryOrWinery' : 'Restaurant',
    name: venue.name,
    description: venue.description ?? '',
    address: {
      '@type': 'PostalAddress',
      streetAddress: venue.address ?? '',
      addressLocality: 'Colorado Springs',
      addressRegion: 'CO',
      addressCountry: 'US',
    },
    telephone: venue.phone ?? '',
    url: venue.website ?? '',
    priceRange: venue.priceRange ? '$'.repeat(venue.priceRange) : '',
    servesCuisine: venue.cuisine ?? '',
    openingHours: venue.hours ?? '',
  })
}

export default async function VenuePage({ params }: PageProps) {
  const { slug } = await params
  const db = getDb()
  const [venue] = await db.select().from(venues).where(eq(venues.slug, slug))
  if (!venue) notFound()

  const features = parseFeatures(venue.features)
  const featureList = [
    { key: 'patio', label: 'Patio', Icon: TreePine },
    { key: 'happyHour', label: 'Happy Hour', Icon: Clock },
    { key: 'liveMusic', label: 'Live Music', Icon: Music },
    { key: 'reservations', label: 'Reservations', Icon: Star },
    { key: 'dogFriendly', label: 'Dog Friendly', Icon: Tag },
  ]
  const activeFeatures = featureList.filter((f) => features[f.key])

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: buildJsonLd(venue) }}
      />

      <div className="pt-20 min-h-[100dvh]">
        {/* Back nav */}
        <div className="bg-[#161B22] border-b border-[#30363D] px-4 sm:px-6 lg:px-8 py-3">
          <div className="max-w-5xl mx-auto">
            <Link
              href="/restaurants"
              className="inline-flex items-center gap-1 text-[#8B949E] hover:text-[#D4A853] text-sm transition-colors min-h-[44px]"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Restaurants
            </Link>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Hero */}
              <div className="bg-[#161B22] border border-[#30363D] rounded-2xl overflow-hidden">
                {/* Image placeholder */}
                <div className="h-56 sm:h-72 bg-gradient-to-br from-[#1C2333] to-[#0D1117] flex items-center justify-center">
                  <span className="text-[#30363D] text-7xl font-bold select-none">
                    {venue.name.charAt(0)}
                  </span>
                </div>

                <div className="p-6">
                  {/* Tier badge */}
                  {venue.tier !== 'free' && (
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-3 ${
                        venue.tier === 'sponsored'
                          ? 'bg-[#D4A853] text-[#0D1117]'
                          : 'bg-[#8B949E] text-[#0D1117]'
                      }`}
                    >
                      {venue.tier}
                    </span>
                  )}

                  <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-[#E6EDF3]">
                      {venue.name}
                    </h1>
                    {venue.priceRange && (
                      <span className="text-[#D4A853] font-semibold text-xl">
                        {priceLabel(venue.priceRange)}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2.5 py-1 bg-[#1C2333] border border-[#30363D] rounded-full text-[#E6EDF3] text-xs">
                      {categoryLabel(venue.category)}
                    </span>
                    {venue.cuisine && (
                      <span className="px-2.5 py-1 bg-[#1C2333] border border-[#30363D] rounded-full text-[#8B949E] text-xs capitalize">
                        {venue.cuisine}
                      </span>
                    )}
                    {venue.neighborhood && (
                      <span className="flex items-center gap-1 px-2.5 py-1 bg-[#1C2333] border border-[#30363D] rounded-full text-[#8B949E] text-xs">
                        <MapPin className="h-3 w-3" />
                        <span className="capitalize">
                          {venue.neighborhood.replace(/-/g, ' ')}
                        </span>
                      </span>
                    )}
                  </div>

                  {venue.description && (
                    <p className="text-[#8B949E] leading-relaxed">
                      {venue.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Hours */}
              {venue.hours && (
                <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-5">
                  <h2 className="text-[#E6EDF3] font-semibold mb-3 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#D4A853]" />
                    Hours
                  </h2>
                  <p className="text-[#8B949E] text-sm whitespace-pre-line">
                    {venue.hours}
                  </p>
                </div>
              )}

              {/* Features */}
              {activeFeatures.length > 0 && (
                <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-5">
                  <h2 className="text-[#E6EDF3] font-semibold mb-3">
                    Features &amp; Amenities
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {activeFeatures.map(({ key, label, Icon }) => (
                      <span
                        key={key}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#D4A853]/10 border border-[#D4A853]/20 rounded-full text-[#D4A853] text-sm"
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery placeholder */}
              <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-5">
                <h2 className="text-[#E6EDF3] font-semibold mb-3">Photos</h2>
                <div className="grid grid-cols-3 gap-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square bg-[#1C2333] rounded-lg flex items-center justify-center border border-[#30363D]"
                    >
                      <span className="text-[#30363D] text-xs text-center px-2">
                        Photo {i + 1}
                      </span>
                    </div>
                  ))}
                </div>
                {venue.tier === 'free' && (
                  <p className="text-[#8B949E] text-xs mt-3">
                    Upgrade to Premium to add a photo gallery.
                  </p>
                )}
              </div>

              {/* Claim listing CTA */}
              {venue.tier === 'free' && (
                <div className="bg-gradient-to-r from-[#D4A853]/10 to-[#1C2333] border border-[#D4A853]/20 rounded-xl p-6">
                  <h2 className="text-[#E6EDF3] font-bold text-lg mb-2">
                    Is This Your Business?
                  </h2>
                  <p className="text-[#8B949E] text-sm mb-4">
                    Claim your listing to add photos, update your hours, add
                    your website and booking links, and get featured placement
                    in search results.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link
                      href={`/add-listing?venue=${venue.slug}&tier=premium`}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#D4A853] hover:bg-[#E8C97A] text-[#0D1117] font-semibold text-sm rounded-lg transition-colors min-h-[44px]"
                    >
                      Claim as Premium — $99/mo
                    </Link>
                    <Link
                      href={`/add-listing?venue=${venue.slug}&tier=sponsored`}
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#161B22] hover:bg-[#1C2333] text-[#E6EDF3] font-semibold text-sm rounded-lg border border-[#30363D] hover:border-[#D4A853]/40 transition-colors min-h-[44px]"
                    >
                      Claim as Sponsored — $199/mo
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Contact card */}
              <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-5 space-y-3">
                <h2 className="text-[#E6EDF3] font-semibold">
                  Contact &amp; Location
                </h2>

                {venue.address && (
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-[#D4A853] flex-shrink-0 mt-0.5" />
                    <span className="text-[#8B949E] text-sm">
                      {venue.address}
                    </span>
                  </div>
                )}

                {venue.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#D4A853] flex-shrink-0" />
                    <a
                      href={`tel:${venue.phone}`}
                      className="text-[#8B949E] hover:text-[#D4A853] text-sm transition-colors"
                    >
                      {venue.phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')}
                    </a>
                  </div>
                )}

                {venue.instagram && (
                  <div className="flex items-center gap-2">
                    <Instagram className="h-4 w-4 text-[#D4A853] flex-shrink-0" />
                    <a
                      href={`https://instagram.com/${venue.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#8B949E] hover:text-[#D4A853] text-sm transition-colors"
                    >
                      @{venue.instagram}
                    </a>
                  </div>
                )}

                {venue.website && (
                  <a
                    href={venue.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-[#D4A853] hover:bg-[#E8C97A] text-[#0D1117] font-semibold text-sm rounded-lg transition-colors min-h-[44px]"
                  >
                    <Globe className="h-4 w-4" />
                    Visit Website
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}

                {venue.bookingUrl && (
                  <a
                    href={venue.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-[#161B22] hover:bg-[#1C2333] text-[#E6EDF3] font-semibold text-sm rounded-lg border border-[#30363D] hover:border-[#D4A853]/40 transition-colors min-h-[44px]"
                  >
                    Make a Reservation
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>

              {/* Nearby Canon City */}
              <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-5">
                <h3 className="text-[#E6EDF3] font-semibold text-sm mb-3">
                  Also Visit: Canon City
                </h3>
                <p className="text-[#8B949E] text-xs mb-3">
                  Just 45 minutes southwest of Colorado Springs, Canon City has
                  excellent dining along the Arkansas River.
                </p>
                <div className="space-y-2">
                  <a
                    href="https://whitewaterbar.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-[#8B949E] hover:text-[#D4A853] text-xs transition-colors min-h-[44px]"
                  >
                    White Water Bar &amp; Grill
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <a
                    href="https://wwrooftopsocial.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-[#8B949E] hover:text-[#D4A853] text-xs transition-colors min-h-[44px]"
                  >
                    Rooftop Social
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              {/* Pricing CTA */}
              <div className="bg-[#161B22] border border-[#30363D] rounded-xl p-5">
                <h3 className="text-[#E6EDF3] font-semibold text-sm mb-2">
                  Own This Business?
                </h3>
                <p className="text-[#8B949E] text-xs mb-3">
                  Upgrade for featured placement, photos, and more.
                </p>
                <Link
                  href="/pricing"
                  className="block text-center px-4 py-2.5 bg-[#D4A853]/10 hover:bg-[#D4A853]/20 text-[#D4A853] font-semibold text-sm rounded-lg border border-[#D4A853]/20 transition-colors min-h-[44px] flex items-center justify-center"
                >
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DayTripBanner />
    </>
  )
}
