import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Daniel Rodriguez | Entrepreneur, Strategist & Business Builder',
  description:
    'Meet Daniel Rodriguez — Scottsdale-based entrepreneur, founder of RAH Operations LLC, owner of SunVision Solar, IAPDA-certified Senior Debt Specialist with 10+ years building businesses across digital marketing, credit, debt relief, and clean energy.',
  keywords: [
    'Daniel Rodriguez about',
    'Daniel Rodriguez entrepreneur',
    'Daniel Rodriguez Arizona',
    'RAH Operations founder',
    'IAPDA certified debt specialist',
  ],
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Daniel Rodriguez | Entrepreneur, Strategist & Business Builder',
    description:
      'Meet Daniel Rodriguez — Scottsdale-based entrepreneur, founder of RAH Operations LLC, IAPDA-certified Senior Debt Specialist.',
    url: 'https://danielrodriguez.org/about',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
