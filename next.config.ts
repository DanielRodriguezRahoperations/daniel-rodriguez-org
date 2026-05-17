import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  distDir: '.next',
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
}

export default nextConfig
