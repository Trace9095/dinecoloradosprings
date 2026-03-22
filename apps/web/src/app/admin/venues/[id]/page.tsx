'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ChevronLeft, Save, Trash2 } from 'lucide-react'
import Link from 'next/link'
import type { Venue } from '@/db/schema'

const CATEGORIES = ['restaurant', 'brewery', 'cafe', 'food-truck', 'fine-dining', 'bar']
const TIERS = ['free', 'premium', 'sponsored']

export default function EditVenuePage() {
  const router = useRouter()
  const params = useParams()
  const id = params['id'] as string

  const [venue, setVenue] = useState<Venue | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/venues/${id}`)
      .then((r) => r.json())
      .then((data: Venue) => {
        setVenue(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  function update(field: string, value: string | number | boolean | null) {
    setVenue((prev) => prev ? { ...prev, [field]: value } : prev)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!venue) return
    setSaving(true)
    setError('')
    try {
      const res = await fetch(`/api/venues/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(venue),
      })
      if (!res.ok) throw new Error('Failed')
      router.push('/admin/venues')
    } catch {
      setError('Failed to save changes.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!confirm('Delete this venue? This cannot be undone.')) return
    setDeleting(true)
    try {
      await fetch(`/api/venues/${id}`, { method: 'DELETE' })
      router.push('/admin/venues')
    } catch {
      setError('Failed to delete venue.')
      setDeleting(false)
    }
  }

  if (loading) {
    return (
      <div className="pt-16 lg:pt-0 max-w-2xl space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-12 bg-[#161B22] rounded-xl animate-pulse" />
        ))}
      </div>
    )
  }

  if (!venue) {
    return (
      <div className="pt-16 lg:pt-0">
        <p className="text-[#F85149]">Venue not found.</p>
        <Link href="/admin/venues" className="text-[#D4A853] hover:text-[#E8C97A] text-sm mt-3 inline-block">
          Back to venues
        </Link>
      </div>
    )
  }

  return (
    <div className="pt-16 lg:pt-0 max-w-2xl space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/venues"
            className="flex items-center gap-1 text-[#8B949E] hover:text-[#D4A853] text-sm transition-colors min-h-[44px]"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Link>
          <h1 className="text-xl font-bold text-[#E6EDF3]">Edit: {venue.name}</h1>
        </div>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleting}
          className="flex items-center gap-1.5 px-3 py-2 bg-[#F85149]/10 hover:bg-[#F85149]/20 text-[#F85149] text-sm rounded-lg transition-colors min-h-[44px] disabled:opacity-50"
        >
          <Trash2 className="h-4 w-4" />
          {deleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>

      <form onSubmit={handleSave} className="bg-[#161B22] border border-[#30363D] rounded-xl p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#E6EDF3] text-sm font-medium mb-1.5">Name *</label>
            <input
              required
              value={venue.name}
              onChange={(e) => update('name', e.target.value)}
              className="w-full bg-[#1C2333] border border-[#30363D] rounded-xl px-4 py-2.5 text-[#E6EDF3] text-sm focus:outline-none focus:border-[#D4A853] min-h-[44px]"
            />
          </div>
          <div>
            <label className="block text-[#E6EDF3] text-sm font-medium mb-1.5">Slug</label>
            <input
              value={venue.slug}
              onChange={(e) => update('slug', e.target.value)}
              className="w-full bg-[#1C2333] border border-[#30363D] rounded-xl px-4 py-2.5 text-[#E6EDF3] text-sm font-mono focus:outline-none focus:border-[#D4A853] min-h-[44px]"
            />
          </div>
        </div>

        <div>
          <label className="block text-[#E6EDF3] text-sm font-medium mb-1.5">Short Description</label>
          <input
            value={venue.shortDescription ?? ''}
            onChange={(e) => update('shortDescription', e.target.value)}
            className="w-full bg-[#1C2333] border border-[#30363D] rounded-xl px-4 py-2.5 text-[#E6EDF3] text-sm focus:outline-none focus:border-[#D4A853] min-h-[44px]"
          />
        </div>

        <div>
          <label className="block text-[#E6EDF3] text-sm font-medium mb-1.5">Description</label>
          <textarea
            value={venue.description ?? ''}
            onChange={(e) => update('description', e.target.value)}
            rows={4}
            className="w-full bg-[#1C2333] border border-[#30363D] rounded-xl px-4 py-2.5 text-[#E6EDF3] text-sm focus:outline-none focus:border-[#D4A853] resize-none"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-[#E6EDF3] text-sm font-medium mb-1.5">Category</label>
            <select
              value={venue.category}
              onChange={(e) => update('category', e.target.value)}
              className="w-full bg-[#1C2333] border border-[#30363D] rounded-xl px-3 py-2.5 text-[#E6EDF3] text-sm focus:outline-none focus:border-[#D4A853] min-h-[44px]"
            >
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[#E6EDF3] text-sm font-medium mb-1.5">Tier</label>
            <select
              value={venue.tier}
              onChange={(e) => update('tier', e.target.value)}
              className="w-full bg-[#1C2333] border border-[#30363D] rounded-xl px-3 py-2.5 text-[#E6EDF3] text-sm focus:outline-none focus:border-[#D4A853] min-h-[44px]"
            >
              {TIERS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[#E6EDF3] text-sm font-medium mb-1.5">Price Range</label>
            <select
              value={venue.priceRange ?? 2}
              onChange={(e) => update('priceRange', parseInt(e.target.value))}
              className="w-full bg-[#1C2333] border border-[#30363D] rounded-xl px-3 py-2.5 text-[#E6EDF3] text-sm focus:outline-none focus:border-[#D4A853] min-h-[44px]"
            >
              {[1,2,3,4].map((p) => <option key={p} value={p}>{'$'.repeat(p)}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[#E6EDF3] text-sm font-medium mb-1.5">Order</label>
            <input
              type="number"
              value={venue.displayOrder ?? 0}
              onChange={(e) => update('displayOrder', parseInt(e.target.value))}
              className="w-full bg-[#1C2333] border border-[#30363D] rounded-xl px-3 py-2.5 text-[#E6EDF3] text-sm focus:outline-none focus:border-[#D4A853] min-h-[44px]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#E6EDF3] text-sm font-medium mb-1.5">Cuisine</label>
            <input
              value={venue.cuisine ?? ''}
              onChange={(e) => update('cuisine', e.target.value)}
              className="w-full bg-[#1C2333] border border-[#30363D] rounded-xl px-4 py-2.5 text-[#E6EDF3] text-sm focus:outline-none focus:border-[#D4A853] min-h-[44px]"
            />
          </div>
          <div>
            <label className="block text-[#E6EDF3] text-sm font-medium mb-1.5">Neighborhood</label>
            <input
              value={venue.neighborhood ?? ''}
              onChange={(e) => update('neighborhood', e.target.value)}
              className="w-full bg-[#1C2333] border border-[#30363D] rounded-xl px-4 py-2.5 text-[#E6EDF3] text-sm focus:outline-none focus:border-[#D4A853] min-h-[44px]"
            />
          </div>
        </div>

        <div>
          <label className="block text-[#E6EDF3] text-sm font-medium mb-1.5">Address</label>
          <input
            value={venue.address ?? ''}
            onChange={(e) => update('address', e.target.value)}
            className="w-full bg-[#1C2333] border border-[#30363D] rounded-xl px-4 py-2.5 text-[#E6EDF3] text-sm focus:outline-none focus:border-[#D4A853] min-h-[44px]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[#E6EDF3] text-sm font-medium mb-1.5">Phone</label>
            <input
              value={venue.phone ?? ''}
              onChange={(e) => update('phone', e.target.value)}
              className="w-full bg-[#1C2333] border border-[#30363D] rounded-xl px-4 py-2.5 text-[#E6EDF3] text-sm focus:outline-none focus:border-[#D4A853] min-h-[44px]"
            />
          </div>
          <div>
            <label className="block text-[#E6EDF3] text-sm font-medium mb-1.5">Website</label>
            <input
              value={venue.website ?? ''}
              onChange={(e) => update('website', e.target.value)}
              className="w-full bg-[#1C2333] border border-[#30363D] rounded-xl px-4 py-2.5 text-[#E6EDF3] text-sm focus:outline-none focus:border-[#D4A853] min-h-[44px]"
            />
          </div>
        </div>

        <div>
          <label className="block text-[#E6EDF3] text-sm font-medium mb-1.5">Hours</label>
          <input
            value={venue.hours ?? ''}
            onChange={(e) => update('hours', e.target.value)}
            className="w-full bg-[#1C2333] border border-[#30363D] rounded-xl px-4 py-2.5 text-[#E6EDF3] text-sm focus:outline-none focus:border-[#D4A853] min-h-[44px]"
          />
        </div>

        <div>
          <label className="block text-[#E6EDF3] text-sm font-medium mb-1.5">Features (JSON)</label>
          <input
            value={venue.features ?? '{}'}
            onChange={(e) => update('features', e.target.value)}
            className="w-full bg-[#1C2333] border border-[#30363D] rounded-xl px-4 py-2.5 text-[#E6EDF3] text-sm font-mono focus:outline-none focus:border-[#D4A853] min-h-[44px]"
          />
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer min-h-[44px]">
            <input
              type="checkbox"
              checked={venue.featured ?? false}
              onChange={(e) => update('featured', e.target.checked)}
              className="w-4 h-4 accent-[#D4A853]"
            />
            <span className="text-[#E6EDF3] text-sm">Featured</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer min-h-[44px]">
            <input
              type="checkbox"
              checked={venue.active ?? true}
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
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}
