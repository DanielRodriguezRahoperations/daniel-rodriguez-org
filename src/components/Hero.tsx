import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const targetTimeRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  const { scrollY } = useScroll()

  // Text slides up from below — hidden at 0, fully in by 450px scroll
  const textY = useTransform(scrollY, [0, 450], [380, 0])
  const textOpacity = useTransform(scrollY, [0, 300], [0, 1])

  // Scrub video with scroll — no autoplay ever
  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    video.pause()
    video.currentTime = 0
    video.preload = 'auto'

    const onScroll = () => {
      if (!video.duration) return

      const sectionTop = section.offsetTop
      const sectionScrollable = section.offsetHeight - window.innerHeight
      const scrolled = Math.max(0, window.scrollY - sectionTop)
      const progress = Math.min(1, scrolled / sectionScrollable)

      targetTimeRef.current = progress * video.duration

      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        video.currentTime = targetTimeRef.current
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    // Tall section — scroll range drives the video
    <div ref={sectionRef} style={{ height: '600vh' }}>

      {/* Sticky viewport — stays locked on screen while scrolling through section */}
      <div
        className="sticky top-0 overflow-hidden"
        style={{ height: '100vh' }}
      >
        {/* Video — z-index 0, covers full viewport, no autoplay */}
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          src="/hero.mp4"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: 0,
          }}
        />

        {/* Overlay — z-index 1 */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, #0a0a0a 0%, transparent 40%), linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, transparent 30%)',
            zIndex: 1,
          }}
        />

        {/* Hero text — z-index 2, slides up from below on scroll */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingBottom: '7rem',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
            zIndex: 2,
            y: textY,
            opacity: textOpacity,
          }}
        >
          {/* 3D floating headline */}
          <div style={{ perspective: '1200px', textAlign: 'center', marginBottom: '1.25rem' }}>
            <motion.h1
              animate={{ rotateX: [0, 1, 0, -1, 0], rotateY: [0, 2, 0, -2, 0] }}
              transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformStyle: 'preserve-3d', lineHeight: 0.88, fontFamily: "'Playfair Display', serif" }}
            >
              <span style={{ display: 'block', fontSize: 'clamp(4.5rem, 13vw, 11rem)', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.02em' }}>
                Daniel
              </span>
              <span style={{ display: 'block', fontSize: 'clamp(4rem, 12vw, 10rem)', fontWeight: 900, fontStyle: 'italic', color: '#ffffff', letterSpacing: '-0.02em', marginTop: '-0.15em' }}>
                Rodriguez
              </span>
            </motion.h1>
          </div>

          {/* Tagline */}
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1rem, 2vw, 1.4rem)', fontStyle: 'italic', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.05em', textAlign: 'center' }}>
            Transform Your Narrative. Build Your Legacy.
          </p>
        </motion.div>

      </div>
    </div>
  )
}
