import type { SkillCategory } from '@/types'
import { TECH } from './technologies'

export const SKILLS: SkillCategory[] = [
  {
    category: 'Frontend',
    skills: [
      TECH.react,
      TECH.nextjs,
      TECH.javascript,
      TECH.typescript,
      TECH.vue,
      TECH.tailwind,
      TECH.html,
      TECH.css,
    ],
  },
  {
    category: 'Backend',
    skills: [TECH.django, TECH.nodejs, TECH.python, TECH.mysql, TECH.postgresql],
  },
  {
    category: 'DevOps',
    skills: [TECH.docker, TECH.aws, TECH.git],
  },
]
