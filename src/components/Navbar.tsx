import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Press', href: '#press' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#"
            className="font-display text-xl font-semibold tracking-wide text-white hover:text-gold transition-colors duration-300"
          >
            Daniel Rodriguez
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-sans text-sm font-medium text-white/60 hover:text-white transition-colors duration-300 tracking-widest uppercase"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="font-sans text-sm font-medium tracking-widest uppercase px-6 py-2.5 border border-gold text-gold hover:bg-gold hover:text-[#0a0a0a] transition-all duration-300"
            >
              Work With Me
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-px bg-white transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-px bg-white transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-px bg-white transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: menuOpen ? 'auto' : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="md:hidden overflow-hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/5"
      >
        <div className="flex flex-col gap-6 px-6 py-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-sans text-sm font-medium text-white/60 hover:text-white transition-colors duration-300 tracking-widest uppercase"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="font-sans text-sm font-medium tracking-widest uppercase px-6 py-3 border border-gold text-gold text-center hover:bg-gold hover:text-[#0a0a0a] transition-all duration-300"
          >
            Work With Me
          </a>
        </div>
      </motion.div>
    </motion.nav>
  )
}
