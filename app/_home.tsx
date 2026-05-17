'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import Hero from '@/components/Hero'
import BlogCard from '@/components/BlogCard'
import { blogPosts } from '@/data/blog-posts'

const pressPreview = [
  {
    outlet: 'PRLog',
    date: 'Nov 2025',
    headline:
      'Daniel Rodriguez Expands PR and Reputation Management Services While Sharing Personal Life Update',
    url: 'https://www.prlog.org/13112958-daniel-rodriguez-expands-pr-and-reputation-management-services-while-sharing-personal-life-update.html',
  },
  {
    outlet: 'BizWire Express',
    date: 'Sep 2025',
    headline:
      'Daniel Rodriguez Launches RAH Operations to Empower Small Businesses Nationwide',
    url: 'https://www.bizwireexpress.com/showstory1888.php?storyid=1842',
  },
]

const services = [
  {
    num: '01',
    title: 'Website Design & SEO',
    description:
      'Premium websites built to convert. Local SEO architecture, metadata, content structure, and search visibility.',
    href: 'https://www.rahoperations.com/website-design-and-seo',
  },
  {
    num: '02',
    title: 'Digital Marketing',
    description:
      'Campaign strategy, brand visibility, reputation growth, content direction, and lead-generation systems.',
    href: 'https://www.rahoperations.com/digital-marketing',
  },
  {
    num: '03',
    title: 'Business Credit',
    description:
      'Business credit setup, funding readiness, vendor account strategy, and credibility-building structure.',
    href: 'https://www.rahoperations.com/business-credit-and-funding',
  },
]

function Reveal({
  children,
  delay = 0,
  from = 'up',
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  from?: 'left' | 'right' | 'up' | 'scale'
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const initial =
    from === 'left'
      ? { opacity: 0, x: -40 }
      : from === 'right'
        ? { opacity: 0, x: 40 }
        : from === 'scale'
          ? { opacity: 0, scale: 0.96 }
          : { opacity: 0, y: 32 }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, x: 0, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const label = (text: string) => (
  <p
    className="font-sans mb-5"
    style={{
      fontSize: '0.62rem',
      letterSpacing: '0.45em',
      textTransform: 'uppercase',
      color: 'rgba(151,204,246,0.55)',
    }}
  >
    {text}
  </p>
)

export default function HomeContent() {
  const previewPosts = blogPosts.slice(0, 3)

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <Hero
        onProgress={(p) =>
          window.dispatchEvent(new CustomEvent('hero-progress', { detail: p }))
        }
      />

      {/* ── CREDIBILITY STRIP ───────────────────────────────── */}
      <section style={{ background: 'rgba(10,10,10,0.82)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-22">
          <Reveal from="up" delay={0}>
            <p
              className="font-cormorant italic leading-relaxed max-w-2xl mb-8"
              style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.45rem)',
                color: 'rgba(255,255,255,0.45)',
              }}
            >
              Founder, RAH Operations LLC. Owner, SunVision Solar. IAPDA-certified Senior Debt
              Specialist. Over a decade executing — not advising.
            </p>
          </Reveal>

          <Reveal from="up" delay={0.1}>
            <div className="flex flex-wrap gap-2.5">
              {['Website Design', 'SEO', 'Digital Marketing', 'Business Credit', 'Debt Relief', 'IAPDA Certified'].map((chip) => (
                <span
                  key={chip}
                  className="font-sans uppercase tracking-[0.18em] px-3.5 py-1.5"
                  style={{
                    fontSize: '0.6rem',
                    border: '1px solid rgba(151,204,246,0.20)',
                    color: 'rgba(151,204,246,0.60)',
                  }}
                >
                  {chip}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── RAH OPERATIONS SERVICE GATEWAY ──────────────────── */}
      <section style={{ background: 'rgba(10,10,10,0.76)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-32">

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
            <div>
              <Reveal from="left" delay={0}>
                {label('RAH Operations')}
              </Reveal>
              <Reveal from="left" delay={0.08}>
                <h2
                  className="font-display font-bold text-white"
                  style={{
                    fontSize: 'clamp(2rem, 4vw, 3.4rem)',
                    lineHeight: '1.05',
                    letterSpacing: '-0.025em',
                  }}
                >
                  Business Growth Systems
                  <br />
                  <span className="italic" style={{ color: '#97CCF6' }}>Built to Scale.</span>
                </h2>
              </Reveal>
            </div>

            <Reveal from="right" delay={0.12}>
              <a
                href="https://www.rahoperations.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-4 font-sans font-medium tracking-widest uppercase transition-colors duration-300 hover:text-white shrink-0"
                style={{ fontSize: '0.65rem', color: '#97CCF6' }}
              >
                Visit RAH Operations
                <span
                  className="block h-px group-hover:w-12 transition-all duration-500"
                  style={{ width: '2rem', background: 'currentColor' }}
                />
              </a>
            </Reveal>
          </div>

          <div
            className="grid grid-cols-1 lg:grid-cols-3"
            style={{ border: '1px solid rgba(255,255,255,0.07)' }}
          >
            {services.map((service, i) => (
              <Reveal key={service.title} from="up" delay={i * 0.09}>
                <a
                  href={service.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full p-8 lg:p-10 transition-colors duration-400"
                  style={{
                    borderRight: i < 2 ? '1px solid rgba(255,255,255,0.07)' : undefined,
                    background: 'transparent',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = 'rgba(151,204,246,0.028)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = 'transparent')
                  }
                >
                  <div className="flex flex-col h-full">
                    <span
                      className="font-sans mb-6 block"
                      style={{
                        fontSize: '0.6rem',
                        letterSpacing: '0.4em',
                        textTransform: 'uppercase',
                        color: 'rgba(151,204,246,0.35)',
                      }}
                    >
                      {service.num}
                    </span>

                    <h3
                      className="font-display font-semibold text-white mb-4 transition-colors duration-300 group-hover:text-gold"
                      style={{
                        fontSize: 'clamp(1.15rem, 1.8vw, 1.4rem)',
                        lineHeight: '1.2',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {service.title}
                    </h3>

                    <p
                      className="font-sans leading-relaxed flex-1 mb-8"
                      style={{ fontSize: '0.845rem', color: 'rgba(255,255,255,0.30)' }}
                    >
                      {service.description}
                    </p>

                    <div className="flex items-center gap-3">
                      <span
                        className="font-sans tracking-widest uppercase transition-colors duration-300 group-hover:text-white"
                        style={{ fontSize: '0.6rem', color: 'rgba(151,204,246,0.45)' }}
                      >
                        Explore
                      </span>
                      <span
                        className="block h-px transition-all duration-500 group-hover:w-8"
                        style={{ width: '1.25rem', background: 'rgba(151,204,246,0.45)' }}
                      />
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT PREVIEW ───────────────────────────────────── */}
      <section style={{ background: 'rgba(10,10,10,0.72)' }}>
        <div
          className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <Reveal from="left" delay={0}>
                {label('001 / About')}
              </Reveal>
              <Reveal from="left" delay={0.08}>
                <h2
                  className="font-display font-bold text-white mb-6"
                  style={{
                    fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
                    lineHeight: '1.05',
                    letterSpacing: '-0.025em',
                  }}
                >
                  The Multi-Industry{' '}
                  <span className="italic" style={{ color: '#97CCF6' }}>Operator.</span>
                </h2>
              </Reveal>
              <Reveal from="left" delay={0.15}>
                <p
                  className="font-sans leading-relaxed mb-8"
                  style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.42)' }}
                >
                  Scottsdale entrepreneur. Started in sales. Built into debt relief, business
                  credit, digital marketing, and clean energy. Founder of RAH Operations LLC.
                  IAPDA certified. He executes — he doesn&apos;t just advise.
                </p>
              </Reveal>
              <Reveal from="left" delay={0.22}>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-4 font-sans font-medium tracking-widest uppercase transition-colors duration-300 hover:text-white"
                  style={{ fontSize: '0.65rem', color: '#97CCF6' }}
                >
                  Full Story
                  <span
                    className="block h-px group-hover:w-12 transition-all duration-500"
                    style={{ width: '2rem', background: 'currentColor' }}
                  />
                </Link>
              </Reveal>
            </div>

            <Reveal from="right" delay={0.1}>
              <div
                className="grid grid-cols-2 gap-px"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              >
                {[
                  { value: '10+', label: 'Years Operating' },
                  { value: '100+', label: 'Businesses Built' },
                  { value: '4', label: 'Industries Led' },
                  { value: 'IAPDA', label: 'Certified Specialist' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="group px-8 py-9 text-center cursor-default"
                    style={{ background: 'rgba(10,10,10,0.80)' }}
                  >
                    <div
                      className="font-display font-bold text-white mb-2 group-hover:text-gold transition-colors duration-500"
                      style={{
                        fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                        letterSpacing: '-0.03em',
                        lineHeight: 1,
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="font-sans"
                      style={{
                        fontSize: '0.6rem',
                        letterSpacing: '0.3em',
                        textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.26)',
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── PRESS PREVIEW ───────────────────────────────────── */}
      <section style={{ background: 'rgba(10,10,10,0.84)' }}>
        <div
          className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <div>
              <Reveal from="up" delay={0}>
                {label('002 / Press')}
              </Reveal>
              <Reveal from="up" delay={0.06}>
                <h2
                  className="font-display font-bold text-white"
                  style={{
                    fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
                    lineHeight: '1.05',
                    letterSpacing: '-0.025em',
                  }}
                >
                  In The{' '}
                  <span className="italic" style={{ color: '#97CCF6' }}>Media</span>
                </h2>
              </Reveal>
            </div>
            <Reveal from="right" delay={0.1}>
              <Link
                href="/press"
                className="group inline-flex items-center gap-4 font-sans font-medium tracking-widest uppercase transition-colors duration-300 hover:text-white shrink-0"
                style={{ fontSize: '0.65rem', color: '#97CCF6' }}
              >
                All 5 Features
                <span
                  className="block h-px group-hover:w-10 transition-all duration-500"
                  style={{ width: '1.75rem', background: 'currentColor' }}
                />
              </Link>
            </Reveal>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            {pressPreview.map((item, i) => (
              <Reveal key={item.outlet + i} from={i % 2 === 0 ? 'left' : 'right'} delay={i * 0.07}>
                <motion.a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-6 py-7"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
                  whileHover={{ x: i % 2 === 0 ? 5 : -5 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <div className="flex flex-col gap-1.5 shrink-0 pt-0.5" style={{ minWidth: '5rem' }}>
                    <span
                      className="font-display font-semibold"
                      style={{ fontSize: '0.78rem', color: '#97CCF6' }}
                    >
                      {item.outlet}
                    </span>
                    <span
                      className="font-sans"
                      style={{ fontSize: '0.66rem', color: 'rgba(255,255,255,0.22)' }}
                    >
                      {item.date}
                    </span>
                  </div>
                  <p
                    className="font-display font-semibold text-white group-hover:text-gold transition-colors duration-300 flex-1"
                    style={{
                      fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)',
                      lineHeight: '1.45',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {item.headline}
                  </p>
                </motion.a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG PREVIEW ────────────────────────────────────── */}
      <section style={{ background: 'rgba(10,10,10,0.78)' }}>
        <div
          className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <div>
              <Reveal from="up" delay={0}>
                {label('003 / Insights')}
              </Reveal>
              <Reveal from="up" delay={0.06}>
                <h2
                  className="font-display font-bold text-white"
                  style={{
                    fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
                    lineHeight: '1.05',
                    letterSpacing: '-0.025em',
                  }}
                >
                  From The{' '}
                  <span className="italic" style={{ color: '#97CCF6' }}>Field</span>
                </h2>
              </Reveal>
            </div>
            <Reveal from="right" delay={0.1}>
              <Link
                href="/blog"
                className="group inline-flex items-center gap-4 font-sans font-medium tracking-widest uppercase transition-colors duration-300 hover:text-white shrink-0"
                style={{ fontSize: '0.65rem', color: '#97CCF6' }}
              >
                All Articles
                <span
                  className="block h-px group-hover:w-10 transition-all duration-500"
                  style={{ width: '1.75rem', background: 'currentColor' }}
                />
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
            {previewPosts.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ─────────────────────────────────────── */}
      <section
        style={{
          background: 'rgba(10,10,10,0.94)',
          borderTop: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-40">
          <Reveal from="scale" delay={0}>
            <div className="max-w-3xl">
              <p
                className="font-sans mb-8"
                style={{
                  fontSize: '0.62rem',
                  letterSpacing: '0.45em',
                  textTransform: 'uppercase',
                  color: 'rgba(151,204,246,0.5)',
                }}
              >
                004 / Work With Me
              </p>

              <h2
                className="font-display font-bold text-white mb-7"
                style={{
                  fontSize: 'clamp(2.6rem, 6vw, 5rem)',
                  lineHeight: '0.96',
                  letterSpacing: '-0.03em',
                }}
              >
                Ready to build
                <br />
                <span className="italic" style={{ color: '#97CCF6' }}>something real?</span>
              </h2>

              <p
                className="font-sans leading-relaxed mb-10 max-w-lg"
                style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.36)' }}
              >
                Daniel works with a limited number of clients each quarter — business owners
                and entrepreneurs serious about growing in revenue, reputation, or reach.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="font-sans font-medium tracking-widest uppercase px-7 py-3.5 transition-all duration-300 hover:opacity-90"
                  style={{ fontSize: '0.7rem', background: '#97CCF6', color: '#0a0a0a' }}
                >
                  Get In Touch
                </Link>
                <Link
                  href="/about"
                  className="font-sans font-medium tracking-widest uppercase px-7 py-3.5 border transition-all duration-300 hover:bg-white/5"
                  style={{
                    fontSize: '0.7rem',
                    borderColor: 'rgba(255,255,255,0.14)',
                    color: 'rgba(255,255,255,0.42)',
                  }}
                >
                  Learn About Daniel
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
