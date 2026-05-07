import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{ background: 'rgba(10,10,10,0.90)', borderTop: '1px solid rgba(255,255,255,0.05)' }}
      className="py-12 px-6 lg:px-12"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <span className="font-display text-lg font-semibold text-white/50">
            Daniel Rodriguez
          </span>
          <span className="hidden md:block w-px h-4 bg-white/10" />
          <span className="font-sans text-xs text-white/20">
            &copy; {currentYear} Daniel Rodriguez. All rights reserved.
          </span>
        </div>

        <div className="flex items-center gap-8">
          <a href="https://www.linkedin.com/in/danielrodriguez-scottsdale/" target="_blank" rel="noopener noreferrer"
            className="font-sans text-xs tracking-widest uppercase text-white/20 hover:text-gold transition-colors duration-300">
            LinkedIn
          </a>
          <a href="https://www.instagram.com/drod6211/" target="_blank" rel="noopener noreferrer"
            className="font-sans text-xs tracking-widest uppercase text-white/20 hover:text-gold transition-colors duration-300">
            Instagram
          </a>
        </div>
      </div>
    </motion.footer>
  )
}
