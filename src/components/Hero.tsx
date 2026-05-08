import { useEffect, useRef } from 'react'

const TOTAL_FRAMES = 60
const MOBILE_BP = 768

const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const invlerp = (a: number, b: number, v: number) => clamp01(b === a ? 0 : (v - a) / (b - a))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

function drawFrame(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number,
  mob: boolean
) {
  if (!cw || !ch || !img.complete || img.naturalWidth === 0) return
  const ir = img.naturalWidth / img.naturalHeight
  const cr = cw / ch
  let sw: number, sh: number, sx: number, sy: number

  if (mob) {
    if (ir > cr) {
      sh = ch; sw = sh * ir
      sy = 0; sx = (cw - sw) * 0.5
    } else {
      sw = cw; sh = sw / ir
      sx = 0; sy = (ch - sh) * 0.5
    }
  } else {
    if (ir < cr) {
      sh = ch; sw = sh * ir
      sx = (cw - sw) * 0.5; sy = 0
    } else {
      sw = cw; sh = sw / ir
      sx = 0; sy = (ch - sh) * 0.15
    }
  }
  ctx.clearRect(0, 0, cw, ch)
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
  const rafId        = useRef<number>(0)
  const lastFrame    = useRef(-1)
  const frames       = useRef<HTMLImageElement[]>([])
  const framesReady  = useRef(false)

  useEffect(() => {
    const sticky      = stickyRef.current
    const spacer      = spacerRef.current
    const canvas      = canvasRef.current
    const nameGroup   = nameGroupRef.current
    const danielEl    = danielRef.current
    const rodriguezEl = rodriguezRef.current
    const marqueeEl   = marqueeRef.current
    if (!sticky || !spacer || !canvas || !nameGroup || !danielEl || !rodriguezEl || !marqueeEl) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const getMob = () => window.innerWidth < MOBILE_BP

    const setH = () => {
      sticky.style.height = window.innerHeight + 'px'
      canvas.width  = sticky.offsetWidth
      canvas.height = sticky.offsetHeight
      const idx = lastFrame.current >= 0 ? lastFrame.current : 0
      const f = frames.current[idx]
      if (f?.complete && f.naturalWidth > 0) {
        drawFrame(ctx, f, canvas.width, canvas.height, getMob())
      }
    }

    // Runs immediately — no rAF delay
    const update = () => {
      const p = clamp01(window.scrollY / Math.max(1, spacer.offsetHeight))
      const frameIdx = Math.min(TOTAL_FRAMES - 1, Math.floor(p * TOTAL_FRAMES))
      const mob = getMob()

      if (frameIdx !== lastFrame.current) {
        lastFrame.current = frameIdx
        const f = frames.current[frameIdx]
        if (f) drawFrame(ctx, f, canvas.width, canvas.height, mob)
      }

      onProgress?.(p)

      const groupIn  = invlerp(0, 0.25, p)
      const groupOut = 1 - invlerp(0.85, 1.0, p)
      nameGroup.style.opacity = String(Math.min(groupIn, groupOut))

      const nameP = invlerp(0, 0.25, p)
      danielEl.style.transform    = `translateX(${lerp(-120, 0, nameP)}px)`
      danielEl.style.opacity      = String(nameP)
      rodriguezEl.style.transform = `translateX(${lerp(120, 0, nameP)}px)`
      rodriguezEl.style.opacity   = String(nameP)

      const mqP = invlerp(0, 0.4, p)
      marqueeEl.style.transform = `translateX(${lerp(0, -35, mqP)}%)`
      marqueeEl.style.opacity   = String(mqP)
    }

    // rAF loop — runs every frame while page is active
    const loop = () => {
      update()
      rafId.current = requestAnimationFrame(loop)
    }

    const onResize = () => { setH(); update() }

    window.addEventListener('resize',            onResize, { passive: true })
    window.addEventListener('orientationchange', onResize)

    setH()

    let loadedCount = 0
    frames.current = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
      const img = new Image()
      img.src = `/hero-frames/frame_${String(i + 1).padStart(4, '0')}.jpg`
      img.onload = () => {
        loadedCount++
        if (i === 0) {
          if (!canvas.width || !canvas.height) setH()
          drawFrame(ctx, img, canvas.width, canvas.height, getMob())
          lastFrame.current = 0
        }
        if (loadedCount === TOTAL_FRAMES) framesReady.current = true
      }
      return img
    })

    // Start the continuous loop — no scroll listener needed
    rafId.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(rafId.current)
      window.removeEventListener('resize',            onResize)
      window.removeEventListener('orientationchange', onResize)
    }
  }, [onProgress])

  const isMob = typeof window !== 'undefined' && window.innerWidth < MOBILE_BP

  return (
    <div>
      <div
        ref={stickyRef}
        style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}
      >
        <img
          src="/hero-poster.jpg"
          alt=""
          aria-hidden
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: isMob ? 'cover' : 'contain',
            objectPosition: 'center',
            background: '#0a0a0a',
            zIndex: 0, pointerEvents: 'none',
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            zIndex: 1, pointerEvents: 'none',
            background: '#0a0a0a',
          }}
        />

        <div
          aria-hidden
          style={{
            position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
            background:
              'linear-gradient(to top, rgba(10,10,10,0.80) 0%, transparent 52%),' +
              'linear-gradient(to bottom, rgba(10,10,10,0.30) 0%, transparent 28%)',
          }}
        />

        <div
          ref={nameGroupRef}
          style={{
            position: 'absolute', inset: 0, zIndex: 3,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'flex-end',
            paddingBottom: '6rem', paddingLeft: '1.5rem', paddingRight: '1.5rem',
            pointerEvents: 'none', opacity: 0,
          }}
        >
          <div style={{ textAlign: 'center', lineHeight: 0.88, marginBottom: '2rem' }}>
            <div ref={danielRef} style={{ opacity: 0, transform: 'translateX(-120px)' }}>
              <span style={{
                display: 'block',
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontSize: 'clamp(4rem, 12vw, 10rem)',
                color: '#ffffff',
                letterSpacing: '-0.02em',
                textShadow: '0 4px 40px rgba(0,0,0,0.55)',
              }}>Daniel</span>
            </div>
            <div ref={rodriguezRef} style={{ opacity: 0, transform: 'translateX(120px)' }}>
              <span style={{
                display: 'block',
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontStyle: 'italic',
                fontSize: 'clamp(3.5rem, 11vw, 9rem)',
                color: '#ffffff',
                letterSpacing: '-0.02em',
                marginTop: '-0.06em',
                textShadow: '0 4px 40px rgba(0,0,0,0.55)',
              }}>Rodriguez</span>
            </div>
          </div>
        </div>

        <div
          ref={marqueeRef}
          style={{
            position: 'absolute', bottom: '2rem', left: 0, zIndex: 3,
            whiteSpace: 'nowrap', pointerEvents: 'none',
            opacity: 0, transform: 'translateX(0%)',
          }}
        >
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1rem, 2.5vw, 1.6rem)',
            fontStyle: 'italic',
            color: 'rgba(151,204,246,0.65)',
            letterSpacing: '0.08em',
          }}>
            Transform Your Narrative&nbsp;&nbsp;•&nbsp;&nbsp;Build Your Legacy&nbsp;&nbsp;•&nbsp;&nbsp;Scottsdale, Arizona&nbsp;&nbsp;•&nbsp;&nbsp;Founder · RAH Operations&nbsp;&nbsp;•&nbsp;&nbsp;Transform Your Narrative&nbsp;&nbsp;•&nbsp;&nbsp;Build Your Legacy&nbsp;&nbsp;•&nbsp;&nbsp;Scottsdale, Arizona&nbsp;&nbsp;•&nbsp;&nbsp;
          </span>
        </div>
      </div>

      <div
        ref={spacerRef}
        style={{ height: isMob ? '150vh' : '200vh' }}
      />
    </div>
  )
}
