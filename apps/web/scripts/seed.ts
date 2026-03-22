import { getDb } from '../src/lib/db'
import { admins, venues, blogPosts } from '../src/db/schema'
import { hashPassword } from '../src/lib/auth'
import { SEED_VENUES } from '../src/lib/seed-data'
import { SEED_BLOG_POSTS } from '../src/lib/blog-data'

async function main() {
  const db = getDb()
  console.log('Seeding database...')

  // Admin
  const hash = await hashPassword('Trace87223!')
  await db
    .insert(admins)
    .values({
      email: 'CEO@epicai.ai',
      passwordHash: hash,
      name: 'Admin',
    })
    .onConflictDoNothing()
  console.log('Admin seeded')

  // Venues — upsert so corrections (addresses, active flags, new partners) propagate on re-seed
  let venueCount = 0
  for (const venue of SEED_VENUES) {
    await db
      .insert(venues)
      .values(venue)
      .onConflictDoUpdate({
        target: venues.id,
        set: {
          name: venue.name,
          slug: venue.slug,
          description: venue.description,
          shortDescription: venue.shortDescription ?? null,
          category: venue.category,
          cuisine: venue.cuisine ?? null,
          neighborhood: venue.neighborhood ?? null,
          address: venue.address ?? null,
          phone: venue.phone ?? null,
          website: venue.website ?? null,
          priceRange: venue.priceRange ?? null,
          hours: venue.hours ?? null,
          features: venue.features ?? null,
          featured: venue.featured ?? false,
          active: venue.active ?? true,
          tier: venue.tier ?? 'free',
          displayOrder: venue.displayOrder ?? 99,
          updatedAt: new Date(),
        },
      })
    venueCount++
  }
  console.log(`Seeded/updated ${venueCount} venues`)

  // Blog posts — upsert so content corrections propagate on re-seed
  let blogCount = 0
  for (const post of SEED_BLOG_POSTS) {
    await db
      .insert(blogPosts)
      .values({
        ...post,
        imageUrl: post.imageUrl ?? null,
      })
      .onConflictDoUpdate({
        target: blogPosts.slug,
        set: {
          title: post.title,
          excerpt: post.excerpt ?? null,
          content: post.content,
          published: post.published,
          updatedAt: new Date(),
        },
      })
    blogCount++
  }
  console.log(`Seeded/updated ${blogCount} blog posts`)

  console.log('Database seeded successfully!')
  process.exit(0)
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
