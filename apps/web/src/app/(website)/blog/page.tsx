export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getDb } from '@/lib/db'
import { blogPosts } from '@/db/schema'
import { eq, desc } from 'drizzle-orm'
import { BookOpen, ArrowRight, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Colorado Springs Dining Blog — Guides, Tips & Reviews',
  description:
    'Expert dining guides for Colorado Springs — best restaurants, brewery guides, patio roundups, happy hour tips, and fine dining recommendations.',
  openGraph: {
    title: 'Colorado Springs Dining Blog — Guides, Tips & Reviews',
    description:
      'Expert dining guides for Colorado Springs — best restaurants, brewery guides, and more.',
  },
}

export default async function BlogPage() {
  const db = getDb()
  const posts = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.published, true))
    .orderBy(desc(blogPosts.createdAt))

  return (
    <div className="pt-20 min-h-[100dvh]">
      <div className="bg-[#161B22] border-b border-[#30363D] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <BookOpen className="h-6 w-6 text-[#D4A853]" />
            <h1 className="text-3xl font-bold text-[#E6EDF3]">Dining Guides</h1>
          </div>
          <p className="text-[#8B949E]">
            Expert guides to the best restaurants, breweries, patios, and
            dining experiences in Colorado Springs, CO.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {posts.length === 0 ? (
          <p className="text-[#8B949E] text-center py-16">
            No posts published yet.
          </p>
        ) : (
          <div className="space-y-5">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="block bg-[#161B22] hover:bg-[#1C2333] border border-[#30363D] hover:border-[#D4A853]/40 rounded-xl p-6 transition-all group"
              >
                <div className="flex items-center gap-2 text-[#8B949E] text-xs mb-3">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
                <h2 className="text-xl font-bold text-[#E6EDF3] mb-2 group-hover:text-[#D4A853] transition-colors leading-snug">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-[#8B949E] text-sm leading-relaxed mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                )}
                <span className="inline-flex items-center gap-1 text-[#D4A853] text-sm font-medium">
                  Read guide
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
