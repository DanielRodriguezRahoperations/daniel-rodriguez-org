import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import Hero from '../components/Hero'
import Statement from '../components/Statement'
import BlogCard from '../components/BlogCard'
import SEO from '../components/SEO'
import { blogPosts } from '../data/blog-posts'

// Footer is rendered globally in App.tsx — do NOT import or render it here

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

const services = [
  {
    num: '01',
    title: 'Website Design & SEO',
    description:
      'Premium websites, local SEO architecture, metadata, content structure, and conversion-focused page strategy.',
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
      'Business credit setup, funding readiness, vendor account strategy, and credibility-building structure for new and growing companies.',
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

      {/* Hero — protected, do not modify */}
      <Hero />

      {/* Statement — protected, do not modify */}
      <Statement />

      {/* ── PROOF STRIP ─────────────────────────────────────── */}
      <section style={{ background: 'rgba(10,10,10,0.80)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 lg:py-36">
          <Reveal from="up" delay={0}>
            <p
              className="font-cormorant italic leading-relaxed max-w-3xl mb-12"
              style={{
                fontSize: 'clamp(1.2rem, 2.2vw, 1.65rem)',
                color: 'rgba(255,255,255,0.50)',
              }}
            >
              "Scottsdale-based entrepreneur. Founder, RAH Operations LLC. Owner, SunVision Solar.
              Senior Certified Debt Specialist, IAPDA certified. Over a decade executing the
              systems, credit structures, and marketing engines that make businesses grow."
            </p>
          </Reveal>

          <Reveal from="up" delay={0.14}>
            <div className="flex flex-wrap gap-3">
              {[
                'Website Design',
                'SEO & Digital Marketing',
                'Business Credit',
                'Debt Relief',
                'IAPDA Certified',
              ].map((chip) => (
                <span
                  key={chip}
                  className="font-sans uppercase tracking-[0.18em] px-4 py-2"
                  style={{
                    fontSize: '0.62rem',
                    border: '1px solid rgba(151,204,246,0.22)',
                    color: 'rgba(151,204,246,0.65)',
                  }}
                >
                  {chip}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── RAH OPERATIONS SERVICES ─────────────────────────── */}
      <section style={{ background: 'rgba(10,10,10,0.76)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-32 lg:py-48">

          {/* Section header */}
          <div className="mb-20">
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
                RAH Operations
              </p>
            </Reveal>

            <Reveal from="up" delay={0.08}>
              <h2
                className="font-display font-bold text-white mb-8"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  lineHeight: '1.0',
                  letterSpacing: '-0.025em',
                }}
              >
                Business Growth Systems
                <br />
                <span className="italic" style={{ color: '#97CCF6' }}>
                  Built to Scale.
                </span>
              </h2>
            </Reveal>

            <Reveal from="up" delay={0.15}>
              <p
                className="font-sans leading-relaxed max-w-2xl"
                style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.38)' }}
              >
                Daniel's work through RAH Operations connects website design, SEO, digital
                marketing, and business credit into one practical growth system for entrepreneurs
                and local businesses.
              </p>
            </Reveal>
          </div>

          {/* Service grid — full cards are clickable */}
          <div
            className="grid grid-cols-1 lg:grid-cols-3"
            style={{ border: '1px solid rgba(255,255,255,0.07)' }}
          >
            {services.map((service, i) => (
              <Reveal key={service.title} from="up" delay={i * 0.1}>
                <a
                  href={service.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full p-10 lg:p-12 transition-colors duration-500"
                  style={{
                    borderRight:
                      i < services.length - 1
                        ? '1px solid rgba(255,255,255,0.07)'
                        : undefined,
                    background: 'transparent',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = 'rgba(151,204,246,0.025)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = 'transparent')
                  }
                >
                  <div className="flex flex-col h-full min-h-[18rem]">
                    <div
                      className="font-sans mb-8"
                      style={{
                        fontSize: '0.62rem',
                        letterSpacing: '0.4em',
                        textTransform: 'uppercase',
                        color: 'rgba(151,204,246,0.35)',
                      }}
                    >
                      {service.num}
                    </div>

                    <h3
                      className="font-display font-semibold text-white mb-5 transition-colors duration-300 group-hover:text-gold"
                      style={{
                        fontSize: 'clamp(1.25rem, 2vw, 1.55rem)',
                        lineHeight: '1.2',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {service.title}
                    </h3>

                    <p
                      className="font-sans leading-relaxed flex-1 mb-10"
                      style={{ fontSize: '0.865rem', color: 'rgba(255,255,255,0.32)' }}
                    >
                      {service.description}
                    </p>

                    <div className="flex items-center gap-4">
                      <span
                        className="font-sans font-medium tracking-widest uppercase transition-colors duration-300 group-hover:text-white"
                        style={{ fontSize: '0.62rem', color: 'rgba(151,204,246,0.5)' }}
                      >
                        Explore Service
                      </span>
                      <span
                        className="block h-px transition-all duration-500 group-hover:w-10"
                        style={{
                          width: '1.5rem',
                          background: 'rgba(151,204,246,0.5)',
                        }}
                      />
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal from="up" delay={0.28}>
            <div className="mt-12">
              <a
                href="https://www.rahoperations.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-5 font-sans font-medium tracking-widest uppercase transition-colors duration-300 hover:text-white"
                style={{ fontSize: '0.72rem', color: '#97CCF6' }}
              >
                Visit RAH Operations
                <span
                  className="block h-px group-hover:w-14 transition-all duration-500"
                  style={{ width: '2rem', background: 'currentColor' }}
                />
              </a>
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
                Daniel Rodriguez is a Scottsdale-based entrepreneur who built his career on the
                fundamentals — sales, financial literacy, and the ability to execute. Over more than
                a decade, that foundation expanded into debt relief, business credit, digital
                marketing, and clean energy, each discipline reinforcing the next.
              </p>
            </Reveal>

            <Reveal from="left" delay={0.28}>
              <p
                className="font-sans leading-relaxed mb-12"
                style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.45)' }}
              >
                Founder of RAH Operations LLC. Owner of SunVision Solar. IAPDA-certified Senior
                Debt Specialist. He operates — he doesn't just advise.
              </p>
            </Reveal>

            <Reveal from="left" delay={0.36}>
              <Link
                to="/about"
                className="group inline-flex items-center gap-5 font-sans font-medium tracking-widest uppercase transition-colors duration-300 hover:text-white"
                style={{ fontSize: '0.72rem', color: '#97CCF6' }}
              >
                Full Story
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
      <section style={{ background: 'rgba(10,10,10,0.84)' }}>
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
              002 / Press
            </p>
          </Reveal>

          <Reveal from="up" delay={0.08}>
            <h2
              className="font-display font-bold text-white mb-4"
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

          <Reveal from="up" delay={0.14}>
            <p
              className="font-cormorant italic mb-16 max-w-xl"
              style={{
                fontSize: 'clamp(1.05rem, 1.8vw, 1.3rem)',
                color: 'rgba(255,255,255,0.28)',
              }}
            >
              Five features across four independent publications. All earned.
            </p>
          </Reveal>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            {pressItems.map((item, i) => (
              <Reveal key={item.num} from={i % 2 === 0 ? 'left' : 'right'} delay={i * 0.08}>
                <motion.a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block py-9"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
                  whileHover={{ x: i % 2 === 0 ? 6 : -6 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                >
                  <div className="flex items-start gap-8">
                    <span
                      className="font-sans pt-0.5 shrink-0"
                      style={{
                        fontSize: '0.62rem',
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
                          style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.2)' }}
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
                </motion.a>
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
              className="font-display font-bold text-white mb-4"
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

          <Reveal from="up" delay={0.14}>
            <p
              className="font-cormorant italic mb-16 max-w-xl"
              style={{
                fontSize: 'clamp(1.05rem, 1.8vw, 1.3rem)',
                color: 'rgba(255,255,255,0.28)',
              }}
            >
              Practical perspectives on SEO, business credit, website design, and building a brand
              that actually works.
            </p>
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
      <section
        style={{
          background: 'rgba(10,10,10,0.92)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-36 lg:py-52">
          <Reveal from="scale" delay={0}>
            <div className="max-w-3xl">
              <p
                className="font-sans mb-10"
                style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.45em',
                  textTransform: 'uppercase',
                  color: 'rgba(151,204,246,0.5)',
                }}
              >
                004 / Work With Me
              </p>

              <h2
                className="font-display font-bold text-white mb-8"
                style={{
                  fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)',
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
                className="font-sans leading-relaxed mb-6 max-w-xl"
                style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.38)' }}
              >
                Daniel works with a limited number of clients each quarter — business owners,
                entrepreneurs, and operators who are serious about growing in revenue, reputation,
                or reach.
              </p>

              <p
                className="font-sans leading-relaxed mb-14 max-w-xl"
                style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.28)' }}
              >
                Website design, SEO, digital marketing, business credit, debt relief strategy —
                or just a direct conversation about where your business is and what it could
                become.
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
                    borderColor: 'rgba(255,255,255,0.15)',
                    color: 'rgba(255,255,255,0.45)',
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
