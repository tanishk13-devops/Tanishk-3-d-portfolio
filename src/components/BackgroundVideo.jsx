import { useRef, useEffect } from 'react'

export default function BackgroundVideo({ scrollProgress }) {
  const videoRef = useRef(null)
  const targetProgressRef = useRef(0)
  const currentProgressRef = useRef(0)
  const requestRef = useRef(null)
  const lastSeekTimeRef = useRef(0)

  // Update target progress when scrollProgress changes
  useEffect(() => {
    targetProgressRef.current = scrollProgress
  }, [scrollProgress])

  // Continuous animation loop using requestAnimationFrame with a LERP-smoothed, throttled seeking engine
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.pause()

    const updateFrame = () => {
      if (!isNaN(video.duration) && video.duration > 0) {
        // LERP: Smooth out discrete scroll notches into a continuous fluid glide
        // 0.07 is the easing inertia factor (lower = smoother/slower, higher = snappier)
        currentProgressRef.current += (targetProgressRef.current - currentProgressRef.current) * 0.07

        const heroEnd = 0.38
        const progressInHero = Math.max(0, Math.min(currentProgressRef.current / heroEnd, 1.0))
        const targetTime = progressInHero * video.duration
        
        const now = performance.now()
        // Seek if the difference is meaningful, the video is not currently busy seeking, 
        // and we haven't sought in the last 25ms (40fps max update rate to protect GPU decoder)
        if (Math.abs(video.currentTime - targetTime) > 0.02 && !video.seeking && (now - lastSeekTimeRef.current > 25)) {
          video.currentTime = targetTime
          lastSeekTimeRef.current = now
        }
      }
      requestRef.current = requestAnimationFrame(updateFrame)
    }

    requestRef.current = requestAnimationFrame(updateFrame)

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
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
