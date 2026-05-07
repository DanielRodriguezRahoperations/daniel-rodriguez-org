import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function Reveal({
  children,
  delay = 0,
  from = 'up',
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  from?: 'left' | 'right' | 'up'
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  return (
    <motion.div
      ref={ref}
      initial={
        from === 'left'  ? { opacity: 0, x: -44 } :
        from === 'right' ? { opacity: 0, x: 44 } :
                           { opacity: 0, y: 40 }
      }
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 1.0, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const inputClass = [
  'w-full bg-transparent text-white placeholder-white/20',
  'font-sans text-sm px-5 py-4',
  'transition-colors duration-300 focus:outline-none',
].join(' ')

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const headerRef    = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section
      id="contact"
      style={{ background: 'rgba(10,10,10,0.82)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-40 lg:py-56">

        {/* Heading */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 55, rotate: -0.8 }}
          animate={headerInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-28 lg:mb-36"
        >
          <p
            className="font-sans mb-8"
            style={{
              fontSize: '0.65rem', letterSpacing: '0.45em',
              textTransform: 'uppercase', color: 'rgba(151,204,246,0.6)',
            }}
          >
            003 / Work With Me
          </p>
          <h2
            className="font-display font-bold text-white"
            style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              lineHeight: '0.92', letterSpacing: '-0.03em',
            }}
          >
            Ready to build
            <br />
            <span className="italic" style={{ color: '#97CCF6' }}>something real?</span>
          </h2>
          <p
            className="font-sans leading-relaxed mt-8 max-w-xl"
            style={{
              fontSize: '0.9375rem', color: 'rgba(255,255,255,0.38)',
              letterSpacing: '0.01em',
            }}
          >
            Daniel accepts a limited number of clients each quarter. If you're serious about
            growing in revenue, reputation, or reach — this is where it starts.
          </p>
        </motion.div>

        {/* Two columns */}
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32">

          {/* Left: quote + contact info */}
          <div>
            <Reveal from="left" delay={0.1}>
              <blockquote
                className="font-cormorant italic leading-relaxed mb-16 pl-5"
                style={{
                  fontSize: 'clamp(1.2rem, 2.3vw, 1.55rem)',
                  color: 'rgba(255,255,255,0.35)',
                  borderLeft: '2px solid rgba(151,204,246,0.22)',
                }}
              >
                "The most powerful brands didn't happen by accident. They were built deliberately —
                with a clear strategy, a defined outcome, and someone willing to execute it."
              </blockquote>
            </Reveal>

            <div className="space-y-8">
              {[
                { label: 'Email',        content: 'daniel@rahoperations.com', href: 'mailto:daniel@rahoperations.com' },
                { label: 'Phone',        content: '623-640-8884',              href: 'tel:6236408884' },
                { label: 'Location',     content: 'Scottsdale, Arizona',       href: null },
                { label: 'Availability', content: 'Accepting select clients — 2026', href: null },
              ].map((item, i) => (
                <Reveal key={item.label} from="left" delay={0.14 + i * 0.07}>
                  <div>
                    <p
                      className="font-sans mb-2"
                      style={{
                        fontSize: '0.65rem', letterSpacing: '0.3em',
                        textTransform: 'uppercase', color: 'rgba(151,204,246,0.38)',
                      }}
                    >
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="font-sans text-base transition-colors duration-300 hover:text-gold"
                        style={{ color: 'rgba(255,255,255,0.48)' }}
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="font-sans text-base" style={{ color: 'rgba(255,255,255,0.48)' }}>
                        {item.content}
                      </p>
                    )}
                  </div>
                </Reveal>
              ))}

              <Reveal from="left" delay={0.46}>
                <div>
                  <p
                    className="font-sans mb-4"
                    style={{
                      fontSize: '0.65rem', letterSpacing: '0.3em',
                      textTransform: 'uppercase', color: 'rgba(151,204,246,0.38)',
                    }}
                  >
                    Follow
                  </p>
                  <div className="flex gap-6">
                    <a
                      href="https://www.linkedin.com/in/danielrodriguez-scottsdale/"
                      target="_blank" rel="noopener noreferrer"
                      className="font-sans text-sm transition-colors duration-300 hover:text-gold"
                      style={{ color: 'rgba(255,255,255,0.3)' }}
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://www.instagram.com/drod6211/"
                      target="_blank" rel="noopener noreferrer"
                      className="font-sans text-sm transition-colors duration-300 hover:text-gold"
                      style={{ color: 'rgba(255,255,255,0.3)' }}
                    >
                      Instagram
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Right: form */}
          <Reveal from="right" delay={0.2}>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center justify-center h-full py-20 text-center"
              >
                <div
                  className="mb-10 mx-auto"
                  style={{ width: '3rem', height: 1, background: '#97CCF6' }}
                />
                <h3 className="font-display text-3xl font-semibold text-white mb-6">
                  Message Received
                </h3>
                <p
                  className="font-cormorant text-xl italic leading-relaxed max-w-sm"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  Thank you for reaching out. I'll be in touch within 48 hours to explore
                  what we can build together.
                </p>
                <div
                  className="mt-10 mx-auto"
                  style={{ width: '3rem', height: 1, background: '#97CCF6' }}
                />
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text" name="name" placeholder="Full Name" required
                    value={form.name} onChange={handleChange}
                    className={inputClass}
                    style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                    onFocus={e => (e.target.style.borderColor = 'rgba(151,204,246,0.45)')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
                  />
                  <input
                    type="email" name="email" placeholder="Email Address" required
                    value={form.email} onChange={handleChange}
                    className={inputClass}
                    style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                    onFocus={e => (e.target.style.borderColor = 'rgba(151,204,246,0.45)')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
                  />
                </div>
                <input
                  type="text" name="company" placeholder="Company / Organization"
                  value={form.company} onChange={handleChange}
                  className={inputClass}
                  style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(151,204,246,0.45)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
                />
                <textarea
                  name="message"
                  placeholder="Tell me about your goals — where you are now, and where you want to be."
                  required rows={7}
                  value={form.message} onChange={handleChange}
                  className={`${inputClass} resize-none`}
                  style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(151,204,246,0.45)')}
                  onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.08)')}
                />
                <div className="pt-2">
                  <motion.button
                    type="submit"
                    className="group w-full font-sans font-medium tracking-widest uppercase flex items-center justify-center gap-5"
                    style={{
                      fontSize: '0.72rem', padding: '1.25rem 2.5rem',
                      background: '#97CCF6', color: '#0a0a0a',
                    }}
                    whileHover={{ scale: 1.012 }}
                    whileTap={{ scale: 0.988 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    Send Message
                    <span
                      className="block h-px group-hover:w-8 transition-all duration-400"
                      style={{ width: '1rem', background: '#0a0a0a' }}
                    />
                  </motion.button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
