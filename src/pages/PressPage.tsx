import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import SEO from '../components/SEO'

const outlets = ['PRLog', 'BizWire Express', '1888 Press Release', 'Articleted']

const pressItems = [
  {
    num: '01',
    outlet: 'PRLog',
    date: 'Nov 25, 2025',
    headline:
      'Daniel Rodriguez Expands PR and Reputation Management Services While Sharing Personal Life Update',
    excerpt:
      "Daniel Rodriguez, founder of RAH Operations LLC, has announced an expansion of his business consulting agency to include reputation management, public relations strategy, and brand publicity services — broadening his firm's capabilities to support clients seeking credibility and online protection.",
    url: 'https://www.prlog.org/13112958-daniel-rodriguez-expands-pr-and-reputation-management-services-while-sharing-personal-life-update.html',
  },
  {
    num: '02',
    outlet: 'PRLog',
    date: 'May 20, 2025',
    headline:
      'The Multi-Industry Strategist Helping Entrepreneurs, Homeowners, and Families Take Control',
    excerpt:
      'Based in Scottsdale, Arizona, Daniel Rodriguez founded RAH Operations LLC, owns Sunvision Solar, and serves as a Senior Certified Debt Specialist — a driven, multi-faceted professional with one mission: to help people grow in business, finances, and life.',
    url: 'https://www.prlog.org/13077658-daniel-rodriguezthe-multi-industry-strategist-helping-entrepreneurs-homeowners-and-families-take.html',
  },
  {
    num: '03',
    outlet: 'BizWire Express',
    date: 'Sep 2, 2025',
    headline:
      'Daniel Rodriguez Launches RAH Operations to Empower Small Businesses Nationwide',
    excerpt:
      'Daniel Rodriguez has established RAH Operations LLC, a business services and digital marketing firm focused on supporting small business growth. The agency offers business credit setup, SEO, digital marketing, and website development.',
    url: 'https://www.bizwireexpress.com/showstory1888.php?storyid=1842',
  },
  {
    num: '04',
    outlet: '1888 Press Release',
    date: 'Sep 2, 2025',
    headline:
      'Daniel Rodriguez Launches RAH Operations to Empower Small Businesses Nationwide',
    excerpt:
      'After more than a decade working with entrepreneurs and brands behind the scenes, Daniel Rodriguez officially launched RAH Operations LLC — designed to help small businesses get structured, get seen, and grow fast.',
    url: 'https://www.1888pressrelease.com/daniel-rodriguez-launches-rah-operations-to-empower-small-bu-pr-751351.html',
  },
  {
    num: '05',
    outlet: 'Articleted',
    date: 'Sep 3, 2025',
    headline:
      'Daniel Rodriguez Launches RAH Operations to Empower Small Businesses Nationwide',
    excerpt:
      'RAH Operations specializes in business credit and Net 30 vendor account setup, SEO and Google Business profile optimization, digital marketing and lead generation — empowering everyday people to build real income and lasting freedom.',
    url: 'https://www.articleted.com/article/1019949/115742/Daniel-Rodriguez-Launches-RAH-Operations-to-Empower-Small-Businesses-Nationwide',
  },
]

function Reveal({
  children,
  delay = 0,
  from = 'up',
}: {
  children: React.ReactNode
  delay?: number
  from?: 'left' | 'right' | 'up' | 'clip'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  const initial =
    from === 'left'
      ? { opacity: 0, x: -50 }
      : from === 'right'
        ? { opacity: 0, x: 50 }
        : from === 'clip'
          ? { clipPath: 'inset(100% 0 0 0)', opacity: 0 }
          : { opacity: 0, y: 40 }

  const animate =
    from === 'clip'
      ? inView
        ? { clipPath: 'inset(0% 0 0 0)', opacity: 1 }
        : {}
      : inView
        ? { opacity: 1, x: 0, y: 0 }
        : {}

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{ duration: 1.0, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function PressPage() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <>
      <SEO
        title="Daniel Rodriguez In The Media | Press & Recognition"
        description="Media coverage of Daniel Rodriguez, founder of RAH Operations LLC — featured in PRLog, BizWire Express, 1888 Press Release, and Articleted for his work in digital marketing, business credit, and entrepreneurship."
        canonical="/press"
        keywords="Daniel Rodriguez press, Daniel Rodriguez media, Daniel Rodriguez PRLog, RAH Operations coverage"
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
              name: 'Press',
              item: 'https://danielrodriguez.org/press',
            },
          ],
        })}</script>
      </Helmet>

      <section style={{ background: 'rgba(10,10,10,0.86)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-40 lg:py-56">

          {/* Header — clip reveal */}
          <motion.div
            ref={headerRef}
            initial={{ clipPath: 'inset(100% 0 0 0)', opacity: 0 }}
            animate={headerInView ? { clipPath: 'inset(0% 0 0 0)', opacity: 1 } : {}}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <p
              className="font-sans mb-6"
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.45em',
                textTransform: 'uppercase',
                color: 'rgba(151,204,246,0.6)',
              }}
            >
              002 / In The Media
            </p>
            <h1
              className="font-display font-bold text-white"
              style={{
                fontSize: 'clamp(2.8rem, 5.5vw, 4.8rem)',
                lineHeight: '1.0',
                letterSpacing: '-0.025em',
              }}
            >
              Press &amp;{' '}
              <span className="italic" style={{ color: '#97CCF6' }}>
                Recognition
              </span>
            </h1>
          </motion.div>

          {/* Intro statement */}
          <Reveal from="up" delay={0.12}>
            <p
              className="font-cormorant italic mb-20 max-w-2xl"
              style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                color: 'rgba(255,255,255,0.32)',
              }}
            >
              Five media features across four independent publications. All earned — no paid
              placements, no PR shortcuts.
            </p>
          </Reveal>

          {/* Outlet marquee */}
          <Reveal from="clip" delay={0.18}>
            <div
              className="overflow-hidden mb-24"
              style={{
                borderTop: '1px solid rgba(255,255,255,0.07)',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
                paddingTop: '1.25rem',
                paddingBottom: '1.25rem',
              }}
            >
              <motion.div
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="flex gap-16 whitespace-nowrap"
              >
                {[...outlets, ...outlets].map((outlet, i) => (
                  <span
                    key={i}
                    className="font-display font-semibold tracking-widest uppercase"
                    style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.16)' }}
                  >
                    {outlet}
                  </span>
                ))}
              </motion.div>
            </div>
          </Reveal>

          {/* Press items — editorial list */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            {pressItems.map((item, i) => (
              <Reveal key={i} delay={0.04} from={i % 2 === 0 ? 'left' : 'right'}>
                <motion.a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block py-12 lg:py-14"
                  style={{
                    borderBottom: '1px solid rgba(255,255,255,0.07)',
                    display: 'grid',
                    gridTemplateColumns: '64px 1fr auto',
                    gap: '2rem',
                    alignItems: 'start',
                  }}
                  whileHover={{ x: i % 2 === 0 ? 7 : -7 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                >
                  {/* Number */}
                  <div
                    className="font-sans pt-1"
                    style={{
                      fontSize: '0.65rem',
                      letterSpacing: '0.4em',
                      textTransform: 'uppercase',
                      color: 'rgba(151,204,246,0.28)',
                    }}
                  >
                    {item.num}
                  </div>

                  {/* Content */}
                  <div>
                    <div className="flex flex-wrap items-center gap-4 mb-4">
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
                    <h2
                      className="font-display font-semibold text-white group-hover:text-gold transition-colors duration-400 mb-4"
                      style={{
                        fontSize: 'clamp(1rem, 1.8vw, 1.35rem)',
                        lineHeight: '1.35',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {item.headline}
                    </h2>
                    <p
                      className="font-sans leading-relaxed"
                      style={{
                        fontSize: '0.825rem',
                        color: 'rgba(255,255,255,0.3)',
                        maxWidth: '42rem',
                      }}
                    >
                      {item.excerpt}
                    </p>
                  </div>

                  {/* Read link */}
                  <div
                    className="hidden md:flex items-center gap-3 font-sans tracking-widest uppercase text-gold/25 group-hover:text-gold transition-colors duration-400 pt-1 whitespace-nowrap"
                    style={{ fontSize: '0.65rem' }}
                  >
                    Read
                    <span
                      className="block h-px bg-current group-hover:w-10 transition-all duration-500"
                      style={{ width: '1rem' }}
                    />
                  </div>
                </motion.a>
              </Reveal>
            ))}
          </div>

        </div>
      </section>
    </>
  )
}
