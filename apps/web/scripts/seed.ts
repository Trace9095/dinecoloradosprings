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

  // Venues
  let venueCount = 0
  for (const venue of SEED_VENUES) {
    await db.insert(venues).values(venue).onConflictDoNothing()
    venueCount++
  }
  console.log(`Seeded ${venueCount} venues`)

  // Blog posts
  let blogCount = 0
  for (const post of SEED_BLOG_POSTS) {
    await db
      .insert(blogPosts)
      .values({
        ...post,
        imageUrl: post.imageUrl ?? null,
      })
      .onConflictDoNothing()
    blogCount++
  }
  console.log(`Seeded ${blogCount} blog posts`)

  console.log('Database seeded successfully!')
  process.exit(0)
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
