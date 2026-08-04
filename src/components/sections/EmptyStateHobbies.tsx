import { useTranslations } from 'next-intl'
import { Gamepad2 } from 'lucide-react'

export function EmptyState() {
  const t = useTranslations('hobbies')

  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <Gamepad2 className="h-10 w-10 text-muted-foreground" aria-hidden />
      <p className="text-muted-foreground text-sm">{t('unavailable')}</p>
    </div>
  )
}
