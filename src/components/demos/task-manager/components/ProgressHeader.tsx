import { Info, LogOut, Moon, Sun } from 'lucide-react'
import { iconBtn } from '../styles'

type ProgressHeaderProps = {
  done: number
  total: number
  dark: boolean
  onToggleTheme: () => void
  onShowInfo: () => void
  onLogout: () => void
}

export default function ProgressHeader({
  done,
  total,
  dark,
  onToggleTheme,
  onShowInfo,
  onLogout,
}: ProgressHeaderProps) {
  const pct = total ? Math.round((done / total) * 100) : 0

  return (
    <div className="-mt-px flex-none rounded-b-3xl bg-tm-accent px-6 pb-5.5 text-tm-on-accent">
      <div className="flex h-12 items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest">My tasks</span>
        <div className="-mr-2.5 flex">
          <button className={iconBtn} onClick={onToggleTheme} aria-label="Toggle theme">
            {dark ? <Sun size={22} /> : <Moon size={22} />}
          </button>
          <button className={iconBtn} onClick={onShowInfo} aria-label="How it works">
            <Info size={22} />
          </button>
          <button className={iconBtn} onClick={onLogout} aria-label="Log out">
            <LogOut size={22} />
          </button>
        </div>
      </div>
      <div className="flex items-end justify-between gap-3">
        <span className="text-8xl font-extrabold leading-none tracking-tighter">{pct}%</span>
        <span className="pb-1 text-right text-sm font-semibold">
          {done} of {total} done
        </span>
      </div>
      <div className="mt-4.5 h-2 overflow-hidden rounded-full bg-white/30">
        <div
          className="h-full rounded-full bg-tm-on-accent transition-all duration-400"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
