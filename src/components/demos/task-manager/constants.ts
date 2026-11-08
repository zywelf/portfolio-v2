import type { Filter, Task } from './types'

export const SEED_TASKS: Task[] = [
  { id: 1, title: 'Send invoice to Marta', desc: 'March project, 12 hours', completed: false },
  { id: 2, title: 'Book dentist appointment', desc: '', completed: false },
  { id: 3, title: 'Review pull request #42', desc: 'Auth refactor', completed: true },
  { id: 4, title: 'Buy groceries', desc: 'Milk, eggs, bread, coffee', completed: false },
  { id: 5, title: 'Call the bank', desc: '', completed: true },
  { id: 6, title: 'Plan weekend trip', desc: 'Check train times', completed: false },
]

// Values of the --tm-* variables, exposed as Tailwind colors (bg-tm-bg, text-tm-accent...) in globals.css
export const THEMES = {
  dark: {
    '--tm-bg': '#0a0a0a',
    '--tm-surface': '#1a1a1a',
    '--tm-text': '#ededed',
    '--tm-muted': '#a0a0a0',
    '--tm-divider': '#2e2e2e',
    '--tm-accent': '#2DD4BF',
    '--tm-accent-hover': '#5eead4',
    '--tm-accent-soft': 'rgba(45,212,191,.14)',
    '--tm-on-accent': '#0a0a0a',
    '--tm-danger': '#dc2626',
    '--tm-highlight': '#2DD4BF',
  },
  light: {
    '--tm-bg': '#f5f5f5',
    '--tm-surface': '#ffffff',
    '--tm-text': '#1a1a1a',
    '--tm-muted': '#6b6b6b',
    '--tm-divider': '#e0e0e0',
    '--tm-accent': '#0D9488',
    '--tm-accent-hover': '#0f766e',
    '--tm-accent-soft': 'rgba(13,148,136,.12)',
    '--tm-on-accent': '#f5f5f5',
    '--tm-danger': '#dc2626',
    '--tm-highlight': '#5eead4',
  },
} satisfies Record<string, Record<`--tm-${string}`, string>>

export const TUTORIAL_STEPS: { title: string; body: string }[] = [
  {
    title: 'Swipe right on a task to complete it',
    body: 'Drag any active task to the right. Swiping right again reopens it.',
  },
  {
    title: 'Swipe left to delete',
    body: 'Drag a task to the left. You can undo it right after.',
  },
  {
    title: 'Tap the bar below to add your own task',
    body: 'Give it a title and, if you like, a description.',
  },
]

export const HOW_IT_WORKS = [
  'Swipe right to complete or reopen a task.',
  'Swipe left to delete it. Tap Undo if you change your mind.',
  'Tap a task to see and edit its details.',
]

export const FILTER_LABELS: Record<Filter, string> = {
  all: 'All',
  active: 'Active',
  completed: 'Completed',
}
