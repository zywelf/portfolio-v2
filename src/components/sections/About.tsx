import { MapPin, Wifi } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { useTranslations } from 'next-intl'
import Section from '../layout/Section'
import AppLink from '../ui/AppLink'
import TechBadge from '../ui/TechBadge'
import Card from '../ui/Card'
import SectionTitle from '../ui/SectionTitle'
import { SKILLS } from '@/data/skills'

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

        <hr className="dark:border-white/10 border-black/10 my-2" />
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
              <AppLink
                href="https://github.com/zywelf"
                className="text-muted-foreground hover:text-teal-light transition-colors"
              >
                <FaGithub size={24} />
              </AppLink>
              <AppLink
                href="https://linkedin.com/in/zywel-fankam"
                className="text-muted-foreground hover:text-teal-light transition-colors"
              >
                <FaLinkedin size={24} />
              </AppLink>
            </div>
          </div>
          {/* Technologies */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold text-foreground">{t('skills_title')}</h3>
            {SKILLS.map((item) => (
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
