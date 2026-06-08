import React, { useState, useEffect } from 'react'
import BackgroundVideo from './components/BackgroundVideo'
import Overlay from './components/Overlay'
import ErrorBoundary from './components/ErrorBoundary'

export default function App() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [scrollProgress, setScrollProgress] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    // 1. Mouse movement tracking
    const handleMouseMove = (event) => {
      setMouse({
        x: (event.clientX / window.innerWidth) - 0.5,
        y: -(event.clientY / window.innerHeight) + 0.5
      })
    }

    // 2. High-performance scroll tracking using requestAnimationFrame
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalScroll = document.documentElement.scrollHeight - window.innerHeight
          const currentScroll = window.scrollY
          
          setScrollY(currentScroll)
          setScrollProgress(totalScroll <= 0 ? 0 : currentScroll / totalScroll)
          
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-transparent select-none text-zinc-100 overflow-x-hidden">
      {/* Background Video */}
      <ErrorBoundary>
        <BackgroundVideo scrollProgress={scrollProgress} />
      </ErrorBoundary>

      {/* HTML Content Overlay */}
      <Overlay scrollY={scrollY} scrollProgress={scrollProgress} />
    </div>
  )
}
