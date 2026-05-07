import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const outlets = [
  'Forbes',
  'Entrepreneur',
  'Fast Company',
  'Inc.',
  'Business Insider',
  'Harvard Business Review',
]

const pressCards = [
  {
    outlet: 'Forbes',
    date: 'March 2024',
    headline: '30 Under 30: The Brand Strategists Redefining How Leaders Show Up',
    excerpt:
      'Daniel Rodriguez has built a reputation as the go-to architect for executives who want to be known, not just recognized. His methodology is quietly revolutionizing how the C-suite approaches personal branding.',
  },
  {
    outlet: 'Entrepreneur',
    date: 'January 2024',
    headline: 'Why Your Personal Brand Is Your Most Valuable Business Asset',
    excerpt:
      'In an era of radical transparency, Rodriguez argues that authenticity is not a strategy — it\'s the only strategy. Here\'s how he helps leaders find and weaponize their true story.',
  },
  {
    outlet: 'Fast Company',
    date: 'November 2023',
    headline: 'The Quiet Architect Behind Some of Today\'s Most Powerful Personal Brands',
    excerpt:
      'You may not know his name, but you know his work. Daniel Rodriguez has spent a decade building the narratives that make executives unforgettable — and his methods are unlike anything you\'ve seen.',
  },
  {
    outlet: 'Inc.',
    date: 'September 2023',
    headline: 'How to Build a Personal Brand That Outlasts Your Business',
    excerpt:
      'Rodriguez\'s framework for legacy-first brand building has helped founders survive pivots, scandals, and market shifts — by anchoring their brand to something deeper than any single venture.',
  },
  {
    outlet: 'Business Insider',
    date: 'July 2023',
    headline: 'The Science Behind Why Some Leaders Are Impossible to Ignore',
    excerpt:
      'Drawing on behavioral psychology and media strategy, Rodriguez breaks down the neurological triggers that make certain personal brands magnetically compelling — and how to engineer them deliberately.',
  },
  {
    outlet: 'Harvard Business Review',
    date: 'April 2023',
    headline: 'Personal Branding as Competitive Moat: A Strategic Framework',
    excerpt:
      'Co-authored with leading researchers, Rodriguez\'s HBR piece presents the first empirical model for measuring personal brand equity — and the ROI it generates for executives and their organizations.',
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
          className="text-center mb-20"
        >
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-gold/70 mb-6">
            Recognition
          </p>
          <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold text-white leading-tight">
            Press &amp; Recognition
          </h2>
        </motion.div>

        {/* Featured In logo row */}
        <FadeIn delay={0.2} className="mb-20">
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 pb-16 border-b border-white/5">
            <p className="font-sans text-xs tracking-[0.4em] uppercase text-white/20 w-full text-center mb-4">
              Featured In
            </p>
            {outlets.map((outlet) => (
              <span
                key={outlet}
                className="font-display text-lg font-semibold text-white/20 hover:text-gold/60 transition-colors duration-300 cursor-default"
              >
                {outlet}
              </span>
            ))}
          </div>
        </FadeIn>

        {/* Press cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-sm overflow-hidden">
          {pressCards.map((card, i) => (
            <FadeIn key={card.headline} delay={i * 0.08}>
              <div className="bg-[#141414] p-8 lg:p-10 group hover:bg-[#1c1c1c] transition-colors duration-500 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display text-sm font-semibold text-gold">
                    {card.outlet}
                  </span>
                  <span className="font-sans text-xs text-white/30">
                    {card.date}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold text-white leading-snug mb-4 flex-1">
                  {card.headline}
                </h3>
                <p className="font-sans text-sm text-white/40 leading-relaxed mb-8">
                  {card.excerpt}
                </p>
                <div className="flex items-center gap-3 font-sans text-xs font-medium tracking-widest uppercase text-gold/60 group-hover:text-gold transition-colors duration-300">
                  Read More
                  <span className="w-4 h-px bg-gold/40 group-hover:w-8 group-hover:bg-gold transition-all duration-500" />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
