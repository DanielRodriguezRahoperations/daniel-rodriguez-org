import type { Metadata } from 'next'
import HomeContent from './_home'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default function Page() {
  return <HomeContent />
}
