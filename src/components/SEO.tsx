import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'Daniel Rodriguez | Arizona Entrepreneur & Business Strategist'
const BASE_URL = 'https://danielrodriguez.org'
const DEFAULT_OG_IMAGE = '/og-image.jpg'

type Props = {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  type?: 'website' | 'article'
  publishedTime?: string
  keywords?: string
}

export default function SEO({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  type = 'website',
  publishedTime,
  keywords,
}: Props) {
  const fullCanonical = canonical ? `${BASE_URL}${canonical}` : BASE_URL
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={fullOgImage} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
    </Helmet>
  )
}
