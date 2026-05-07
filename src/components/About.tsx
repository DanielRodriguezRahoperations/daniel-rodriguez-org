import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import FloatingGeometry from './FloatingGeometry'

const stats = [
  { value: '10+', label: 'Years Experience' },
  { value: '200+', label: 'Clients Transformed' },
  { value: '50M+', label: 'Audience Reached' },
  { value: '3x', label: 'Revenue Growth' },
]

const pillars = [
  {
    title: 'Strategy',
    description:
      'Deep-dive brand audits and positioning frameworks that separate you from the noise and place you in a category of one.',
  },
  {
    title: 'Storytelling',
    description:
      'Authentic narratives crafted to captivate media, investors, and audiences — turning your journey into your greatest asset.',
  },
  {
    title: 'Execution',
    description:
      'Hands-on implementation across media, speaking, content, and partnerships to make your brand impossible to ignore.',
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
              The Architect of Iconic Brands
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <blockquote className="font-cormorant text-[clamp(1.3rem,2.5vw,1.7rem)] italic text-gold/80 leading-relaxed mb-10 pl-6 border-l border-gold/30">
              "Your personal brand is not what you say about yourself — it's what
              the world says about you when you've given them the right story to
              tell."
            </blockquote>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="font-sans text-base text-white/50 leading-relaxed mb-6">
              For over a decade, Daniel Rodriguez has been the quiet force behind
              some of the world's most recognized personal brands. From Fortune 500
              executives to emerging thought leaders, his methodology combines
              psychological precision with narrative artistry to create legacies
              that endure.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <p className="font-sans text-base text-white/50 leading-relaxed mb-12">
              Trained in behavioral psychology and media strategy, Daniel brings a
              rare lens to brand building — one that honors authenticity while
              demanding excellence. His clients don't just get noticed; they become
              the standard others are measured by.
            </p>
          </FadeIn>

          <FadeIn delay={0.5}>
            <a
              href="#contact"
              className="group inline-flex items-center gap-4 font-sans text-sm font-medium tracking-widest uppercase text-gold hover:text-gold-light transition-colors duration-300"
            >
              Start Your Transformation
              <span className="w-8 h-px bg-gold group-hover:w-16 transition-all duration-500" />
            </a>
          </FadeIn>
        </div>

        {/* Right — Three.js Canvas */}
        <FadeIn delay={0.2} className="relative h-[500px] lg:h-[600px]">
          <FloatingGeometry />
        </FadeIn>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-sm overflow-hidden mb-28">
        {stats.map((stat, i) => (
          <FadeIn key={stat.label} delay={i * 0.1}>
            <div className="bg-[#0a0a0a] px-8 py-10 text-center">
              <div className="font-display text-[clamp(2.5rem,5vw,3.5rem)] font-bold text-gold mb-2">
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
            <div className="bg-[#0a0a0a] p-10 lg:p-12 group hover:bg-dark-100 transition-colors duration-500">
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
