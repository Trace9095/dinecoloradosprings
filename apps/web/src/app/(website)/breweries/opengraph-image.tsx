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
          background: 'linear-gradient(135deg, #1E1B18, #722F37)',
          fontFamily: 'sans-serif',
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
          style={{ fontSize: 52, fontWeight: 700, color: '#F0EAE2', marginBottom: 12 }}
        >
          Colorado Springs Breweries
        </div>
        <div style={{ fontSize: 22, color: '#9E9080' }}>
          Bristol · Phantom Canyon · Cerberus · Red Leg &amp; More
        </div>
      </div>
    ),
    { ...size }
  )
}
