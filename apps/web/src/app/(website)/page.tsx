export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getDb } from '@/lib/db'
import { venues, blogPosts } from '@/db/schema'
import { eq, desc, and, or } from 'drizzle-orm'
import { VenueCard } from './_components/venue-card'
import { DayTripBanner } from './_components/day-trip-banner'
import {
  UtensilsCrossed,
  Beer,
  Coffee,
  Truck,
  Star,
  Clock,
  MapPin,
  ArrowRight,
  ChevronRight,
} from 'lucide-react'

const APP_URL =
  process.env['NEXT_PUBLIC_APP_URL'] ?? 'https://dinecoloradosprings.com'

export const metadata: Metadata = {
  title: 'Dine Colorado Springs — Best Restaurants, Breweries & Dining Guide',
  description:
    'Discover the best restaurants, craft breweries, cafes, and dining experiences in Colorado Springs, CO. Your complete local dining guide for the shadow of Pikes Peak.',
  openGraph: {
    title: 'Dine Colorado Springs — Best Restaurants, Breweries & Dining Guide',
    description:
      'Discover the best restaurants, craft breweries, cafes, and dining experiences in Colorado Springs, CO.',
    url: APP_URL,
    type: 'website',
  },
}

const categoryCards = [
  {
    href: '/restaurants',
    label: 'Restaurants',
    description: 'From fine dining to neighborhood favorites',
    icon: UtensilsCrossed,
  },
  {
    href: '/breweries',
    label: 'Breweries',
    description: 'Colorado craft beer excellence',
    icon: Beer,
  },
  {
    href: '/cafes',
    label: 'Cafes',
    description: 'Specialty coffee and local roasters',
    icon: Coffee,
  },
  {
    href: '/food-trucks',
    label: 'Food Trucks',
    description: 'Street food and mobile kitchens',
    icon: Truck,
  },
  {
    href: '/happy-hour',
    label: 'Happy Hour',
    description: 'Best deals on drinks and food',
    icon: Clock,
  },
  {
    href: '/restaurants',
    label: 'Fine Dining',
    description: 'The Broadmoor and beyond',
    icon: Star,
  },
]

// Static JSON-LD — safe hardcoded string, no user input
const faqJsonLd = `{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What are the best restaurants in Colorado Springs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Colorado Springs has an incredible dining scene anchored by The Broadmoor's award-winning restaurants including The Penrose Room — Colorado's only AAA Five Diamond restaurant. Top local favorites include Shuga's Social House for creative American cuisine, Brother Luck Street Eats for farm-to-table dining, and Craftwood Inn in Manitou Springs for Colorado game."
      }
    },
    {
      "@type": "Question",
      "name": "Where are the best craft breweries in Colorado Springs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bristol Brewing Company in the historic Ivywild School is the city's most beloved brewery. Phantom Canyon Brewing Co anchors downtown in a stunning 1901 building with a rooftop bar and legendary happy hours. Trinity Brewing is nationally known for wild ales and sours. Other top picks include Cerberus Brewing, Goat Patch Brewing, Red Leg Brewing, and Gold Camp Brewing in Old Colorado City."
      }
    },
    {
      "@type": "Question",
      "name": "What are the best happy hour spots in Colorado Springs?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Phantom Canyon Brewing Co runs one of the city's best happy hours: Monday through Friday from 3-6 PM with $1 off all drafts. Jack Quinn's Irish Pub offers happy hour Monday through Friday from 4-7 PM with discounted beers and pub fare."
      }
    }
  ]
}`

export default async function HomePage() {
  const db = getDb()

  const [featuredVenues, breweries, latestPosts] = await Promise.all([
    db
      .select()
      .from(venues)
      .where(
        and(
          eq(venues.active, true),
          or(eq(venues.featured, true), eq(venues.tier, 'sponsored'))
        )
      )
      .orderBy(desc(venues.displayOrder))
      .limit(6),
    db
      .select()
      .from(venues)
      .where(and(eq(venues.active, true), eq(venues.category, 'brewery')))
      .orderBy(venues.displayOrder)
      .limit(4),
    db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.published, true))
      .orderBy(desc(blogPosts.createdAt))
      .limit(3),
  ])

  return (
    <>
      {/* JSON-LD FAQ Schema — static hardcoded content only */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: faqJsonLd }}
      />

      {/* Hero */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0D1117] to-[#161B22]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#D4A853]/10 border border-[#D4A853]/20 rounded-full text-[#D4A853] text-sm font-medium mb-6">
            <MapPin className="h-3.5 w-3.5" />
            Colorado Springs, CO
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#E6EDF3] mb-6 leading-tight">
            Discover Colorado Springs{' '}
            <span className="text-[#D4A853]">Dining</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#8B949E] mb-10 max-w-2xl mx-auto leading-relaxed">
            From The Broadmoor&apos;s AAA Five Diamond restaurant to beloved
            neighborhood breweries and authentic tacos — your complete guide to
            eating and drinking in the shadow of Pikes Peak.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/restaurants"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#D4A853] hover:bg-[#E8C97A] text-[#0D1117] font-semibold rounded-xl transition-colors min-h-[52px] text-base"
            >
              <UtensilsCrossed className="h-5 w-5" />
              Explore Restaurants
            </Link>
            <Link
              href="/add-listing"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#161B22] hover:bg-[#1C2333] text-[#E6EDF3] font-semibold rounded-xl border border-[#30363D] hover:border-[#D4A853]/40 transition-colors min-h-[52px] text-base"
            >
              Add Your Business
            </Link>
          </div>
        </div>
      </section>

      {/* Category grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#0D1117]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-[#E6EDF3] mb-8">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {categoryCards.map((cat) => {
              const Icon = cat.icon
              return (
                <Link
                  key={cat.label}
                  href={cat.href}
                  className="flex flex-col items-center gap-2 p-4 bg-[#161B22] hover:bg-[#1C2333] border border-[#30363D] hover:border-[#D4A853]/40 rounded-xl transition-all group min-h-[44px]"
                >
                  <div className="p-2.5 bg-[#D4A853]/10 rounded-lg group-hover:bg-[#D4A853]/20 transition-colors">
                    <Icon className="h-5 w-5 text-[#D4A853]" />
                  </div>
                  <span className="text-[#E6EDF3] font-medium text-sm text-center">
                    {cat.label}
                  </span>
                  <span className="text-[#8B949E] text-xs text-center leading-tight hidden sm:block">
                    {cat.description}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured venues */}
      {featuredVenues.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#161B22]">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-[#E6EDF3]">
                  Featured Restaurants
                </h2>
                <p className="text-[#8B949E] text-sm mt-1">
                  Top picks for Colorado Springs dining
                </p>
              </div>
              <Link
                href="/restaurants"
                className="flex items-center gap-1 text-[#D4A853] hover:text-[#E8C97A] text-sm font-medium transition-colors min-h-[44px]"
              >
                View all
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredVenues.map((venue) => (
                <VenueCard key={venue.id} venue={venue} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Top Breweries */}
      {breweries.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#0D1117]">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-[#E6EDF3]">
                  Top Breweries
                </h2>
                <p className="text-[#8B949E] text-sm mt-1">
                  Colorado Springs craft beer scene
                </p>
              </div>
              <Link
                href="/breweries"
                className="flex items-center gap-1 text-[#D4A853] hover:text-[#E8C97A] text-sm font-medium transition-colors min-h-[44px]"
              >
                All breweries
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {breweries.map((venue) => (
                <VenueCard key={venue.id} venue={venue} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Best Patios CTA */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#161B22]">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-[#D4A853]/10 to-[#1C2333] border border-[#D4A853]/20 rounded-2xl p-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#D4A853]/10 border border-[#D4A853]/20 rounded-full text-[#D4A853] text-sm font-medium mb-4">
              <Star className="h-3.5 w-3.5" />
              300+ sunny days a year
            </div>
            <h2 className="text-2xl font-bold text-[#E6EDF3] mb-3">
              Best Patios in Colorado Springs
            </h2>
            <p className="text-[#8B949E] mb-6 max-w-2xl mx-auto">
              From Phantom Canyon&apos;s rooftop bar with Pikes Peak views to
              Bristol Brewing&apos;s dog-friendly beer garden — Colorado Springs
              excels at outdoor dining.
            </p>
            <Link
              href="/blog/best-patios-colorado-springs"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#D4A853] hover:bg-[#E8C97A] text-[#0D1117] font-semibold rounded-xl transition-colors min-h-[44px]"
            >
              Read the Patio Guide
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Happy Hour section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#0D1117]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#E6EDF3]">
                Happy Hour Guide
              </h2>
              <p className="text-[#8B949E] text-sm mt-1">
                Best deals on drinks and food in Colorado Springs
              </p>
            </div>
            <Link
              href="/happy-hour"
              className="flex items-center gap-1 text-[#D4A853] hover:text-[#E8C97A] text-sm font-medium transition-colors min-h-[44px]"
            >
              View all
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                venue: 'Phantom Canyon Brewing Co',
                slug: 'phantom-canyon-brewing-co',
                detail: 'Mon–Fri 3–6 PM · $1 off all drafts',
              },
              {
                venue: "Jack Quinn's Irish Pub",
                slug: 'jack-quinn-irish-pub',
                detail: 'Mon–Fri 4–7 PM · Discounted pints & pub fare',
              },
              {
                venue: "Machete's House of Knives",
                slug: 'machetes-house-of-knives',
                detail: 'Mon–Fri 3–6 PM · Margarita specials',
              },
            ].map((item) => (
              <Link
                key={item.slug}
                href={`/${item.slug}`}
                className="p-4 bg-[#161B22] hover:bg-[#1C2333] border border-[#30363D] hover:border-[#D4A853]/40 rounded-xl transition-all group min-h-[44px]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-[#D4A853]" />
                  <span className="font-semibold text-[#E6EDF3] text-sm group-hover:text-[#D4A853] transition-colors">
                    {item.venue}
                  </span>
                </div>
                <p className="text-[#8B949E] text-xs">{item.detail}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blog preview */}
      {latestPosts.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#161B22]">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-[#E6EDF3]">
                  Dining Guides
                </h2>
                <p className="text-[#8B949E] text-sm mt-1">
                  Expert insights on Colorado Springs dining
                </p>
              </div>
              <Link
                href="/blog"
                className="flex items-center gap-1 text-[#D4A853] hover:text-[#E8C97A] text-sm font-medium transition-colors min-h-[44px]"
              >
                All guides
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {latestPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="block bg-[#0D1117] hover:bg-[#1C2333] border border-[#30363D] hover:border-[#D4A853]/40 rounded-xl p-5 transition-all group"
                >
                  <h3 className="font-semibold text-[#E6EDF3] text-base leading-snug mb-2 group-hover:text-[#D4A853] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-[#8B949E] text-sm line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                  <span className="mt-3 inline-flex items-center gap-1 text-[#D4A853] text-sm">
                    Read guide
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Day trip banner */}
      <DayTripBanner />

      {/* Add listing CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0D1117]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-[#E6EDF3] mb-4">
            Own a Restaurant or Bar?
          </h2>
          <p className="text-[#8B949E] text-lg mb-8 leading-relaxed">
            Get your business in front of thousands of Colorado Springs diners.
            Starting at $99/mo — featured placement, photos, and full business profile.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/add-listing"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#D4A853] hover:bg-[#E8C97A] text-[#0D1117] font-semibold rounded-xl transition-colors min-h-[52px]"
            >
              Add Your Business
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#161B22] hover:bg-[#1C2333] text-[#E6EDF3] font-semibold rounded-xl border border-[#30363D] hover:border-[#D4A853]/40 transition-colors min-h-[52px]"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
