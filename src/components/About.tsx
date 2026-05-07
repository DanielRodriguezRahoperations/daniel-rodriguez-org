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
  const inView = useInView(ref, { once: true, margin: '-80px' })

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

export default function About() {
  return (
    <section id="about" className="py-32 lg:py-48 px-6 lg:px-12 max-w-7xl mx-auto">
      {/* Two-column: text + 3D */}
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-28">
        {/* Left — Text */}
        <div>
          <FadeIn>
            <p className="font-sans text-xs tracking-[0.4em] uppercase text-gold/70 mb-8">
              About
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold text-white leading-tight mb-10">
              The Multi-Industry
              <br />
              <span className="italic text-gold">Strategist</span>
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <blockquote className="font-cormorant text-[clamp(1.2rem,2.2vw,1.6rem)] italic text-gold/80 leading-relaxed mb-10 pl-6 border-l border-gold/30">
              "When you search for Daniel Rodriguez, you'll find a driven, multi-faceted professional with one mission — to help people grow in business, finances, and life."
            </blockquote>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="font-sans text-base text-white/55 leading-relaxed mb-6">
              Daniel Rodriguez is a Scottsdale-based entrepreneur and strategist passionate
              about helping others succeed. He is the Founder of RAH Operations LLC, the
              Owner of SunVision Solar, and a Senior Certified Debt Specialist with an IAPDA
              certification.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="font-sans text-base text-white/55 leading-relaxed mb-12">
              With over a decade of experience in digital marketing, SEO, business credit
              building, and solar energy, Daniel empowers everyday people to grow their
              income, rebuild their credit, and create real freedom — no matter where they're
              starting from.
            </p>
          </FadeIn>

          <FadeIn delay={0.5}>
            <a
              href="#contact"
              className="group inline-flex items-center gap-4 font-sans text-sm font-medium tracking-widest uppercase text-gold hover:text-gold-light transition-colors duration-300"
            >
              Work With Daniel
              <span className="w-8 h-px bg-gold group-hover:w-16 transition-all duration-500" />
            </a>
          </FadeIn>
        </div>

        {/* Right — Three.js Canvas with 3D depth wrapper */}
        <FadeIn delay={0.2} className="relative h-[500px] lg:h-[600px]">
          {/* Depth glow layers for dimensionality */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-radial from-gold/5 via-transparent to-transparent pointer-events-none z-10" />
          <div className="absolute -inset-4 rounded-3xl border border-gold/5 pointer-events-none" />
          <div className="absolute -inset-8 rounded-3xl border border-gold/[0.03] pointer-events-none" />
          <FloatingGeometry />
        </FadeIn>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-sm overflow-hidden mb-28">
        {stats.map((stat, i) => (
          <FadeIn key={stat.label} delay={i * 0.1}>
            <div className="bg-[#0a0a0a] px-8 py-10 text-center group hover:bg-[#111] transition-colors duration-500">
              <div className="font-display text-[clamp(2rem,4vw,3rem)] font-bold text-gold mb-2 group-hover:scale-105 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="font-sans text-xs tracking-[0.25em] uppercase text-white/40">
                {stat.label}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {/* Three pillars */}
      <div className="grid md:grid-cols-3 gap-px bg-white/5 rounded-sm overflow-hidden">
        {pillars.map((pillar, i) => (
          <FadeIn key={pillar.title} delay={i * 0.12}>
            <div
              className="bg-[#0a0a0a] p-10 lg:p-12 group hover:bg-[#0f0f0f] transition-all duration-500"
              style={{ perspective: '800px' }}
            >
              <div className="font-sans text-xs tracking-[0.4em] text-gold/40 mb-6">
                {pillar.num}
              </div>
              <div className="w-8 h-px bg-gold mb-8 group-hover:w-16 transition-all duration-500" />
              <h3 className="font-display text-2xl font-semibold text-white mb-4">
                {pillar.title}
              </h3>
              <p className="font-sans text-sm text-white/40 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}
