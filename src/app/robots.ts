import type { MetadataRoute } from 'next'

const baseUrl = 'https://portfolio-v2-three-bay-23.vercel.app'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
