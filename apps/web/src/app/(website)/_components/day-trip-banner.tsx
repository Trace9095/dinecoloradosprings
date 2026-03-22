import { MapPin, ExternalLink } from 'lucide-react'

const DAY_TRIP_SPOTS = [
  {
    name: 'White Water Bar & Grill',
    href: '/partners/whitewater-bar-grill',
    desc: 'Bold American cuisine & craft cocktails, Hwy 50 West, Cañon City',
    tag: 'Dining',
    external: false,
  },
  {
    name: 'Royal Gorge Rafting',
    href: 'https://royalgorgerafting.net',
    desc: 'Class III–V white-water on the Arkansas River',
    tag: 'Adventure',
    external: true,
  },
  {
    name: 'Royal Gorge Zipline Tours',
    href: 'https://royalgorgeziplinetours.com',
    desc: 'Scenic zipline tours over the Royal Gorge canyon',
    tag: 'Adventure',
    external: true,
  },
]

export function DayTripBanner() {
  return (
    <section
      style={{
        background: '#1E1B18',
        borderTop: '1px solid #3A332A',
        borderBottom: '1px solid #3A332A',
      }}
      className="py-10 px-4"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex items-start gap-3 mb-6">
          <MapPin
            size={18}
            style={{ color: '#D4A853', flexShrink: 0, marginTop: 3 }}
          />
          <div>
            <h2
              className="text-lg font-bold mb-1"
              style={{ color: '#F0EAE2' }}
            >
              Worth the Drive — Cañon City, CO
            </h2>
            <p className="text-sm" style={{ color: '#9E9080' }}>
              1 hour south via CO-115 — Royal Gorge dining and adventures
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {DAY_TRIP_SPOTS.map(site => (
            <a
              key={site.href}
              href={site.href}
              target={site.external ? '_blank' : undefined}
              rel={site.external ? 'noopener noreferrer' : undefined}
              className="flex items-start justify-between p-4 rounded-lg transition-colors group"
              style={{
                background: '#252118',
                border: '1px solid #3A332A',
                minHeight: '44px',
              }}
            >
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium uppercase tracking-wide mb-1" style={{ color: '#9E9080' }}>
                  {site.tag}
                </div>
                <div className="text-sm font-semibold group-hover:text-[#D4A853] transition-colors" style={{ color: '#F0EAE2' }}>
                  {site.name}
                </div>
                <div className="text-xs mt-0.5" style={{ color: '#9E9080' }}>
                  {site.desc}
                </div>
              </div>
              <ExternalLink
                size={13}
                style={{ color: '#9E9080', flexShrink: 0, marginTop: 4, marginLeft: 8 }}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
