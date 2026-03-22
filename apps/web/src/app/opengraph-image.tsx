import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Dine Colorado Springs — Local Dining Directory'
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
          background: 'linear-gradient(135deg, #5A2229 0%, #722F37 40%, #151515 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Logo mark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: '#D4A853',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
            }}
          >
            🍽
          </div>
        </div>

        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: '#F0EAE2',
            letterSpacing: '-1px',
            marginBottom: 12,
          }}
        >
          Dine Colorado Springs
        </div>

        <div style={{ fontSize: 24, color: '#D4A853', marginBottom: 8 }}>
          Colorado's Premier Dining Directory
        </div>

        <div
          style={{
            fontSize: 18,
            color: '#9E9080',
            textAlign: 'center',
            maxWidth: 600,
          }}
        >
          Restaurants · Breweries · Cafes · Food Trucks · Fine Dining
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 32,
            fontSize: 16,
            color: '#9E9080',
          }}
        >
          dinecoloradosprings.com
        </div>
      </div>
    ),
    { ...size }
  )
}
