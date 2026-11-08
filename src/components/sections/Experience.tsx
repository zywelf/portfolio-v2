import Section from '../layout/Section'
import { useTranslations } from 'next-intl'
import TechBadge from '../ui/TechBadge'
import Card from '../ui/Card'
import SectionTitle from '../ui/SectionTitle'
import { Technology } from '@/types'
import { TECH } from '@/data/technologies'

type Experience = {
  company: string
  role: string
  duration: string
  description: string
  technologies: Technology[]
}

const listExperience: Experience[] = [
  {
    company: 'Metriks.ai',
    role: 'Full Stack Developer',
    duration: '03/2025 - 02/2026',
    description: 'metriks_bullets',
    technologies: [
      TECH.react,
      TECH.nextjs,
      TECH.typescript,
      TECH.javascript,
      TECH.html,
      TECH.css,
      TECH.vue,
      TECH.tailwind,
      TECH.django,
      TECH.postgresql,
      TECH.python,
      TECH.docker,
      TECH.aws,
      TECH.git,
    ],
  },
  {
    company: 'GiaoGiao',
    role: 'Frontend Developer',
    duration: '01/2022 - 02/2023',
    description: 'giaogiao_bullets',
    technologies: [TECH.vue, TECH.javascript, TECH.html, TECH.css, TECH.python, TECH.mysql, TECH.git],
  },
]

export default function Experience() {
  const t = useTranslations('experience')

  return (
    <Section id="experience">
      <SectionTitle>{t('title')}</SectionTitle>
      <div className="flex flex-col gap-6">
        {listExperience.map((job) => (
          <Card key={`job-${job.company}`}>
            {/* Header — ruolo, azienda, periodo */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">{job.role}</h3>
                <span className="text-teal text-sm">{job.company}</span>
              </div>
              <span className="text-muted-foreground md:text-sm text-xs whitespace-nowrap">
                {job.duration}
              </span>
            </div>

            {/* Bullet points */}
            <ul className="flex flex-col gap-2">
              {(t.raw(job.description) as string[]).map((bullet) => (
                <li key={bullet} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="text-teal mt-1 shrink-0">▹</span>
                  <span className="flex-1">{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Tecnologie */}
            <div className="flex flex-wrap gap-2 mt-2">
              {job.technologies.map((item) => (
                <TechBadge key={item.name} icon={item.icon} name={item.name} />
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}
