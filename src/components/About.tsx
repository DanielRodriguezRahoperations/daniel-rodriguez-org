import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import FloatingGeometry from './FloatingGeometry'

const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '100s', label: 'Businesses Empowered' },
  { value: '3', label: 'Industries Mastered' },
  { value: 'IAPDA', label: 'Certified Specialist' },
]

const pillars = [
  {
    num: '01',
    title: 'Digital Growth',
    description:
      'Over a decade of hands-on expertise in digital marketing, SEO, Google Business optimization, and lead generation — helping businesses get structured, get found, and scale fast.',
  },
  {
    num: '02',
    title: 'Business Credit',
    description:
      'Specialized in business credit building and Net 30 vendor account setup, empowering entrepreneurs to access capital, build credibility, and grow without personal credit risk.',
  },
  {
    num: '03',
    title: 'Solar & Energy',
    description:
      'As owner of SunVision Solar, Daniel helps homeowners and businesses make the switch to clean energy — reducing costs and building long-term financial freedom.',
  },
]

function SlideIn({
  children,
  delay = 0,
  from = 'left',
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  from?: 'left' | 'right' | 'up' | 'scale'
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const initial =
    from === 'left'  ? { opacity: 0, x: -60 } :
    from === 'right' ? { opacity: 0, x: 60 } :
    from === 'scale' ? { opacity: 0, scale: 0.88 } :
                       { opacity: 0, y: 50 }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, x: 0, y: 0, scale: 1 } : {}}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function About() {
  return (
    <section
      id="about"
      className="py-32 lg:py-48 px-6 lg:px-12 max-w-7xl mx-auto"
      style={{ background: 'rgba(10,10,10,0.72)' }}
    >
      {/* Two-column: text + 3D */}
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-32">

        {/* Left — Text: slides from left */}
        <div>
          <SlideIn from="left" delay={0}>
            <p className="font-sans text-xs tracking-[0.4em] uppercase text-gold/70 mb-8">
              001 / About
            </p>
          </SlideIn>

          <SlideIn from="left" delay={0.1}>
            <h2 className="font-display text-[clamp(2.8rem,5.5vw,4.5rem)] font-bold text-white leading-tight mb-10">
              The Multi-Industry
              <br />
              <span className="italic text-gold">Strategist</span>
            </h2>
          </SlideIn>

          <SlideIn from="left" delay={0.2}>
            <blockquote className="font-cormorant text-[clamp(1.2rem,2.2vw,1.6rem)] italic text-gold/75 leading-relaxed mb-10 pl-6 border-l-2 border-gold/40">
              "When you search for Daniel Rodriguez, you'll find a driven, multi-faceted professional with one mission — to help people grow in business, finances, and life."
            </blockquote>
          </SlideIn>

          <SlideIn from="left" delay={0.3}>
            <p className="font-sans text-base text-white/55 leading-relaxed mb-6">
              Daniel Rodriguez is a Scottsdale-based entrepreneur and strategist passionate
              about helping others succeed. He is the Founder of RAH Operations LLC, the
              Owner of SunVision Solar, and a Senior Certified Debt Specialist with an IAPDA
              certification.
            </p>
          </SlideIn>

          <SlideIn from="left" delay={0.4}>
            <p className="font-sans text-base text-white/55 leading-relaxed mb-12">
              With over a decade of experience in digital marketing, SEO, business credit
              building, and solar energy, Daniel empowers everyday people to grow their
              income, rebuild their credit, and create real freedom — no matter where they're
              starting from.
            </p>
          </SlideIn>

          <SlideIn from="left" delay={0.5}>
            <a
              href="#contact"
              className="group inline-flex items-center gap-4 font-sans text-sm font-medium tracking-widest uppercase text-gold hover:text-white transition-colors duration-300"
            >
              Work With Daniel
              <span className="w-8 h-px bg-gold group-hover:w-16 transition-all duration-500" />
            </a>
          </SlideIn>
        </div>

        {/* Right — 3D canvas: slides from right */}
        <SlideIn from="right" delay={0.2} className="relative h-[500px] lg:h-[600px]">
          <div className="absolute inset-0 rounded-2xl bg-gradient-radial from-gold/5 via-transparent to-transparent pointer-events-none z-10" />
          <div className="absolute -inset-4 rounded-3xl border border-gold/5 pointer-events-none" />
          <FloatingGeometry />
        </SlideIn>
      </div>

      {/* Stats — stagger up, no card backgrounds */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 border border-white/8 mb-32">
        {stats.map((stat, i) => (
          <SlideIn key={stat.label} from="up" delay={i * 0.1}>
            <div className="px-8 py-12 text-center border-r border-white/8 last:border-r-0 group">
              <div className="font-display text-[clamp(2.2rem,4.5vw,3.5rem)] font-bold text-gold mb-3 group-hover:scale-110 transition-transform duration-400">
                {stat.value}
              </div>
              <div className="font-sans text-xs tracking-[0.3em] uppercase text-white/35">
                {stat.label}
              </div>
            </div>
          </SlideIn>
        ))}
      </div>

      {/* Pillars — scale reveal, no card backgrounds */}
      <div>
        <SlideIn from="up" delay={0}>
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-gold/50 mb-16">
            Areas of Expertise
          </p>
        </SlideIn>
        <div className="divide-y divide-white/8">
          {pillars.map((pillar, i) => (
            <SlideIn key={pillar.title} from="scale" delay={i * 0.14}>
              <div className="group py-12 grid md:grid-cols-[120px_1fr_2fr] gap-8 items-start hover:pl-4 transition-all duration-500">
                <div className="font-sans text-xs tracking-[0.4em] text-gold/40 pt-1">
                  {pillar.num}
                </div>
                <h3 className="font-display text-2xl lg:text-3xl font-semibold text-white group-hover:text-gold transition-colors duration-300">
                  {pillar.title}
                </h3>
                <p className="font-sans text-sm text-white/40 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </SlideIn>
          ))}
        </div>
      </div>
    </section>
  )
}
