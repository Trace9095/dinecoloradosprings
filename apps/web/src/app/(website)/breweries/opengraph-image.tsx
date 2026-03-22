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
          background: 'linear-gradient(160deg, #0A1020 0%, #0D1117 55%, #0D1117 100%)',
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
            padding: '56px 80px 56px 100px',
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
            <div
              style={{
                display: 'inline-flex',
                background: 'rgba(212,168,83,0.15)',
                border: '1px solid rgba(212,168,83,0.35)',
                borderRadius: 24,
                padding: '7px 18px',
                marginBottom: 24,
                width: 'fit-content',
              }}
            >
              <span style={{ fontSize: 14, color: '#D4A853', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase' }}>
                Craft Beverages
              </span>
            </div>

            <div style={{ width: 64, height: 3, background: '#D4A853', borderRadius: 2, marginBottom: 24 }} />

            <div
              style={{
                fontSize: 64,
                fontWeight: 800,
                color: '#F0EAE2',
                lineHeight: 1.05,
                letterSpacing: '-1.5px',
                marginBottom: 20,
              }}
            >
              Breweries &amp;<br />Taprooms
            </div>

            <div style={{ fontSize: 21, color: '#9E9080', lineHeight: 1.5, maxWidth: 580 }}>
              Bristol · Phantom Canyon · Cerberus · Red Leg &amp; more craft spots
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
