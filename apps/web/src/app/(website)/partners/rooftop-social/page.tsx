import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Phone, Clock, Star, ExternalLink, ArrowLeft, Utensils, Sunset, Wine } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Rooftop Social — Featured Partner | Dine Colorado Springs',
  description:
    'Downtown Canon City\'s premier rooftop bar and American cuisine. Stunning views, craft cocktails, and elevated dining just 1 hour south of Colorado Springs.',
  openGraph: {
    title: 'Rooftop Social — Featured Partner',
    description:
      'Downtown Canon City\'s premier rooftop bar. Stunning views, craft cocktails, and elevated dining 1 hour south of Colorado Springs.',
  },
}

const HIGHLIGHTS = [
  { icon: Sunset, label: 'Rooftop views' },
  { icon: Wine, label: 'Craft cocktail bar' },
  { icon: Utensils, label: 'American cuisine' },
  { icon: MapPin, label: 'Downtown Canon City' },
]

const MENU_SECTIONS = [
  {
    title: 'Small Plates',
    items: ['Rooftop Flatbread', 'Charcuterie Board', 'Crispy Brussels', 'Deviled Eggs'],
  },
  {
    title: 'Mains',
    items: ['Rooftop Burger', 'Blackened Chicken Pasta', 'Steak Frites', 'Pan-Seared Salmon'],
  },
  {
    title: 'Signature Cocktails',
    items: ['Gorge Spritz', 'Royal Mule', 'Canon Sour', 'Seasonal Sangria'],
  },
  {
    title: 'Wine & Beer',
    items: ['Colorado craft beer on tap', 'Curated wine list', 'Non-alcoholic mocktails', 'Local cider'],
  },
]

export default function RooftopSocialPartnerPage() {
  return (
    <div style={{ background: '#0D1117', minHeight: '100dvh' }}>
      {/* Back nav */}
      <div className="px-4 pt-6 pb-2 max-w-5xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm transition-colors"
          style={{ color: '#9E9080' }}
        >
          <ArrowLeft size={14} />
          Back to Directory
        </Link>
      </div>

      {/* Hero */}
      <div
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0A0D14 0%, #12182A 50%, #0A0D14 100%)',
          borderBottom: '1px solid #2A2F3A',
        }}
      >
        {/* Decorative overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'repeating-linear-gradient(-45deg, #D4A853 0px, #D4A853 1px, transparent 1px, transparent 8px)',
          }}
        />

        <div className="relative max-w-5xl mx-auto px-4 py-14 sm:py-20">
          {/* Featured Partner badge */}
          <div className="flex items-center gap-2 mb-6">
            <span
              className="px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider"
              style={{ background: '#D4A853', color: '#0D1117' }}
            >
              Featured Partner
            </span>
            <span className="text-sm" style={{ color: '#9E9080' }}>
              Worth the Drive — Canon City, CO
            </span>
          </div>

          {/* Logo */}
          <div className="mb-6">
            <Image
              src="/logos/rt-logo.svg"
              alt="Rooftop Social"
              width={320}
              height={121}
              className="w-auto"
              style={{ maxHeight: '80px' }}
            />
          </div>

          {/* Stars */}
          <div className="flex items-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} size={18} fill="#D4A853" style={{ color: '#D4A853' }} />
            ))}
            <span className="ml-2 text-sm font-medium" style={{ color: '#D4A853' }}>
              5.0 · Featured Partner
            </span>
          </div>

          <p className="text-lg sm:text-xl leading-relaxed max-w-2xl mb-8" style={{ color: '#C8B99A' }}>
            Canon City&apos;s premier rooftop destination. Elevated American cuisine, handcrafted cocktails,
            and sweeping views of downtown and the Royal Gorge region — all from the most stylish
            perch in southern Colorado.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a
              href="https://wwrooftopsocial.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all"
              style={{
                background: '#D4A853',
                color: '#0D1117',
                minHeight: '48px',
              }}
            >
              Visit Website
              <ExternalLink size={15} />
            </a>
            <a
              href="tel:+17194517241"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all"
              style={{
                background: '#161B22',
                border: '1px solid #D4A853',
                color: '#D4A853',
                minHeight: '48px',
              }}
            >
              <Phone size={15} />
              (719) 451-7241
            </a>
          </div>
        </div>
      </div>

      {/* Details bar */}
      <div
        style={{
          background: '#0F1117',
          borderBottom: '1px solid #2A2F3A',
        }}
      >
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <div className="flex items-center gap-2 text-sm" style={{ color: '#9E9080' }}>
              <MapPin size={14} style={{ color: '#D4A853' }} />
              <span>302 Royal Gorge Blvd, Canon City, CO 81212</span>
            </div>
            <div className="flex items-center gap-2 text-sm" style={{ color: '#9E9080' }}>
              <Phone size={14} style={{ color: '#D4A853' }} />
              <a href="tel:+17194517241" style={{ color: '#9E9080' }}>(719) 451-7241</a>
            </div>
            <div className="flex items-center gap-2 text-sm" style={{ color: '#9E9080' }}>
              <Clock size={14} style={{ color: '#D4A853' }} />
              <span>Thu–Sun · See website for current hours</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {HIGHLIGHTS.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 py-5 px-3 rounded-xl text-center"
              style={{ background: '#0F1117', border: '1px solid #2A2F3A' }}
            >
              <Icon size={20} style={{ color: '#D4A853' }} />
              <span className="text-xs font-medium" style={{ color: '#C8B99A' }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* About section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-4" style={{ color: '#F0EAE2' }}>
              About Rooftop Social
            </h2>
            <div className="space-y-3 text-sm leading-relaxed" style={{ color: '#9E9080' }}>
              <p>
                Perched above downtown Canon City, Rooftop Social redefines dining in the Royal Gorge
                region. What started as a vision to bring sophisticated rooftop culture to southern
                Colorado has become the area&apos;s most talked-about dining destination.
              </p>
              <p>
                The menu blends classic American comfort with elevated technique — think house-ground
                burgers, perfectly seared proteins, and seasonal small plates designed for sharing.
                The cocktail program is equally ambitious, featuring house-infused spirits, seasonal
                ingredients, and bartenders who treat their craft as an art form.
              </p>
              <p>
                Whether you&apos;re grabbing drinks at sunset, celebrating a special occasion, or fueling up
                before heading to the Royal Gorge, Rooftop Social offers an experience that&apos;s as
                memorable as the views. Just 1 hour south of Colorado Springs — and absolutely worth the drive.
              </p>
            </div>
          </div>

          {/* Quick info card */}
          <div
            className="rounded-xl p-5"
            style={{ background: '#0F1117', border: '1px solid #2A2F3A' }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: '#D4A853' }}>
              Quick Info
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Category', value: 'Rooftop Bar & Restaurant' },
                { label: 'Cuisine', value: 'American · Craft Cocktails' },
                { label: 'Price Range', value: '$$–$$$' },
                { label: 'Location', value: 'Downtown Canon City, CO' },
                { label: 'Drive from C.S.', value: '~1 hour south' },
                { label: 'Reservations', value: 'Recommended' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm gap-3">
                  <span style={{ color: '#6B6E7A' }}>{label}</span>
                  <span style={{ color: '#C8B99A' }} className="text-right">{value}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4" style={{ borderTop: '1px solid #2A2F3A' }}>
              <a
                href="https://wwrooftopsocial.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-lg font-semibold text-sm transition-all"
                style={{
                  background: '#D4A853',
                  color: '#0D1117',
                  minHeight: '44px',
                }}
              >
                Reserve a Table
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>

        {/* Menu preview */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-5" style={{ color: '#F0EAE2' }}>
            Menu Highlights
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MENU_SECTIONS.map((section) => (
              <div
                key={section.title}
                className="rounded-xl p-5"
                style={{ background: '#0F1117', border: '1px solid #2A2F3A' }}
              >
                <h3 className="text-sm font-semibold mb-3" style={{ color: '#D4A853' }}>
                  {section.title}
                </h3>
                <ul className="space-y-1.5">
                  {section.items.map((item) => (
                    <li key={item} className="text-sm" style={{ color: '#9E9080' }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-center" style={{ color: '#6B6E7A' }}>
            Full menu at{' '}
            <a href="https://wwrooftopsocial.com" target="_blank" rel="noopener noreferrer" style={{ color: '#D4A853' }}>
              wwrooftopsocial.com
            </a>
          </p>
        </div>

        {/* CTA strip */}
        <div
          className="rounded-2xl p-8 text-center"
          style={{
            background: 'linear-gradient(135deg, #0A0D14 0%, #12182A 100%)',
            border: '1px solid #D4A853',
          }}
        >
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#F0EAE2' }}>
            Make It a Day Trip
          </h2>
          <p className="text-sm mb-6" style={{ color: '#9E9080' }}>
            Pair dinner at Rooftop Social with a Royal Gorge adventure — rafting, zipline, or the
            famous Royal Gorge Bridge &amp; Park. The perfect Colorado evening, just 1 hour south
            of Colorado Springs.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://wwrooftopsocial.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all"
              style={{ background: '#D4A853', color: '#0D1117', minHeight: '48px' }}
            >
              Visit Rooftop Social
              <ExternalLink size={14} />
            </a>
            <a
              href="tel:+17194517241"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all"
              style={{
                background: '#161B22',
                border: '1px solid #2A2F3A',
                color: '#F0EAE2',
                minHeight: '48px',
              }}
            >
              <Phone size={14} />
              (719) 451-7241
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
