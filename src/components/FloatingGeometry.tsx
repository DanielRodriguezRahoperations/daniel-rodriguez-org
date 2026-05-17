'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'

function Scene() {
  const groupRef = useRef<THREE.Group>(null)
  const outerRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    const mouse = state.mouse

    // Whole group follows mouse — gives the parallax 3D depth illusion
    if (groupRef.current) {
      groupRef.current.rotation.x +=
        (mouse.y * 0.25 - groupRef.current.rotation.x) * 0.06
      groupRef.current.rotation.y +=
        (mouse.x * 0.4 - groupRef.current.rotation.y) * 0.06
    }

    // Individual mesh self-rotations
    if (outerRef.current) {
      outerRef.current.rotation.x += delta * 0.08
      outerRef.current.rotation.y += delta * 0.14
    }
    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * 0.1
      innerRef.current.rotation.y += delta * 0.18
      innerRef.current.rotation.z += delta * 0.05
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.06
      ringRef.current.rotation.y += delta * 0.04
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z -= delta * 0.05
      ring2Ref.current.rotation.x += delta * 0.03
    }
  })

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[4, 4, 4]} color="#97CCF6" intensity={4} />
      <pointLight position={[-4, -3, 3]} color="#ffffff" intensity={0.6} />
      <pointLight position={[0, -4, -2]} color="#97CCF6" intensity={1} />

      <Stars radius={25} depth={20} count={500} factor={1.2} fade speed={0.2} />

      <group ref={groupRef}>
        {/* Outer wireframe icosahedron — large, dim */}
        <mesh ref={outerRef}>
          <icosahedronGeometry args={[1.7, 1]} />
          <meshBasicMaterial color="#97CCF6" wireframe transparent opacity={0.1} />
        </mesh>

        {/* Inner metallic core */}
        <mesh ref={innerRef}>
          <icosahedronGeometry args={[0.85, 0]} />
          <meshStandardMaterial
            color="#001828"
            emissive="#97CCF6"
            emissiveIntensity={0.6}
            metalness={1}
            roughness={0.0}
          />
        </mesh>

        {/* Primary orbit ring */}
        <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.45, 0.007, 16, 120]} />
          <meshBasicMaterial color="#97CCF6" transparent opacity={0.35} />
        </mesh>

        {/* Secondary orbit ring — offset axis */}
        <mesh ref={ring2Ref} rotation={[Math.PI / 5, Math.PI / 4, 0]}>
          <torusGeometry args={[1.2, 0.004, 16, 100]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.08} />
        </mesh>

        {/* Outer glow sphere */}
        <mesh>
          <sphereGeometry args={[2.0, 32, 32]} />
          <meshBasicMaterial
            color="#97CCF6"
            transparent
            opacity={0.015}
            side={THREE.BackSide}
          />
        </mesh>
      </group>
    </>
  )
}

export default function FloatingGeometry() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <Scene />
    </Canvas>
  )
}
