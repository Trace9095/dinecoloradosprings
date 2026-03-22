import Link from 'next/link'
import { UtensilsCrossed, ExternalLink } from 'lucide-react'

const exploreLinks = [
  { href: '/restaurants', label: 'Restaurants' },
  { href: '/breweries', label: 'Breweries' },
  { href: '/cafes', label: 'Cafes' },
  { href: '/food-trucks', label: 'Food Trucks' },
  { href: '/happy-hour', label: 'Happy Hour' },
  { href: '/blog', label: 'Blog' },
]

const businessLinks = [
  { href: '/pricing', label: 'Pricing' },
  { href: '/add-listing', label: 'Add Your Business' },
]

export function Footer() {
  return (
    <footer className="bg-[#161B22] border-t border-[#30363D] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2 text-[#D4A853] font-bold text-xl mb-3"
            >
              <UtensilsCrossed className="h-5 w-5" />
              Dine Colorado Springs
            </Link>
            <p className="text-[#8B949E] text-sm leading-relaxed max-w-sm">
              Your complete dining guide to Colorado Springs, CO. Discover the
              best restaurants, craft breweries, cafes, food trucks, and dining
              experiences in the shadow of Pikes Peak.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-[#E6EDF3] font-semibold text-sm mb-4 uppercase tracking-wide">
              Explore
            </h3>
            <ul className="space-y-2">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#8B949E] hover:text-[#D4A853] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Businesses */}
          <div>
            <h3 className="text-[#E6EDF3] font-semibold text-sm mb-4 uppercase tracking-wide">
              For Businesses
            </h3>
            <ul className="space-y-2">
              {businessLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#8B949E] hover:text-[#D4A853] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-[#E6EDF3] font-semibold text-sm mt-6 mb-4 uppercase tracking-wide">
              Nearby in Canon City
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://whitewaterbar.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8B949E] hover:text-[#D4A853] text-sm transition-colors flex items-center gap-1"
                >
                  White Water Bar &amp; Grill
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://wwrooftopsocial.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8B949E] hover:text-[#D4A853] text-sm transition-colors flex items-center gap-1"
                >
                  Rooftop Social
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://royalgorgerafting.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8B949E] hover:text-[#D4A853] text-sm transition-colors flex items-center gap-1"
                >
                  Royal Gorge Rafting
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://royalgorgeziplinetours.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8B949E] hover:text-[#D4A853] text-sm transition-colors flex items-center gap-1"
                >
                  Royal Gorge Zipline Tours
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://royalgorgevacationrentals.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8B949E] hover:text-[#D4A853] text-sm transition-colors flex items-center gap-1"
                >
                  Royal Gorge Vacation Rentals
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#30363D] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#8B949E] text-xs">
            &copy; {new Date().getFullYear()} Dine Colorado Springs. All rights
            reserved.
          </p>
          <p className="text-[#8B949E] text-xs">
            Colorado Springs, CO &mdash; Dining Directory
          </p>
        </div>
      </div>
    </footer>
  )
}
