import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['it', 'en'],
  defaultLocale: 'it',
  localeDetection: false,
})

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
