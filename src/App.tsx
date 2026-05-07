import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Statement from './components/Statement'
import About from './components/About'
import Press from './components/Press'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ParticleBackground from './components/ParticleBackground'
import VideoBackground from './components/VideoBackground'

function App() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen overflow-x-hidden relative">
      <ParticleBackground />
      <VideoBackground />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Statement />
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
