import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Avatar({ mouse, scrollProgress, ...props }) {
  const group = useRef()
  
  // Load the locally hosted GLB avatar model
  const { scene, nodes } = useGLTF('/my-avatar.glb')

  useEffect(() => {
    // Enable shadows on the avatar meshes for high visual quality
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true
        child.receiveShadow = true
        if (child.material) {
          child.material.roughness = 0.6
          child.material.metalness = 0.1
        }
      }
    })
  }, [scene])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    const offset = scrollProgress // Scroll offset from 0 to 1

    // 1. Head and Neck tracking (Looks at the cursor)
    if (nodes.Head && nodes.Neck) {
      // Smoothly interpolate rotations to look at cursor
      const targetHeadY = mouse.x * 0.6
      const targetHeadX = -mouse.y * 0.4
      
      nodes.Head.rotation.y = THREE.MathUtils.lerp(nodes.Head.rotation.y, targetHeadY, 0.1)
      nodes.Head.rotation.x = THREE.MathUtils.lerp(nodes.Head.rotation.x, targetHeadX, 0.1)
      
      nodes.Neck.rotation.y = THREE.MathUtils.lerp(nodes.Neck.rotation.y, targetHeadY * 0.5, 0.1)
      nodes.Neck.rotation.x = THREE.MathUtils.lerp(nodes.Neck.rotation.x, targetHeadX * 0.5, 0.1)
    }

    // 2. Procedural Scroll-Bound Animations
    if (nodes.RightArm && nodes.LeftArm && nodes.RightForeArm && nodes.LeftForeArm && nodes.Spine) {
      
      // RESET defaults
      nodes.RightArm.rotation.set(0, 0, 0)
      nodes.LeftArm.rotation.set(0, 0, 0)
      nodes.RightForeArm.rotation.set(0, 0, 0)
      nodes.LeftForeArm.rotation.set(0, 0, 0)
      nodes.Spine.rotation.set(0, 0, 0)

      if (offset < 0.25) {
        // --- HERO SECTION: Waving ---
        // Right arm raised and waving
        nodes.RightArm.rotation.z = -1.3
        nodes.RightArm.rotation.x = Math.sin(time * 5) * 0.2 - 0.2
        nodes.RightForeArm.rotation.y = Math.cos(time * 5) * 0.1
        
        // Left arm relaxed at side
        nodes.LeftArm.rotation.z = 1.3
        nodes.LeftArm.rotation.x = Math.sin(time * 1.5) * 0.05
      } 
      else if (offset >= 0.25 && offset < 0.55) {
        // --- TIMELINE SECTION: Coding/Typing ---
        // Both arms raised forward
        nodes.RightArm.rotation.x = -0.7
        nodes.RightArm.rotation.y = -0.3
        nodes.RightArm.rotation.z = -0.2
        nodes.LeftArm.rotation.x = -0.7
        nodes.LeftArm.rotation.y = 0.3
        nodes.LeftArm.rotation.z = 0.2
        
        // Fast typing wrist movement
        nodes.RightForeArm.rotation.x = -0.4 + Math.sin(time * 20) * 0.08
        nodes.LeftForeArm.rotation.x = -0.4 + Math.cos(time * 20) * 0.08
        
        nodes.Spine.rotation.x = 0.1 // Tilt forward
      } 
      else if (offset >= 0.55 && offset < 0.8) {
        // --- PROJECTS SECTION: Pointing ---
        // Left arm points towards the projects list
        nodes.LeftArm.rotation.x = -0.5
        nodes.LeftArm.rotation.z = -1.2 // Raised pointing
        nodes.LeftArm.rotation.y = 0.5
        nodes.LeftForeArm.rotation.y = -0.2
        
        // Right arm rests on hip
        nodes.RightArm.rotation.x = 0.2
        nodes.RightArm.rotation.z = -0.6
        nodes.RightForeArm.rotation.x = -0.8
        
        nodes.Spine.rotation.y = -0.15 // Turn body slightly
      } 
      else {
        // --- CONTACT SECTION: Confident Cross Arms ---
        // Cross arms over chest
        nodes.RightArm.rotation.x = -0.6
        nodes.RightArm.rotation.y = -0.4
        nodes.RightArm.rotation.z = -0.3
        nodes.LeftArm.rotation.x = -0.6
        nodes.LeftArm.rotation.y = 0.4
        nodes.LeftArm.rotation.z = 0.3
        
        nodes.RightForeArm.rotation.y = 0.8
        nodes.LeftForeArm.rotation.y = -0.8
        
        // Idle body breath sway
        nodes.Spine.rotation.z = Math.sin(time * 1.5) * 0.02
        nodes.Spine.rotation.x = Math.cos(time * 1.5) * 0.02
      }
    }
  })

  return <primitive object={scene} ref={group} {...props} />
}

// Preload the local model to prevent loading lag
useGLTF.preload('/my-avatar.glb')
