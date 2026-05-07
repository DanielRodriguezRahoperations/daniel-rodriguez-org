import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const progress = useMotionValue(0)
  const rafRef = useRef<number | null>(null)

  // Daniel slides from left → center, Rodriguez from right → center
  const danielX   = useTransform(progress, [0, 0.3], [-600, 0])
  const rodriguezX = useTransform(progress, [0, 0.3], [600,  0])
  const textOpacity = useTransform(progress, [0, 0.2], [0, 1])

  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    // Never autoplay — scroll controls everything
    video.pause()
    video.currentTime = 0

    const onScroll = () => {
      const scrolled = Math.max(0, window.scrollY - section.offsetTop)
      const scrollable = section.offsetHeight - window.innerHeight
      const p = Math.min(1, scrolled / Math.max(1, scrollable))
      progress.set(p)

      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        if (video.duration) video.currentTime = p * video.duration
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [progress])

  return (
    // Tall section gives scroll room to drive the video and text
    <div ref={sectionRef} style={{ height: '400vh' }}>

      {/* Sticky viewport — video stays fullscreen while you scroll */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: '#0a0a0a' }}>

        {/* Video — fullscreen background, no autoplay */}
        <video
          ref={videoRef}
          src="/hero.mp4"
          muted
          playsInline
          preload="auto"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'contain',
            zIndex: 0,
          }}
        />

        {/* Overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to top, #0a0a0a 0%, transparent 40%), linear-gradient(to bottom, rgba(10,10,10,0.35) 0%, transparent 30%)',
        }} />

        {/* Hero text — slides in from left/right as you scroll */}
        <motion.div
          style={{
            position: 'absolute', inset: 0, zIndex: 2,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'flex-end',
            paddingBottom: '7rem', paddingLeft: '1.5rem', paddingRight: '1.5rem',
            opacity: textOpacity,
          }}
        >
          <div style={{ textAlign: 'center', lineHeight: 0.9, marginBottom: '1.2rem', overflow: 'hidden' }}>
            {/* Daniel — from left */}
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

            {/* Rodriguez — from right */}
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

          {/* Tagline */}
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
