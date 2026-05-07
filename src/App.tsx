import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Press from './components/Press'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ParticleBackground from './components/ParticleBackground'

function App() {
  const [heroProgress, setHeroProgress] = useState(0)

  return (
    <div className="bg-[#0a0a0a] min-h-screen overflow-x-hidden relative">
      <ParticleBackground />
      <div className="relative z-10">
        <Navbar heroProgress={heroProgress} />
        <main>
          <Hero onProgress={setHeroProgress} />
          <About />
          <Press />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
