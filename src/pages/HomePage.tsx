import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import Hero from '../components/Hero'
import Statement from '../components/Statement'
import Footer from '../components/Footer'
import BlogCard from '../components/BlogCard'
import SEO from '../components/SEO'
import { blogPosts } from '../data/blog-posts'

// Press items for preview (first 2)
const pressItems = [
  {
    num: '01',
    outlet: 'PRLog',
    date: 'Nov 25, 2025',
    headline:
      'Daniel Rodriguez Expands PR and Reputation Management Services While Sharing Personal Life Update',
    url: 'https://www.prlog.org/13112958-daniel-rodriguez-expands-pr-and-reputation-management-services-while-sharing-personal-life-update.html',
  },
  {
    num: '02',
    outlet: 'PRLog',
    date: 'May 20, 2025',
    headline:
      'The Multi-Industry Strategist Helping Entrepreneurs, Homeowners, and Families Take Control',
    url: 'https://www.prlog.org/13077658-daniel-rodriguezthe-multi-industry-strategist-helping-entrepreneurs-homeowners-and-families-take.html',
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
  const inView = useInView(ref, { once: true, margin: '-70px' })

  const initial =
    from === 'left'
      ? { opacity: 0, x: -55 }
      : from === 'right'
        ? { opacity: 0, x: 55 }
        : from === 'scale'
          ? { opacity: 0, scale: 0.93 }
          : { opacity: 0, y: 45 }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, x: 0, y: 0, scale: 1 } : {}}
      transition={{ duration: 1.0, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const credentialChips = [
  'Website Design',
  'SEO & Digital Marketing',
  'Business Credit',
  'Debt Relief',
]

export default function HomePage() {
  const previewPosts = blogPosts.slice(0, 3)

  return (
    <>
      <SEO
        title="Daniel Rodriguez | Arizona Entrepreneur, SEO & Website Design Expert"
        description="Daniel Rodriguez is a Scottsdale-based entrepreneur, founder of RAH Operations LLC, IAPDA-certified debt specialist, and digital marketing strategist helping businesses grow across Arizona and beyond."
        canonical="/"
        keywords="Daniel Rodriguez, Daniel Rodriguez Arizona, Daniel Rodriguez RAH Operations, Arizona entrepreneur, Scottsdale website design, Phoenix SEO, business credit services"
      />

      {/* JSON-LD Schemas */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Person',
              '@id': 'https://danielrodriguez.org/#person',
              name: 'Daniel Rodriguez',
              url: 'https://danielrodriguez.org',
              sameAs: [
                'https://www.linkedin.com/in/danielrodriguez-scottsdale/',
                'https://www.instagram.com/drod6211/',
                'https://www.rahoperations.com',
              ],
              jobTitle: 'Entrepreneur, Strategist & Business Builder',
              description:
                'Scottsdale-based entrepreneur, founder of RAH Operations LLC, owner of SunVision Solar, and IAPDA-certified Senior Debt Specialist with expertise in digital marketing, SEO, business credit, and clean energy.',
              worksFor: {
                '@type': 'Organization',
                name: 'RAH Operations LLC',
                url: 'https://www.rahoperations.com',
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Scottsdale',
                addressRegion: 'AZ',
                addressCountry: 'US',
              },
              knowsAbout: [
                'Digital Marketing',
                'SEO',
                'Website Design',
                'Business Credit',
                'Debt Relief',
                'Solar Energy',
                'Personal Branding',
                'Sales Strategy',
              ],
            },
            {
              '@type': 'WebSite',
              '@id': 'https://danielrodriguez.org/#website',
              name: 'Daniel Rodriguez',
              url: 'https://danielrodriguez.org',
              description:
                'Personal brand site for Daniel Rodriguez — Arizona entrepreneur, digital marketing strategist, and business builder.',
              author: { '@id': 'https://danielrodriguez.org/#person' },
            },
            {
              '@type': 'Organization',
              '@id': 'https://www.rahoperations.com/#org',
              name: 'RAH Operations LLC',
              url: 'https://www.rahoperations.com',
              founder: { '@id': 'https://danielrodriguez.org/#person' },
              description:
                'Website design, SEO, digital marketing, and business credit services for entrepreneurs and small businesses.',
            },
          ],
        })}</script>
      </Helmet>

      {/* Hero — protected component, untouched */}
      <Hero />

      {/* Statement — protected component, untouched */}
      <Statement />

      {/* ── POSITIONING ─────────────────────────────────────── */}
      <section style={{ background: 'rgba(10,10,10,0.78)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-28 lg:py-40">
          <Reveal from="up" delay={0}>
            <p
              className="font-cormorant italic leading-relaxed max-w-3xl mb-12"
              style={{
                fontSize: 'clamp(1.25rem, 2.4vw, 1.75rem)',
                color: 'rgba(255,255,255,0.55)',
              }}
            >
              "Scottsdale-based entrepreneur. Founder, RAH Operations LLC. Owner, SunVision Solar.
              Senior Certified Debt Specialist, IAPDA certified. Over a decade building the systems,
              credit structures, and marketing engines that make businesses grow."
            </p>
          </Reveal>

          <Reveal from="up" delay={0.15}>
            <div className="flex flex-wrap gap-3">
              {credentialChips.map((chip) => (
                <span
                  key={chip}
                  className="font-sans uppercase tracking-[0.18em] px-4 py-2"
                  style={{
                    fontSize: '0.62rem',
                    border: '1px solid rgba(151,204,246,0.25)',
                    color: 'rgba(151,204,246,0.7)',
                  }}
                >
                  {chip}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── ABOUT PREVIEW ───────────────────────────────────── */}
      <section style={{ background: 'rgba(10,10,10,0.72)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-32 lg:py-48">
          <div className="max-w-2xl">
            <Reveal from="left" delay={0}>
              <p
                className="font-sans mb-8"
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.45em',
                  textTransform: 'uppercase',
                  color: 'rgba(151,204,246,0.6)',
                }}
              >
                001 / About
              </p>
            </Reveal>

            <Reveal from="left" delay={0.1}>
              <h2
                className="font-display font-bold text-white mb-10"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  lineHeight: '1.0',
                  letterSpacing: '-0.025em',
                }}
              >
                The Multi-Industry{' '}
                <span className="italic" style={{ color: '#97CCF6' }}>
                  Operator.
                </span>
              </h2>
            </Reveal>

            <Reveal from="left" delay={0.2}>
              <p
                className="font-sans leading-relaxed mb-5"
                style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.45)' }}
              >
                Daniel Rodriguez is a Scottsdale-based entrepreneur, strategist, and business builder
                who has spent the past decade executing the systems, credit structures, marketing
                engines, and digital strategies that make businesses grow.
              </p>
            </Reveal>

            <Reveal from="left" delay={0.28}>
              <p
                className="font-sans leading-relaxed mb-12"
                style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.45)' }}
              >
                Founder of RAH Operations LLC. Owner of SunVision Solar. Senior Certified Debt
                Specialist, IAPDA certified. Three industries. One operator.
              </p>
            </Reveal>

            <Reveal from="left" delay={0.36}>
              <Link
                to="/about"
                className="group inline-flex items-center gap-5 font-sans font-medium tracking-widest uppercase transition-colors duration-300 hover:text-white"
                style={{ fontSize: '0.72rem', color: '#97CCF6' }}
              >
                Read Full Story
                <span
                  className="block h-px group-hover:w-14 transition-all duration-500"
                  style={{ width: '2rem', background: 'currentColor' }}
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── PRESS PREVIEW ───────────────────────────────────── */}
      <section style={{ background: 'rgba(10,10,10,0.82)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-32 lg:py-48">
          {/* Header */}
          <Reveal from="up" delay={0}>
            <p
              className="font-sans mb-6"
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.45em',
                textTransform: 'uppercase',
                color: 'rgba(151,204,246,0.6)',
              }}
            >
              002 / Press
            </p>
          </Reveal>

          <Reveal from="up" delay={0.08}>
            <h2
              className="font-display font-bold text-white mb-16"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                lineHeight: '1.0',
                letterSpacing: '-0.025em',
              }}
            >
              In The{' '}
              <span className="italic" style={{ color: '#97CCF6' }}>
                Media
              </span>
            </h2>
          </Reveal>

          {/* Press rows */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            {pressItems.map((item, i) => (
              <Reveal key={item.num} from={i % 2 === 0 ? 'left' : 'right'} delay={i * 0.08}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block py-8"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <div className="flex items-start gap-8">
                    <span
                      className="font-sans pt-0.5 shrink-0"
                      style={{
                        fontSize: '0.65rem',
                        letterSpacing: '0.4em',
                        textTransform: 'uppercase',
                        color: 'rgba(151,204,246,0.28)',
                        width: '3rem',
                      }}
                    >
                      {item.num}
                    </span>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-4 mb-3">
                        <span
                          className="font-display font-semibold"
                          style={{ fontSize: '0.8rem', color: '#97CCF6' }}
                        >
                          {item.outlet}
                        </span>
                        <span
                          className="font-sans tracking-widest"
                          style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)' }}
                        >
                          {item.date}
                        </span>
                      </div>
                      <p
                        className="font-display font-semibold text-white group-hover:text-gold transition-colors duration-300"
                        style={{
                          fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)',
                          lineHeight: '1.4',
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {item.headline}
                      </p>
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal from="up" delay={0.2}>
            <div className="mt-12">
              <Link
                to="/press"
                className="group inline-flex items-center gap-5 font-sans font-medium tracking-widest uppercase transition-colors duration-300 hover:text-white"
                style={{ fontSize: '0.72rem', color: '#97CCF6' }}
              >
                View All Coverage
                <span
                  className="block h-px group-hover:w-14 transition-all duration-500"
                  style={{ width: '2rem', background: 'currentColor' }}
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── BLOG PREVIEW ────────────────────────────────────── */}
      <section style={{ background: 'rgba(10,10,10,0.78)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-32 lg:py-48">
          <Reveal from="up" delay={0}>
            <p
              className="font-sans mb-6"
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.45em',
                textTransform: 'uppercase',
                color: 'rgba(151,204,246,0.6)',
              }}
            >
              003 / Insights
            </p>
          </Reveal>

          <Reveal from="up" delay={0.08}>
            <h2
              className="font-display font-bold text-white mb-16"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                lineHeight: '1.0',
                letterSpacing: '-0.025em',
              }}
            >
              From The{' '}
              <span className="italic" style={{ color: '#97CCF6' }}>
                Field
              </span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-14">
            {previewPosts.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>

          <Reveal from="up" delay={0.1}>
            <Link
              to="/blog"
              className="group inline-flex items-center gap-5 font-sans font-medium tracking-widest uppercase transition-colors duration-300 hover:text-white"
              style={{ fontSize: '0.72rem', color: '#97CCF6' }}
            >
              Read All Articles
              <span
                className="block h-px group-hover:w-14 transition-all duration-500"
                style={{ width: '2rem', background: 'currentColor' }}
              />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── CONTACT CTA ─────────────────────────────────────── */}
      <section style={{ background: 'rgba(10,10,10,0.88)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-32 lg:py-52">
          <Reveal from="scale" delay={0}>
            <div className="max-w-3xl">
              <h2
                className="font-display font-bold text-white mb-8"
                style={{
                  fontSize: 'clamp(3rem, 7vw, 5.5rem)',
                  lineHeight: '0.95',
                  letterSpacing: '-0.03em',
                }}
              >
                Ready to build
                <br />
                <span className="italic" style={{ color: '#97CCF6' }}>
                  something real?
                </span>
              </h2>
              <p
                className="font-sans leading-relaxed mb-12 max-w-xl"
                style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.40)' }}
              >
                Daniel accepts a limited number of clients each quarter. If you're serious about
                growing in revenue, reputation, or reach — this is where it starts.
              </p>
              <div className="flex flex-wrap gap-5">
                <Link
                  to="/contact"
                  className="font-sans font-medium tracking-widest uppercase px-8 py-4 transition-all duration-300 hover:opacity-90"
                  style={{
                    fontSize: '0.72rem',
                    background: '#97CCF6',
                    color: '#0a0a0a',
                  }}
                >
                  Get In Touch
                </Link>
                <Link
                  to="/about"
                  className="font-sans font-medium tracking-widest uppercase px-8 py-4 border transition-all duration-300 hover:bg-white/5"
                  style={{
                    fontSize: '0.72rem',
                    borderColor: 'rgba(255,255,255,0.2)',
                    color: 'rgba(255,255,255,0.55)',
                  }}
                >
                  View Portfolio
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  )
}
