import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { listingClaims, venues } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { sendClaimNotification } from '@/lib/resend'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      venueSlug?: string
      venueId?: number | null
      email?: string
      name?: string
      phone?: string
      message?: string
      tier?: string
    }
    const { venueSlug, venueId, email, name, phone, message, tier } = body

    if (!email || !tier) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const db = getDb()
    let resolvedVenueId = venueId ?? null
    let venueName = 'Unknown Business'

    // Resolve venue by slug if venueId not provided
    if (!resolvedVenueId && venueSlug) {
      const [v] = await db
        .select({ id: venues.id, name: venues.name })
        .from(venues)
        .where(eq(venues.slug, venueSlug))
      if (v) {
        resolvedVenueId = v.id
        venueName = v.name
      }
    } else if (resolvedVenueId) {
      const [v] = await db
        .select({ name: venues.name })
        .from(venues)
        .where(eq(venues.id, resolvedVenueId))
      if (v) venueName = v.name
    }

    // venueId is NOT NULL in schema — use 0 as sentinel for unclaimed/unknown venue
    await db.insert(listingClaims).values({
      venueId: resolvedVenueId ?? 0,
      email,
      name: name ?? null,
      phone: phone ?? null,
      message: message ?? null,
      tier,
      status: 'pending',
    })

    // Send emails (non-blocking — don't fail the response if Resend not configured)
    try {
      if (process.env['RESEND_API_KEY']) {
        await sendClaimNotification({
          businessName: venueName,
          ownerEmail: email,
          ownerName: name ?? email,
          tier,
          phone: phone ?? undefined,
        })
      }
    } catch (err) {
      console.error('Resend error:', err)
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Failed to submit claim' }, { status: 500 })
  }
}

export async function GET() {
  // Returns claims — admin only check done in admin pages
  const db = getDb()
  const claims = await db.select().from(listingClaims)
  return NextResponse.json(claims)
}
