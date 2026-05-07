import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'

function Scene() {
  const outerRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((_state, delta) => {
    if (outerRef.current) {
      outerRef.current.rotation.x += delta * 0.12
      outerRef.current.rotation.y += delta * 0.18
    }
    if (innerRef.current) {
      innerRef.current.rotation.x -= delta * 0.09
      innerRef.current.rotation.y += delta * 0.14
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.08
      ringRef.current.rotation.y += delta * 0.05
    }
  })

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[4, 4, 4]} color="#c9a96e" intensity={3} />
      <pointLight position={[-3, -3, 3]} color="#ffffff" intensity={0.8} />

      <Stars radius={30} count={600} fade />

      {/* Outer wireframe icosahedron */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshBasicMaterial
          color="#c9a96e"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Inner solid icosahedron */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color="#c9a96e"
          emissive="#c9a96e"
          emissiveIntensity={0.4}
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>

      {/* Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.4, 0.008, 16, 100]} />
        <meshBasicMaterial
          color="#c9a96e"
          transparent
          opacity={0.3}
        />
      </mesh>
    </>
  )
}

export default function FloatingGeometry() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <Scene />
    </Canvas>
  )
}
