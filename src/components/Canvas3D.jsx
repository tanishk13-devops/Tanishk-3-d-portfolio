import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import GalaxyPortal from './GalaxyPortal'

export default function Canvas3D({ mouse, scrollProgress }) {
  return (
    <div className="fixed top-0 left-0 w-full h-screen -z-10 bg-[#121212] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60, near: 0.1, far: 1000 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        {/* Lights */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={1.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#c084fc" />
        <pointLight position={[-10, -10, -10]} intensity={1.0} color="#06b6d4" />
        
        <Suspense fallback={null}>
          <GalaxyPortal mouse={mouse} scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  )
}
