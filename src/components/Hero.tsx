import { motion, useScroll, useTransform } from 'framer-motion'

export default function Hero() {
  const { scrollY } = useScroll()

  const textY = useTransform(scrollY, [0, 400], [200, 0])
  const textOpacity = useTransform(scrollY, [0, 300], [0, 1])

  return (
    <section className="relative h-screen bg-[#0a0a0a] overflow-hidden">

      <video
        autoPlay
        muted
        loop
        playsInline
        src="/hero.mp4"
        className="absolute inset-0 w-full h-full object-contain"
      />

      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[#0a0a0a] to-transparent" />

      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-end pb-28 px-6"
        style={{ y: textY, opacity: textOpacity }}
      >
        <h1
          className="font-display text-center leading-none mb-5"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <span className="block text-white font-black"
            style={{ fontSize: 'clamp(4rem, 12vw, 10rem)', letterSpacing: '-0.02em' }}>
            Daniel
          </span>
          <span className="block text-white font-black italic"
            style={{ fontSize: 'clamp(3.5rem, 11vw, 9rem)', letterSpacing: '-0.02em', marginTop: '-0.1em' }}>
            Rodriguez
          </span>
        </h1>

        <p
          className="text-white/55 italic text-center"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(1rem, 2vw, 1.4rem)', letterSpacing: '0.04em' }}
        >
          Transform Your Narrative. Build Your Legacy.
        </p>
      </motion.div>

    </section>
  )
}
