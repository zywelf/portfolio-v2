'use client'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { NavItem } from '@/types'
import MobileMenu from './MobileMenu'
import LanguageToggle from './LanguageToggle'
import ThemeToggle from './ThemeToggle'

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
  const t = useTranslations('nav')

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
        <LanguageToggle className="hover:text-foreground" />
        <ThemeToggle className="hover:text-foreground" />
      </div>
      <div className="md:hidden flex items-center">
        <MobileMenu navItems={navItems} />
      </div>
    </nav>
  )
}
