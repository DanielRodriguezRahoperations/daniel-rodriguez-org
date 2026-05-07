import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/daniel.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Dark overlay (60%) */}
      <div className="absolute inset-0 bg-[#0a0a0a]/60" />

      {/* Gradient overlay bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0a0a0a] to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-sans text-xs tracking-[0.4em] uppercase text-gold/70 mb-8">
            Personal Brand Consultant
          </p>
        </motion.div>

        <motion.h1
          className="font-display leading-[0.9] mb-8"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="block text-[clamp(5rem,15vw,14rem)] font-black text-white tracking-tight">
            Daniel
          </span>
          <span className="block text-[clamp(4.5rem,14vw,13rem)] font-black italic text-gold tracking-tight -mt-4">
            Rodriguez
          </span>
        </motion.h1>

        <motion.p
          className="font-cormorant text-[clamp(1.1rem,2.5vw,1.6rem)] italic text-white/60 tracking-wide mb-12 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Transform Your Narrative. Build Your Legacy.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="#contact"
            className="group font-sans text-sm font-medium tracking-widest uppercase px-10 py-4 bg-gold text-[#0a0a0a] hover:bg-gold-light transition-all duration-300 flex items-center gap-3"
          >
            Begin Your Journey
            <span className="w-4 h-px bg-[#0a0a0a] group-hover:w-8 transition-all duration-300" />
          </a>
          <a
            href="#about"
            className="group font-sans text-sm font-medium tracking-widest uppercase px-10 py-4 border border-white/20 text-white/70 hover:border-gold hover:text-gold transition-all duration-300 flex items-center gap-3"
          >
            Discover More
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-white/30">
          Scroll
        </span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-gold/50 to-transparent"
          animate={{ scaleY: [1, 0.5, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
