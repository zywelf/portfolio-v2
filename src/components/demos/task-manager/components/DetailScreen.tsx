import { useState } from 'react'
import { ArrowLeft, Check, Trash2, Undo2 } from 'lucide-react'
import { label, primary, textarea } from '../styles'
import type { Task } from '../types'

type DetailScreenProps = {
  task: Task
  onBack: () => void
  onDelete: () => void
  onToggle: () => void
  onSave: (title: string, desc: string) => void
}

// Mounted per task (keyed by id), so the edit fields start from the task's current values
export default function DetailScreen({ task, onBack, onDelete, onToggle, onSave }: DetailScreenProps) {
  const [title, setTitle] = useState(task.title)
  const [desc, setDesc] = useState(task.desc)
  const done = task.completed

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex h-13 items-center justify-between border-b-2 border-tm-divider px-3">
        <button onClick={onBack} className="flex h-11 items-center gap-1.5 px-2.5 text-base font-semibold">
          <ArrowLeft size={20} />
          My tasks
        </button>
        <button
          onClick={onDelete}
          className="flex h-11 items-center gap-1.5 px-2.5 text-base font-extrabold text-tm-danger"
        >
          <Trash2 size={18} />
          Delete
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-6 scrollbar-none">
        <div className="flex">
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-widest ${done ? 'bg-tm-accent text-tm-on-accent' : 'bg-tm-accent-soft text-tm-accent'}`}
          >
            {done ? 'Completed' : 'Active'}
          </span>
        </div>
        <label className={label}>
          Title
          <textarea
            rows={2}
            value={title}
            onChange={e => setTitle(e.target.value.replace(/\n/g, ''))}
            className="resize-none border-b-2 border-tm-divider bg-transparent pb-2.5 text-3xl font-extrabold leading-none tracking-tight text-tm-text caret-tm-accent outline-none focus:border-tm-accent"
          />
        </label>
        <label className={label}>
          Description (optional)
          <textarea
            rows={5}
            value={desc}
            placeholder="Add details"
            onChange={e => setDesc(e.target.value)}
            className={textarea}
          />
        </label>
        <button
          onClick={onToggle}
          className="flex h-13 items-center justify-between rounded-xl border border-tm-divider px-4 text-base font-extrabold hover:bg-tm-surface"
        >
          <span>{done ? 'Reopen task' : 'Mark as completed'}</span>
          {done ? <Undo2 size={20} /> : <Check size={20} />}
        </button>
      </div>

      <div className="border-t-2 border-tm-divider px-6 pb-7.5 pt-3">
        <button
          onClick={() => onSave(title.trim(), desc.trim())}
          disabled={!title.trim()}
          className={primary}
        >
          <span>Save changes</span>
          <Check size={20} strokeWidth={2.4} />
        </button>
      </div>
    </div>
  )
}
