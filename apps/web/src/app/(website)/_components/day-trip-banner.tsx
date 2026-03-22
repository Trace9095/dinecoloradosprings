import { MapPin, ExternalLink } from 'lucide-react'

const NEARBY_SITES = [
  {
    name: 'White Water Bar & Grill',
    url: 'https://whitewaterbar.com',
    desc: 'Canon City dining',
  },
  {
    name: 'Rooftop Social',
    url: 'https://wwrooftopsocial.com',
    desc: 'Canon City rooftop',
  },
  {
    name: 'Royal Gorge Rafting',
    url: 'https://royalgorgerafting.net',
    desc: 'Arkansas River adventures',
  },
  {
    name: 'Royal Gorge Zipline',
    url: 'https://royalgorgeziplinetours.com',
    desc: 'Scenic zipline tours',
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
            size={20}
            style={{ color: '#D4A853', flexShrink: 0, marginTop: 2 }}
          />
          <div>
            <h2
              className="text-lg font-semibold mb-1"
              style={{ color: '#F0EAE2' }}
            >
              Explore Beyond Colorado Springs
            </h2>
            <p className="text-sm" style={{ color: '#9E9080' }}>
              The Royal Gorge &amp; Canon City are just 1 hour south — a perfect
              day trip.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {NEARBY_SITES.map(site => (
            <a
              key={site.url}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start justify-between p-4 rounded-lg transition-colors"
              style={{
                background: '#252118',
                border: '1px solid #3A332A',
                minHeight: '44px',
              }}
            >
              <div>
                <div className="text-sm font-medium" style={{ color: '#F0EAE2' }}>
                  {site.name}
                </div>
                <div className="text-xs mt-0.5" style={{ color: '#9E9080' }}>
                  {site.desc}
                </div>
              </div>
              <ExternalLink
                size={14}
                style={{ color: '#D4A853', flexShrink: 0, marginTop: 2 }}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
