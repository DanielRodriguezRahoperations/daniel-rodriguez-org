import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import SEO from '../components/SEO'

/*
  CONTACT FORM — powered by Formspree (https://formspree.io)

  Required environment variable:
    VITE_FORMSPREE_ID=xxxxxxxx

  Setup:
    1. Go to https://formspree.io and sign in (or create a free account).
    2. Create a new form — set the notification email to daniel@rahoperations.com.
    3. Copy the form ID from the endpoint URL (e.g. https://formspree.io/f/xpwzjkbd → ID is xpwzjkbd).
    4. In Vercel dashboard → Settings → Environment Variables, add:
         VITE_FORMSPREE_ID = your-form-id
    5. Redeploy.

  The form submits JSON to https://formspree.io/f/{VITE_FORMSPREE_ID}.
  Formspree emails every submission to daniel@rahoperations.com, no backend required.
*/

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
        from === 'left'
          ? { opacity: 0, x: -44 }
          : from === 'right'
            ? { opacity: 0, x: 44 }
            : { opacity: 0, y: 36 }
      }
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const inputBase = [
  'w-full bg-transparent text-white placeholder-white/20',
  'font-sans text-sm px-5 py-4',
  'transition-colors duration-300 focus:outline-none',
].join(' ')

const reasons = [
  'Website Design & SEO',
  'Digital Marketing',
  'Business Credit',
  'Debt Relief Strategy',
  'Press / Media Inquiry',
  'General Inquiry',
]

const whoFor = [
  { label: 'Small Business Owners', detail: 'Website design, SEO, local visibility, digital marketing.' },
  { label: 'Entrepreneurs', detail: 'Business credit setup, brand building, growth systems.' },
  { label: 'Individuals Facing Debt', detail: 'Debt relief strategy, creditor negotiation, credit repair.' },
  { label: 'Press & Media', detail: 'Interview requests or commentary on entrepreneurship and digital marketing.' },
  { label: 'Collaborations', detail: 'Partnership inquiries, referral relationships, strategic conversations.' },
]

type FormState = {
  name: string
  email: string
  phone: string
  reason: string
  message: string
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    reason: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    if (error) setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (loading || submitted) return
    setLoading(true)
    setError(null)

    const formspreeId = import.meta.env.VITE_FORMSPREE_ID

    if (!formspreeId) {
      setError(
        'Form is not configured yet. Please email daniel@rahoperations.com directly.',
      )
      setLoading(false)
      return
    }

    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || 'Not provided',
          reason: form.reason || 'Not specified',
          message: form.message,
          _subject: `New inquiry from ${form.name} — danielrodriguez.org`,
          _replyto: form.email,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setSubmitted(true)
      } else {
        const msg =
          Array.isArray(data?.errors) && data.errors.length > 0
            ? data.errors[0].message
            : 'Something went wrong. Please email daniel@rahoperations.com directly.'
        setError(msg)
      }
    } catch {
      setError('Network error. Please try again or email daniel@rahoperations.com directly.')
    } finally {
      setLoading(false)
    }
  }

  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  const focusBorder = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = 'rgba(151,204,246,0.5)'
  }
  const blurBorder = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = 'rgba(255,255,255,0.08)'
  }

  return (
    <>
      <SEO
        title="Contact Daniel Rodriguez | Work With Me"
        description="Ready to build something real? Contact Daniel Rodriguez for website design, SEO, business credit, debt relief strategy, or digital marketing. Based in Scottsdale, Arizona — serving clients nationwide."
        canonical="/contact"
        keywords="contact Daniel Rodriguez, work with Daniel Rodriguez, Daniel Rodriguez consultation, RAH Operations contact, Scottsdale business consultant"
      />

      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://danielrodriguez.org/' },
            { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://danielrodriguez.org/contact' },
          ],
        })}</script>
      </Helmet>

      <section style={{ background: 'rgba(10,10,10,0.84)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-40 lg:py-56">

          {/* Page heading */}
          <motion.div
            ref={headerRef}
            initial={{ opacity: 0, y: 50 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-20 lg:mb-28"
          >
            <p
              className="font-sans mb-7"
              style={{
                fontSize: '0.62rem',
                letterSpacing: '0.45em',
                textTransform: 'uppercase',
                color: 'rgba(151,204,246,0.6)',
              }}
            >
              004 / Work With Me
            </p>
            <h1
              className="font-display font-bold text-white mb-7"
              style={{
                fontSize: 'clamp(2.8rem, 7vw, 6.5rem)',
                lineHeight: '0.93',
                letterSpacing: '-0.03em',
              }}
            >
              Ready to build
              <br />
              <span className="italic" style={{ color: '#97CCF6' }}>something real?</span>
            </h1>
            <p
              className="font-sans leading-relaxed max-w-lg"
              style={{
                fontSize: '0.9375rem',
                color: 'rgba(255,255,255,0.38)',
              }}
            >
              Daniel accepts a limited number of clients each quarter. Reach out if you're
              serious about growing in revenue, reputation, or reach.
            </p>
          </motion.div>

          {/* Who this is for */}
          <Reveal from="up" delay={0}>
            <div className="mb-20 lg:mb-28">
              <p
                className="font-sans mb-8"
                style={{
                  fontSize: '0.62rem',
                  letterSpacing: '0.45em',
                  textTransform: 'uppercase',
                  color: 'rgba(151,204,246,0.42)',
                }}
              >
                Who This Is For
              </p>
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px"
                style={{ background: 'rgba(255,255,255,0.05)' }}
              >
                {whoFor.map((item, i) => (
                  <div
                    key={item.label}
                    className="px-6 py-7"
                    style={{ background: 'rgba(10,10,10,0.82)' }}
                  >
                    <p
                      className="font-sans uppercase tracking-[0.18em] mb-2.5"
                      style={{ fontSize: '0.58rem', color: 'rgba(151,204,246,0.45)' }}
                    >
                      0{i + 1}
                    </p>
                    <p
                      className="font-display font-semibold text-white mb-1.5"
                      style={{ fontSize: '0.975rem', letterSpacing: '-0.01em', lineHeight: '1.3' }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="font-sans"
                      style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.28)', lineHeight: '1.6' }}
                    >
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Two-column: info + form */}
          <div className="grid lg:grid-cols-2 gap-20 lg:gap-32">

            {/* Left — quote + contact info */}
            <div>
              <Reveal from="left" delay={0.08}>
                <blockquote
                  className="font-cormorant italic leading-relaxed mb-14 pl-5"
                  style={{
                    fontSize: 'clamp(1.15rem, 2.2vw, 1.5rem)',
                    color: 'rgba(255,255,255,0.33)',
                    borderLeft: '2px solid rgba(151,204,246,0.2)',
                  }}
                >
                  "The most powerful brands didn't happen by accident. They were built deliberately —
                  with a clear strategy, a defined outcome, and someone willing to execute it."
                </blockquote>
              </Reveal>

              <div className="space-y-7">
                {[
                  { label: 'Email', content: 'daniel@rahoperations.com', href: 'mailto:daniel@rahoperations.com' },
                  { label: 'Phone', content: '623-640-8884', href: 'tel:6236408884' },
                  { label: 'Location', content: 'Scottsdale, Arizona', href: null },
                  { label: 'Availability', content: 'Accepting select clients — 2026', href: null },
                ].map((item, i) => (
                  <Reveal key={item.label} from="left" delay={0.12 + i * 0.07}>
                    <div>
                      <p
                        className="font-sans mb-1.5"
                        style={{
                          fontSize: '0.62rem',
                          letterSpacing: '0.3em',
                          textTransform: 'uppercase',
                          color: 'rgba(151,204,246,0.36)',
                        }}
                      >
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="font-sans text-sm transition-colors duration-300 hover:text-gold"
                          style={{ color: 'rgba(255,255,255,0.46)' }}
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="font-sans text-sm" style={{ color: 'rgba(255,255,255,0.46)' }}>
                          {item.content}
                        </p>
                      )}
                    </div>
                  </Reveal>
                ))}

                <Reveal from="left" delay={0.44}>
                  <div>
                    <p
                      className="font-sans mb-3"
                      style={{
                        fontSize: '0.62rem',
                        letterSpacing: '0.3em',
                        textTransform: 'uppercase',
                        color: 'rgba(151,204,246,0.36)',
                      }}
                    >
                      Follow
                    </p>
                    <div className="flex gap-6">
                      <a
                        href="https://www.linkedin.com/in/danielrodriguez-scottsdale/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-sans text-sm transition-colors duration-300 hover:text-gold"
                        style={{ color: 'rgba(255,255,255,0.28)' }}
                      >
                        LinkedIn
                      </a>
                      <a
                        href="https://www.instagram.com/drod6211/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-sans text-sm transition-colors duration-300 hover:text-gold"
                        style={{ color: 'rgba(255,255,255,0.28)' }}
                      >
                        Instagram
                      </a>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* Right — form */}
            <Reveal from="right" delay={0.15}>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center justify-center h-full py-24 text-center"
                >
                  <div
                    className="mb-10 mx-auto"
                    style={{ width: '3rem', height: 1, background: '#97CCF6' }}
                  />
                  <h2 className="font-display text-3xl font-semibold text-white mb-5">
                    Message Received
                  </h2>
                  <p
                    className="font-cormorant text-xl italic leading-relaxed max-w-sm"
                    style={{ color: 'rgba(255,255,255,0.38)' }}
                  >
                    Thank you for reaching out. I'll be in touch within 48 hours to explore what we
                    can build together.
                  </p>
                  <div
                    className="mt-10 mx-auto"
                    style={{ width: '3rem', height: 1, background: '#97CCF6' }}
                  />
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name *"
                      required
                      value={form.name}
                      onChange={handleChange}
                      disabled={loading}
                      className={inputBase}
                      style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                      onFocus={focusBorder}
                      onBlur={blurBorder}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address *"
                      required
                      value={form.email}
                      onChange={handleChange}
                      disabled={loading}
                      className={inputBase}
                      style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                      onFocus={focusBorder}
                      onBlur={blurBorder}
                    />
                  </div>

                  {/* Phone + Reason */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone (optional)"
                      value={form.phone}
                      onChange={handleChange}
                      disabled={loading}
                      className={inputBase}
                      style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                      onFocus={focusBorder}
                      onBlur={blurBorder}
                    />
                    <select
                      name="reason"
                      value={form.reason}
                      onChange={handleChange}
                      disabled={loading}
                      className={`${inputBase} cursor-pointer`}
                      style={{
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: form.reason ? 'white' : 'rgba(255,255,255,0.20)',
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='rgba(151,204,246,0.4)'/%3E%3C/svg%3E")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 1.25rem center',
                        paddingRight: '2.5rem',
                      }}
                      onFocus={focusBorder}
                      onBlur={blurBorder}
                    >
                      <option value="" disabled style={{ background: '#0a0a0a' }}>
                        Reason for Reaching Out
                      </option>
                      {reasons.map((r) => (
                        <option key={r} value={r} style={{ background: '#0a0a0a' }}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <textarea
                    name="message"
                    placeholder="Tell me where your business is now and where you want it to go. Be specific — the more context you share, the more useful our first conversation will be. *"
                    required
                    rows={7}
                    value={form.message}
                    onChange={handleChange}
                    disabled={loading}
                    className={`${inputBase} resize-none`}
                    style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                    onFocus={focusBorder}
                    onBlur={blurBorder}
                  />

                  {/* Error message */}
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="font-sans text-sm leading-relaxed"
                      style={{ color: 'rgba(255,120,120,0.85)', fontSize: '0.82rem' }}
                    >
                      {error}
                    </motion.p>
                  )}

                  {/* Submit */}
                  <div className="pt-1">
                    <motion.button
                      type="submit"
                      disabled={loading}
                      className="group w-full font-sans font-medium tracking-widest uppercase flex items-center justify-center gap-4"
                      style={{
                        fontSize: '0.7rem',
                        padding: '1.2rem 2.5rem',
                        background: loading ? 'rgba(151,204,246,0.6)' : '#97CCF6',
                        color: '#0a0a0a',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        transition: 'background 0.3s',
                      }}
                      whileHover={loading ? {} : { scale: 1.012 }}
                      whileTap={loading ? {} : { scale: 0.988 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      {loading ? (
                        <>
                          <span
                            className="block w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin"
                          />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send Message
                          <span
                            className="block h-px group-hover:w-8 transition-all duration-400"
                            style={{ width: '0.875rem', background: '#0a0a0a' }}
                          />
                        </>
                      )}
                    </motion.button>
                  </div>

                  <p
                    className="font-sans text-center"
                    style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.16)' }}
                  >
                    No spam. No automation. A real reply within 48 hours.
                  </p>
                </form>
              )}
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
