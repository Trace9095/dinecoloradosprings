import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

// Fork silhouette favicon — no absolute positioning (Satori requirement)
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: '#0D1117',
          borderRadius: 7,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Fork: column layout — tines, bridge, handle */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
          {/* 3 tines side by side */}
          <div style={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
            <div style={{ width: 3, height: 10, background: '#D4A853', borderRadius: 2 }} />
            <div style={{ width: 3, height: 10, background: '#D4A853', borderRadius: 2 }} />
            <div style={{ width: 3, height: 10, background: '#D4A853', borderRadius: 2 }} />
          </div>
          {/* Bridge connecting tines to handle */}
          <div style={{ width: 17, height: 3, background: '#D4A853', borderRadius: 1 }} />
          {/* Handle */}
          <div style={{ width: 6, height: 13, background: '#D4A853', borderRadius: 3 }} />
        </div>
      </div>
    ),
    { ...size }
  )
}
