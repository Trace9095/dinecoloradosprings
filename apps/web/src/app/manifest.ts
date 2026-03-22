import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Dine Colorado Springs',
    short_name: 'DineCoSprings',
    description: 'Colorado Springs dining directory',
    start_url: '/',
    display: 'standalone',
    background_color: '#0D1117',
    theme_color: '#D4A853',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
