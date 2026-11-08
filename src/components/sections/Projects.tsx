import { useTranslations } from 'next-intl'
import { FiExternalLink } from 'react-icons/fi'
import { FaGithub } from 'react-icons/fa'
import Section from '../layout/Section'
import SectionTitle from '../ui/SectionTitle'
import Card from '../ui/Card'
import TechBadge from '../ui/TechBadge'
import AppLink from '../ui/AppLink'
import { PROJECTS } from '@/data/projects'

const LINK_CLASS = 'text-muted-foreground hover:text-teal-light transition-colors'

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
                {item.links?.map((link) => (
                  <AppLink
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-1.5 text-sm ${LINK_CLASS}`}
                  >
                    <FiExternalLink size={16} aria-hidden="true" />
                    {t(link.label)}
                  </AppLink>
                ))}
                <AppLink
                  href={item.githubUrl}
                  className={LINK_CLASS}
                  aria-label={`${item.title} - source code`}
                >
                  <FaGithub size={24} />
                </AppLink>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-2">{t(item.description)}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {item.technologies.map((tech) => (
                <TechBadge key={tech.name} name={tech.name} icon={tech.icon} />
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}
