import { Technology } from '@/types'
import Section from '../layout/Section'
import { TECH } from '@/data/technologies'
import { FiExternalLink } from 'react-icons/fi'
import SectionTitle from '../ui/SectionTitle'
import Card from '../ui/Card'
import { useTranslations } from 'next-intl'
import TechBadge from '../ui/TechBadge'
import Link from 'next/link'
import { Link as LocaleLink } from '../../../i18n/navigation'
import { FaGithub } from 'react-icons/fa'

type Project = {
  title: string
  description: string
  technologies: Technology[]
  githubUrl: string
  liveUrl?: string
  demoPath?: string
}

const itemProject: Project[] = [
  {
    title: 'Ava',
    description: 'ava_description',
    technologies: [
      TECH.python,
      TECH.fastapi,
      TECH.postgresql,
      TECH.react,
      TECH.typescript,
      TECH.vite,
      TECH.tailwind,
      TECH.docker,
    ],
    githubUrl: 'https://github.com/zywelf/ava-assistant',
  },
  {
    title: 'Vue Store',
    description: 'vue_store_description',
    technologies: [TECH.vue, TECH.typescript, TECH.vite],
    githubUrl: 'https://github.com/zywelf/vue-store',
    liveUrl: 'https://vue-store-umber.vercel.app/',
  },
  {
    title: 'Task Manager APP',
    description: 'task_manager_app_description',
    technologies: [TECH.reactNative, TECH.typescript, TECH.expo],
    githubUrl: 'https://github.com/zywelf/task-manager-app',
    demoPath: '/projects/task-manager-app',
  },
  {
    title: 'Task Manager API',
    description: 'task_manager_description',
    technologies: [TECH.nodejs, TECH.express, TECH.typescript, TECH.postgresql, TECH.prisma, TECH.docker],
    githubUrl: 'https://github.com/zywelf/task-manager-api',
  },
  {
    title: 'Portfolio v2',
    description: 'portfolio_v2_description',
    technologies: [TECH.react, TECH.nextjs, TECH.typescript, TECH.tailwind],
    githubUrl: 'https://github.com/zywelf/portfolio-v2',
  },
  {
    title: 'Portfolio v1',
    description: 'portfolio_v1_description',
    technologies: [TECH.html, TECH.css, TECH.javascript],
    githubUrl: 'https://github.com/zywelf/Portfolio',
  },
  {
    title: 'myBlivion',
    description: 'flutter_description',
    technologies: [TECH.flutter, TECH.dart],
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
                {item.demoPath && (
                  <LocaleLink
                    href={item.demoPath}
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-teal-light transition-colors"
                  >
                    <FiExternalLink size={16} aria-hidden="true" />
                    {t('live_demo')}
                  </LocaleLink>
                )}
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
