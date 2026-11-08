import type { Metadata } from 'next'
import { Archivo } from 'next/font/google'
import { getTranslations } from 'next-intl/server'
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from '../../../../../i18n/navigation'
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
      className={`${archivo.variable} relative flex min-h-screen flex-wrap items-center justify-center gap-18 bg-background px-8 pb-14 pt-22 text-foreground`}
    >
      <Link
        href="/#projects"
        className="absolute left-6 top-6 flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-teal-light"
      >
        <FiArrowLeft size={16} aria-hidden="true" />
        {t('back')}
      </Link>

      <section className="flex max-w-110 flex-1 basis-80 flex-col gap-5">
        <span className="text-xs font-semibold uppercase tracking-widest text-teal-light">{t('kicker')}</span>
        <h1 className="text-5xl font-extrabold leading-none tracking-tight sm:text-6xl">Task Manager</h1>
        <p className="text-lg leading-normal text-muted-foreground text-pretty">{t('intro')}</p>
        <div className="flex flex-wrap gap-2">
          {STACK.map(s => (
            <span key={s} className="rounded-full border border-border px-3 py-1.5 text-sm">
              {s}
            </span>
          ))}
        </div>
        <div className="mt-2 flex flex-col gap-2 rounded-2xl border border-border bg-card px-5 py-4.5">
          <span className="text-base font-extrabold">{t('try_title')}</span>
          <span className="text-base leading-normal text-muted-foreground">{t('try_body')}</span>
        </div>
        <a
          href="https://github.com/zywelf/task-manager-app"
          target="_blank"
          rel="noreferrer"
          className="text-base font-semibold text-teal-light hover:text-teal"
        >
          {t('code')}
        </a>
      </section>

      <div className="flex-none rounded-4xl ring-1 ring-border shadow-2xl shadow-teal-light/10">
        <TaskAppDemo />
      </div>
    </main>
  )
}
