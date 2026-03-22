import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Phone, Clock, Star, ExternalLink, ArrowLeft, Utensils, Beer, Music } from 'lucide-react'

export const metadata: Metadata = {
  title: 'WhiteWater Bar & Grill — Featured Partner | Dine Colorado Springs',
  description:
    'Undefeated Flavors. Legendary Portions. Premier dining on Hwy 50 West in Canon City, CO. Just 1 hour south of Colorado Springs. World-class food, live music, and an epic Royal Gorge atmosphere.',
  openGraph: {
    title: 'WhiteWater Bar & Grill — Featured Partner',
    description:
      'Undefeated Flavors. Legendary Portions. Premier dining on Hwy 50 West in Canon City. 1 hour south of Colorado Springs.',
  },
}

const HIGHLIGHTS = [
  { icon: Utensils, label: 'Award-winning cuisine' },
  { icon: Beer, label: 'Craft cocktails & local brews' },
  { icon: Music, label: 'Live music events' },
  { icon: MapPin, label: 'Epic Royal Gorge location' },
]

const MENU_SECTIONS = [
  {
    title: 'Starters',
    items: ['Loaded Nachos', 'River Dip with housemade chips', 'Fried Pickle Basket', 'Wings (8 flavors)'],
  },
  {
    title: 'Burgers & Sandwiches',
    items: ['The Classic WWBG Burger', 'Brisket Melt', 'Crispy Chicken Sandwich', 'Portobello Stack (V)'],
  },
  {
    title: 'Mains',
    items: ['Smoked Brisket Plate', 'Grilled Salmon', 'BBQ Ribs (half or full rack)', 'Green Chile Chicken'],
  },
  {
    title: 'Cocktails',
    items: ['Arkansas River Mule', 'Royal Gorge Gin & Tonic', 'Seasonal Margaritas', 'Local Colorado Drafts'],
  },
]

export default function WhiteWaterPartnerPage() {
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
          background: 'linear-gradient(135deg, #1A0A00 0%, #2A1500 50%, #1A0A00 100%)',
          borderBottom: '1px solid #3A332A',
        }}
      >
        {/* Decorative river texture overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #D4A853 0px, #D4A853 1px, transparent 1px, transparent 8px)',
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
              src="/logos/wwbg-logo.svg"
              alt="WhiteWater Bar & Grill"
              width={320}
              height={88}
              className="w-auto"
              style={{ maxHeight: '72px', filter: 'brightness(0) invert(1)' }}
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
            Undefeated Flavors. Legendary Portions. Award-winning dining and handcrafted cocktails
            on Hwy 50 West in Canon City — at the gateway to the Royal Gorge. Unforgettable meals,
            live music, and an atmosphere as epic as the landscape surrounding it.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a
              href="https://whitewaterbar.com"
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
              href="tel:+17192691009"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all"
              style={{
                background: '#252118',
                border: '1px solid #D4A853',
                color: '#D4A853',
                minHeight: '48px',
              }}
            >
              <Phone size={15} />
              (719) 269-1009
            </a>
          </div>
        </div>
      </div>

      {/* Details bar */}
      <div
        style={{
          background: '#161310',
          borderBottom: '1px solid #3A332A',
        }}
      >
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <div className="flex items-center gap-2 text-sm" style={{ color: '#9E9080' }}>
              <MapPin size={14} style={{ color: '#D4A853' }} />
              <span>45045 Hwy 50 West, Canon City, CO 81212</span>
            </div>
            <div className="flex items-center gap-2 text-sm" style={{ color: '#9E9080' }}>
              <Phone size={14} style={{ color: '#D4A853' }} />
              <a href="tel:+17192691009" style={{ color: '#9E9080' }}>(719) 269-1009</a>
            </div>
            <div className="flex items-center gap-2 text-sm" style={{ color: '#9E9080' }}>
              <Clock size={14} style={{ color: '#D4A853' }} />
              <span>Open April – October · Seasonal Hours</span>
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
              style={{ background: '#161310', border: '1px solid #3A332A' }}
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
              About WhiteWater Bar &amp; Grill
            </h2>
            <div className="space-y-3 text-sm leading-relaxed" style={{ color: '#9E9080' }}>
              <p>
                Located on Hwy 50 West at the eastern gateway to the Royal Gorge, WhiteWater Bar &amp; Grill
                is the crown jewel of Canon City dining. Whether you&apos;re fueling up before a rafting
                adventure or celebrating after conquering the rapids, WWBG delivers an unforgettable
                experience with every visit.
              </p>
              <p>
                The menu celebrates Colorado&apos;s bold flavors — from slow-smoked brisket and fall-off-the-bone
                ribs to fresh Colorado trout and inventive craft cocktails. Every dish is crafted with care
                and served in a setting that feels as epic as the Royal Gorge landscape surrounding it.
              </p>
              <p>
                Live music, seasonal specials, and a team that treats every guest like family make WhiteWater
                Bar &amp; Grill the perfect anchor to any Royal Gorge day trip. Just 1 hour south of Colorado
                Springs — easily worth the drive.
              </p>
            </div>
          </div>

          {/* Quick info card */}
          <div
            className="rounded-xl p-5"
            style={{ background: '#161310', border: '1px solid #3A332A' }}
          >
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: '#D4A853' }}>
              Quick Info
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Category', value: 'Bar & Grill' },
                { label: 'Cuisine', value: 'American · BBQ · Cocktails' },
                { label: 'Price Range', value: '$$' },
                { label: 'Location', value: 'Canon City, CO' },
                { label: 'Drive from C.S.', value: '~1 hour south' },
                { label: 'Reservations', value: 'Recommended' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm gap-3">
                  <span style={{ color: '#6B5E50' }}>{label}</span>
                  <span style={{ color: '#C8B99A' }} className="text-right">{value}</span>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4" style={{ borderTop: '1px solid #3A332A' }}>
              <a
                href="https://whitewaterbar.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-lg font-semibold text-sm transition-all"
                style={{
                  background: '#D4A853',
                  color: '#0D1117',
                  minHeight: '44px',
                }}
              >
                Book a Table
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
                style={{ background: '#161310', border: '1px solid #3A332A' }}
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
          <p className="mt-3 text-xs text-center" style={{ color: '#6B5E50' }}>
            Full menu at{' '}
            <a href="https://whitewaterbar.com" target="_blank" rel="noopener noreferrer" style={{ color: '#D4A853' }}>
              whitewaterbar.com
            </a>
          </p>
        </div>

        {/* CTA strip */}
        <div
          className="rounded-2xl p-8 text-center"
          style={{
            background: 'linear-gradient(135deg, #1A0A00 0%, #2A1500 100%)',
            border: '1px solid #D4A853',
          }}
        >
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#F0EAE2' }}>
            Make It a Day Trip
          </h2>
          <p className="text-sm mb-6" style={{ color: '#9E9080' }}>
            Combine a meal at WhiteWater Bar &amp; Grill with a Royal Gorge rafting adventure or zipline tour.
            The perfect Colorado day — just 1 hour south of Colorado Springs.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://whitewaterbar.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all"
              style={{ background: '#D4A853', color: '#0D1117', minHeight: '48px' }}
            >
              Visit WhiteWater Bar &amp; Grill
              <ExternalLink size={14} />
            </a>
            <a
              href="tel:+17192691009"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all"
              style={{
                background: '#252118',
                border: '1px solid #3A332A',
                color: '#F0EAE2',
                minHeight: '48px',
              }}
            >
              <Phone size={14} />
              (719) 269-1009
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
