'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import BlogCard from '@/components/BlogCard'
import { blogPosts } from '@/data/blog-posts'
import type { BlogPost } from '@/data/blog-posts'

const ALL = 'All'

const categories: Array<BlogPost['category'] | typeof ALL> = [
  'All',
  'Personal Branding',
  'SEO',
  'Website Design',
  'Business Credit',
  'Debt Relief',
  'Digital Marketing',
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://danielrodriguez.org/' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://danielrodriguez.org/blog' },
  ],
}

function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function BlogContent() {
  const [activeCategory, setActiveCategory] = useState<BlogPost['category'] | typeof ALL>(ALL)

  const filteredPosts =
    activeCategory === ALL
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section style={{ background: 'rgba(10,10,10,0.80)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-40 lg:py-52">

          <Reveal delay={0}>
            <p className="font-sans mb-6" style={{ fontSize: '0.65rem', letterSpacing: '0.45em', textTransform: 'uppercase', color: 'rgba(151,204,246,0.6)' }}>
              Insights &amp; Strategy
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1
              className="font-display font-bold text-white mb-6"
              style={{ fontSize: 'clamp(2.8rem, 5.5vw, 4.8rem)', lineHeight: '1.0', letterSpacing: '-0.025em' }}
            >
              From The Field
            </h1>
          </Reveal>

          <Reveal delay={0.14}>
            <p
              className="font-cormorant italic mb-16 max-w-2xl"
              style={{ fontSize: 'clamp(1.05rem, 1.8vw, 1.35rem)', color: 'rgba(255,255,255,0.38)' }}
            >
              Real-world perspectives on digital marketing, SEO, business credit, and the work of
              building a brand that lasts.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="flex flex-wrap gap-3 mb-20">
              {categories.map((cat) => {
                const active = activeCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="font-sans uppercase tracking-[0.18em] px-4 py-2 transition-all duration-300"
                    style={{
                      fontSize: '0.62rem',
                      border: active ? '1px solid rgba(151,204,246,0.6)' : '1px solid rgba(255,255,255,0.1)',
                      color: active ? '#97CCF6' : 'rgba(255,255,255,0.35)',
                      background: active ? 'rgba(151,204,246,0.06)' : 'transparent',
                    }}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {filteredPosts.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <p className="font-sans text-center py-20" style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.9rem' }}>
              No posts in this category yet.
            </p>
          )}
        </div>
      </section>
    </>
  )
}
