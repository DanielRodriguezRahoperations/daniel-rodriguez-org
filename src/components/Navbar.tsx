'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Press', href: '/press' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

interface NavbarProps {
  heroProgress?: number
}

export default function Navbar({ heroProgress = 0 }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!navRef.current) return
    const p = Math.min(1, heroProgress / 0.25)
    navRef.current.style.opacity   = String(p)
    navRef.current.style.transform = `translateY(${lerp(-40, 0, p)}px)`
  }, [heroProgress])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 bg-[#0a0a0a]/70 backdrop-blur-xl border-b border-white/5"
      style={{ zIndex: 3, opacity: 0, transform: 'translateY(-40px)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <Link
            href="/"
            className="font-display text-xl font-semibold tracking-wide text-white hover:text-gold transition-colors duration-300"
          >
            Daniel Rodriguez
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-sans text-sm font-medium text-white/60 hover:text-white transition-colors duration-300 tracking-widest uppercase"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
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
            <span
              className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
            />
            <span
              className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
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
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-sans text-sm font-medium text-white/60 hover:text-white transition-colors duration-300 tracking-widest uppercase"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
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
