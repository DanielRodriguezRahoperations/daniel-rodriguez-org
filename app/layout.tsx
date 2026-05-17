import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Cormorant_Garamond, Inter } from 'next/font/google'
import ClientShell from './_components/ClientShell'
import './globals.css'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
}

export const metadata: Metadata = {
  title: {
    default: 'Daniel Rodriguez | Arizona Entrepreneur, SEO & Website Design Expert',
    template: '%s | Daniel Rodriguez',
  },
  description:
    'Daniel Rodriguez is a Scottsdale-based entrepreneur, founder of RAH Operations LLC, IAPDA-certified debt specialist, and digital marketing strategist helping businesses grow.',
  keywords: [
    'Daniel Rodriguez',
    'Daniel Rodriguez Arizona',
    'Daniel Rodriguez RAH Operations',
    'Arizona entrepreneur',
    'Scottsdale website design',
    'Phoenix SEO',
    'business credit',
  ],
  authors: [{ name: 'Daniel Rodriguez' }],
  robots: { index: true, follow: true },
  metadataBase: new URL('https://danielrodriguez.org'),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Daniel Rodriguez',
    title: 'Daniel Rodriguez | Arizona Entrepreneur & Business Strategist',
    description:
      'Scottsdale-based entrepreneur, founder of RAH Operations LLC, IAPDA-certified debt specialist, and digital marketing strategist.',
    url: 'https://danielrodriguez.org/',
    images: [{ url: '/og-image.jpg' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daniel Rodriguez | Arizona Entrepreneur & Business Strategist',
    description:
      'Scottsdale-based entrepreneur, founder of RAH Operations LLC, IAPDA-certified debt specialist.',
    images: ['/og-image.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://danielrodriguez.org/#person',
      name: 'Daniel Rodriguez',
      url: 'https://danielrodriguez.org',
      sameAs: [
        'https://www.linkedin.com/in/danielrodriguez-scottsdale/',
        'https://www.instagram.com/drod6211/',
        'https://www.rahoperations.com',
      ],
      jobTitle: 'Entrepreneur, Strategist & Business Builder',
      description:
        'Scottsdale-based entrepreneur, founder of RAH Operations LLC, owner of SunVision Solar, and IAPDA-certified Senior Debt Specialist with expertise in digital marketing, SEO, business credit, and clean energy.',
      worksFor: {
        '@type': 'Organization',
        name: 'RAH Operations LLC',
        url: 'https://www.rahoperations.com',
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Scottsdale',
        addressRegion: 'AZ',
        addressCountry: 'US',
      },
      knowsAbout: [
        'Digital Marketing', 'SEO', 'Website Design', 'Business Credit',
        'Debt Relief', 'Solar Energy', 'Personal Branding', 'Sales Strategy',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://danielrodriguez.org/#website',
      name: 'Daniel Rodriguez',
      url: 'https://danielrodriguez.org',
      description:
        'Personal brand site for Daniel Rodriguez — Arizona entrepreneur, digital marketing strategist, and business builder.',
      author: { '@id': 'https://danielrodriguez.org/#person' },
    },
    {
      '@type': 'Organization',
      '@id': 'https://www.rahoperations.com/#org',
      name: 'RAH Operations LLC',
      url: 'https://www.rahoperations.com',
      founder: { '@id': 'https://danielrodriguez.org/#person' },
      description:
        'Website design, SEO, digital marketing, and business credit services for entrepreneurs and small businesses.',
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${cormorantGaramond.variable} ${inter.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  )
}
