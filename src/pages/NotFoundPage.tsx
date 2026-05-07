import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFoundPage() {
  return (
    <section style={{ background: 'rgba(10,10,10,0.90)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center justify-center min-h-screen text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            className="font-display font-bold"
            style={{
              fontSize: 'clamp(6rem, 18vw, 14rem)',
              lineHeight: '1',
              letterSpacing: '-0.04em',
              color: 'rgba(255,255,255,0.06)',
            }}
          >
            404
          </p>

          <p
            className="font-display font-semibold text-white mb-6"
            style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', letterSpacing: '-0.02em' }}
          >
            This page doesn't exist.
          </p>

          <p
            className="font-sans mb-12"
            style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.32)' }}
          >
            The page you're looking for has moved or never existed.
          </p>

          <Link
            to="/"
            className="group inline-flex items-center gap-5 font-sans font-medium tracking-widest uppercase transition-colors duration-300 hover:text-white"
            style={{ fontSize: '0.72rem', color: '#97CCF6' }}
          >
            Return Home
            <span
              className="block h-px group-hover:w-14 transition-all duration-500"
              style={{ width: '2rem', background: 'currentColor' }}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
