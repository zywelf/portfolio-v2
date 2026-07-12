'use client'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '../../../i18n/navigation'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { NavItem } from '@/types'
import MobileMenu from './MobileMenu'
import { IT, GB } from 'country-flag-icons/react/3x2'

const navItems: NavItem[] = [
  {
    title: 'about',
    href: '#about',
  },
  {
    title: 'experience',
    href: '#experience',
  },
  {
    title: 'projects',
    href: '#projects',
  },
  {
    title: 'hobbies',
    href: '#hobbies',
  },
  {
    title: 'contact',
    href: '#contact',
  },
]

export default function Navbar() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('nav')
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line
    setMounted(true)
  }, [])

  const switchTheme = () => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }

  const switchLanguage = () => {
    const newLocale = locale === 'it' ? 'en' : 'it'
    router.replace(pathname, { locale: newLocale, scroll: false })
  }

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between px-6 py-3 rounded-md backdrop-blur-md bg-background/70 border dark:border-white/10 border-black/10 shadow-lg w-auto gap-12">
      <span className="text-foreground font-semibold tracking-tight">
        Zywel<span className="text-teal-light">.</span>
      </span>

      <div className="md:flex hidden items-center gap-8">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t(item.title)}
          </Link>
        ))}
      </div>

      <div className="md:flex hidden items-center gap-3">
        <button
          type="button"
          onClick={switchLanguage}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {locale === 'it' ? <IT className="w-4 h-4" /> : <GB className="w-4 h-4" />}
          <span>{t('language')}</span>
        </button>
        {mounted && (
          <button
            type="button"
            onClick={switchTheme}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {resolvedTheme === 'dark' ? '☀️' : '🌙'}
          </button>
        )}
      </div>
      <div className="md:hidden flex items-center">
        <MobileMenu
          locale={locale}
          resolvedTheme={resolvedTheme ?? 'dark'}
          onSwitchLanguage={switchLanguage}
          onSwitchTheme={switchTheme}
          mounted={mounted}
          navItems={navItems}
        />
      </div>
    </nav>
  )
}
