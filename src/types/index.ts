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

export type ProjectLink = {
  /** "/..." for a page of this site (locale is added automatically), full URL for external sites */
  href: string
  /** translation key under `projects` */
  label: string
}

export type Project = {
  title: string
  /** translation key under `projects` */
  description: string
  technologies: Technology[]
  githubUrl: string
  links?: ProjectLink[]
}
