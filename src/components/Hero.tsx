import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'

// ─── Breakpoint ────────────────────────────────────────────────────────────
const MOBILE_BP = 768
const isMobile = () => typeof window !== 'undefined' && window.innerWidth < MOBILE_BP

// ─── Animation constants — desktop and mobile fully separate ───────────────
//
// Video is 623×1080 portrait (10 s).  On a landscape desktop viewport,
// objectFit:cover scales the video ~2.3× so objectPosition 'center 10%'
// anchors around the face instead of showing neck/chest.
// On mobile (portrait viewport), the full height is visible; center center works.

const D = {
  spacer:     '150vh',   // scroll budget — hero exits after 150 vh of scroll
  scaleEnd:   1.08,      // video zooms to 108% at full progress
  nameXMax:   220,       // px the name lines slide in from
  nameXEnd:   0.40,      // progress fraction where slide completes
  objPos:     'center 8%',   // frames face on landscape desktop
  tfOrigin:   'center 8%',   // zoom anchor matches face position
  opRange:    [0, 0.15] as const,
  opVals:     [0.85, 1] as const,
  mqRange:    [0.30, 1.0] as const,
  mqEnd:      '-35%',
  tlRange:    [0.35, 0.60] as const,
}

const M = {
  spacer:     '110vh',
  scaleEnd:   1.08,                    // dramatic zoom — noticeable on first swipe
  nameXMax:   60,                      // subtle slide-in from sides on mobile
  objPos:     'center center',
  tfOrigin:   'center center',
  mqRange:    [0, 1.0] as const,
  mqEnd:      '-40%',
  tlRange:    [0, 0.001] as const,     // tagline snaps visible on first scroll tick
}

// ─── Math helpers ──────────────────────────────────────────────────────────
const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const lerp     = (a: number, b: number, t: number) => a + (b - a) * t
const invlerp  = (a: number, b: number, v: number) => clamp01(b === a ? 0 : (v - a) / (b - a))

// ─── Component ─────────────────────────────────────────────────────────────
export default function Hero() {
  const stickyRef  = useRef<HTMLDivElement>(null)
  const spacerRef  = useRef<HTMLDivElement>(null)
  const videoRef   = useRef<HTMLVideoElement>(null)
  const rafPending = useRef(false)

  // Detect breakpoint at render time.
  // tick() re-checks on every scroll/resize so resize is handled correctly.
  const mobile = isMobile()

  // ─── Framer Motion values ─────────────────────────────────────────────
  const progress   = useMotionValue(0)

  // x offset: both breakpoints slide from ±nameXMax (mobile uses M.nameXMax = 60)
  const danielX    = useMotionValue(mobile ? -M.nameXMax : -D.nameXMax)
  const rodriguezX = useMotionValue(mobile ?  M.nameXMax :  D.nameXMax)

  // These transforms are computed once at mount using the initial mobile state.
  // Mobile: text is fully opaque from the start; marquee and tagline animate
  //         from the very first pixel of scroll so the first swipe is always live.
  // Desktop: standard cinematic ranges.
  const textOpacity = useTransform(
    progress,
    mobile ? [0, 0.001] : [...D.opRange],
    mobile ? [1, 1]     : [...D.opVals],
  )
  const marqueeX = useTransform(
    progress,
    mobile ? [...M.mqRange] : [...D.mqRange],
    mobile ? ['0%', M.mqEnd] : ['0%', D.mqEnd],
  )
  const taglineOpacity = useTransform(
    progress,
    mobile ? [0, 0.001] : [...D.tlRange],
    [0, 1],
  )

  // ─── Scroll engine ────────────────────────────────────────────────────
  useEffect(() => {
    const sticky = stickyRef.current
    const spacer = spacerRef.current
    const video  = videoRef.current
    if (!sticky || !spacer || !video) return

    // ── Viewport height (dvh equivalent via JS) ───────────────────────
    // Setting height in px via window.innerHeight behaves like 100dvh —
    // it always matches the visible viewport — but avoids the iOS Safari
    // scroll-lock that can occur when a CSS dvh sticky element reflows.
    const setH = () => { sticky.style.height = window.innerHeight + 'px' }
    setH()

    // ── Per-frame update ──────────────────────────────────────────────
    const tick = () => {
      rafPending.current = false

      const mob     = isMobile()                           // live breakpoint
      const spacerH = spacer.offsetHeight                  // 150 vh or 110 vh in px
      const p       = clamp01(window.scrollY / Math.max(1, spacerH))

      // Single progress MotionValue drives all Framer Motion transforms
      progress.set(p)

      // Video scale — applied directly to avoid React render overhead
      const scEnd = mob ? M.scaleEnd : D.scaleEnd
      video.style.transform = `scale(${lerp(1, scEnd, p)})`

      // Slide name lines from offset to center — mobile uses smaller offset
      if (mob) {
        const xT = invlerp(0, 0.35, p)
        danielX.set(lerp(-M.nameXMax, 0, xT))
        rodriguezX.set(lerp(M.nameXMax, 0, xT))
      }
      if (!mob) {
        const xT = invlerp(0, D.nameXEnd, p)
        danielX.set(lerp(-D.nameXMax, 0, xT))
        rodriguezX.set(lerp(D.nameXMax, 0, xT))
      }
    }

    // Scroll: batch updates into a single rAF per frame
    const onScroll = () => {
      if (!rafPending.current) {
        rafPending.current = true
        requestAnimationFrame(tick)
      }
    }

    // Resize / orientation: update sticky height and recalc progress
    const onResize = () => {
      setH()
      requestAnimationFrame(tick)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    window.addEventListener('orientationchange', onResize)

    // Initialise on mount (before any scroll event fires)
    tick()
    const rafInit = requestAnimationFrame(tick)  // catch post-paint layout shifts

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onResize)
      cancelAnimationFrame(rafInit)
    }
  }, [progress, danielX, rodriguezX])

  // ─── Render ───────────────────────────────────────────────────────────
  //
  // Outer div has no explicit height — its natural height is the sticky
  // element (100 vh) plus the spacer (150 vh / 110 vh).  The spacer IS
  // the scroll budget: progress = scrollY / spacer.offsetHeight.
  // When scrollY reaches spacerHeight, the sticky element exits naturally.

  const objPos   = mobile ? M.objPos : D.objPos
  const tfOrigin = mobile ? M.tfOrigin : D.tfOrigin

  return (
    <div>
      {/* ── Sticky viewport ──────────────────────────────────────────── */}
      {/*
        height starts at 100 vh; JS overrides to window.innerHeight px
        (dvh equivalent) on mount and on every resize.
        overflow:hidden clips the scaled-up video at the edges.
        Do NOT use dvh as a CSS value here — the JS approach avoids the
        iOS Safari scroll-lock caused by dvh reflow inside sticky.
      */}
      <div
        ref={stickyRef}
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* Portrait / video ─────────────────────────────────────────── */}
        {/*
          poster="/hero-poster.jpg" shows the composed portrait frame
          immediately while the video loads — no black flash on mobile.
          autoPlay unlocks programmatic play() in iOS Safari scroll handlers.
          objectPosition is breakpoint-specific:
            desktop — 'center 8%' anchors the face on a landscape crop
            mobile  — 'center center' (full portrait fits portrait viewport)
          transformOrigin matches objectPosition so zoom stays on the face.
        */}
        <video
          ref={videoRef}
          src="/hero.mp4"
          poster="/hero-poster.jpg"
          muted
          playsInline
          autoPlay
          loop
          preload="auto"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: objPos,
            transformOrigin: tfOrigin,
            willChange: 'transform',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />

        {/* Gradient — text legibility ──────────────────────────────── */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            pointerEvents: 'none',
            background:
              'linear-gradient(to top, rgba(10,10,10,0.80) 0%, transparent 52%),' +
              'linear-gradient(to bottom, rgba(10,10,10,0.30) 0%, transparent 28%)',
          }}
        />

        {/* Name overlay ─────────────────────────────────────────────── */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingBottom: '6rem',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
            opacity: textOpacity,
            pointerEvents: 'none',
          }}
        >
          <div style={{ textAlign: 'center', lineHeight: 0.88, marginBottom: '2rem' }}>
            <motion.div style={{ x: danielX }}>
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
            </motion.div>
            <motion.div style={{ x: rodriguezX }}>
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
            </motion.div>
          </div>
        </motion.div>

        {/* Marquee ──────────────────────────────────────────────────── */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: 0,
            zIndex: 2,
            x: marqueeX,
            opacity: taglineOpacity,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
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
        </motion.div>
      </div>

      {/* ── Scroll budget spacer ──────────────────────────────────────── */}
      {/*
        This div IS the scroll budget.  progress = scrollY / spacer.offsetHeight.
        Desktop 150 vh: cinematic, leisurely scroll through the animation.
        Mobile  110 vh: first swipe creates immediate visible change;
                        user exits the pinned hero quickly and naturally.
      */}
      <div
        ref={spacerRef}
        style={{ height: mobile ? M.spacer : D.spacer }}
      />
    </div>
  )
}
