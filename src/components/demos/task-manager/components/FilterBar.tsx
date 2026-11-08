import { useEffect, useRef } from 'react'
import { Search } from 'lucide-react'
import { FILTER_LABELS } from '../constants'
import type { Filter } from '../types'

type FilterBarProps = {
  filter: Filter
  counts: Record<Filter, number>
  onFilterChange: (filter: Filter) => void
  searchOpen: boolean
  onToggleSearch: () => void
  query: string
  onQueryChange: (query: string) => void
}

export default function FilterBar({
  filter,
  counts,
  onFilterChange,
  searchOpen,
  onToggleSearch,
  query,
  onQueryChange,
}: FilterBarProps) {
  const searchInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (searchOpen) searchInput.current?.focus({ preventScroll: true })
  }, [searchOpen])

  return (
    <>
      <div className="flex h-13 flex-none items-stretch border-b-2 border-tm-divider pl-6">
        {(Object.keys(FILTER_LABELS) as Filter[]).map(key => (
          <button
            key={key}
            onClick={() => onFilterChange(key)}
            className={`-mb-0.5 mr-5.5 flex items-center gap-1.5 border-b-3 text-base font-extrabold ${filter === key ? 'border-tm-accent text-tm-text' : 'border-transparent text-tm-muted'}`}
          >
            {FILTER_LABELS[key]}
            <span className="text-xs font-normal">{counts[key]}</span>
          </button>
        ))}
        <button onClick={onToggleSearch} aria-label="Search" className="ml-auto grid w-14 place-items-center">
          <Search size={22} />
        </button>
      </div>
      {searchOpen && (
        <div className="flex h-13 flex-none items-center border-b border-tm-divider px-6">
          <input
            ref={searchInput}
            value={query}
            onChange={e => onQueryChange(e.target.value)}
            placeholder="Search tasks"
            className="h-full min-w-0 flex-1 bg-transparent text-lg text-tm-text outline-none placeholder:text-tm-muted"
          />
        </div>
      )}
    </>
  )
}
