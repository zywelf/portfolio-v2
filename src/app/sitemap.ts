import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { it: `${SITE_URL}/it`, en: `${SITE_URL}/en` }
  const demoLanguages = {
    it: `${SITE_URL}/it/projects/task-manager-app`,
    en: `${SITE_URL}/en/projects/task-manager-app`,
  }

  return [
    { url: `${SITE_URL}/it`, lastModified: new Date(), alternates: { languages } },
    { url: `${SITE_URL}/en`, lastModified: new Date(), alternates: { languages } },
    ...(['it', 'en'] as const).map((l) => ({
      url: `${SITE_URL}/${l}/projects/task-manager-app`,
      lastModified: new Date(),
      alternates: { languages: demoLanguages },
    })),
  ]
}
