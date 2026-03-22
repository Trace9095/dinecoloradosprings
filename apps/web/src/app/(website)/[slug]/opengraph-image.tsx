import { ImageResponse } from 'next/og'
import { getDb } from '@/lib/db'
import { venues } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const TIER_LABEL: Record<string, string> = {
  sponsored: 'Sponsored',
  premium: 'Premium',
  free: '',
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const db = getDb()
  const [venue] = await db
    .select({
      name: venues.name,
      shortDescription: venues.shortDescription,
      category: venues.category,
      neighborhood: venues.neighborhood,
      priceRange: venues.priceRange,
      tier: venues.tier,
    })
    .from(venues)
    .where(eq(venues.slug, slug))

  const name = venue?.name ?? 'Colorado Springs Dining'
  const desc = venue?.shortDescription ?? 'Discover great dining in Colorado Springs, CO'
  const cat = venue?.category ?? 'Restaurant'
  const price = venue?.priceRange ? '$'.repeat(venue.priceRange) : ''
  const tierLabel = venue?.tier ? (TIER_LABEL[venue.tier] ?? '') : ''
  const neighborhood = venue?.neighborhood ?? ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: 'linear-gradient(160deg, #1A0D07 0%, #0D1117 55%, #0D1117 100%)',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Left gold strip */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 8,
            height: 630,
            background: 'linear-gradient(180deg, transparent 0%, #D4A853 25%, #D4A853 75%, transparent 100%)',
          }}
        />

        {/* Right plate decoration */}
        <div
          style={{
            position: 'absolute',
            right: -80,
            top: 95,
            width: 440,
            height: 440,
            borderRadius: 220,
            border: '2px solid rgba(212,168,83,0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 340,
              height: 340,
              borderRadius: 170,
              border: '1px solid rgba(212,168,83,0.10)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ position: 'relative', width: 90, height: 136, opacity: 0.25 }}>
              <div style={{ position: 'absolute', left: 0, top: 0, width: 18, height: 48, background: '#D4A853', borderRadius: 9 }} />
              <div style={{ position: 'absolute', left: 36, top: 0, width: 18, height: 48, background: '#D4A853', borderRadius: 9 }} />
              <div style={{ position: 'absolute', left: 72, top: 0, width: 18, height: 48, background: '#D4A853', borderRadius: 9 }} />
              <div style={{ position: 'absolute', left: 0, top: 48, width: 90, height: 12, background: '#D4A853', borderRadius: 4 }} />
              <div style={{ position: 'absolute', left: 33, top: 60, width: 24, height: 76, background: '#D4A853', borderRadius: 12 }} />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '52px 80px 52px 100px',
            width: 760,
            height: '100%',
          }}
        >
          {/* Brand label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ position: 'relative', width: 18, height: 26 }}>
              <div style={{ position: 'absolute', left: 0, top: 0, width: 3, height: 10, background: '#D4A853', borderRadius: 2 }} />
              <div style={{ position: 'absolute', left: 7, top: 0, width: 3, height: 10, background: '#D4A853', borderRadius: 2 }} />
              <div style={{ position: 'absolute', left: 14, top: 0, width: 3, height: 10, background: '#D4A853', borderRadius: 2 }} />
              <div style={{ position: 'absolute', left: 0, top: 10, width: 17, height: 3, background: '#D4A853', borderRadius: 1 }} />
              <div style={{ position: 'absolute', left: 5, top: 13, width: 7, height: 13, background: '#D4A853', borderRadius: 3 }} />
            </div>
            <div style={{ fontSize: 15, color: '#D4A853', letterSpacing: 5, textTransform: 'uppercase', fontWeight: 600 }}>
              DINE COLORADO SPRINGS
            </div>
          </div>

          {/* Center content */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* Category + tier + price pills */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
              <div
                style={{
                  background: '#D4A853',
                  borderRadius: 20,
                  padding: '6px 16px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 700, color: '#0D1117', letterSpacing: 1, textTransform: 'uppercase' }}>
                  {cat}{price ? ` · ${price}` : ''}
                </span>
              </div>
              {neighborhood && (
                <div
                  style={{
                    background: 'rgba(212,168,83,0.12)',
                    border: '1px solid rgba(212,168,83,0.3)',
                    borderRadius: 20,
                    padding: '6px 16px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontSize: 13, color: '#D4A853', letterSpacing: 0.5 }}>
                    {neighborhood}
                  </span>
                </div>
              )}
              {tierLabel && (
                <div
                  style={{
                    background: 'rgba(212,168,83,0.12)',
                    border: '1px solid rgba(212,168,83,0.3)',
                    borderRadius: 20,
                    padding: '6px 16px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontSize: 13, color: '#D4A853', letterSpacing: 0.5 }}>
                    {tierLabel}
                  </span>
                </div>
              )}
            </div>

            <div style={{ width: 64, height: 3, background: '#D4A853', borderRadius: 2, marginBottom: 20 }} />

            <div
              style={{
                fontSize: name.length > 24 ? 52 : 62,
                fontWeight: 800,
                color: '#F0EAE2',
                lineHeight: 1.05,
                letterSpacing: '-1px',
                marginBottom: 18,
              }}
            >
              {name}
            </div>

            <div style={{ fontSize: 20, color: '#9E9080', lineHeight: 1.5, maxWidth: 600 }}>
              {desc}
            </div>
          </div>

          {/* Bottom */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 15, color: '#6B5E50', letterSpacing: 1 }}>
              dinecoloradosprings.com
            </div>
            <div style={{ fontSize: 13, color: '#D4A853', background: 'rgba(212,168,83,0.12)', border: '1px solid rgba(212,168,83,0.3)', borderRadius: 20, padding: '5px 14px', letterSpacing: 1 }}>
              Colorado Springs, CO
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
