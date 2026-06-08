import React, { useRef, useEffect } from 'react'

export default function BackgroundVideo({ scrollProgress }) {
  const videoRef = useRef(null)
  const targetTimeRef = useRef(0)
  const requestRef = useRef(null)

  // Update target time when scrollProgress changes
  useEffect(() => {
    const video = videoRef.current
    if (!video || isNaN(video.duration) || video.duration === 0) return

    const heroEnd = 0.38
    const progressInHero = Math.max(0, Math.min(scrollProgress / heroEnd, 1.0))
    targetTimeRef.current = progressInHero * video.duration
  }, [scrollProgress])

  // Continuous animation loop using requestAnimationFrame with a self-throttling seek-lock
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.pause()
    let isSeeking = false

    const updateFrame = () => {
      // Only request a new frame if the decoder is not currently busy seeking
      if (!isNaN(video.duration) && video.duration > 0 && !isSeeking) {
        const targetTime = targetTimeRef.current
        const currentTime = video.currentTime
        const diff = targetTime - currentTime
        
        // Easing factor (0.15 for responsive, smooth glide)
        if (Math.abs(diff) > 0.01) {
          isSeeking = true
          video.currentTime = currentTime + diff * 0.15
        } else if (currentTime !== targetTime) {
          isSeeking = true
          video.currentTime = targetTime
        }
      }
      requestRef.current = requestAnimationFrame(updateFrame)
    }

    const handleSeeked = () => {
      isSeeking = false // Unlock when the browser has finished rendering the current frame
    }

    video.addEventListener('seeked', handleSeeked)
    requestRef.current = requestAnimationFrame(updateFrame)

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
      video.removeEventListener('seeked', handleSeeked)
    }
  }, [])

  return (
    <>
      {/* Solid black base background layer at z-[-20] */}
      <div className="fixed inset-0 z-[-20] bg-[#09090b] pointer-events-none" />

      {/* Widescreen Fullscreen Cover Video layer at z-[-10] */}
      <div className="fixed top-0 left-0 w-full h-screen z-[-10] bg-transparent overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          src="/about-media.mp4"
          muted
          playsInline
          className="w-full h-full object-cover opacity-70 filter brightness-90 contrast-105"
        />
        {/* Subtle overlay to maintain text readability without washing out the video */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/70 pointer-events-none" />
      </div>
    </>
  )
}
