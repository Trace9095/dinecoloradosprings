// Shared types for Dine Colorado Springs

export type VenueCategory =
  | 'restaurant'
  | 'brewery'
  | 'cafe'
  | 'food-truck'
  | 'fine-dining'
  | 'bar'

export type VenueCuisine =
  | 'mexican'
  | 'italian'
  | 'bbq'
  | 'asian'
  | 'american'
  | 'farm-to-table'
  | 'mediterranean'
  | 'german'
  | 'irish'
  | 'cajun'
  | 'sushi'
  | 'thai'
  | 'other'

export type Neighborhood =
  | 'downtown'
  | 'old-colorado-city'
  | 'broadmoor'
  | 'north-colorado-springs'
  | 'east-colorado-springs'
  | 'manitou-springs'
  | 'briargate'
  | 'academy-blvd'

export type PriceRange = 1 | 2 | 3 | 4

export interface VenueFeatures {
  patio?: boolean
  happyHour?: boolean
  liveMusic?: boolean
  dogFriendly?: boolean
  brunch?: boolean
  takeout?: boolean
  delivery?: boolean
  reservations?: boolean
  rooftop?: boolean
  glutenFree?: boolean
  vegetarianOptions?: boolean
  kidsMenu?: boolean
}

export interface Venue {
  id: number
  name: string
  slug: string
  description: string | null
  shortDescription: string | null
  category: VenueCategory
  cuisine: VenueCuisine | null
  neighborhood: Neighborhood | null
  address: string | null
  phone: string | null
  website: string | null
  instagram: string | null
  priceRange: PriceRange | null
  hours: string | null
  features: string | null
  imageUrl: string | null
  featured: boolean
  active: boolean
  displayOrder: number
  createdAt: Date
  updatedAt: Date
}

export function priceLabel(range: PriceRange | null): string {
  if (!range) return ''
  return '$'.repeat(range)
}

export function categoryLabel(cat: VenueCategory): string {
  const labels: Record<VenueCategory, string> = {
    restaurant: 'Restaurant',
    brewery: 'Brewery',
    cafe: 'Cafe',
    'food-truck': 'Food Truck',
    'fine-dining': 'Fine Dining',
    bar: 'Bar & Pub',
  }
  return labels[cat] ?? cat
}

export function cuisineLabel(cuisine: VenueCuisine | null): string {
  if (!cuisine) return ''
  const labels: Record<VenueCuisine, string> = {
    mexican: 'Mexican',
    italian: 'Italian',
    bbq: 'BBQ',
    asian: 'Asian',
    american: 'American',
    'farm-to-table': 'Farm-to-Table',
    mediterranean: 'Mediterranean',
    german: 'German',
    irish: 'Irish',
    cajun: 'Cajun',
    sushi: 'Sushi',
    thai: 'Thai',
    other: 'Other',
  }
  return labels[cuisine] ?? cuisine
}

export function neighborhoodLabel(n: Neighborhood | null): string {
  if (!n) return ''
  const labels: Record<Neighborhood, string> = {
    downtown: 'Downtown',
    'old-colorado-city': 'Old Colorado City',
    broadmoor: 'Broadmoor',
    'north-colorado-springs': 'North COS',
    'east-colorado-springs': 'East COS',
    'manitou-springs': 'Manitou Springs',
    briargate: 'Briargate',
    'academy-blvd': 'Academy Blvd',
  }
  return labels[n] ?? n
}
