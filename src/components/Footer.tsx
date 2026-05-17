'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: 'rgba(10,10,10,0.95)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
      className="px-6 lg:px-12"
    >
      {/* Main row */}
      <div className="max-w-7xl mx-auto py-10 flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
          <span
            className="font-display text-lg font-semibold"
            style={{ color: 'rgba(255,255,255,0.42)' }}
          >
            Daniel Rodriguez
          </span>
          <span
            className="hidden md:block w-px h-4"
            style={{ background: 'rgba(255,255,255,0.08)' }}
          />
          <span className="font-sans text-xs" style={{ color: 'rgba(255,255,255,0.18)' }}>
            &copy; {currentYear} Daniel Rodriguez. All rights reserved.
          </span>
        </div>

        <div className="flex items-center gap-8">
          <a
            href="https://www.linkedin.com/in/danielrodriguez-scottsdale/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-xs tracking-widest uppercase transition-colors duration-300 hover:text-gold"
            style={{ color: 'rgba(255,255,255,0.18)' }}
          >
            LinkedIn
          </a>
          <a
            href="https://www.instagram.com/drod6211/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-xs tracking-widest uppercase transition-colors duration-300 hover:text-gold"
            style={{ color: 'rgba(255,255,255,0.18)' }}
          >
            Instagram
          </a>
        </div>
      </div>

      {/* Attribution row — RAH Operations backlink */}
      <div
        className="max-w-7xl mx-auto pb-8 flex justify-center"
        style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '1.25rem' }}
      >
        <a
          href="https://www.rahoperations.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group font-sans text-xs tracking-widest uppercase transition-colors duration-300"
          style={{ color: 'rgba(255,255,255,0.12)', letterSpacing: '0.12em' }}
        >
          Website Design &amp; SEO by{' '}
          <span
            className="group-hover:text-gold transition-colors duration-300"
            style={{ color: 'rgba(151,204,246,0.32)' }}
          >
            RAH Operations
          </span>
        </a>
      </div>
    </motion.footer>
  )
}
