import type { Metadata } from 'next'
import PressContent from './_content'

export const metadata: Metadata = {
  title: 'Daniel Rodriguez In The Media | Press & Recognition',
  description:
    'Media coverage of Daniel Rodriguez, founder of RAH Operations LLC — featured in PRLog, BizWire Express, 1888 Press Release, and Articleted for his work in digital marketing, business credit, and entrepreneurship.',
  keywords: [
    'Daniel Rodriguez press',
    'Daniel Rodriguez media',
    'Daniel Rodriguez PRLog',
    'RAH Operations coverage',
  ],
  alternates: { canonical: '/press' },
  openGraph: {
    title: 'Daniel Rodriguez In The Media | Press & Recognition',
    description:
      'Five media features across four independent publications — all earned, no paid placements.',
    url: 'https://danielrodriguez.org/press',
  },
}

export default function Page() {
  return <PressContent />
}
