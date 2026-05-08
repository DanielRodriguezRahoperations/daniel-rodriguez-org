import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Press', href: '/press' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [opacity, setOpacity] = useState(0)
  const location = useLocation()

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => {
      // Fade in between 80px and 300px of scroll
      const p = Math.min(1, Math.max(0, (window.scrollY - 80) / 220))
      setOpacity(p)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    // Run once on mount for non-home pages
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className="fixed top-0 left-0 right-0 border-b transition-all duration-300"
      style={{
        zIndex: 50,
        background: `rgba(10,10,10,${opacity * 0.9})`,
        backdropFilter: opacity > 0.1 ? `blur(20px)` : 'none',
        borderColor: `rgba(255,255,255,${opacity * 0.06})`,
        opacity: opacity < 0.05 ? 0 : 1,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <Link
            to="/"
            className="font-display text-xl font-semibold tracking-wide text-white hover:text-gold transition-colors duration-300"
          >
            Daniel Rodriguez
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="font-sans text-sm font-medium text-white hover:text-gold transition-colors duration-300 tracking-widest uppercase"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="font-sans text-sm font-medium tracking-widest uppercase px-6 py-2.5 border border-gold text-gold hover:bg-gold hover:text-[#0a0a0a] transition-all duration-300"
            >
              Work With Me
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
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
            <Link
              key={link.label}
              to={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-sans text-sm font-medium text-white hover:text-gold transition-colors duration-300 tracking-widest uppercase"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            className="font-sans text-sm font-medium tracking-widest uppercase px-6 py-3 border border-gold text-gold text-center hover:bg-gold hover:text-[#0a0a0a] transition-all duration-300"
          >
            Work With Me
          </Link>
        </div>
      </motion.div>
    </nav>
  )
}
