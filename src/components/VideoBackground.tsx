import { useEffect, useRef } from 'react'

const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768

// On mobile, skip the black intro phase.
// MOBILE_SKIP = 0.25 means scrollY=0 maps to 25% of the video timeline —
// equivalent to where the portrait becomes visible after ~10 normal swipes.
// As the user scrolls, the range [0,1] maps to [0.25, 1.0] so the portrait
// stays visible and the video advances naturally through the rest of the timeline.
const MOBILE_SKIP = 0.25

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.pause()

    let targetTime = 0
    let rafId: number | null = null
    let stopTimer: ReturnType<typeof setTimeout> | null = null

    // Desktop: raw scroll progress drives full video timeline.
    // Mobile: compress into [MOBILE_SKIP, 1.0] so portrait is at scrollY=0.
    const computeP = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const rawP = Math.min(1, window.scrollY / Math.max(1, scrollable))
      return isMobile() ? MOBILE_SKIP + rawP * (1 - MOBILE_SKIP) : rawP
    }

    // Seek to the correct initial frame as soon as duration is known.
    // Called on loadedmetadata, loadeddata, and immediately in case the
    // video is already cached in the browser.
    const initPosition = () => {
      if (!video.duration) return
      targetTime = computeP() * video.duration
      video.currentTime = targetTime
      // Park here until a scroll event drives the animation.
      // If tick() is already running it will resume play; the brief
      // pause is invisible.
      video.pause()
    }

    // Smooth scrubbing: play forward at variable speed rather than hard-seeking
    // on every frame, which produces choppy output.
    const tick = () => {
      rafId = null
      if (!video.duration) return
      const diff = targetTime - video.currentTime

      if (diff > 0.05) {
        const rate = Math.min(8, Math.max(1, diff * 6))
        if (video.playbackRate !== rate) video.playbackRate = rate
        if (video.paused) video.play().catch(() => {})
        rafId = requestAnimationFrame(tick)
      } else if (diff < -0.05) {
        video.pause()
        video.currentTime = targetTime
      } else {
        video.pause()
      }
    }

    const onScroll = () => {
      targetTime = computeP() * (video.duration || 0)

      if (stopTimer) clearTimeout(stopTimer)
      stopTimer = setTimeout(() => {
        video.pause()
        if (rafId) { cancelAnimationFrame(rafId); rafId = null }
      }, 300)

      if (!rafId) rafId = requestAnimationFrame(tick)
    }

    video.addEventListener('loadedmetadata', initPosition)
    video.addEventListener('loadeddata', initPosition)
    window.addEventListener('scroll', onScroll, { passive: true })

    // Attempt immediate seek for cached / fast-loading video
    initPosition()
    requestAnimationFrame(initPosition)

    return () => {
      video.removeEventListener('loadedmetadata', initPosition)
      video.removeEventListener('loadeddata', initPosition)
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
      autoPlay
      loop
      preload="auto"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        // cover: fills the viewport on all orientations with no black bars.
        // contain caused a landscape video to render as a tiny strip with
        // massive black areas above/below in portrait mobile viewports.
        objectFit: 'cover',
        background: '#0a0a0a',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  )
}
