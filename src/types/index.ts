import React from 'react'

export type NavItem = {
  title: string
  href: string
}

export type Technology = {
  name: string
  icon: React.ComponentType<{ size?: number }>
}

export type Game = {
  name: string
  background_image: string
}

export type SkillCategory = {
  category: string
  skills: Technology[]
}

export type Experience = {
  company: string
  role: string
  duration: string
  /** translation key (array of bullets) under `experience` */
  description: string
  technologies: Technology[]
}

export type Project = {
  title: string
  /** translation key under `projects` */
  description: string
  technologies: Technology[]
  githubUrl: string
  liveUrl?: string
  demoPath?: string
}
