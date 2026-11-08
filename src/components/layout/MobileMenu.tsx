'use client'

import Link from 'next/link'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '../ui/sheet'
import { useTranslations } from 'next-intl'
import { NavItem } from '@/types'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import LanguageToggle from './LanguageToggle'
import ThemeToggle from './ThemeToggle'

type MobileMenuProps = {
  navItems: NavItem[]
}

export default function MobileMenu({ navItems }: MobileMenuProps) {
  const t = useTranslations('nav')
  const [isOpen, setIsOpen] = useState(false)

  const closeSheet = () => {
    setIsOpen(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Menu size={24} />
      </SheetTrigger>
      <SheetContent className="p-4 backdrop-blur-md bg-background/80" showCloseButton={false}>
        <SheetTitle>
          <span className="text-foreground font-semibold tracking-tight">
            Zywel<span className="text-teal-light">.</span>
          </span>
        </SheetTitle>
        {navItems.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            onClick={closeSheet}
            className="text-sm text-muted-foreground hover:text-teal-light transition-colors"
          >
            {t(item.title)}
          </Link>
        ))}
        <div className="flex items-center gap-3">
          <LanguageToggle className="hover:text-teal-light" />
          <ThemeToggle className="hover:text-teal-light" />
        </div>
      </SheetContent>
    </Sheet>
  )
}
