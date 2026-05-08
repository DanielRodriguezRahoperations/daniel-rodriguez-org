import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

/*
  Mobile vs desktop split:
  ─────────────────────────────────────────────────────────────────────────
  Mobile  (< 768px):  x stays at 0, 160vh spacer
    On mobile the portrait is visible immediately (VideoBackground starts at
    25% of the video timeline). The name overlays the portrait centered from
    the first frame — no slide-in intro. Scroll still drives the marquee
    and tagline animations.

  Desktop (≥ 768px):  ±220px x-offset, 220vh spacer
    Full cinematic offset — text slides in from the edges as you scroll.
  ─────────────────────────────────────────────────────────────────────────
*/
const isMobile  = () => typeof window !== 'undefined' && window.innerWidth < 768
const getXMax   = () => (isMobile() ? 0 : 220)
const getSpacer = () => (isMobile() ? '160vh' : '220vh')

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const progress   = useMotionValue(0)

  /*
    x values:
    - Mobile: always 0. Name overlays portrait centered from first load.
    - Desktop: initialized to ±220px and driven by scroll toward 0.
    Using useMotionValue (not useTransform) so the value can be
    updated responsively on resize / orientation change.
  */
  const danielX    = useMotionValue(isMobile() ? 0 : -220)
  const rodriguezX = useMotionValue(isMobile() ? 0 :  220)

  /*
    Remaining animations driven by scroll progress.
    textOpacity starts at 0.85 so the hero is readable on first view
    without any scrolling required.
  */
  const textOpacity    = useTransform(progress, [0, 0.15], [0.85, 1])
  const marqueeX       = useTransform(progress, [0.30, 1],  ['0%', '-35%'])
  const taglineOpacity = useTransform(progress, [0.38, 0.62], [0, 1])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const update = () => {
      const scrolled   = Math.max(0, window.scrollY - section.offsetTop)
      const scrollable = Math.max(1, section.offsetHeight - window.innerHeight)
      const p          = Math.min(1, scrolled / scrollable)

      progress.set(p)

      /*
        Desktop only: slide name in from ±220px to 0 over the first 45%
        of hero scroll progress.
        Mobile: name stays at x=0 (centered over portrait) from initial load.
        getXMax() returns 0 on mobile so this branch is a no-op there,
        but the explicit isMobile() guard makes the intent clear.
      */
      if (!isMobile()) {
        const xMax = getXMax()
        const xT   = Math.min(1, p / 0.45)
        danielX.set(-xMax * (1 - xT))
        rodriguezX.set(xMax * (1 - xT))
      }
    }

    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    window.addEventListener('orientationchange', update)

    /*
      Run immediately on mount to initialize state before any scroll event.
      Run again inside rAF to catch layout shifts after initial paint
      (fonts, video placeholder, etc.).
    */
    update()
    const raf = requestAnimationFrame(update)

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
      cancelAnimationFrame(raf)
    }
  }, [progress, danielX, rodriguezX])

  return (
    /* Responsive spacer: 160vh mobile / 220vh desktop */
    <div ref={sectionRef} style={{ height: getSpacer() }}>

      {/*
        Sticky viewport: stable 100vh — do NOT use dvh here.
        dvh changes dynamically as mobile browser chrome shows/hides,
        causing layout reflows mid-scroll that lock the page on iOS Safari.
      */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

        {/* Gradient — bottom fade for text legibility over the portrait */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background:
            'linear-gradient(to top, rgba(10,10,10,0.75) 0%, transparent 50%),' +
            'linear-gradient(to bottom, rgba(10,10,10,0.25) 0%, transparent 25%)',
        }} />

        {/* Daniel + Rodriguez name */}
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
