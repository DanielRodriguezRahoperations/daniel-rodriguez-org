'use client'

import { useEffect, useRef } from 'react'

const TOTAL_FRAMES = 60
const MOBILE_BP = 768

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const invlerp = (a: number, b: number, v: number) => clamp01(b === a ? 0 : (v - a) / (b - a))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number,
  anchorY: number
) {
  const ir = img.naturalWidth / img.naturalHeight
  const cr = cw / ch
  let sw: number, sh: number, sx: number, sy: number
  if (ir > cr) {
    sh = ch; sw = sh * ir
    sy = 0; sx = (cw - sw) * 0.5
  } else {
    sw = cw; sh = sw / ir
    sx = 0; sy = (ch - sh) * anchorY
  }
  ctx.drawImage(img, sx, sy, sw, sh)
}

interface HeroProps {
  onProgress?: (p: number) => void
}

export default function Hero({ onProgress }: HeroProps) {
  const stickyRef    = useRef<HTMLDivElement>(null)
  const spacerRef    = useRef<HTMLDivElement>(null)
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const nameGroupRef = useRef<HTMLDivElement>(null)
  const danielRef    = useRef<HTMLDivElement>(null)
  const rodriguezRef = useRef<HTMLDivElement>(null)
  const marqueeRef   = useRef<HTMLDivElement>(null)
  const rafPending   = useRef(false)
  const lastFrame    = useRef(-1)
  const frames       = useRef<HTMLImageElement[]>([])
  const framesReady  = useRef(false)

  useEffect(() => {
    const sticky    = stickyRef.current
    const spacer    = spacerRef.current
    const canvas    = canvasRef.current
    const nameGroup = nameGroupRef.current
    const danielEl  = danielRef.current
    const rodriguezEl = rodriguezRef.current
    const marqueeEl = marqueeRef.current
    if (!sticky || !spacer || !canvas || !nameGroup || !danielEl || !rodriguezEl || !marqueeEl) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // ── Sticky height (dvh via JS) ──────────────────────────────────
    const setH = () => {
      sticky.style.height = window.innerHeight + 'px'
      canvas.width  = sticky.offsetWidth
      canvas.height = sticky.offsetHeight
      // Redraw current frame at new size
      const idx = lastFrame.current >= 0 ? lastFrame.current : 0
      if (frames.current[idx]?.complete && frames.current[idx].naturalWidth > 0) {
        const mob = window.innerWidth < MOBILE_BP
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        drawCover(ctx, frames.current[idx], canvas.width, canvas.height, mob ? 0.5 : 0.1)
      }
    }

    // ── Draw a specific frame ───────────────────────────────────────
    const drawFrame = (idx: number) => {
      if (!canvas.width || !canvas.height) return
      const img = frames.current[idx]
      if (!img?.complete || img.naturalWidth === 0) return
      const mob = window.innerWidth < MOBILE_BP
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawCover(ctx, img, canvas.width, canvas.height, mob ? 0.5 : 0.1)
    }

    // ── Tick ────────────────────────────────────────────────────────
    const tick = () => {
      rafPending.current = false
      const p = clamp01(window.scrollY / Math.max(1, spacer.offsetHeight))
      const frameIdx = Math.min(TOTAL_FRAMES - 1, Math.floor(p * TOTAL_FRAMES))

      // Only redraw canvas when frame changes
      if (frameIdx !== lastFrame.current) {
        lastFrame.current = frameIdx
        drawFrame(frameIdx)
      }

      // Notify parent for navbar
      onProgress?.(p)

      // Name group: fade in 0→0.25, hold, fade out 0.85→1.0
      const groupIn  = invlerp(0, 0.25, p)
      const groupOut = 1 - invlerp(0.85, 1.0, p)
      const groupOp  = Math.min(groupIn, groupOut)
      nameGroup.style.opacity = String(groupOp)

      // Daniel slides from left, Rodriguez from right
      const nameP = invlerp(0, 0.25, p)
      danielEl.style.transform    = `translateX(${lerp(-120, 0, nameP)}px)`
      danielEl.style.opacity      = String(nameP)
      rodriguezEl.style.transform = `translateX(${lerp(120, 0, nameP)}px)`
      rodriguezEl.style.opacity   = String(nameP)

      // Marquee slides and fades in
      const mqP = invlerp(0, 0.4, p)
      marqueeEl.style.transform = `translateX(${lerp(0, -35, mqP)}%)`
      marqueeEl.style.opacity   = String(mqP)
    }

    // ── Scroll + resize listeners ───────────────────────────────────
    const onScroll = () => {
      if (!rafPending.current) {
        rafPending.current = true
        requestAnimationFrame(tick)
      }
    }
    const onResize = () => {
      setH()
      requestAnimationFrame(tick)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    window.addEventListener('orientationchange', onResize)

    // ── Preload all frames ──────────────────────────────────────────
    setH() // set canvas size before any drawing

    let loadedCount = 0
    frames.current = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
      const img = new Image()
      const num = String(i + 1).padStart(4, '0')
      img.src = `/hero-frames/frame_${num}.jpg`
      img.onload = () => {
        loadedCount++
        // Draw frame 0 immediately when it loads — no black flash
        if (i === 0) {
          if (!canvas.width || !canvas.height) setH()
          drawFrame(0)
          lastFrame.current = 0
        }
        if (loadedCount === TOTAL_FRAMES) {
          framesReady.current = true
        }
      }
      return img
    })

    // Init tick
    requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onResize)
    }
  }, [onProgress])

  const isMob = typeof window !== 'undefined' && window.innerWidth < MOBILE_BP

  return (
    <div>
      {/* Sticky viewport */}
      <div
        ref={stickyRef}
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* Poster fallback — sits behind canvas, hides before frame 0 loads */}
        <img
          src="/hero-poster.jpg"
          alt=""
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: isMob ? 'center center' : 'center 10%',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />

        {/* Canvas — image sequence drawn here */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />

        {/* Gradient overlay */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            pointerEvents: 'none',
            background:
              'linear-gradient(to top, rgba(10,10,10,0.80) 0%, transparent 52%),' +
              'linear-gradient(to bottom, rgba(10,10,10,0.30) 0%, transparent 28%)',
          }}
        />

        {/* Name group */}
        <div
          ref={nameGroupRef}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingBottom: '6rem',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
            pointerEvents: 'none',
            opacity: 0,
          }}
        >
          <div style={{ textAlign: 'center', lineHeight: 0.88, marginBottom: '2rem' }}>
            <div ref={danielRef} style={{ opacity: 0, transform: 'translateX(-120px)' }}>
              <span
                style={{
                  display: 'block',
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 900,
                  fontSize: 'clamp(4rem, 12vw, 10rem)',
                  color: '#ffffff',
                  letterSpacing: '-0.02em',
                  textShadow: '0 4px 40px rgba(0,0,0,0.55)',
                }}
              >
                Daniel
              </span>
            </div>
            <div ref={rodriguezRef} style={{ opacity: 0, transform: 'translateX(120px)' }}>
              <span
                style={{
                  display: 'block',
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 900,
                  fontStyle: 'italic',
                  fontSize: 'clamp(3.5rem, 11vw, 9rem)',
                  color: '#ffffff',
                  letterSpacing: '-0.02em',
                  marginTop: '-0.06em',
                  textShadow: '0 4px 40px rgba(0,0,0,0.55)',
                }}
              >
                Rodriguez
              </span>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div
          ref={marqueeRef}
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: 0,
            zIndex: 3,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            opacity: 0,
            transform: 'translateX(0%)',
          }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(1rem, 2.5vw, 1.6rem)',
              fontStyle: 'italic',
              color: 'rgba(151,204,246,0.65)',
              letterSpacing: '0.08em',
            }}
          >
            Transform Your Narrative&nbsp;&nbsp;•&nbsp;&nbsp;Build Your Legacy&nbsp;&nbsp;•&nbsp;&nbsp;Scottsdale, Arizona&nbsp;&nbsp;•&nbsp;&nbsp;Founder · RAH Operations&nbsp;&nbsp;•&nbsp;&nbsp;Transform Your Narrative&nbsp;&nbsp;•&nbsp;&nbsp;Build Your Legacy&nbsp;&nbsp;•&nbsp;&nbsp;Scottsdale, Arizona&nbsp;&nbsp;•&nbsp;&nbsp;
          </span>
        </div>
      </div>

      {/* Scroll budget spacer */}
      <div
        ref={spacerRef}
        style={{ height: typeof window !== 'undefined' && window.innerWidth < MOBILE_BP ? '150vh' : '200vh' }}
      />
    </div>
  )
}
