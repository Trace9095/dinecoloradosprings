import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#151515',
          fontFamily: 'sans-serif',
          padding: 64,
        }}
      >
        <div
          style={{
            fontSize: 18,
            color: '#D4A853',
            marginBottom: 16,
            textTransform: 'uppercase',
            letterSpacing: 3,
          }}
        >
          Dine Colorado Springs
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: '#F0EAE2',
            marginBottom: 40,
          }}
        >
          List Your Business
        </div>
        <div style={{ display: 'flex', gap: 32 }}>
          {[
            { name: 'Free', price: '$0' },
            { name: 'Premium', price: '$99/mo' },
            { name: 'Sponsored', price: '$199/mo' },
          ].map(t => (
            <div
              key={t.name}
              style={{
                background: '#1E1B18',
                border: '1px solid #3A332A',
                borderRadius: 12,
                padding: '24px 32px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <div style={{ fontSize: 24, fontWeight: 700, color: '#D4A853' }}>
                {t.name}
              </div>
              <div style={{ fontSize: 18, color: '#F0EAE2', marginTop: 8 }}>
                {t.price}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
