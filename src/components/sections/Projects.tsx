import { Technology } from '@/types'
import Section from '../layout/Section'
import {
  Css3Original,
  Html5Original,
  JavascriptOriginal,
  NextjsOriginal,
  ReactOriginal,
  TailwindcssOriginal,
  TypescriptOriginal,
  FlutterOriginal,
  DartOriginal,
  NodejsOriginal,
  ExpressOriginal,
  PostgresqlOriginal,
  PrismaOriginal,
  DockerOriginal,
  ReactnativeOriginal,
  ExpoOriginal,
  VuejsOriginal,
  ViteOriginal,
} from 'devicons-react'
import { FiExternalLink } from 'react-icons/fi'
import SectionTitle from '../ui/SectionTitle'
import Card from '../ui/Card'
import { useTranslations } from 'next-intl'
import TechBadge from '../ui/TechBadge'
import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'

type Project = {
  title: string
  description: string
  technologies: Technology[]
  githubUrl: string
  liveUrl?: string
}

const itemProject: Project[] = [
  {
    title: 'Vue Store',
    description: 'vue_store_description',
    technologies: [
      {
        name: 'Vue.js',
        icon: VuejsOriginal,
      },
      {
        name: 'TypeScript',
        icon: TypescriptOriginal,
      },
      {
        name: 'Vite',
        icon: ViteOriginal,
      },
    ],
    githubUrl: 'https://github.com/zywelf/vue-store',
    liveUrl: 'https://vue-store-umber.vercel.app/',
  },
  {
    title: 'Task Manager APP',
    description: 'task_manager_app_description',
    technologies: [
      {
        name: 'React Native',
        icon: ReactnativeOriginal,
      },
      {
        name: 'TypeScript',
        icon: TypescriptOriginal,
      },
      {
        name: 'Expo',
        icon: ExpoOriginal,
      },
    ],
    githubUrl: 'https://github.com/zywelf/task-manager-app',
  },
  {
    title: 'Task Manager API',
    description: 'task_manager_desciption',
    technologies: [
      {
        name: 'Node.js',
        icon: NodejsOriginal,
      },
      {
        name: 'Express',
        icon: ExpressOriginal,
      },
      {
        name: 'TypeScript',
        icon: TypescriptOriginal,
      },
      {
        name: 'PostgreSQL',
        icon: PostgresqlOriginal,
      },
      {
        name: 'Prisma',
        icon: PrismaOriginal,
      },
      {
        name: 'Docker',
        icon: DockerOriginal,
      },
    ],
    githubUrl: 'https://github.com/zywelf/task-manager-api',
  },
  {
    title: 'Portfolio v2',
    description: 'portfolio_v2_description',
    technologies: [
      {
        name: 'React',
        icon: ReactOriginal,
      },
      {
        name: 'Next.js',
        icon: NextjsOriginal,
      },
      {
        name: 'TypeScript',
        icon: TypescriptOriginal,
      },
      {
        name: 'Tailwind CSS',
        icon: TailwindcssOriginal,
      },
    ],
    githubUrl: 'https://github.com/zywelf/portfolio-v2',
  },
  {
    title: 'Portfolio v1',
    description: 'portfolio_v1_description',
    technologies: [
      {
        name: 'HTML',
        icon: Html5Original,
      },
      {
        name: 'CSS',
        icon: Css3Original,
      },
      {
        name: 'JavaScript',
        icon: JavascriptOriginal,
      },
    ],
    githubUrl: 'https://github.com/zywelf/Portfolio',
  },
  {
    title: 'myBlivion',
    description: 'flutter_description',
    technologies: [
      {
        name: 'Flutter',
        icon: FlutterOriginal,
      },
      {
        name: 'Dart',
        icon: DartOriginal,
      },
    ],
    githubUrl: 'https://github.com/zywelf/myblivion_application',
  },
]

export default function Projects() {
  const t = useTranslations('projects')
  return (
    <Section id="projects">
      <SectionTitle>{t('title')}</SectionTitle>
      <div className="flex flex-col gap-6">
        {itemProject.map((item) => (
          <Card key={item.title}>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
              <div className="flex items-center gap-8">
                {item.liveUrl && (
                  <Link
                    href={item.liveUrl}
                    target="_blank"
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-teal-light transition-colors"
                  >
                    <FiExternalLink size={16} aria-hidden="true" />
                    {t('live_demo')}
                  </Link>
                )}
                <Link
                  href={item.githubUrl}
                  target="_blank"
                  className="text-muted-foreground hover:text-teal-light transition-colors"
                  aria-label={`${item.title} - source code`}
                >
                  <FaGithub size={24} />
                </Link>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-2">{t(item.description)}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {item.technologies.map((bullet) => (
                <TechBadge key={bullet.name} name={bullet.name} icon={bullet.icon} />
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}
