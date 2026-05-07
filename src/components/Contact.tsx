import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function ScaleIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function SlideIn({ children, delay = 0, from = 'left', className = '' }: { children: React.ReactNode; delay?: number; from?: 'left' | 'right'; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: from === 'left' ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const inputClass =
  'w-full bg-transparent border border-white/10 text-white placeholder-white/20 font-sans text-sm px-5 py-4 focus:outline-none focus:border-gold/60 transition-colors duration-300'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section
      id="contact"
      className="py-32 lg:py-48 px-6 lg:px-12"
      style={{ background: 'rgba(10,10,10,0.80)' }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Heading — rotate-in effect */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 60, rotate: -1 }}
          animate={headerInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 lg:mb-32"
        >
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-gold/70 mb-8">
            003 / Work With Me
          </p>
          <h2 className="font-display text-[clamp(3rem,8vw,7rem)] font-bold text-white leading-[0.92] tracking-tight">
            Begin Your
            <br />
            <span className="italic text-gold">Transformation</span>
          </h2>
        </motion.div>

        {/* Two columns */}
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32">

          {/* Left — Quote + contact details: slide from left */}
          <div>
            <SlideIn from="left" delay={0.1}>
              <blockquote className="font-cormorant text-[clamp(1.3rem,2.5vw,1.7rem)] italic text-white/45 leading-relaxed mb-16 pl-6 border-l-2 border-gold/30">
                "The most powerful brands in the world didn't happen by accident.
                They were built — deliberately, strategically, and with an
                unwavering commitment to a singular vision."
              </blockquote>
            </SlideIn>

            <div className="space-y-8">
              {[
                { label: 'Email', content: 'daniel@rahoperations.com', href: 'mailto:daniel@rahoperations.com' },
                { label: 'Phone', content: '623-640-8884', href: 'tel:6236408884' },
                { label: 'Location', content: 'Scottsdale, Arizona', href: null },
                { label: 'Availability', content: 'Accepting select clients — 2026', href: null },
              ].map((item, i) => (
                <SlideIn key={item.label} from="left" delay={0.15 + i * 0.07}>
                  <div>
                    <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold/45 mb-2">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a href={item.href} className="font-sans text-base text-white/55 hover:text-gold transition-colors duration-300">
                        {item.content}
                      </a>
                    ) : (
                      <p className="font-sans text-base text-white/55">{item.content}</p>
                    )}
                  </div>
                </SlideIn>
              ))}

              <SlideIn from="left" delay={0.45}>
                <div>
                  <p className="font-sans text-xs tracking-[0.3em] uppercase text-gold/45 mb-4">Follow</p>
                  <div className="flex gap-6">
                    <a href="https://www.linkedin.com/in/danielrodriguez-scottsdale/" target="_blank" rel="noopener noreferrer"
                      className="font-sans text-sm text-white/35 hover:text-gold transition-colors duration-300">LinkedIn</a>
                    <a href="https://www.instagram.com/drod6211/" target="_blank" rel="noopener noreferrer"
                      className="font-sans text-sm text-white/35 hover:text-gold transition-colors duration-300">Instagram</a>
                  </div>
                </div>
              </SlideIn>
            </div>
          </div>

          {/* Right — Form: slides from right */}
          <SlideIn from="right" delay={0.2}>
            {submitted ? (
              <ScaleIn>
                <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                  <div className="w-16 h-px bg-gold mb-10 mx-auto" />
                  <h3 className="font-display text-3xl font-semibold text-white mb-6">Message Received</h3>
                  <p className="font-cormorant text-xl italic text-white/45 leading-relaxed max-w-sm">
                    Thank you for reaching out. I'll be in touch within 48 hours to discuss how we can build something extraordinary together.
                  </p>
                  <div className="w-16 h-px bg-gold mt-10 mx-auto" />
                </div>
              </ScaleIn>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <input type="text" name="name" placeholder="Full Name" required value={form.name} onChange={handleChange} className={inputClass} />
                  <input type="email" name="email" placeholder="Email Address" required value={form.email} onChange={handleChange} className={inputClass} />
                </div>
                <input type="text" name="company" placeholder="Company / Organization" value={form.company} onChange={handleChange} className={inputClass} />
                <textarea name="message" placeholder="Tell me about your goals and what you're looking to achieve..." required rows={7} value={form.message} onChange={handleChange} className={`${inputClass} resize-none`} />
                <div className="pt-2">
                  <button type="submit"
                    className="group w-full font-sans text-sm font-medium tracking-widest uppercase px-10 py-5 bg-gold text-[#0a0a0a] hover:bg-white transition-all duration-300 flex items-center justify-center gap-4">
                    Send Message
                    <span className="w-4 h-px bg-[#0a0a0a] group-hover:w-8 transition-all duration-300" />
                  </button>
                </div>
              </form>
            )}
          </SlideIn>
        </div>
      </div>
    </section>
  )
}
