import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) ?? 'it'

  return {
    locale,
    messages:
      locale === 'it'
        ? (await import(`../messages/it.json`)).default
        : (await import(`../messages/en.json`)).default,
  }
})
