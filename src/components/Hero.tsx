import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const progress = useMotionValue(0)

  /*
    Scroll timeline — 220vh spacer gives 120vh of actual scroll travel.
    Text starts at 65% opacity / ±220px so content is visible immediately
    on mobile without any scrolling. Animation ranges compressed to match.
  */
  const danielX        = useTransform(progress, [0, 0.45], [-220, 0])
  const rodriguezX     = useTransform(progress, [0, 0.45], [220, 0])
  const textOpacity    = useTransform(progress, [0, 0.12], [0.65, 1])
  const marqueeX       = useTransform(progress, [0.30, 1], ['0%', '-35%'])
  const taglineOpacity = useTransform(progress, [0.38, 0.62], [0, 1])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const onScroll = () => {
      const scrolled   = Math.max(0, window.scrollY - section.offsetTop)
      const scrollable = section.offsetHeight - window.innerHeight
      const p = Math.min(1, scrolled / Math.max(1, scrollable))
      progress.set(p)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [progress])

  return (
    <div ref={sectionRef} style={{ height: '220vh' }}>

      {/*
        Sticky viewport uses height: 100vh (stable unit).
        dvh was removed — on iOS Safari, dvh changes dynamically as the
        browser chrome shows/hides during scroll, causing the sticky element
        to reflow mid-scroll and lock the page in a feedback loop.
        100vh is stable and safe for a sticky scroll container.
      */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 45%), linear-gradient(to bottom, rgba(10,10,10,0.25) 0%, transparent 25%)',
        }} />

        {/* Daniel + Rodriguez — starts at 65% opacity, ±220px offset */}
        <motion.div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'flex-end',
          paddingBottom: '6rem', paddingLeft: '1.5rem', paddingRight: '1.5rem',
          opacity: textOpacity,
        }}>
          <div style={{ textAlign: 'center', lineHeight: 0.88, marginBottom: '2rem' }}>
            <motion.div style={{ x: danielX }}>
              <span style={{
                display: 'block',
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontSize: 'clamp(4rem, 12vw, 10rem)',
                color: '#ffffff',
                letterSpacing: '-0.02em',
                textShadow: '0 4px 40px rgba(0,0,0,0.5)',
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
                marginTop: '-0.06em',
                textShadow: '0 4px 40px rgba(0,0,0,0.5)',
              }}>
                Rodriguez
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* Marquee — slides left as you scroll */}
        <motion.div style={{
          position: 'absolute', bottom: '2rem', left: 0, zIndex: 2,
          x: marqueeX,
          opacity: taglineOpacity,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1rem, 2.5vw, 1.6rem)',
            fontStyle: 'italic',
            color: 'rgba(151,204,246,0.65)',
            letterSpacing: '0.08em',
          }}>
            Transform Your Narrative&nbsp;&nbsp;•&nbsp;&nbsp;Build Your Legacy&nbsp;&nbsp;•&nbsp;&nbsp;Scottsdale, Arizona&nbsp;&nbsp;•&nbsp;&nbsp;Founder · RAH Operations&nbsp;&nbsp;•&nbsp;&nbsp;Transform Your Narrative&nbsp;&nbsp;•&nbsp;&nbsp;Build Your Legacy&nbsp;&nbsp;•&nbsp;&nbsp;Scottsdale, Arizona&nbsp;&nbsp;•&nbsp;&nbsp;
          </span>
        </motion.div>

      </div>
    </div>
  )
}
