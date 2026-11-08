import { useRef, useState } from 'react'
import { SEED_TASKS } from '../constants'
import type { Task } from '../types'

// Task list state and operations. Returns results so callers can react (toasts, tutorial).
export function useTasks(initial: Task[] = SEED_TASKS) {
  const [tasks, setTasks] = useState(initial)
  const lastDeleted = useRef<{ task: Task; index: number } | null>(null)

  /** Returns the new completed state, or undefined if the task doesn't exist */
  const toggle = (id: number) => {
    const task = tasks.find(t => t.id === id)
    if (!task) return undefined
    const completed = !task.completed
    setTasks(ts => ts.map(t => (t.id === id ? { ...t, completed } : t)))
    return completed
  }

  const remove = (id: number) => {
    const index = tasks.findIndex(t => t.id === id)
    if (index < 0) return false
    lastDeleted.current = { task: tasks[index], index }
    setTasks(ts => ts.filter(t => t.id !== id))
    return true
  }

  /** Puts the last deleted task back where it was */
  const restore = () => {
    const deleted = lastDeleted.current
    if (!deleted) return false
    lastDeleted.current = null
    setTasks(ts => {
      const next = [...ts]
      next.splice(Math.min(deleted.index, next.length), 0, deleted.task)
      return next
    })
    return true
  }

  const add = (title: string, desc: string) => {
    setTasks(ts => [{ id: Date.now(), title, desc, completed: false }, ...ts])
  }

  const update = (id: number, title: string, desc: string) => {
    setTasks(ts => ts.map(t => (t.id === id ? { ...t, title, desc } : t)))
  }

  return { tasks, toggle, remove, restore, add, update }
}
