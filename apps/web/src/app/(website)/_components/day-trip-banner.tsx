import { MapPin, ExternalLink } from 'lucide-react'

const DINING_PARTNERS = [
  {
    name: 'White Water Bar & Grill',
    url: 'https://whitewaterbar.com',
    partnerPage: '/partners/whitewater-bar-grill',
    desc: 'Award-winning dining & cocktails on the Arkansas River',
    tag: 'Dining',
  },
  {
    name: 'Rooftop Social',
    url: 'https://wwrooftopsocial.com',
    partnerPage: '/partners/rooftop-social',
    desc: 'Downtown Canon City rooftop bar & American cuisine',
    tag: 'Dining',
  },
]

const ADVENTURE_PARTNERS = [
  {
    name: 'Royal Gorge Rafting',
    url: 'https://royalgorgerafting.net',
    desc: 'Class III–V white-water on the Arkansas River',
    tag: 'Adventure',
  },
  {
    name: 'Royal Gorge Zipline',
    url: 'https://royalgorgeziplinetours.com',
    desc: 'Scenic zipline tours over the Royal Gorge',
    tag: 'Adventure',
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
      className="py-12 px-4"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex items-start gap-3 mb-8">
          <MapPin
            size={20}
            style={{ color: '#D4A853', flexShrink: 0, marginTop: 2 }}
          />
          <div>
            <h2
              className="text-xl font-bold mb-1"
              style={{ color: '#F0EAE2' }}
            >
              Worth the Drive — Canon City, CO
            </h2>
            <p className="text-sm" style={{ color: '#9E9080' }}>
              Just 1 hour south of Colorado Springs. World-class dining and
              Royal Gorge adventures await.
            </p>
          </div>
        </div>

        {/* Dining partners */}
        <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#D4A853' }}>
          Featured Dining
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {DINING_PARTNERS.map(site => (
            <a
              key={site.url}
              href={site.partnerPage}
              className="flex items-start justify-between p-4 rounded-lg transition-all group"
              style={{
                background: '#252118',
                border: '1px solid #D4A853',
              }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="px-1.5 py-0.5 rounded text-xs font-bold uppercase"
                    style={{ background: '#D4A853', color: '#0D1117' }}
                  >
                    Featured Partner
                  </span>
                </div>
                <div className="text-sm font-semibold group-hover:text-[#D4A853] transition-colors" style={{ color: '#F0EAE2' }}>
                  {site.name}
                </div>
                <div className="text-xs mt-0.5" style={{ color: '#9E9080' }}>
                  {site.desc}
                </div>
              </div>
              <ExternalLink
                size={14}
                style={{ color: '#D4A853', flexShrink: 0, marginTop: 4, marginLeft: 8 }}
              />
            </a>
          ))}
        </div>

        {/* Adventure partners */}
        <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#9E9080' }}>
          Day Trip Adventures
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ADVENTURE_PARTNERS.map(site => (
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
                style={{ color: '#9E9080', flexShrink: 0, marginTop: 2 }}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
