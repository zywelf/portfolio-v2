import type { Experience } from '@/types'
import { TECH } from './technologies'

export const EXPERIENCES: Experience[] = [
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
