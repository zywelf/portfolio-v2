import type { MetadataRoute } from 'next'

const baseUrl = 'https://portfolio-v2-three-bay-23.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { it: `${baseUrl}/it`, en: `${baseUrl}/en` }
  const demoLanguages = {
    it: `${baseUrl}/it/projects/task-manager-app`,
    en: `${baseUrl}/en/projects/task-manager-app`,
  }

  return [
    { url: `${baseUrl}/it`, lastModified: new Date(), alternates: { languages } },
    { url: `${baseUrl}/en`, lastModified: new Date(), alternates: { languages } },
    ...(['it', 'en'] as const).map((l) => ({
      url: `${baseUrl}/${l}/projects/task-manager-app`,
      lastModified: new Date(),
      alternates: { languages: demoLanguages },
    })),
  ]
}
