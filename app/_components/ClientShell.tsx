'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [heroProgress, setHeroProgress] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    setHeroProgress(pathname === '/' ? 0 : 1)
    const handler = (e: Event) =>
      setHeroProgress((e as CustomEvent<number>).detail)
    window.addEventListener('hero-progress', handler)
    return () => window.removeEventListener('hero-progress', handler)
  }, [pathname])

  return (
    <div className="bg-[#0a0a0a] min-h-screen overflow-x-hidden relative">
      <div className="relative z-10">
        <Navbar heroProgress={heroProgress} />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  )
}
