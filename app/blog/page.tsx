import type { Metadata } from 'next'
import BlogContent from './_content'

export const metadata: Metadata = {
  title: 'Daniel Rodriguez Blog | SEO, Website Design & Business Strategy Insights',
  description:
    'Daniel Rodriguez shares practical insights on SEO, website design, business credit, digital marketing, and personal branding for entrepreneurs and business owners.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Daniel Rodriguez Blog | SEO, Website Design & Business Strategy Insights',
    description:
      'Practical insights on SEO, website design, business credit, and digital marketing for entrepreneurs.',
    url: 'https://danielrodriguez.org/blog',
  },
}

export default function Page() {
  return <BlogContent />
}
