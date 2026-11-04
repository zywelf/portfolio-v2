import type { MetadataRoute } from 'next'

const baseUrl = 'https://portfolio-v2-three-bay-23.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { it: `${baseUrl}/it`, en: `${baseUrl}/en` }

  return [
    { url: `${baseUrl}/it`, lastModified: new Date(), alternates: { languages } },
    { url: `${baseUrl}/en`, lastModified: new Date(), alternates: { languages } },
  ]
}
