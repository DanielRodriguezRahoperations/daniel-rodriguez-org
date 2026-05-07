import { useEffect, useRef } from 'react'

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.pause()
    video.currentTime = 0

    let targetTime = 0
    let rafId: number | null = null
    let stopTimer: ReturnType<typeof setTimeout> | null = null

    // Continuously sync video toward targetTime using native play (smooth)
    // instead of frame-seeking (choppy).
    const tick = () => {
      rafId = null
      if (!video.duration) return
      const diff = targetTime - video.currentTime

      if (diff > 0.05) {
        // Ahead of current position: play forward at speed proportional to gap
        const rate = Math.min(8, Math.max(1, diff * 6))
        if (video.playbackRate !== rate) video.playbackRate = rate
        if (video.paused) video.play().catch(() => {})
        rafId = requestAnimationFrame(tick)
      } else if (diff < -0.05) {
        // Behind current position: must seek (no reliable reverse playback)
        video.pause()
        video.currentTime = targetTime
      } else {
        // Close enough — park
        video.pause()
      }
    }

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const p = Math.min(1, window.scrollY / Math.max(1, scrollable))
      targetTime = p * (video.duration || 0)

      // Stop playing shortly after scroll stops
      if (stopTimer) clearTimeout(stopTimer)
      stopTimer = setTimeout(() => {
        video.pause()
        if (rafId) { cancelAnimationFrame(rafId); rafId = null }
      }, 300)

      // Kick off the sync loop if not already running
      if (!rafId) rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (stopTimer) clearTimeout(stopTimer)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <video
      ref={videoRef}
      src="/hero.mp4"
      muted
      playsInline
      preload="auto"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        background: '#0a0a0a',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  )
}
