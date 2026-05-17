import type { Metadata } from 'next'
import ContactContent from './_content'

export const metadata: Metadata = {
  title: 'Contact Daniel Rodriguez | Work With Me',
  description:
    'Ready to build something real? Contact Daniel Rodriguez for website design, SEO, business credit, debt relief strategy, or digital marketing. Based in Scottsdale, Arizona — serving clients nationwide.',
  keywords: [
    'contact Daniel Rodriguez',
    'work with Daniel Rodriguez',
    'Daniel Rodriguez consultation',
    'RAH Operations contact',
    'Scottsdale business consultant',
  ],
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Daniel Rodriguez | Work With Me',
    description:
      'Ready to build something real? Contact Daniel Rodriguez for website design, SEO, business credit, or digital marketing.',
    url: 'https://danielrodriguez.org/contact',
  },
}

export default function Page() {
  return <ContactContent />
}
