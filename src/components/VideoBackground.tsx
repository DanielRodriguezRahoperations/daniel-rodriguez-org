import { useEffect, useRef } from 'react'

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.pause()
    video.currentTime = 0

    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const p = Math.min(1, window.scrollY / Math.max(1, scrollable))
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
