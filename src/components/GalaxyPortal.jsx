import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Stars, Sparkles } from '@react-three/drei'
import * as THREE from 'three'
import Avatar from './Avatar'

export default function GalaxyPortal({ mouse, scrollProgress }) {
  const pointsRef = useRef()
  const { viewport } = useThree()

  // Generate particle positions for a double spiral galaxy
  const particleCount = 2500
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3)
    const cols = new Float32Array(particleCount * 3)

    const colorInside = new THREE.Color('#a855f7') // purple
    const colorOutside = new THREE.Color('#06b6d4') // cyan

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      const radius = Math.random() * 8
      const spinAngle = radius * 1.5
      const branchAngle = ((i % 3) * 2 * Math.PI) / 3

      const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3 * radius
      const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3 * radius
      const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 0.3 * radius

      pos[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX
      pos[i3 + 1] = randomY
      pos[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

      const mixedColor = colorInside.clone()
      mixedColor.lerp(colorOutside, radius / 8)

      cols[i3] = mixedColor.r
      cols[i3 + 1] = mixedColor.g
      cols[i3 + 2] = mixedColor.b
    }

    return [pos, cols]
  }, [])

  useFrame((state, delta) => {
    // 1. Slowly rotate particle galaxy
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04
    }

    // 2. Camera movements based on scrollProgress
    let targetX = 0
    let targetY = 0.3
    let targetZ = 8

    if (scrollProgress < 0.35) {
      // --- HERO STICKY SLIDES: Keep avatar centered, slowly zoom in
      targetX = THREE.MathUtils.lerp(0, -0.8, scrollProgress / 0.35)
      targetY = 0.3
      targetZ = THREE.MathUtils.lerp(7.5, 5.0, scrollProgress / 0.35)
    } 
    else if (scrollProgress >= 0.35 && scrollProgress < 0.6) {
      // --- ABOUT & SKILLS: Shift avatar left to make room for text panels
      const localProgress = (scrollProgress - 0.35) / 0.25
      targetX = THREE.MathUtils.lerp(-0.8, -2.2, localProgress)
      targetY = 0.3
      targetZ = THREE.MathUtils.lerp(5.0, 4.5, localProgress)
    } 
    else if (scrollProgress >= 0.6 && scrollProgress < 0.82) {
      // --- PROJECTS SECTION: Zoom in close to focus on avatar pointing
      const localProgress = (scrollProgress - 0.6) / 0.22
      targetX = THREE.MathUtils.lerp(-2.2, -1.8, localProgress)
      targetY = THREE.MathUtils.lerp(0.3, 0.1, localProgress)
      targetZ = THREE.MathUtils.lerp(4.5, 4.2, localProgress)
    } 
    else {
      // --- CONTACT SECTION: Center avatar for final crossed-arm pose
      const localProgress = (scrollProgress - 0.82) / 0.18
      targetX = THREE.MathUtils.lerp(-1.8, 0, localProgress)
      targetY = THREE.MathUtils.lerp(0.1, 0.4, localProgress)
      targetZ = THREE.MathUtils.lerp(4.2, 6.5, localProgress)
    }

    // Smooth camera translations using lerp
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.05)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.05)
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, targetZ, 0.05)
    
    // Smooth camera lookAt tilt based on scroll and mouse position
    const lookAtTargetX = targetX + 0.5 + (mouse.x * viewport.width * 0.03)
    const lookAtTargetY = targetY + (mouse.y * viewport.height * 0.03)
    
    const currentLookAt = new THREE.Vector3(0, 0.3, 0)
    currentLookAt.x = THREE.MathUtils.lerp(currentLookAt.x, lookAtTargetX, 0.05)
    currentLookAt.y = THREE.MathUtils.lerp(currentLookAt.y, lookAtTargetY, 0.05)
    state.camera.lookAt(currentLookAt)
  })

  return (
    <group>
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0.5} fade speed={1} />
      <Sparkles count={80} scale={10} size={2} color="#c084fc" speed={0.4} noise={0.2} />

      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          vertexColors
          transparent
          opacity={0.8}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeWrite={false}
        />
      </points>

      {/* 3D Animated Avatar Character */}
      <Avatar
        mouse={mouse}
        scrollProgress={scrollProgress}
        position={[0, -1.8, 0]}
        scale={2.2}
      />
    </group>
  )
}
