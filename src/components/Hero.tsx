import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const progress = useMotionValue(0)

  const danielX    = useTransform(progress, [0, 0.3], [-600, 0])
  const rodriguezX = useTransform(progress, [0, 0.3], [600,  0])
  const textOpacity = useTransform(progress, [0, 0.2], [0, 1])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const onScroll = () => {
      const scrolled  = Math.max(0, window.scrollY - section.offsetTop)
      const scrollable = section.offsetHeight - window.innerHeight
      const p = Math.min(1, scrolled / Math.max(1, scrollable))
      progress.set(p)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [progress])

  return (
    <div ref={sectionRef} style={{ height: '400vh' }}>

      {/* Sticky viewport — transparent so fixed video shows through */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

        {/* Gradient for text readability */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to top, rgba(10,10,10,0.65) 0%, transparent 40%), linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, transparent 30%)',
          pointerEvents: 'none',
        }} />

        {/* Hero text — Daniel from left, Rodriguez from right */}
        <motion.div
          style={{
            position: 'absolute', inset: 0, zIndex: 2,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'flex-end',
            paddingBottom: '7rem', paddingLeft: '1.5rem', paddingRight: '1.5rem',
            opacity: textOpacity,
          }}
        >
          <div style={{ textAlign: 'center', lineHeight: 0.9, marginBottom: '1.2rem' }}>
            <motion.div style={{ x: danielX }}>
              <span style={{
                display: 'block',
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontSize: 'clamp(4rem, 12vw, 10rem)',
                color: '#ffffff',
                letterSpacing: '-0.02em',
              }}>
                Daniel
              </span>
            </motion.div>
            <motion.div style={{ x: rodriguezX }}>
              <span style={{
                display: 'block',
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontStyle: 'italic',
                fontSize: 'clamp(3.5rem, 11vw, 9rem)',
                color: '#ffffff',
                letterSpacing: '-0.02em',
                marginTop: '-0.08em',
              }}>
                Rodriguez
              </span>
            </motion.div>
          </div>

          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1rem, 2vw, 1.35rem)',
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.05em',
            textAlign: 'center',
          }}>
            Transform Your Narrative. Build Your Legacy.
          </p>
        </motion.div>

      </div>
    </div>
  )
}
