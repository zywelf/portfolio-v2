'use client'
import { useLocale, useTranslations } from 'next-intl'
import { IT, GB } from 'country-flag-icons/react/3x2'
import { usePathname, useRouter } from '../../../i18n/navigation'
import { cn } from '@/lib/utils'

export default function LanguageToggle({ className }: { className?: string }) {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('nav')

  const switchLanguage = () => {
    router.replace(pathname, { locale: locale === 'it' ? 'en' : 'it', scroll: false })
  }

  return (
    <button
      type="button"
      onClick={switchLanguage}
      className={cn(
        'flex items-center gap-1.5 text-sm text-muted-foreground transition-colors cursor-pointer',
        className
      )}
    >
      {locale === 'it' ? <IT className="w-4 h-4" /> : <GB className="w-4 h-4" />}
      <span>{t('language')}</span>
    </button>
  )
}
