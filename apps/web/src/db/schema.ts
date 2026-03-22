import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  serial,
  varchar,
} from 'drizzle-orm/pg-core'

export const venues = pgTable('venues', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  description: text('description'),
  shortDescription: varchar('short_description', { length: 500 }),
  category: varchar('category', { length: 100 }).notNull().default('restaurant'),
  cuisine: varchar('cuisine', { length: 100 }),
  neighborhood: varchar('neighborhood', { length: 100 }),
  address: varchar('address', { length: 255 }),
  phone: varchar('phone', { length: 30 }),
  website: varchar('website', { length: 500 }),
  instagram: varchar('instagram', { length: 100 }),
  priceRange: integer('price_range'),
  hours: text('hours'),
  features: text('features'),
  imageUrl: varchar('image_url', { length: 500 }),
  galleryImages: text('gallery_images'),
  bookingUrl: varchar('booking_url', { length: 500 }),
  featured: boolean('featured').default(false),
  active: boolean('active').default(true),
  tier: varchar('tier', { length: 20 }).notNull().default('free'),
  stripeCustomerId: varchar('stripe_customer_id', { length: 255 }),
  stripeSubscriptionId: varchar('stripe_subscription_id', { length: 255 }),
  claimedByEmail: varchar('claimed_by_email', { length: 255 }),
  displayOrder: integer('display_order').default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export const admins = pgTable('admins', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const listingClaims = pgTable('listing_claims', {
  id: serial('id').primaryKey(),
  venueId: integer('venue_id')
    .notNull()
    .references(() => venues.id, { onDelete: 'cascade' }),
  email: varchar('email', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }),
  phone: varchar('phone', { length: 30 }),
  message: text('message'),
  tier: varchar('tier', { length: 20 }).notNull().default('premium'),
  status: varchar('status', { length: 20 }).notNull().default('pending'),
  stripeSessionId: varchar('stripe_session_id', { length: 255 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const blogPosts = pgTable('blog_posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  excerpt: text('excerpt'),
  content: text('content').notNull(),
  imageUrl: varchar('image_url', { length: 500 }),
  published: boolean('published').default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export type Venue = typeof venues.$inferSelect
export type NewVenue = typeof venues.$inferInsert
export type Admin = typeof admins.$inferSelect
export type ListingClaim = typeof listingClaims.$inferSelect
export type BlogPost = typeof blogPosts.$inferSelect
