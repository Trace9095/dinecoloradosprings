'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutGrid,
  UtensilsCrossed,
  Beer,
  Coffee,
  Truck,
  Star,
  Clock,
} from 'lucide-react'

const categories = [
  { href: '/restaurants', label: 'All Dining', icon: LayoutGrid },
  { href: '/restaurants', label: 'Restaurants', icon: UtensilsCrossed },
  { href: '/breweries', label: 'Breweries', icon: Beer },
  { href: '/cafes', label: 'Cafes', icon: Coffee },
  { href: '/food-trucks', label: 'Food Trucks', icon: Truck },
  { href: '/happy-hour', label: 'Happy Hour', icon: Clock },
]

interface CategoryNavProps {
  activeCategory?: string
  onSelect?: (category: string) => void
}

export function CategoryNav({ activeCategory, onSelect }: CategoryNavProps) {
  const pathname = usePathname()

  return (
    <div className="relative">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x snap-mandatory">
        {categories.map((cat) => {
          const Icon = cat.icon
          const isActive =
            activeCategory === cat.label ||
            (!activeCategory && pathname === cat.href)

          if (onSelect) {
            return (
              <button
                key={cat.label}
                type="button"
                onClick={() => onSelect(cat.label)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all snap-start flex-shrink-0 min-h-[44px] ${
                  isActive
                    ? 'bg-[#D4A853] text-[#0D1117]'
                    : 'bg-[#161B22] text-[#8B949E] border border-[#30363D] hover:text-[#E6EDF3] hover:border-[#8B949E]'
                }`}
              >
                <Icon className="h-4 w-4" />
                {cat.label}
              </button>
            )
          }

          return (
            <Link
              key={cat.href + cat.label}
              href={cat.href}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all snap-start flex-shrink-0 min-h-[44px] ${
                isActive
                  ? 'bg-[#D4A853] text-[#0D1117]'
                  : 'bg-[#161B22] text-[#8B949E] border border-[#30363D] hover:text-[#E6EDF3] hover:border-[#8B949E]'
              }`}
            >
              <Icon className="h-4 w-4" />
              {cat.label}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
