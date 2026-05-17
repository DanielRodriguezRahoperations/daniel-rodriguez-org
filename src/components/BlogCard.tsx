'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import type { BlogPost } from '../data/blog-posts'

type Props = {
  post: BlogPost
  index?: number
}

export default function BlogCard({ post, index = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.9,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
      className="group flex flex-col pb-10"
    >
      {/* Category + Date */}
      <div className="flex items-center gap-4 mb-5">
        <span
          className="font-sans uppercase tracking-[0.18em]"
          style={{ fontSize: '0.62rem', color: '#97CCF6' }}
        >
          {post.category}
        </span>
        <span
          className="font-sans"
          style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.28)' }}
        >
          {post.date}
        </span>
        <span
          className="font-sans"
          style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.18)' }}
        >
          {post.readTime}
        </span>
      </div>

      {/* Title */}
      <Link href={`/blog/${post.slug}`} className="block mb-4">
        <h3
          className="font-display font-semibold text-white transition-colors duration-300 group-hover:text-gold leading-snug"
          style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)', letterSpacing: '-0.01em' }}
        >
          {post.title}
        </h3>
      </Link>

      {/* Excerpt */}
      <p
        className="font-sans leading-relaxed mb-6 flex-1"
        style={{ fontSize: '0.845rem', color: 'rgba(255,255,255,0.36)' }}
      >
        {post.excerpt}
      </p>

      {/* Read link */}
      <Link
        href={`/blog/${post.slug}`}
        className="inline-flex items-center gap-4 font-sans font-medium tracking-widest uppercase transition-colors duration-300 group-hover:text-white"
        style={{ fontSize: '0.65rem', color: '#97CCF6' }}
      >
        Read Article
        <span
          className="block h-px group-hover:w-12 transition-all duration-500"
          style={{ width: '1.5rem', background: 'currentColor' }}
        />
      </Link>
    </motion.div>
  )
}
