'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, Save } from 'lucide-react'
import Link from 'next/link'

const CATEGORIES = [
  'restaurant', 'brewery', 'cafe', 'food-truck', 'fine-dining', 'bar',
]
const TIERS = ['free', 'premium', 'sponsored']
const PRICE_RANGES = [
  { value: 1, label: '$ (Under $15)' },
  { value: 2, label: '$$ ($15-$30)' },
  { value: 3, label: '$$$ ($30-$60)' },
  { value: 4, label: '$$$$ (Over $60)' },
]

export default function NewVenuePage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    shortDescription: '',
    category: 'restaurant',
    cuisine: '',
    neighborhood: '',
    address: '',
    phone: '',
    website: '',
    priceRange: 2,
    hours: '',
    features: '{}',
    featured: false,
    active: true,
    tier: 'free',
    displayOrder: 0,
  })

  function update(field: string, value: string | number | boolean) {
    setForm((prev) => {
      const updated = { ...prev, [field]: value }
      if (field === 'name' && typeof value === 'string' && !prev.slug) {
        updated.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9 -]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim()
      }
      return updated
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const res = await fetch('/api/venues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to create venue')
      router.push('/admin/venues')
    } catch {
      setError('Failed to save venue. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="pt-16 lg:pt-0 max-w-2xl space-y-5">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/venues"
          className="flex items-center gap-1 text-[#8B949E] hover:text-[#D4A853] text-sm transition-colors min-h-[44px]"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Link>
        <h1 className="text-2xl font-bold text-[#E6EDF3]">Add New Venue</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#161B22] border border-[#30363D] rounded-xl p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#E6EDF3] text-sm font-medium mb-1.5">Name *</label>
            <input
              required
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              className="w-full bg-[#1C2333] border border-[#30363D] rounded-xl px-4 py-2.5 text-[#E6EDF3] text-sm focus:outline-none focus:border-[#D4A853] min-h-[44px]"
            />
          </div>
          <div>
            <label className="block text-[#E6EDF3] text-sm font-medium mb-1.5">Slug *</label>
            <input
              required
              value={form.slug}
              onChange={(e) => update('slug', e.target.value)}
              className="w-full bg-[#1C2333] border border-[#30363D] rounded-xl px-4 py-2.5 text-[#E6EDF3] text-sm focus:outline-none focus:border-[#D4A853] min-h-[44px]"
            />
          </div>
        </div>

        <div>
          <label className="block text-[#E6EDF3] text-sm font-medium mb-1.5">Short Description</label>
          <input
            value={form.shortDescription}
            onChange={(e) => update('shortDescription', e.target.value)}
            className="w-full bg-[#1C2333] border border-[#30363D] rounded-xl px-4 py-2.5 text-[#E6EDF3] text-sm focus:outline-none focus:border-[#D4A853] min-h-[44px]"
          />
        </div>

        <div>
          <label className="block text-[#E6EDF3] text-sm font-medium mb-1.5">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            rows={3}
            className="w-full bg-[#1C2333] border border-[#30363D] rounded-xl px-4 py-2.5 text-[#E6EDF3] text-sm focus:outline-none focus:border-[#D4A853] resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-[#E6EDF3] text-sm font-medium mb-1.5">Category *</label>
            <select
              required
              value={form.category}
              onChange={(e) => update('category', e.target.value)}
              className="w-full bg-[#1C2333] border border-[#30363D] rounded-xl px-4 py-2.5 text-[#E6EDF3] text-sm focus:outline-none focus:border-[#D4A853] min-h-[44px]"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[#E6EDF3] text-sm font-medium mb-1.5">Tier</label>
            <select
              value={form.tier}
              onChange={(e) => update('tier', e.target.value)}
              className="w-full bg-[#1C2333] border border-[#30363D] rounded-xl px-4 py-2.5 text-[#E6EDF3] text-sm focus:outline-none focus:border-[#D4A853] min-h-[44px]"
            >
              {TIERS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[#E6EDF3] text-sm font-medium mb-1.5">Price Range</label>
            <select
              value={form.priceRange}
              onChange={(e) => update('priceRange', parseInt(e.target.value))}
              className="w-full bg-[#1C2333] border border-[#30363D] rounded-xl px-4 py-2.5 text-[#E6EDF3] text-sm focus:outline-none focus:border-[#D4A853] min-h-[44px]"
            >
              {PRICE_RANGES.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#E6EDF3] text-sm font-medium mb-1.5">Cuisine</label>
            <input
              value={form.cuisine}
              onChange={(e) => update('cuisine', e.target.value)}
              placeholder="e.g. mexican, italian"
              className="w-full bg-[#1C2333] border border-[#30363D] rounded-xl px-4 py-2.5 text-[#E6EDF3] text-sm focus:outline-none focus:border-[#D4A853] min-h-[44px]"
            />
          </div>
          <div>
            <label className="block text-[#E6EDF3] text-sm font-medium mb-1.5">Neighborhood</label>
            <input
              value={form.neighborhood}
              onChange={(e) => update('neighborhood', e.target.value)}
              placeholder="e.g. downtown, old-colorado-city"
              className="w-full bg-[#1C2333] border border-[#30363D] rounded-xl px-4 py-2.5 text-[#E6EDF3] text-sm focus:outline-none focus:border-[#D4A853] min-h-[44px]"
            />
          </div>
        </div>

        <div>
          <label className="block text-[#E6EDF3] text-sm font-medium mb-1.5">Address</label>
          <input
            value={form.address}
            onChange={(e) => update('address', e.target.value)}
            className="w-full bg-[#1C2333] border border-[#30363D] rounded-xl px-4 py-2.5 text-[#E6EDF3] text-sm focus:outline-none focus:border-[#D4A853] min-h-[44px]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#E6EDF3] text-sm font-medium mb-1.5">Phone</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => update('phone', e.target.value)}
              className="w-full bg-[#1C2333] border border-[#30363D] rounded-xl px-4 py-2.5 text-[#E6EDF3] text-sm focus:outline-none focus:border-[#D4A853] min-h-[44px]"
            />
          </div>
          <div>
            <label className="block text-[#E6EDF3] text-sm font-medium mb-1.5">Website</label>
            <input
              type="url"
              value={form.website}
              onChange={(e) => update('website', e.target.value)}
              className="w-full bg-[#1C2333] border border-[#30363D] rounded-xl px-4 py-2.5 text-[#E6EDF3] text-sm focus:outline-none focus:border-[#D4A853] min-h-[44px]"
            />
          </div>
        </div>

        <div>
          <label className="block text-[#E6EDF3] text-sm font-medium mb-1.5">Hours</label>
          <input
            value={form.hours}
            onChange={(e) => update('hours', e.target.value)}
            placeholder="Mon–Fri 11 AM – 9 PM | Sat–Sun 10 AM – 10 PM"
            className="w-full bg-[#1C2333] border border-[#30363D] rounded-xl px-4 py-2.5 text-[#E6EDF3] text-sm focus:outline-none focus:border-[#D4A853] min-h-[44px]"
          />
        </div>

        <div>
          <label className="block text-[#E6EDF3] text-sm font-medium mb-1.5">
            Features (JSON)
          </label>
          <input
            value={form.features}
            onChange={(e) => update('features', e.target.value)}
            placeholder='{"patio":true,"happyHour":true}'
            className="w-full bg-[#1C2333] border border-[#30363D] rounded-xl px-4 py-2.5 text-[#E6EDF3] text-sm font-mono focus:outline-none focus:border-[#D4A853] min-h-[44px]"
          />
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer min-h-[44px]">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => update('featured', e.target.checked)}
              className="w-4 h-4 accent-[#D4A853]"
            />
            <span className="text-[#E6EDF3] text-sm">Featured</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer min-h-[44px]">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => update('active', e.target.checked)}
              className="w-4 h-4 accent-[#D4A853]"
            />
            <span className="text-[#E6EDF3] text-sm">Active</span>
          </label>
        </div>

        {error && (
          <p className="text-[#F85149] text-sm bg-[#F85149]/10 border border-[#F85149]/20 rounded-lg px-4 py-3">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#D4A853] hover:bg-[#E8C97A] disabled:opacity-50 text-[#0D1117] font-semibold rounded-xl transition-colors min-h-[48px]"
        >
          <Save className="h-4 w-4" />
          {saving ? 'Saving...' : 'Save Venue'}
        </button>
      </form>
    </div>
  )
}
