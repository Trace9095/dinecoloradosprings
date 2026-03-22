import { ImageResponse } from 'next/og'
import { getDb } from '@/lib/db'
import { venues } from '@/db/schema'
import { eq } from 'drizzle-orm'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

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
    })
    .from(venues)
    .where(eq(venues.slug, slug))

  const name = venue?.name ?? 'Colorado Springs Dining'
  const desc = venue?.shortDescription ?? 'Discover Colorado Springs dining'
  const cat = venue?.category ?? 'Restaurant'
  const price = venue?.priceRange ? '$'.repeat(venue.priceRange) : ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #5A2229 0%, #722F37 50%, #151515 100%)',
          fontFamily: 'sans-serif',
          padding: 64,
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              fontSize: 18,
              color: '#D4A853',
              textTransform: 'uppercase',
              letterSpacing: 2,
            }}
          >
            Dine Colorado Springs
          </div>
        </div>

        <div>
          <div
            style={{
              display: 'inline-block',
              background: '#D4A853',
              color: '#151515',
              fontSize: 14,
              fontWeight: 700,
              padding: '6px 16px',
              borderRadius: 20,
              marginBottom: 20,
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            {cat}
            {price ? ` · ${price}` : ''}
          </div>

          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: '#F0EAE2',
              marginBottom: 16,
              lineHeight: 1.1,
            }}
          >
            {name}
          </div>

          <div style={{ fontSize: 22, color: '#9E9080', maxWidth: 700 }}>
            {desc}
          </div>
        </div>

        <div style={{ fontSize: 16, color: '#9E9080' }}>
          dinecoloradosprings.com
        </div>
      </div>
    ),
    { ...size }
  )
}
