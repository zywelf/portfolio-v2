import Section from '../layout/Section'
import { PROJECTS } from '@/data/projects'
import { FiExternalLink } from 'react-icons/fi'
import SectionTitle from '../ui/SectionTitle'
import Card from '../ui/Card'
import { useTranslations } from 'next-intl'
import TechBadge from '../ui/TechBadge'
import Link from 'next/link'
import { Link as LocaleLink } from '../../../i18n/navigation'
import { FaGithub } from 'react-icons/fa'

export default function Projects() {
  const t = useTranslations('projects')
  return (
    <Section id="projects">
      <SectionTitle>{t('title')}</SectionTitle>
      <div className="flex flex-col gap-6">
        {PROJECTS.map((item) => (
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
