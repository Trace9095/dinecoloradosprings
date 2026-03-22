import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { venues } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { cookies } from 'next/headers'
import { getSession, isAdmin } from '@/lib/auth'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(_req: NextRequest, { params }: RouteParams) {
  const { id } = await params
  const venueId = parseInt(id, 10)
  if (isNaN(venueId)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }

  const db = getDb()
  const [venue] = await db.select().from(venues).where(eq(venues.id, venueId))
  if (!venue) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json(venue)
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  const cookieStore = await cookies()
  const session = await getSession(cookieStore.get('session')?.value)
  if (!session || !isAdmin(session.email)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const venueId = parseInt(id, 10)
  if (isNaN(venueId)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }

  try {
    const body = await req.json()
    const db = getDb()
    const [updated] = await db
      .update(venues)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(venues.id, venueId))
      .returning()

    if (!updated) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    return NextResponse.json(updated)
  } catch {
    return NextResponse.json({ error: 'Failed to update venue' }, { status: 500 })
  }
}

export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  const cookieStore = await cookies()
  const session = await getSession(cookieStore.get('session')?.value)
  if (!session || !isAdmin(session.email)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await params
  const venueId = parseInt(id, 10)
  if (isNaN(venueId)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }

  const db = getDb()
  await db.delete(venues).where(eq(venues.id, venueId))
  return NextResponse.json({ ok: true })
}
