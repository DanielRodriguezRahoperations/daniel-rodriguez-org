import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const outlets = ['PRLog', 'BizWire Express', '1888 Press Release', 'Articleted']

const pressCards = [
  {
    outlet: 'PRLog',
    date: 'November 25, 2025',
    headline: 'Daniel Rodriguez Expands PR and Reputation Management Services While Sharing Personal Life Update',
    excerpt:
      'Daniel Rodriguez, founder of RAH Operations LLC, has announced an expansion of his business consulting agency to include reputation management, public relations strategy, and brand publicity services — broadening his firm\'s capabilities to support clients seeking credibility and online protection.',
    url: 'https://www.prlog.org/13112958-daniel-rodriguez-expands-pr-and-reputation-management-services-while-sharing-personal-life-update.html',
  },
  {
    outlet: 'PRLog',
    date: 'May 20, 2025',
    headline: 'Daniel Rodriguez: The Multi-Industry Strategist Helping Entrepreneurs, Homeowners, and Families Take Control',
    excerpt:
      'Based in Scottsdale, Arizona, Daniel Rodriguez founded RAH Operations LLC, owns Sunvision Solar, and serves as a Senior Certified Debt Specialist at Pacific Debt Relief — a driven, multi-faceted professional with one mission: to help people grow in business, finances, and life.',
    url: 'https://www.prlog.org/13077658-daniel-rodriguezthe-multi-industry-strategist-helping-entrepreneurs-homeowners-and-families-take.html',
  },
  {
    outlet: 'BizWire Express',
    date: 'September 2, 2025',
    headline: 'Daniel Rodriguez Launches RAH Operations to Empower Small Businesses Nationwide',
    excerpt:
      'Daniel Rodriguez has established RAH Operations LLC, a business services and digital marketing firm focused on supporting small business growth. The Scottsdale-based agency offers business credit setup, SEO, digital marketing, and website development.',
    url: 'https://www.bizwireexpress.com/showstory1888.php?storyid=1842',
  },
  {
    outlet: '1888 Press Release',
    date: 'September 2, 2025',
    headline: 'Daniel Rodriguez Launches RAH Operations to Empower Small Businesses Nationwide',
    excerpt:
      '"After more than a decade of working with entrepreneurs and brands behind the scenes, Daniel Rodriguez has officially launched RAH Operations LLC — a business services and digital marketing agency designed to help small businesses get structured, get seen, and grow fast."',
    url: 'https://www.1888pressrelease.com/daniel-rodriguez-launches-rah-operations-to-empower-small-bu-pr-751351.html',
  },
  {
    outlet: 'Articleted',
    date: 'September 3, 2025',
    headline: 'Daniel Rodriguez Launches RAH Operations to Empower Small Businesses Nationwide',
    excerpt:
      'RAH Operations specializes in business credit and Net 30 vendor account setup, SEO and Google Business profile optimization, digital marketing and lead generation — empowering everyday people to build real income and lasting freedom.',
    url: 'https://www.articleted.com/article/1019949/115742/Daniel-Rodriguez-Launches-RAH-Operations-to-Empower-Small-Businesses-Nationwide',
  },
]

function FadeIn({
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

export default function Press() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section id="press" className="bg-[#141414] py-32 lg:py-48">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-gold/70 mb-6">
            In The Media
          </p>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold text-white leading-tight">
            Press &amp;{' '}
            <span className="italic text-gold">Recognition</span>
          </h2>
        </motion.div>

        {/* Featured In label row */}
        <FadeIn delay={0.2} className="mb-20">
          <div className="flex flex-wrap items-center gap-x-10 gap-y-5 pb-16 border-b border-white/5">
            <p className="font-sans text-xs tracking-[0.4em] uppercase text-white/20 mr-4">
              As Seen In
            </p>
            {outlets.map((outlet) => (
              <span
                key={outlet}
                className="font-display text-base font-semibold text-white/25 hover:text-gold/60 transition-colors duration-300 cursor-default"
              >
                {outlet}
              </span>
            ))}
          </div>
        </FadeIn>

        {/* Press cards grid — 3D tilt on hover via CSS */}
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-sm overflow-hidden"
          style={{ perspective: '1200px' }}
        >
          {pressCards.map((card, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <motion.a
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ rotateY: 2, rotateX: -1, z: 20, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="block bg-[#141414] p-8 lg:p-10 group hover:bg-[#1c1c1c] transition-colors duration-500 flex flex-col h-full"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display text-sm font-semibold text-gold">
                    {card.outlet}
                  </span>
                  <span className="font-sans text-xs text-white/30">
                    {card.date}
                  </span>
                </div>
                <h3 className="font-display text-base font-semibold text-white leading-snug mb-4 flex-1">
                  {card.headline}
                </h3>
                <p className="font-sans text-sm text-white/40 leading-relaxed mb-8">
                  {card.excerpt}
                </p>
                <div className="flex items-center gap-3 font-sans text-xs font-medium tracking-widest uppercase text-gold/50 group-hover:text-gold transition-colors duration-300">
                  Read Full Release
                  <span className="w-4 h-px bg-gold/40 group-hover:w-8 group-hover:bg-gold transition-all duration-500" />
                </div>
              </motion.a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
