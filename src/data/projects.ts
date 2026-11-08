import type { Project } from '@/types'
import { TECH } from './technologies'

export const PROJECTS: Project[] = [
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
