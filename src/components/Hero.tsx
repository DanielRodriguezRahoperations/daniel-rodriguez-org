import { motion, useScroll, useTransform } from 'framer-motion'

export default function Hero() {
  const { scrollY } = useScroll()

  const textY = useTransform(scrollY, [0, 350], [160, 0])
  const textOpacity = useTransform(scrollY, [0, 250], [0, 1])

  return (
    <section className="relative h-screen overflow-hidden bg-[#0a0a0a]">

      {/* Full subject visible — no cropping */}
      <video
        className="absolute inset-0 w-full h-full object-contain"
        src="/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-t from-[#0a0a0a] to-transparent" />

      {/* Text — starts off-screen below, slides up on scroll, reverses at top */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-end pb-32 px-6 z-10"
        style={{ y: textY, opacity: textOpacity }}
      >
        {/* Headline with subtle 3D idle float */}
        <div style={{ perspective: '1200px' }} className="text-center mb-5">
          <motion.h1
            className="font-display leading-[0.88]"
            animate={{
              rotateX: [0, 1, 0, -1, 0],
              rotateY: [0, 2, 0, -2, 0],
            }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <span className="block text-[clamp(4.5rem,13vw,11rem)] font-black text-white tracking-tight">
              Daniel
            </span>
            <span className="block text-[clamp(4rem,12vw,10rem)] font-black italic text-white tracking-tight -mt-3">
              Rodriguez
            </span>
          </motion.h1>
        </div>

        {/* Tagline */}
        <p className="font-cormorant text-[clamp(1rem,2vw,1.4rem)] italic text-white/55 tracking-wide text-center">
          Transform Your Narrative. Build Your Legacy.
        </p>
      </motion.div>

    </section>
  )
}
