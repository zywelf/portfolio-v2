'use client'
import Section from '../layout/Section'
import SectionTitle from '../ui/SectionTitle'
import SectionSubtitle from '../ui/SectionSubtitle'
import { useTranslations } from 'next-intl'

export default function HobbiesSkeleton() {
  const t = useTranslations('hobbies')

  return (
    <Section id="hobbies">
      <SectionTitle>{t('title')}</SectionTitle>
      <SectionSubtitle text={t('games')} />
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="basis-1/2 shrink-0">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-muted animate-pulse" />
            <div className="mt-2 mx-auto h-4 w-2/3 rounded bg-muted animate-pulse" />
          </div>
        ))}
      </div>
    </Section>
  )
}