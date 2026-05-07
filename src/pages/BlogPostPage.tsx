import { useRef } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import SEO from '../components/SEO'
import BlogCard from '../components/BlogCard'
import { getPostBySlug, getRelatedPosts } from '../data/blog-posts'
import type { ContentBlock } from '../data/blog-posts'

function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

function renderBlock(block: ContentBlock, i: number) {
  switch (block.type) {
    case 'h2':
      return (
        <h2
          key={i}
          className="font-display font-semibold text-white mt-12 mb-5"
          style={{
            fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
            lineHeight: '1.2',
            letterSpacing: '-0.015em',
          }}
        >
          {block.text}
        </h2>
      )
    case 'h3':
      return (
        <h3
          key={i}
          className="font-display text-white/80 mt-10 mb-4"
          style={{ fontSize: '1.25rem', lineHeight: '1.3', letterSpacing: '-0.01em' }}
        >
          {block.text}
        </h3>
      )
    case 'ul':
      return (
        <ul
          key={i}
          className="my-6 pl-5 space-y-3"
          style={{ listStyleType: 'disc' }}
        >
          {block.items!.map((item, j) => (
            <li
              key={j}
              className="font-sans leading-relaxed"
              style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.50)' }}
            >
              {item}
            </li>
          ))}
        </ul>
      )
    default:
      return (
        <p
          key={i}
          className="font-sans leading-relaxed my-5"
          style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.55)' }}
        >
          {block.text}
        </p>
      )
  }
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) {
    return <Navigate to="/404" replace />
  }

  const relatedPosts = getRelatedPosts(post.slug, 3)

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      '@id': 'https://danielrodriguez.org/#person',
      name: 'Daniel Rodriguez',
      url: 'https://danielrodriguez.org',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Daniel Rodriguez',
      url: 'https://danielrodriguez.org',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://danielrodriguez.org/blog/${post.slug}`,
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://danielrodriguez.org/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://danielrodriguez.org/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://danielrodriguez.org/blog/${post.slug}`,
      },
    ],
  }

  return (
    <>
      <SEO
        title={`${post.title} | Daniel Rodriguez`}
        description={post.metaDescription}
        canonical={`/blog/${post.slug}`}
        type="article"
        publishedTime={post.date}
      />

      <Helmet>
        <script type="application/ld+json">{JSON.stringify(blogPostingSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <section style={{ background: 'rgba(10,10,10,0.80)' }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-12 py-40 lg:py-52">

          {/* Back link */}
          <Reveal delay={0}>
            <Link
              to="/blog"
              className="group inline-flex items-center gap-4 font-sans tracking-widest uppercase mb-16 transition-colors duration-300 hover:text-white"
              style={{ fontSize: '0.62rem', color: 'rgba(151,204,246,0.6)' }}
            >
              <span
                className="block h-px group-hover:w-8 transition-all duration-500"
                style={{ width: '1.5rem', background: 'currentColor' }}
              />
              Back to Blog
            </Link>
          </Reveal>

          {/* Category + date */}
          <Reveal delay={0.06}>
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span
                className="font-sans uppercase tracking-[0.18em]"
                style={{ fontSize: '0.62rem', color: '#97CCF6' }}
              >
                {post.category}
              </span>
              <span
                className="font-sans"
                style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.28)' }}
              >
                {post.date}
              </span>
              <span
                className="font-sans"
                style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.20)' }}
              >
                {post.readTime}
              </span>
            </div>
          </Reveal>

          {/* H1 */}
          <Reveal delay={0.1}>
            <h1
              className="font-display font-bold text-white mb-12"
              style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                lineHeight: '1.05',
                letterSpacing: '-0.025em',
              }}
            >
              {post.title}
            </h1>
          </Reveal>

          {/* Divider */}
          <Reveal delay={0.14}>
            <div
              className="mb-12"
              style={{ height: '1px', background: 'rgba(255,255,255,0.08)' }}
            />
          </Reveal>

          {/* Content */}
          <Reveal delay={0.18}>
            <article>{post.content.map((block, i) => renderBlock(block, i))}</article>
          </Reveal>

          {/* Internal link CTA */}
          <Reveal delay={0.1}>
            <p
              className="font-sans leading-relaxed mt-10 mb-16"
              style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.4)' }}
            >
              Learn more about working with Daniel on the{' '}
              <Link
                to="/contact"
                className="transition-colors duration-300 hover:text-white"
                style={{ color: '#97CCF6' }}
              >
                Contact page
              </Link>
              .
            </p>
          </Reveal>

          {/* Horizontal rule */}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', marginBottom: '4rem' }} />

          {/* Related articles */}
          {relatedPosts.length > 0 && (
            <div>
              <Reveal delay={0}>
                <p
                  className="font-sans mb-10"
                  style={{
                    fontSize: '0.65rem',
                    letterSpacing: '0.45em',
                    textTransform: 'uppercase',
                    color: 'rgba(151,204,246,0.5)',
                  }}
                >
                  Related Articles
                </p>
              </Reveal>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {relatedPosts.map((related, i) => (
                  <BlogCard key={related.id} post={related} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
