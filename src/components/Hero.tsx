import { useEffect, useRef, useState } from 'react'

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
      sh = ch; sw = sh * ir; sy = 0; sx = (cw - sw) * 0.5
    } else {
      sw = cw; sh = sw / ir; sx = 0; sy = (ch - sh) * 0.5
    }
  } else {
    if (ir < cr) {
      sh = ch; sw = sh * ir; sx = (cw - sw) * 0.5; sy = 0
    } else {
      sw = cw; sh = sw / ir; sx = 0; sy = (ch - sh) * 0.15
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
  const lastFrame    = useRef(-1)
  const frames       = useRef<HTMLImageElement[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const sticky      = stickyRef.current
    const spacer      = spacerRef.current
    const canvas      = canvasRef.current
    const nameGroup   = nameGroupRef.current
    const danielEl    = danielRef.current
    const rodriguezEl = rodriguezRef.current
    if (!sticky || !spacer || !canvas || !nameGroup || !danielEl || !rodriguezEl) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const getMob = () => window.innerWidth < MOBILE_BP

    const setH = () => {
      sticky.style.height = window.innerHeight + 'px'
      canvas.width  = sticky.offsetWidth
      canvas.height = sticky.offsetHeight
    }

    const update = () => {
      const spacerH = spacer.offsetHeight
      if (!spacerH) return
      const p = clamp01(window.scrollY / spacerH)
      const frameIdx = Math.min(TOTAL_FRAMES - 1, Math.floor(p * TOTAL_FRAMES))
      const mob = getMob()

      if (frameIdx !== lastFrame.current || frameIdx === 0) {
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
    }

    const onResize = () => { setH(); update() }

    window.addEventListener('scroll',            update,   { passive: true })
    window.addEventListener('resize',            onResize, { passive: true })
    window.addEventListener('orientationchange', onResize)
    document.addEventListener('visibilitychange', update)

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
          setLoaded(true)
        }
      }
      return img
    })

    requestAnimationFrame(() => { setH(); update() })

    return () => {
      window.removeEventListener('scroll',            update)
      window.removeEventListener('resize',            onResize)
      window.removeEventListener('orientationchange', onResize)
      document.removeEventListener('visibilitychange', update)
    }
  }, [onProgress])

  const isMob = typeof window !== 'undefined' && window.innerWidth < MOBILE_BP

  return (
    <div>
      <div
        ref={stickyRef}
        style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}
      >
        {/* Poster — visible until frame 0 loads, prevents black flash */}
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
            opacity: loaded ? 0 : 1,
            transition: 'opacity 0.3s ease',
          }}
        />

        {/* Loading bar — shows until frame 0 loaded */}
        {!loaded && (
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: 2, zIndex: 10, overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              background: '#97CCF6',
              animation: 'loadbar 1.2s ease-in-out infinite',
            }} />
            <style>{`
              @keyframes loadbar {
                0% { width: 0%; margin-left: 0%; }
                50% { width: 60%; margin-left: 20%; }
                100% { width: 0%; margin-left: 100%; }
              }
            `}</style>
          </div>
        )}

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
      </div>

      {/* Spacer */}
      <div
        ref={spacerRef}
        style={{ height: isMob ? '150vh' : '200vh' }}
      />

      {/* Permanent rotating marquee banner below hero */}
      <div
        style={{
          overflow: 'hidden',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(10,10,10,0.9)',
          padding: '1rem 0',
        }}
      >
        <div style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          animation: 'marquee 30s linear infinite',
        }}>
          {[...Array(2)].map((_, ri) => (
            <span key={ri} style={{ display: 'flex' }}>
              {[
                'Transform Your Narrative',
                'Build Your Legacy',
                'Scottsdale, Arizona',
                'Founder · RAH Operations',
                'Digital Marketing',
                'SEO & Web Design',
                'Business Credit',
                'Debt Relief Strategy',
              ].map((item, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(0.9rem, 2vw, 1.4rem)',
                    fontStyle: 'italic',
                    color: 'rgba(151,204,246,0.65)',
                    letterSpacing: '0.08em',
                    paddingLeft: '2rem',
                    paddingRight: '2rem',
                    borderRight: '1px solid rgba(151,204,246,0.15)',
                  }}
                >
                  {item}
                </span>
              ))}
            </span>
          ))}
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </div>
  )
}
