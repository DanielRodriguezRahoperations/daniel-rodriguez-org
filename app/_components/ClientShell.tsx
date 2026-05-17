'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const ParticleBackground = dynamic(
  () => import('@/components/ParticleBackground'),
  { ssr: false }
)

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [heroProgress, setHeroProgress] = useState(0)
  const pathname = usePathname()

  // Reset progress to 1 (navbar fully visible) on any non-home route
  useEffect(() => {
    setHeroProgress(pathname === '/' ? 0 : 1)
  }, [pathname])

  // Hero fires this event as the scroll animation progresses
  useEffect(() => {
    const handler = (e: Event) =>
      setHeroProgress((e as CustomEvent<number>).detail)
    window.addEventListener('hero-progress', handler)
    return () => window.removeEventListener('hero-progress', handler)
  }, [])

  return (
    <div className="bg-[#0a0a0a] min-h-screen overflow-x-hidden relative">
      <ParticleBackground />
      <div className="relative z-10">
        <Navbar heroProgress={heroProgress} />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  )
}
