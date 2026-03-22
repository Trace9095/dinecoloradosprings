'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  UtensilsCrossed,
  LayoutDashboard,
  Store,
  FileText,
  Tag,
  LogOut,
  Menu,
  X,
} from 'lucide-react'

const navLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/venues', label: 'Venues', icon: Store, exact: false },
  { href: '/admin/claims', label: 'Claims', icon: Tag, exact: false },
]

interface AdminNavProps {
  email: string
}

export function AdminNav({ email }: AdminNavProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  function isActive(href: string, exact: boolean) {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  const navContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 border-b border-[#30363D]">
        <Link
          href="/admin"
          className="flex items-center gap-2 text-[#D4A853] font-bold"
          onClick={() => setMobileOpen(false)}
        >
          <UtensilsCrossed className="h-5 w-5" />
          <div>
            <div className="text-sm font-bold">Dine COS</div>
            <div className="text-[#8B949E] text-xs font-normal">Admin</div>
          </div>
        </Link>
      </div>

      {/* Nav links */}
      <nav className="flex-1 p-3 space-y-1">
        {navLinks.map((link) => {
          const Icon = link.icon
          const active = isActive(link.href, link.exact)
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors min-h-[44px] ${
                active
                  ? 'bg-[#D4A853]/10 text-[#D4A853] border border-[#D4A853]/20'
                  : 'text-[#8B949E] hover:text-[#E6EDF3] hover:bg-[#1C2333]'
              }`}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {link.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-[#30363D]">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#8B949E] hover:text-[#D4A853] hover:bg-[#1C2333] transition-colors min-h-[44px] mb-1"
        >
          <UtensilsCrossed className="h-4 w-4" />
          View Site
        </Link>
        <div className="px-3 py-2 mb-1">
          <p className="text-[#8B949E] text-xs truncate">{email}</p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#8B949E] hover:text-[#F85149] hover:bg-[#F85149]/10 transition-colors min-h-[44px]"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-56 bg-[#161B22] border-r border-[#30363D] flex-shrink-0">
        {navContent}
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#161B22] border-b border-[#30363D] px-4 py-3 flex items-center justify-between">
        <Link
          href="/admin"
          className="flex items-center gap-2 text-[#D4A853] font-bold text-sm"
        >
          <UtensilsCrossed className="h-4 w-4" />
          Dine COS Admin
        </Link>
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-[#8B949E] hover:text-[#E6EDF3] min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-[#0D1117]/80"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative w-64 bg-[#161B22] border-r border-[#30363D] flex flex-col pt-16">
            {navContent}
          </aside>
        </div>
      )}
    </>
  )
}
