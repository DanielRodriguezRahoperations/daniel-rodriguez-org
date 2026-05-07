import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import FloatingGeometry from '../components/FloatingGeometry'
import SEO from '../components/SEO'

const stats = [
  { value: '10+', label: 'Years Operating' },
  { value: '100+', label: 'Businesses Built' },
  { value: '3', label: 'Industries Led' },
  { value: 'IAPDA', label: 'Certified Specialist' },
]

const pillars = [
  {
    num: '01',
    title: 'Digital Growth',
    description:
      'Most businesses are invisible online. Daniel makes them undeniable. Over a decade of executing SEO strategy, Google Business optimization, and precision lead generation — turning dormant websites into 24/7 lead machines.',
  },
  {
    num: '02',
    title: 'Business Credit',
    description:
      "Personal credit shouldn't be the ceiling on business ambition. Daniel has structured standalone credit profiles, Net 30 vendor relationships, and capital access strategies for hundreds of operators — without touching a single digit of personal score.",
  },
  {
    num: '03',
    title: 'Solar & Energy',
    description:
      'As founder of SunVision Solar, Daniel helps homeowners and commercial operators reduce energy overhead and build long-term asset value. Own your power. Reduce your costs. Strengthen your equity position.',
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
          ? { opacity: 0, scale: 0.92 }
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

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Daniel Rodriguez | Entrepreneur, Strategist & Business Builder"
        description="Meet Daniel Rodriguez — Scottsdale-based entrepreneur, founder of RAH Operations LLC, owner of SunVision Solar, and IAPDA-certified debt specialist with 10+ years building businesses across digital marketing, credit, and clean energy."
        canonical="/about"
        keywords="Daniel Rodriguez about, Daniel Rodriguez entrepreneur, Daniel Rodriguez Arizona, RAH Operations founder"
      />

      {/* BreadcrumbList Schema */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
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
              name: 'About',
              item: 'https://danielrodriguez.org/about',
            },
          ],
        })}</script>
      </Helmet>

      <section style={{ background: 'rgba(10,10,10,0.75)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-40 lg:py-56">

          {/* Bio: asymmetric two-column */}
          <div className="grid lg:grid-cols-[1fr_460px] xl:grid-cols-[1fr_540px] gap-16 lg:gap-20 items-start mb-36">

            {/* Left — text */}
            <div>
              <Reveal from="left" delay={0}>
                <p
                  className="font-sans mb-10"
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
                {/* H1 on dedicated about page for SEO */}
                <h1
                  className="font-display font-bold text-white mb-12"
                  style={{
                    fontSize: 'clamp(2.8rem, 5.5vw, 4.8rem)',
                    lineHeight: '1.0',
                    letterSpacing: '-0.025em',
                  }}
                >
                  The Multi-Industry
                  <br />
                  <span className="italic" style={{ color: '#97CCF6' }}>
                    Operator.
                  </span>
                </h1>
              </Reveal>

              <Reveal from="left" delay={0.2}>
                <blockquote
                  className="font-cormorant italic leading-relaxed mb-10 pl-5"
                  style={{
                    fontSize: 'clamp(1.15rem, 2.1vw, 1.5rem)',
                    color: 'rgba(151,204,246,0.62)',
                    borderLeft: '2px solid rgba(151,204,246,0.28)',
                  }}
                >
                  "When you search for Daniel Rodriguez, you'll find a driven, multi-faceted
                  professional with one mission — to help people grow in business, finances, and
                  life."
                </blockquote>
              </Reveal>

              <Reveal from="left" delay={0.3}>
                <p
                  className="font-sans leading-relaxed mb-6"
                  style={{
                    fontSize: '0.9375rem',
                    color: 'rgba(255,255,255,0.48)',
                    letterSpacing: '0.01em',
                  }}
                >
                  Daniel Rodriguez is a Scottsdale-based entrepreneur, strategist, and business
                  builder who has spent the past decade doing what most consultants only describe —
                  executing the systems, credit structures, marketing engines, and digital strategies
                  that make businesses grow.
                </p>
              </Reveal>

              <Reveal from="left" delay={0.38}>
                <p
                  className="font-sans leading-relaxed mb-14"
                  style={{
                    fontSize: '0.9375rem',
                    color: 'rgba(255,255,255,0.48)',
                    letterSpacing: '0.01em',
                  }}
                >
                  Founder of RAH Operations LLC. Owner of SunVision Solar. Senior Certified Debt
                  Specialist, IAPDA certified. He shows up as an operator first — with a verifiable
                  track record across three distinct industries.
                </p>
              </Reveal>

              <Reveal from="left" delay={0.46}>
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-5 font-sans font-medium tracking-widest uppercase transition-colors duration-300 hover:text-white"
                  style={{ fontSize: '0.72rem', color: '#97CCF6' }}
                >
                  Start a Conversation
                  <span
                    className="block h-px group-hover:w-14 transition-all duration-500"
                    style={{ width: '2rem', background: 'currentColor' }}
                  />
                </Link>
              </Reveal>
            </div>

            {/* Right — 3D geometry */}
            <Reveal from="right" delay={0.15} className="relative h-[480px] lg:h-[560px]">
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background:
                    'radial-gradient(ellipse at 50% 50%, rgba(151,204,246,0.04) 0%, transparent 70%)',
                }}
              />
              <FloatingGeometry />
            </Reveal>
          </div>

          {/* Stats row */}
          <div
            className="grid grid-cols-2 lg:grid-cols-4 mb-36"
            style={{ border: '1px solid rgba(255,255,255,0.06)' }}
          >
            {stats.map((stat, i) => (
              <Reveal key={stat.label} from="up" delay={i * 0.09}>
                <div
                  className="group px-8 py-12 text-center cursor-default"
                  style={{
                    borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : undefined,
                    borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.06)' : undefined,
                  }}
                >
                  <div
                    className="font-display font-bold text-white mb-3 group-hover:text-gold transition-colors duration-500"
                    style={{
                      fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)',
                      letterSpacing: '-0.03em',
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="font-sans"
                    style={{
                      fontSize: '0.65rem',
                      letterSpacing: '0.3em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.28)',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Methodology */}
          <Reveal from="up" delay={0}>
            <p
              className="font-sans mb-14"
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.45em',
                textTransform: 'uppercase',
                color: 'rgba(151,204,246,0.5)',
              }}
            >
              Methodology
            </p>
          </Reveal>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.title} from="scale" delay={i * 0.13}>
                <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <motion.div
                    className="group py-12 lg:py-14"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'minmax(64px, 80px) 1fr 2fr',
                      gap: '2rem',
                      alignItems: 'start',
                    }}
                    whileHover={{ x: 8 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                  >
                    <div
                      className="font-sans pt-1"
                      style={{
                        fontSize: '0.65rem',
                        letterSpacing: '0.4em',
                        textTransform: 'uppercase',
                        color: 'rgba(151,204,246,0.28)',
                      }}
                    >
                      {pillar.num}
                    </div>
                    <h3
                      className="font-display font-semibold text-white group-hover:text-gold transition-colors duration-400"
                      style={{
                        fontSize: 'clamp(1.3rem, 2.2vw, 1.8rem)',
                        lineHeight: '1.2',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {pillar.title}
                    </h3>
                    <p
                      className="font-sans leading-relaxed"
                      style={{
                        fontSize: '0.875rem',
                        color: 'rgba(255,255,255,0.36)',
                        letterSpacing: '0.01em',
                      }}
                    >
                      {pillar.description}
                    </p>
                  </motion.div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>
    </>
  )
}
