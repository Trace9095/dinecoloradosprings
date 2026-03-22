'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { UtensilsCrossed, Menu, X, ChevronDown } from 'lucide-react'

const navLinks = [
  { href: '/restaurants', label: 'Restaurants' },
  { href: '/breweries', label: 'Breweries' },
  { href: '/cafes', label: 'Cafes' },
  { href: '/food-trucks', label: 'Food Trucks' },
  { href: '/happy-hour', label: 'Happy Hour' },
  { href: '/blog', label: 'Blog' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-[#161B22] border-b border-[#30363D]"
      style={{ minHeight: '64px' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-[#D4A853] font-bold text-lg hover:text-[#E8C97A] transition-colors"
          onClick={() => setOpen(false)}
        >
          <UtensilsCrossed className="h-5 w-5 flex-shrink-0" />
          <span className="hidden sm:block">Dine Colorado Springs</span>
          <span className="sm:hidden">Dine COS</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors min-h-[44px] flex items-center ${
                pathname === link.href
                  ? 'text-[#D4A853] bg-[#1C2333]'
                  : 'text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#1C2333]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/add-listing"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#D4A853] hover:bg-[#E8C97A] text-[#0D1117] font-semibold text-sm rounded-md transition-colors min-h-[44px]"
          >
            Add Your Business
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 rounded-md text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#1C2333] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-[#161B22] border-t border-[#30363D] px-4 pb-4">
          <nav className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`px-3 py-3 rounded-md text-sm font-medium transition-colors min-h-[44px] flex items-center ${
                  pathname === link.href
                    ? 'text-[#D4A853] bg-[#1C2333]'
                    : 'text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#1C2333]'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/add-listing"
              onClick={() => setOpen(false)}
              className="mt-2 px-4 py-3 bg-[#D4A853] hover:bg-[#E8C97A] text-[#0D1117] font-semibold text-sm rounded-md transition-colors min-h-[44px] flex items-center justify-center"
            >
              Add Your Business
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
