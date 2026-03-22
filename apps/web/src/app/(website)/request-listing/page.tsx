'use client'

import { useState } from 'react'
import { MapPin, Send, CheckCircle } from 'lucide-react'

export default function RequestListingPage() {
  const [form, setForm] = useState({
    businessName: '',
    contactName: '',
    contactEmail: '',
    address: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/request-listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <CheckCircle className="mx-auto mb-4" size={48} style={{ color: '#D4A853' }} />
          <h1
            className="text-2xl font-semibold mb-2"
            style={{ color: '#F0EAE2' }}
          >
            Request Received
          </h1>
          <p style={{ color: '#9E9080' }}>
            Thanks! We&apos;ll review your submission and add the listing within 2 business
            days. Once it&apos;s live, you can claim it and choose a listing plan.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <MapPin size={20} style={{ color: '#D4A853' }} />
          <span className="text-sm font-medium" style={{ color: '#D4A853' }}>
            Missing a Spot?
          </span>
        </div>
        <h1
          className="text-3xl font-semibold tracking-tight mb-3"
          style={{ color: '#F0EAE2' }}
        >
          Don&apos;t See Your Business Listed?
        </h1>
        <p style={{ color: '#9E9080' }} className="text-base leading-relaxed">
          We&apos;re always adding new Colorado Springs restaurants, breweries, and dining
          spots. Submit the details below and we&apos;ll review and get it added within 2
          business days.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            className="block text-sm font-medium mb-1.5"
            style={{ color: '#F0EAE2' }}
          >
            Business Name <span style={{ color: '#D4A853' }}>*</span>
          </label>
          <input
            type="text"
            required
            value={form.businessName}
            onChange={e => setForm(f => ({ ...f, businessName: e.target.value }))}
            placeholder="e.g. Mountain View Bistro"
            className="w-full px-4 py-3 rounded-lg text-sm outline-none focus:ring-2"
            style={{
              background: '#1E1B18',
              border: '1px solid #3A332A',
              color: '#F0EAE2',
              minHeight: '44px',
            }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label
              className="block text-sm font-medium mb-1.5"
              style={{ color: '#F0EAE2' }}
            >
              Your Name
            </label>
            <input
              type="text"
              value={form.contactName}
              onChange={e => setForm(f => ({ ...f, contactName: e.target.value }))}
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-lg text-sm outline-none focus:ring-2"
              style={{
                background: '#1E1B18',
                border: '1px solid #3A332A',
                color: '#F0EAE2',
                minHeight: '44px',
              }}
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1.5"
              style={{ color: '#F0EAE2' }}
            >
              Email <span style={{ color: '#D4A853' }}>*</span>
            </label>
            <input
              type="email"
              required
              value={form.contactEmail}
              onChange={e => setForm(f => ({ ...f, contactEmail: e.target.value }))}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-lg text-sm outline-none focus:ring-2"
              style={{
                background: '#1E1B18',
                border: '1px solid #3A332A',
                color: '#F0EAE2',
                minHeight: '44px',
              }}
            />
          </div>
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-1.5"
            style={{ color: '#F0EAE2' }}
          >
            Address
          </label>
          <input
            type="text"
            value={form.address}
            onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
            placeholder="123 Main St, Colorado Springs, CO"
            className="w-full px-4 py-3 rounded-lg text-sm outline-none focus:ring-2"
            style={{
              background: '#1E1B18',
              border: '1px solid #3A332A',
              color: '#F0EAE2',
              minHeight: '44px',
            }}
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-1.5"
            style={{ color: '#F0EAE2' }}
          >
            Additional Info
          </label>
          <textarea
            value={form.message}
            onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
            placeholder="Hours, cuisine type, website, anything else..."
            rows={4}
            className="w-full px-4 py-3 rounded-lg text-sm resize-none outline-none focus:ring-2"
            style={{
              background: '#1E1B18',
              border: '1px solid #3A332A',
              color: '#F0EAE2',
            }}
          />
        </div>

        {status === 'error' && (
          <p className="text-sm" style={{ color: '#E05252' }}>
            Something went wrong. Please try again or email us directly.
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="flex items-center justify-center gap-2 w-full py-3 px-6 rounded-lg font-medium text-sm transition-opacity"
          style={{
            background: '#722F37',
            color: '#F0EAE2',
            minHeight: '44px',
            opacity: status === 'loading' ? 0.6 : 1,
            cursor: status === 'loading' ? 'wait' : 'pointer',
          }}
        >
          <Send size={16} />
          {status === 'loading' ? 'Submitting…' : 'Submit Listing Request'}
        </button>
      </form>

      <p className="mt-6 text-xs text-center" style={{ color: '#9E9080' }}>
        Already have a listing?{' '}
        <a href="/add-listing" style={{ color: '#D4A853' }}>
          Claim and upgrade it here.
        </a>
      </p>
    </div>
  )
}
