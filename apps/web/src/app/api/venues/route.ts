import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/db'
import { venues } from '@/db/schema'
import { eq, and, or } from 'drizzle-orm'
import { cookies } from 'next/headers'
import { getSession, isAdmin } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const categoryParam = searchParams.get('category')
  const featured = searchParams.get('featured')

  const db = getDb()
  let query = db.select().from(venues).$dynamic()

  // Build category filter — supports comma-separated: ?category=restaurant,fine-dining
  const conditions = [eq(venues.active, true)]

  if (categoryParam) {
    const cats = categoryParam.split(',').map((c) => c.trim())
    if (cats.length === 1) {
      conditions.push(eq(venues.category, cats[0]))
    } else if (cats.length > 1) {
      const catConditions = cats.map((c) => eq(venues.category, c))
      conditions.push(or(...catConditions)!)
    }
  }

  if (featured === 'true') {
    conditions.push(eq(venues.featured, true))
  }

  const results = await db
    .select()
    .from(venues)
    .where(and(...conditions))
    .orderBy(venues.displayOrder)

  return NextResponse.json(results)
}

export async function POST(req: NextRequest) {
  const cookieStore = await cookies()
  const session = await getSession(cookieStore.get('session')?.value)
  if (!session || !isAdmin(session.email)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const db = getDb()
    const [venue] = await db.insert(venues).values(body).returning()
    return NextResponse.json(venue, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create venue' }, { status: 500 })
  }
}
