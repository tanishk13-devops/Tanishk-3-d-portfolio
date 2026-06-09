import { useState, useEffect } from 'react'
import BackgroundVideo from './components/BackgroundVideo'
import Overlay from './components/Overlay'

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    // High-performance scroll tracking using requestAnimationFrame
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalScroll = document.documentElement.scrollHeight - window.innerHeight
          const currentScroll = window.scrollY
          
          setScrollProgress(totalScroll <= 0 ? 0 : currentScroll / totalScroll)
          
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-transparent select-none text-zinc-100 overflow-x-hidden">
      {/* Background Video Scroll Control */}
      <BackgroundVideo scrollProgress={scrollProgress} />

      {/* HTML Content Overlay */}
      <Overlay scrollProgress={scrollProgress} />
    </div>
  )
}



