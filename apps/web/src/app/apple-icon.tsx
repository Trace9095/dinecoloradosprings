import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

// Apple touch icon — fork on gold circle, no absolute positioning (Satori requirement)
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: 'linear-gradient(150deg, #1A0D07 0%, #0D1117 100%)',
          borderRadius: 38,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Gold circle plate */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            background: 'linear-gradient(145deg, #E8C97A 0%, #C49A3C 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Dark fork inside gold circle — flex column layout */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
            {/* 3 tines */}
            <div style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
              <div style={{ width: 10, height: 30, background: '#0D1117', borderRadius: 5 }} />
              <div style={{ width: 10, height: 30, background: '#0D1117', borderRadius: 5 }} />
              <div style={{ width: 10, height: 30, background: '#0D1117', borderRadius: 5 }} />
            </div>
            {/* Bridge */}
            <div style={{ width: 46, height: 8, background: '#0D1117', borderRadius: 3 }} />
            {/* Handle */}
            <div style={{ width: 16, height: 34, background: '#0D1117', borderRadius: 8 }} />
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
