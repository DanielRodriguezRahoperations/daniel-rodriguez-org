
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const credentials = [
  { value: '10+',   label: 'Years in market' },
  { value: '100+',  label: 'Businesses scaled' },
  { value: '3',     label: 'Industries led' },
  { value: 'IAPDA', label: 'Certified specialist' },
]

const marqueeItems = [
  'Digital Marketing', 'SEO Architecture', 'Business Credit', 'Net 30 Vendor Setup',
  'Solar Energy', 'Lead Generation', 'Reputation Management', 'Brand Strategy',
  'Capital Access', 'Google Business', 'Website Development', 'Debt Relief Strategy',
]

function LineReveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: 'inset(0 0 100% 0)', opacity: 0 }}
      animate={inView ? { clipPath: 'inset(0 0 0% 0)', opacity: 1 } : {}}
      transition={{ duration: 0.92, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function Statement() {
  const sectionRef = useRef<HTMLElement>(null)
  const credRef    = useRef<HTMLDivElement>(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-80px' })
  const credInView = useInView(credRef,    { once: true, margin: '-60px' })

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: 'rgba(8,8,8,0.97)', zIndex: 10 }}
    >
      {/* Soft bleed from hero */}
      <div
        aria-hidden
        style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: 100,
          background: 'linear-gradient(to bottom, #0a0a0a 0%, transparent 100%)',
          pointerEvents: 'none', zIndex: 1,
        }}
      />

      {/* Philosophy statement */}
      <div
        className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-36 lg:pt-52 pb-28 lg:pb-36"
        style={{ zIndex: 2 }}
      >
        <motion.p
          initial={{ opacity: 0, x: -12 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans mb-16"
          style={{
            fontSize: '0.65rem', letterSpacing: '0.45em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)',
          }}
        >
          The operating principle
        </motion.p>

        <div
          className="font-display font-black"
          style={{
            fontSize: 'clamp(3rem, 6.5vw, 6.2rem)',
            letterSpacing: '-0.03em', lineHeight: '1.0',
          }}
        >
          <LineReveal delay={0.1}>
            <span style={{ color: 'rgba(255,255,255,0.26)' }}>Most consultants advise.</span>
          </LineReveal>
          <LineReveal delay={0.32} className="mt-3">
            <span className="text-white">Daniel&nbsp;</span>
            <span className="italic" style={{ color: '#97CCF6' }}>builds.</span>
          </LineReveal>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans leading-relaxed mt-10 max-w-lg"
          style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.34)', letterSpacing: '0.01em' }}
        >
          Ten years of execution across digital marketing, business credit, and clean energy.
          Not theory — working systems that generate real, measurable results for real people.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.3, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            transformOrigin: 'left', height: 1,
            background: 'rgba(255,255,255,0.06)', marginTop: '5rem',
          }}
        />
      </div>

      {/* Credential bar */}
      <div ref={credRef} className="max-w-7xl mx-auto px-6 lg:px-12 pb-16 lg:pb-20">
        <div
          className="grid grid-cols-2 lg:grid-cols-4"
          style={{ border: '1px solid rgba(255,255,255,0.06)' }}
        >
          {credentials.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 22 }}
              animate={credInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group px-8 lg:px-10 py-12 cursor-default"
              style={{
                borderRight: i < 3 ? '1px solid rgba(255,255,255,0.06)' : undefined,
                borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.06)' : undefined,
              }}
            >
              <div
                className="font-display font-black mb-3 group-hover:text-gold transition-colors duration-500"
                style={{
                  fontSize: 'clamp(2.4rem, 4vw, 3.8rem)',
                  lineHeight: 1, letterSpacing: '-0.03em', color: '#ffffff',
                }}
              >
                {item.value}
              </div>
              <div
                className="font-sans"
                style={{
                  fontSize: '0.65rem', letterSpacing: '0.35em',
                  textTransform: 'uppercase', color: 'rgba(255,255,255,0.24)',
                }}
              >
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Services strip */}
      <div
        className="overflow-hidden py-5"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
          className="flex whitespace-nowrap"
        >
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="font-sans"
              style={{
                fontSize: '0.65rem', letterSpacing: '0.3em',
                textTransform: 'uppercase',
                paddingLeft: '2rem', paddingRight: '2rem',
                borderRight: '1px solid rgba(255,255,255,0.06)',
                color: i % 5 === 0 ? 'rgba(151,204,246,0.35)' : 'rgba(255,255,255,0.1)',
              }}
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
