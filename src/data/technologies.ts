import {
  AmazonwebservicesOriginalWordmark,
  Css3Original,
  DartOriginal,
  DjangorestOriginal,
  DockerOriginal,
  ExpoOriginal,
  ExpressOriginal,
  FastapiOriginal,
  FlutterOriginal,
  GitOriginal,
  Html5Original,
  JavascriptOriginal,
  MysqlOriginal,
  NextjsOriginal,
  NodejsOriginal,
  PostgresqlOriginal,
  PrismaOriginal,
  PythonOriginal,
  ReactnativeOriginal,
  ReactOriginal,
  TailwindcssOriginal,
  TypescriptOriginal,
  ViteOriginal,
  VuejsOriginal,
} from 'devicons-react'
import { Technology } from '@/types'

export const TECH = {
  // Frontend
  react: { name: 'React', icon: ReactOriginal },
  nextjs: { name: 'Next.js', icon: NextjsOriginal },
  javascript: { name: 'JavaScript', icon: JavascriptOriginal },
  typescript: { name: 'TypeScript', icon: TypescriptOriginal },
  vue: { name: 'Vue.js', icon: VuejsOriginal },
  tailwind: { name: 'Tailwind CSS', icon: TailwindcssOriginal },
  html: { name: 'HTML', icon: Html5Original },
  css: { name: 'CSS', icon: Css3Original },
  vite: { name: 'Vite', icon: ViteOriginal },
  // Mobile
  reactNative: { name: 'React Native', icon: ReactnativeOriginal },
  expo: { name: 'Expo', icon: ExpoOriginal },
  flutter: { name: 'Flutter', icon: FlutterOriginal },
  dart: { name: 'Dart', icon: DartOriginal },
  // Backend
  django: { name: 'Django', icon: DjangorestOriginal },
  nodejs: { name: 'Node.js', icon: NodejsOriginal },
  express: { name: 'Express', icon: ExpressOriginal },
  python: { name: 'Python', icon: PythonOriginal },
  fastapi: { name: 'FastAPI', icon: FastapiOriginal },
  // Database
  mysql: { name: 'MySQL', icon: MysqlOriginal },
  postgresql: { name: 'PostgreSQL', icon: PostgresqlOriginal },
  prisma: { name: 'Prisma', icon: PrismaOriginal },
  // DevOps
  docker: { name: 'Docker', icon: DockerOriginal },
  aws: { name: 'AWS', icon: AmazonwebservicesOriginalWordmark },
  git: { name: 'Git', icon: GitOriginal },
} satisfies Record<string, Technology>
