import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface HeroProps {
  onProgress: (p: number) => void
}

export default function Hero({ onProgress }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)
  const [progress, setProgress] = useState(0)
  const [videoReady, setVideoReady] = useState(false)
  const [exited, setExited] = useState(false)
  const accumulatedDelta = useRef(0)

  // Text hidden at 0 (clean open), visible once scrolling starts, hides mid-video, returns at end
  const showText = (progress > 0.03 && progress < 0.25) || progress > 0.78

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.pause()
    video.currentTime = 0

    const onReady = () => {
      setVideoReady(true)
      video.pause()
      video.currentTime = 0
    }
    video.readyState >= 1 ? onReady() : video.addEventListener('loadedmetadata', onReady, { once: true })
  }, [])

  useEffect(() => {
    const video = videoRef.current
    const hero = heroRef.current
    if (!video || !hero) return

    const onWheel = (e: WheelEvent) => {
      if (exited) return
      e.preventDefault()

      if (!video.duration) return

      // Accumulate scroll for smooth sensitivity
      accumulatedDelta.current += e.deltaY

      const sensitivity = video.duration / 3000 // full video over ~3000px of scroll delta
      const newTime = Math.max(0, Math.min(video.duration, video.currentTime + e.deltaY * sensitivity))
      video.currentTime = newTime

      const p = newTime / video.duration
      progressRef.current = p
      setProgress(p)
      onProgress(p)
    }

    // Capture on the hero element, not window — so page scrolls normally elsewhere
    hero.addEventListener('wheel', onWheel, { passive: false })
    return () => hero.removeEventListener('wheel', onWheel)
  }, [exited])

  const handleExit = () => {
    setExited(true)
    // Smooth scroll to About
    const about = document.getElementById('about')
    if (about) {
      about.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#0a0a0a]"
      style={{ cursor: 'ns-resize' }}
    >
      {/* ── Video ── */}
      <motion.video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-contain"
        src="/daniel.mp4"
        muted
        playsInline
        preload="auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: videoReady ? 1 : 0 }}
        transition={{ duration: 0.8 }}
      />

      {/* Edge vignette — seamless blend into dark background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-transparent to-[#0a0a0a]/80" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0a0a0a]/60 to-transparent" />
      </div>

      {/* ── Text — each line slides in/out from opposite sides ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 pointer-events-none overflow-hidden">

        {/* Label — fades down from top */}
        <motion.p
          className="font-sans text-xs tracking-[0.4em] uppercase text-gold/70 mb-8"
          animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : -24 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Personal Brand Consultant
        </motion.p>

        <h1 className="font-display leading-[0.9] mb-8 text-center w-full">
          {/* "Daniel" — slides in from left, exits left */}
          <motion.span
            className="block text-[clamp(5rem,15vw,14rem)] font-black text-white tracking-tight drop-shadow-2xl"
            animate={{
              x: showText ? 0 : '-110vw',
              opacity: showText ? 1 : 0,
            }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: showText ? 0 : 0 }}
          >
            Daniel
          </motion.span>

          {/* "Rodriguez" — slides in from right, exits right */}
          <motion.span
            className="block text-[clamp(4.5rem,14vw,13rem)] font-black italic text-gold tracking-tight -mt-4 drop-shadow-2xl"
            animate={{
              x: showText ? 0 : '110vw',
              opacity: showText ? 1 : 0,
            }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: showText ? 0.08 : 0 }}
          >
            Rodriguez
          </motion.span>
        </h1>

        {/* Tagline — fades up from bottom */}
        <motion.p
          className="font-cormorant text-[clamp(1.1rem,2.5vw,1.6rem)] italic text-white/60 tracking-wide max-w-xl text-center"
          animate={{ opacity: showText ? 1 : 0, y: showText ? 0 : 24 }}
          transition={{ duration: 0.7, delay: showText ? 0.12 : 0, ease: [0.16, 1, 0.3, 1] }}
        >
          Transform Your Narrative. Build Your Legacy.
        </motion.p>

      </div>

      {/* ── Video progress bar ── */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5 z-20 pointer-events-none">
        <motion.div
          className="h-full bg-gold/60"
          style={{ width: `${progress * 100}%` }}
          transition={{ duration: 0 }}
        />
      </div>

      {/* ── Scroll hint (before user starts scrolling) ── */}
      <AnimatePresence>
        {progress < 0.02 && videoReady && (
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/30">
              Scroll to explore
            </span>
            <motion.div
              className="w-px h-10 bg-gradient-to-b from-gold/50 to-transparent"
              animate={{ scaleY: [1, 0.4, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Discover More — appears after exploring the video ── */}
      <AnimatePresence>
        {progress > 0.85 && (
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={handleExit}
              className="group font-sans text-sm font-medium tracking-widest uppercase px-10 py-4 bg-gold text-[#0a0a0a] hover:bg-gold-light transition-all duration-300 flex items-center gap-3"
            >
              Discover More
              <span className="w-4 h-px bg-[#0a0a0a] group-hover:w-8 transition-all duration-300" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
