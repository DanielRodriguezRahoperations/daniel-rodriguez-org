import { motion, useScroll, useTransform } from 'framer-motion'

export default function Hero() {
  const { scrollY } = useScroll()

  // Text slides up from below as user scrolls, reverses on scroll back to top
  const textY = useTransform(scrollY, [0, 350], [140, 0])
  const textOpacity = useTransform(scrollY, [0, 220], [0, 1])

  return (
    <section className="relative h-screen overflow-hidden bg-[#0a0a0a]">

      {/* Fullscreen autoplay video — edge to edge */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Subtle dark overlay so text is readable */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Bottom fade into site */}
      <div className="absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-t from-[#0a0a0a] to-transparent" />

      {/* Hero text — slides up from below on scroll, disappears on scroll to top */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-end pb-28 px-6 z-10"
        style={{ y: textY, opacity: textOpacity }}
      >
        {/* "Daniel Rodriguez" — 3D depth float effect */}
        <div style={{ perspective: '1200px' }} className="text-center mb-5">
          <motion.h1
            className="font-display leading-[0.88]"
            animate={{
              rotateX: [0, 1.2, 0, -1.2, 0],
              rotateY: [0, 2.5, 0, -2.5, 0],
              z: [0, 10, 0, -10, 0],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <span className="block text-[clamp(4.5rem,13vw,11rem)] font-black text-white tracking-tight drop-shadow-[0_4px_32px_rgba(201,169,110,0.15)]">
              Daniel
            </span>
            <span className="block text-[clamp(4rem,12vw,10rem)] font-black italic text-gold tracking-tight -mt-3 drop-shadow-[0_4px_32px_rgba(201,169,110,0.25)]">
              Rodriguez
            </span>
          </motion.h1>
        </div>

        {/* Subtitle */}
        <p className="font-cormorant text-[clamp(1rem,2vw,1.4rem)] italic text-white/55 tracking-wide mb-10 text-center">
          Transform Your Narrative. Build Your Legacy.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <a
            href="#contact"
            className="group font-sans text-sm font-medium tracking-widest uppercase px-10 py-4 bg-gold text-[#0a0a0a] hover:bg-gold-light transition-all duration-300 flex items-center gap-3"
          >
            Begin Your Journey
            <span className="w-4 h-px bg-[#0a0a0a] group-hover:w-8 transition-all duration-300" />
          </a>
          <a
            href="#about"
            className="font-sans text-sm font-medium tracking-widest uppercase px-10 py-4 border border-white/20 text-white/70 hover:border-gold hover:text-gold transition-all duration-300"
          >
            Discover More
          </a>
        </div>
      </motion.div>

    </section>
  )
}
