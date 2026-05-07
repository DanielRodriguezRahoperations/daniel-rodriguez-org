import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const outlets = ['PRLog', 'BizWire Express', '1888 Press Release', 'Articleted']

const pressItems = [
  {
    num: '01',
    outlet: 'PRLog',
    date: 'Nov 25, 2025',
    headline: 'Daniel Rodriguez Expands PR and Reputation Management Services While Sharing Personal Life Update',
    excerpt:
      'Daniel Rodriguez, founder of RAH Operations LLC, has announced an expansion of his business consulting agency to include reputation management, public relations strategy, and brand publicity services.',
    url: 'https://www.prlog.org/13112958-daniel-rodriguez-expands-pr-and-reputation-management-services-while-sharing-personal-life-update.html',
  },
  {
    num: '02',
    outlet: 'PRLog',
    date: 'May 20, 2025',
    headline: 'The Multi-Industry Strategist Helping Entrepreneurs, Homeowners, and Families Take Control',
    excerpt:
      'Based in Scottsdale, Arizona, Daniel Rodriguez founded RAH Operations LLC, owns Sunvision Solar, and serves as a Senior Certified Debt Specialist — a driven, multi-faceted professional with one mission.',
    url: 'https://www.prlog.org/13077658-daniel-rodriguezthe-multi-industry-strategist-helping-entrepreneurs-homeowners-and-families-take.html',
  },
  {
    num: '03',
    outlet: 'BizWire Express',
    date: 'Sep 2, 2025',
    headline: 'Daniel Rodriguez Launches RAH Operations to Empower Small Businesses Nationwide',
    excerpt:
      'Daniel Rodriguez has established RAH Operations LLC, a business services and digital marketing firm focused on supporting small business growth across credit, SEO, and lead generation.',
    url: 'https://www.bizwireexpress.com/showstory1888.php?storyid=1842',
  },
  {
    num: '04',
    outlet: '1888 Press Release',
    date: 'Sep 2, 2025',
    headline: 'Daniel Rodriguez Launches RAH Operations to Empower Small Businesses Nationwide',
    excerpt:
      'After more than a decade working with entrepreneurs and brands behind the scenes, Daniel Rodriguez officially launched RAH Operations LLC — designed to help small businesses get structured, get seen, and grow fast.',
    url: 'https://www.1888pressrelease.com/daniel-rodriguez-launches-rah-operations-to-empower-small-bu-pr-751351.html',
  },
  {
    num: '05',
    outlet: 'Articleted',
    date: 'Sep 3, 2025',
    headline: 'Daniel Rodriguez Launches RAH Operations to Empower Small Businesses Nationwide',
    excerpt:
      'RAH Operations specializes in business credit and Net 30 vendor account setup, SEO and Google Business profile optimization, digital marketing and lead generation.',
    url: 'https://www.articleted.com/article/1019949/115742/Daniel-Rodriguez-Launches-RAH-Operations-to-Empower-Small-Businesses-Nationwide',
  },
]

function ClipReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: 'inset(100% 0 0 0)', opacity: 0 }}
      animate={inView ? { clipPath: 'inset(0% 0 0 0)', opacity: 1 } : {}}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

function SlideIn({ children, delay = 0, from = 'left' }: { children: React.ReactNode; delay?: number; from?: 'left' | 'right' }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: from === 'left' ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function Press() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section
      id="press"
      style={{ background: 'rgba(10,10,10,0.82)' }}
      className="py-32 lg:py-48"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header — clip reveal */}
        <motion.div
          ref={headerRef}
          initial={{ clipPath: 'inset(100% 0 0 0)', opacity: 0 }}
          animate={headerInView ? { clipPath: 'inset(0% 0 0 0)', opacity: 1 } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24"
        >
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-gold/70 mb-6">
            002 / In The Media
          </p>
          <h2 className="font-display text-[clamp(2.8rem,5.5vw,4.5rem)] font-bold text-white leading-tight">
            Press &amp;{' '}
            <span className="italic text-gold">Recognition</span>
          </h2>
        </motion.div>

        {/* As Seen In — horizontal scrolling marquee */}
        <ClipReveal delay={0.2}>
          <div className="overflow-hidden border-y border-white/8 py-6 mb-24">
            <motion.div
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              className="flex gap-16 whitespace-nowrap"
            >
              {[...outlets, ...outlets].map((outlet, i) => (
                <span
                  key={i}
                  className="font-display text-base font-semibold text-white/20 tracking-widest uppercase"
                >
                  {outlet}
                </span>
              ))}
            </motion.div>
          </div>
        </ClipReveal>

        {/* Press items — editorial list, alternating slide-left / slide-right */}
        <div className="divide-y divide-white/8">
          {pressItems.map((item, i) => (
            <SlideIn key={i} delay={0.05} from={i % 2 === 0 ? 'left' : 'right'}>
              <motion.a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block py-12 grid md:grid-cols-[80px_1fr_auto] gap-8 items-start hover:pl-4 transition-all duration-500"
                whileHover={{ x: i % 2 === 0 ? 6 : -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                {/* Number */}
                <div className="font-sans text-xs tracking-[0.4em] text-gold/35 pt-2">
                  {item.num}
                </div>

                {/* Content */}
                <div>
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <span className="font-display text-sm font-semibold text-gold">
                      {item.outlet}
                    </span>
                    <span className="font-sans text-xs text-white/25 tracking-widest">
                      {item.date}
                    </span>
                  </div>
                  <h3 className="font-display text-xl lg:text-2xl font-semibold text-white leading-snug mb-4 group-hover:text-gold/90 transition-colors duration-300">
                    {item.headline}
                  </h3>
                  <p className="font-sans text-sm text-white/35 leading-relaxed max-w-2xl">
                    {item.excerpt}
                  </p>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex items-center gap-3 font-sans text-xs tracking-widest uppercase text-gold/30 group-hover:text-gold transition-colors duration-300 pt-2 whitespace-nowrap">
                  Read
                  <span className="w-4 h-px bg-current group-hover:w-10 transition-all duration-500" />
                </div>
              </motion.a>
            </SlideIn>
          ))}
        </div>

      </div>
    </section>
  )
}
