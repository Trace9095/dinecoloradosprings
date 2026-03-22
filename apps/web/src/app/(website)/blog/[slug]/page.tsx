import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getDb } from '@/lib/db'
import { blogPosts } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { ChevronLeft, Calendar, BookOpen } from 'lucide-react'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const db = getDb()
    const posts = await db
      .select({ slug: blogPosts.slug })
      .from(blogPosts)
      .where(eq(blogPosts.published, true))
    return posts.map((p) => ({ slug: p.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const db = getDb()
  const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug))
  if (!post) return { title: 'Not Found' }
  return {
    title: post.title,
    description: post.excerpt ?? `${post.title} — Colorado Springs dining guide.`,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? '',
      type: 'article',
    },
  }
}

function renderContent(content: string) {
  return content.split('\n').map((line, i) => {
    if (line.startsWith('# '))
      return (
        <h1 key={i} className="text-2xl font-bold text-[#E6EDF3] mt-8 mb-4">
          {line.slice(2)}
        </h1>
      )
    if (line.startsWith('## '))
      return (
        <h2 key={i} className="text-xl font-bold text-[#E6EDF3] mt-8 mb-3 pb-2 border-b border-[#30363D]">
          {line.slice(3)}
        </h2>
      )
    if (line.startsWith('### '))
      return (
        <h3 key={i} className="text-lg font-semibold text-[#D4A853] mt-6 mb-2">
          {line.slice(4)}
        </h3>
      )
    if (line.trim() === '' || line.trim() === '---')
      return <br key={i} />
    // Bold inline: **text** → render as strong
    const boldParts = line.split(/\*\*(.+?)\*\*/g)
    if (boldParts.length > 1) {
      return (
        <p key={i} className="text-[#8B949E] leading-relaxed mb-3">
          {boldParts.map((part, j) =>
            j % 2 === 1 ? (
              <strong key={j} className="text-[#E6EDF3] font-semibold">
                {part}
              </strong>
            ) : (
              part
            )
          )}
        </p>
      )
    }
    return (
      <p key={i} className="text-[#8B949E] leading-relaxed mb-3">
        {line}
      </p>
    )
  })
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const db = getDb()
  const [post] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug))
  if (!post || !post.published) notFound()

  return (
    <div className="pt-20 min-h-[100dvh]">
      <div className="bg-[#161B22] border-b border-[#30363D] px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-[#8B949E] hover:text-[#D4A853] text-sm transition-colors min-h-[44px]"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Dining Guides
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-[#8B949E] text-xs mb-4">
            <BookOpen className="h-3.5 w-3.5 text-[#D4A853]" />
            <span className="text-[#D4A853] font-medium">Dining Guide</span>
            <span>—</span>
            <Calendar className="h-3.5 w-3.5" />
            {new Date(post.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#E6EDF3] leading-tight mb-4">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-[#8B949E] text-lg leading-relaxed border-l-2 border-[#D4A853] pl-4">
              {post.excerpt}
            </p>
          )}
        </div>

        <div className="space-y-0">{renderContent(post.content)}</div>

        <div className="mt-12 pt-8 border-t border-[#30363D]">
          <p className="text-[#8B949E] text-sm mb-4">
            More Colorado Springs dining guides:
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { href: '/restaurants', label: 'All Restaurants' },
              { href: '/breweries', label: 'Craft Breweries' },
              { href: '/happy-hour', label: 'Happy Hours' },
              { href: '/blog', label: 'More Guides' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 bg-[#161B22] hover:bg-[#1C2333] border border-[#30363D] hover:border-[#D4A853]/40 rounded-full text-[#8B949E] hover:text-[#D4A853] text-sm transition-all min-h-[44px] flex items-center"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
