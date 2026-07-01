import {
  ReactOriginal,
  NextjsOriginal,
  TypescriptOriginal,
  VuejsOriginal,
  TailwindcssOriginal,
  DjangorestOriginal,
  NodejsOriginal,
  PythonOriginal,
  DockerOriginal,
  GitOriginal,
  AmazonwebservicesOriginalWordmark,
  JavascriptOriginal,
  Html5Original,
  Css3Original,
  MysqlOriginal,
  PostgresqlOriginal,
} from 'devicons-react'
import { MapPin, Wifi } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { useTranslations } from 'next-intl'
import Section from '../layout/Section'
import Link from 'next/link'
import TechBadge from '../ui/TechBadge'
import Card from '../ui/Card'
import SectionTitle from '../ui/SectionTitle'
import { Technology } from '@/types'

type SkillCategoty = {
  category: string
  skills: Technology[]
}

const aboutItems: SkillCategoty[] = [
  {
    category: 'Frontend',
    skills: [
      {
        name: 'React',
        icon: ReactOriginal,
      },
      {
        name: 'Next.js',
        icon: NextjsOriginal,
      },
      {
        name: 'JavaScript',
        icon: JavascriptOriginal,
      },
      {
        name: 'TypeScript',
        icon: TypescriptOriginal,
      },
      {
        name: 'Vue.js',
        icon: VuejsOriginal,
      },
      {
        name: 'Tailwind CSS',
        icon: TailwindcssOriginal,
      },
      {
        name: 'HTML',
        icon: Html5Original,
      },
      {
        name: 'CSS',
        icon: Css3Original,
      },
    ],
  },
  {
    category: 'Backend',
    skills: [
      {
        name: 'Django',
        icon: DjangorestOriginal,
      },
      {
        name: 'Node.js',
        icon: NodejsOriginal,
      },
      {
        name: 'Python',
        icon: PythonOriginal,
      },
      {
        name: 'MySQL',
        icon: MysqlOriginal,
      },
      {
        name: 'PostgreSQL',
        icon: PostgresqlOriginal,
      },
    ],
  },
  {
    category: 'DevOps',
    skills: [
      {
        name: 'Docker',
        icon: DockerOriginal,
      },
      {
        name: 'AWS',
        icon: AmazonwebservicesOriginalWordmark,
      },
      {
        name: 'Git',
        icon: GitOriginal,
      },
    ],
  },
]

export default function About() {
  const t = useTranslations('about')
  return (
    <Section id="about">
      <SectionTitle>{t('title')}</SectionTitle>
      <Card>
        {/* About me */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-foreground">{t('subtitle')}</h3>
          {(t.raw('description') as string[]).map((paragraph) => (
            <p key={paragraph} className="text-muted-foreground leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <hr className="border-white/10 my-2" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-3">
            {/* Languages */}
            <h3 className="text-lg font-semibold text-foreground">{t('languages_title')}</h3>
            <p className="text-sm">
              <span className="text-foreground">{t('lang_italian_name')}</span>
              <span className="text-muted-foreground"> — {t('lang_italian_level')}</span>
            </p>
            <p className="text-sm">
              <span className="text-foreground">{t('lang_english_name')}</span>
              <span className="text-muted-foreground"> — {t('lang_english_level')}</span>
            </p>
            <p className="text-sm">
              <span className="text-foreground">{t('lang_french_name')}</span>
              <span className="text-muted-foreground"> — {t('lang_french_level')}</span>
            </p>

            {/* Devider */}
            <h3 className="text-lg font-semibold text-foreground mt-2">{t('contact_title')}</h3>

            {/* Location + Availability */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={16} className="text-teal" />
              <span>{t('location')}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Wifi size={16} className="text-teal" />
              <span>{t('availability')}</span>
            </div>

            {/* Social */}
            <div className="flex items-center gap-4 mt-2">
              <Link
                href="https://github.com/zywelf"
                target="_blank"
                className="text-muted-foreground hover:text-teal-light transition-colors"
              >
                <FaGithub size={24} />
              </Link>
              <Link
                href="https://linkedin.com/in/zywel-fankam"
                target="_blank"
                className="text-muted-foreground hover:text-teal-light transition-colors"
              >
                <FaLinkedin size={24} />
              </Link>
            </div>
          </div>
          {/* Technologies */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-foreground">{t('skills_title')}</h3>
            {aboutItems.map((item) => (
              <div key={item.category} className="flex flex-col gap-2">
                <p className="text-xs text-muted-foreground uppercase tracking-widest">{item.category}</p>
                <div className="flex flex-wrap gap-2">
                  {item.skills.map((skill) => (
                    <TechBadge key={skill.name} name={skill.name} icon={skill.icon} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </Section>
  )
}
