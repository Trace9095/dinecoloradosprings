import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function priceLabel(range: number | null | undefined): string {
  if (!range) return ''
  return '$'.repeat(range)
}

export function categoryLabel(cat: string): string {
  const map: Record<string, string> = {
    restaurant: 'Restaurant',
    brewery: 'Brewery',
    cafe: 'Cafe',
    'food-truck': 'Food Truck',
    'fine-dining': 'Fine Dining',
    bar: 'Bar & Pub',
  }
  return map[cat] ?? cat
}

export function tierLabel(tier: string): string {
  const map: Record<string, string> = {
    free: 'Free',
    premium: 'Premium',
    sponsored: 'Sponsored',
  }
  return map[tier] ?? tier
}

export function parseFeatures(features: string | null | undefined): Record<string, boolean> {
  if (!features) return {}
  try {
    return JSON.parse(features) as Record<string, boolean>
  } catch {
    return {}
  }
}

export function formatPhone(phone: string | null | undefined): string {
  if (!phone) return ''
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }
  return phone
}
