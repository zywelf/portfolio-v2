import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Metadata } from 'next'
import { HtmlLangSync } from '@/components/layout/HtmlLangSync'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params

  const isIT = locale === 'it'

  return {
    title: 'Zywel Fankam | Full Stack Developer',
    description: isIT
      ? 'Full Stack Developer specializzato in React, Next.js e Django. Dal Frontend al Backend, dal pixel al server.'
      : 'Full Stack Developer specialized in React, Next.js and Django. Front to back, pixel to server.',
    keywords: isIT
      ? ['Full Stack Developer', 'React', 'Next.js', 'TypeScript', 'Django', 'Portfolio']
      : ['Full Stack Developer', 'React', 'Next.js', 'TypeScript', 'Django', 'Portfolio'],
    authors: [{ name: 'Zywel Fankam' }],
    openGraph: {
      title: 'Zywel Fankam | Full Stack Developer',
      description: isIT
        ? 'Full Stack Developer specializzato in React, Next.js e Django.'
        : 'Full Stack Developer specialized in React, Next.js and Django.',
      url: 'https://portfolio-v2-three-bay-23.vercel.app',
      siteName: 'Zywel Fankam Portfolio',
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Zywel Fankam | Full Stack Developer',
      description: isIT
        ? 'Full Stack Developer specializzato in React, Next.js e Django.'
        : 'Full Stack Developer specialized in React, Next.js and Django.',
    },
  }
}

export default async function LocaleLayout({ children, params }: Props) {
  const messages = await getMessages()
  const { locale } = await params

  return (
    <NextIntlClientProvider messages={messages}>
      <HtmlLangSync locale={locale} />
      {children}
    </NextIntlClientProvider>
  )
}
