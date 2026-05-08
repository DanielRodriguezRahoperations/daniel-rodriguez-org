import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import ParticleBackground from './components/ParticleBackground'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import PressPage from './pages/PressPage'
import ContactPage from './pages/ContactPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import NotFoundPage from './pages/NotFoundPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function AppShell() {
  const [heroProgress, setHeroProgress] = useState(0)
  const { pathname } = useLocation()

  // On non-home routes the hero isn't rendered, so keep navbar fully visible
  useEffect(() => {
    setHeroProgress(pathname === '/' ? 0 : 1)
  }, [pathname])

  // Hero.tsx dispatches scroll progress via custom event
  useEffect(() => {
    const handler = (e: Event) =>
      setHeroProgress((e as CustomEvent<number>).detail)
    window.addEventListener('hero-progress', handler)
    return () => window.removeEventListener('hero-progress', handler)
  }, [])

  return (
    <div className="bg-[#0a0a0a] min-h-screen relative">
      <ParticleBackground />
      <ScrollToTop />
      <div className="relative z-10">
        <Navbar heroProgress={heroProgress} />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/press" element={<PressPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </HelmetProvider>
  )
}
