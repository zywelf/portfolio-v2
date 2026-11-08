import { Check, ChevronRight, Trash2, Undo2 } from 'lucide-react'
import { SWIPE_THRESHOLD } from '../hooks/useSwipe'
import type { Task } from '../types'

type TaskRowProps = {
  task: Task
  /** Current horizontal offset while the row is being dragged */
  dx: number
  dragging: boolean
  swipeHandlers: React.HTMLAttributes<HTMLDivElement>
  onToggle: () => void
}

export default function TaskRow({ task, dx, dragging, swipeHandlers, onToggle }: TaskRowProps) {
  return (
    <div className="relative overflow-hidden border-b border-tm-divider">
      {/* Action revealed behind the row while swiping */}
      <div
        className="absolute inset-0 flex items-center justify-between px-6 text-sm font-extrabold text-tm-on-accent"
        style={{
          background: dx > 0 ? 'var(--tm-accent)' : 'var(--tm-danger)',
          opacity: Math.abs(dx) > SWIPE_THRESHOLD ? 1 : 0.7,
        }}
      >
        <div className="flex items-center gap-2">
          {dx > 0 && (
            <>
              {task.completed ? <Undo2 size={20} /> : <Check size={20} />}
              <span>{task.completed ? 'Reopen' : 'Complete'}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          {dx < 0 && (
            <>
              <span>Delete</span>
              <Trash2 size={20} />
            </>
          )}
        </div>
      </div>

      <div
        {...swipeHandlers}
        className="relative flex min-h-17 cursor-pointer touch-pan-y items-center gap-3 bg-tm-bg py-2.5 pl-3 pr-4"
        style={{
          transform: `translateX(${dx}px)`,
          transition: dragging ? 'none' : 'transform .25s cubic-bezier(.2,.8,.2,1)',
        }}
      >
        <button
          data-nodrag
          onClick={(e) => {
            e.stopPropagation()
            onToggle()
          }}
          aria-label="Toggle complete"
          className="grid h-11 w-11 flex-none place-items-center"
        >
          <span
            className={`grid h-5.5 w-5.5 place-items-center rounded-md border-2 border-tm-accent text-tm-bg ${task.completed ? 'bg-tm-accent' : ''}`}
          >
            {task.completed && <Check size={14} strokeWidth={3.2} />}
          </span>
        </button>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span
            className={`text-base font-semibold leading-tight ${task.completed ? 'text-tm-muted line-through' : ''}`}
          >
            {task.title}
          </span>
          {task.desc && <span className="truncate text-sm leading-snug text-tm-muted">{task.desc}</span>}
        </div>
        <ChevronRight size={18} className="flex-none text-tm-muted" />
      </div>
    </div>
  )
}
