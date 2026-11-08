import type { Metadata } from 'next'
import { Archivo } from 'next/font/google'
import { getTranslations } from 'next-intl/server'
import { FiArrowLeft } from 'react-icons/fi'
import AppLink from '@/components/ui/AppLink'
import TaskAppDemo from '@/components/demos/task-manager/TaskAppDemo'

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '600', '800'],
  variable: '--font-archivo',
})

const STACK = ['Expo SDK 54', 'TypeScript', 'expo-router', 'Reanimated', 'React Query']

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'task_manager_demo' })
  return {
    title: 'Task Manager | Zywel Fankam',
    description: t('intro'),
    alternates: {
      languages: {
        it: '/it/projects/task-manager-app',
        en: '/en/projects/task-manager-app',
      },
    },
  }
}

export default async function TaskManagerDemoPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'task_manager_demo' })

  return (
    <main
      className={`${archivo.variable} relative flex min-h-screen flex-wrap items-center justify-center gap-[72px] bg-background px-8 pb-14 pt-[88px] text-foreground`}
    >
      <AppLink
        href="/#projects"
        className="absolute left-6 top-6 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-teal-light"
      >
        <FiArrowLeft size={16} aria-hidden="true" />
        {t('back')}
      </AppLink>

      <section className="flex max-w-[440px] flex-[1_1_320px] flex-col gap-5">
        <span className="text-xs font-semibold uppercase tracking-[.14em] text-teal-light">
          {t('kicker')}
        </span>
        <h1 className="text-5xl font-extrabold leading-none tracking-[-.03em] sm:text-[56px]">
          Task Manager
        </h1>
        <p className="text-lg leading-[1.55] text-muted-foreground [text-wrap:pretty]">{t('intro')}</p>
        <div className="flex flex-wrap gap-2">
          {STACK.map((s) => (
            <span key={s} className="rounded-full border border-border px-3 py-1.5 text-[13px]">
              {s}
            </span>
          ))}
        </div>
        <div className="mt-2 flex flex-col gap-2 rounded-2xl border border-border bg-card px-5 py-[18px]">
          <span className="text-[15px] font-extrabold">{t('try_title')}</span>
          <span className="text-[15px] leading-[1.5] text-muted-foreground">{t('try_body')}</span>
        </div>
        <AppLink
          href="https://github.com/zywelf/task-manager-app"
          className="text-[15px] font-semibold text-teal-light hover:text-teal"
        >
          {t('code')}
        </AppLink>
      </section>

      <div className="flex-none rounded-[56px] shadow-[0_0_0_1px_#2e2e2e,0_0_0_2px_#0a0a0a,0_40px_90px_rgba(45,212,191,.10)]">
        <TaskAppDemo />
      </div>
    </main>
  )
}
