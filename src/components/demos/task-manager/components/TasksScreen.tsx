import { Plus } from 'lucide-react'
import ProgressHeader from './ProgressHeader'
import FilterBar from './FilterBar'
import TaskRow from './TaskRow'
import TutorialCard from './TutorialCard'
import type { Drag, Filter, Task } from '../types'

type TasksScreenProps = {
  tasks: Task[]
  filter: Filter
  onFilterChange: (filter: Filter) => void
  query: string
  onQueryChange: (query: string) => void
  searchOpen: boolean
  onToggleSearch: () => void
  dark: boolean
  onToggleTheme: () => void
  onShowInfo: () => void
  onLogout: () => void
  drag: Drag | null
  bindSwipe: (id: number) => React.HTMLAttributes<HTMLDivElement>
  onToggleTask: (id: number) => void
  onOpenSheet: () => void
  tutorial: { step: number; total: number; title: string; body: string } | null
  onSkipTutorial: () => void
}

const matchesFilter = (task: Task, filter: Filter) =>
  filter === 'all' || (filter === 'active' ? !task.completed : task.completed)

const matchesQuery = (task: Task, q: string) =>
  !q || task.title.toLowerCase().includes(q) || task.desc.toLowerCase().includes(q)

export default function TasksScreen(props: TasksScreenProps) {
  const { tasks, filter, query, drag, tutorial } = props

  const total = tasks.length
  const done = tasks.filter(t => t.completed).length
  const q = query.trim().toLowerCase()
  const visible = tasks.filter(t => matchesFilter(t, filter) && matchesQuery(t, q))

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <ProgressHeader
        done={done}
        total={total}
        dark={props.dark}
        onToggleTheme={props.onToggleTheme}
        onShowInfo={props.onShowInfo}
        onLogout={props.onLogout}
      />
      <FilterBar
        filter={filter}
        counts={{ all: total, active: total - done, completed: done }}
        onFilterChange={props.onFilterChange}
        searchOpen={props.searchOpen}
        onToggleSearch={props.onToggleSearch}
        query={query}
        onQueryChange={props.onQueryChange}
      />

      <div className="min-h-0 flex-1 overflow-y-auto pb-30 scrollbar-none">
        {visible.map(task => (
          <TaskRow
            key={task.id}
            task={task}
            dx={drag?.id === task.id ? drag.dx : 0}
            dragging={drag?.id === task.id}
            swipeHandlers={props.bindSwipe(task.id)}
            onToggle={() => props.onToggleTask(task.id)}
          />
        ))}
        {visible.length === 0 && <EmptyList query={query.trim()} total={total} filter={filter} />}
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-tm-bg px-4 pb-6.5 pt-3">
        <button
          onClick={props.onOpenSheet}
          className="flex h-15 w-full items-center justify-between rounded-2xl border border-tm-divider bg-tm-surface pl-5 pr-2.5 text-left text-lg text-tm-muted"
        >
          <span>Add a task…</span>
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-tm-accent text-tm-on-accent">
            <Plus size={22} strokeWidth={2.4} />
          </span>
        </button>
      </div>

      {tutorial && <TutorialCard {...tutorial} onSkip={props.onSkipTutorial} />}
    </div>
  )
}

function EmptyList({ query, total, filter }: { query: string; total: number; filter: Filter }) {
  const filterName = filter === 'all' ? '' : `${filter} `
  const [title, hint] = query
    ? ['No matches', `Nothing matches "${query}".`]
    : total === 0
      ? ['No tasks yet. Add one!', 'Your list is empty.']
      : [`No ${filterName}tasks`, 'Try another filter.']

  return (
    <div className="flex flex-col gap-1.5 px-6 py-12">
      <span className="text-xl font-extrabold">{title}</span>
      <span className="text-sm text-tm-muted">{hint}</span>
    </div>
  )
}
