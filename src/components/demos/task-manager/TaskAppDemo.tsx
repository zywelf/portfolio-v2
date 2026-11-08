'use client'

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent as RPointerEvent } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Info,
  LogOut,
  Moon,
  Plus,
  Search,
  Sun,
  Trash2,
  Undo2,
  X,
} from 'lucide-react'

type Task = { id: number; title: string; desc: string; completed: boolean }
type Filter = 'all' | 'active' | 'completed'
type Screen = 'login' | 'register' | 'tasks' | 'detail'

const SEED: Task[] = [
  { id: 1, title: 'Send invoice to Marta', desc: 'March project, 12 hours', completed: false },
  { id: 2, title: 'Book dentist appointment', desc: '', completed: false },
  { id: 3, title: 'Review pull request #42', desc: 'Auth refactor', completed: true },
  { id: 4, title: 'Buy groceries', desc: 'Milk, eggs, bread, coffee', completed: false },
  { id: 5, title: 'Call the bank', desc: '', completed: true },
  { id: 6, title: 'Plan weekend trip', desc: 'Check train times', completed: false },
]

const DARK = {
  '--bg': '#0a0a0a',
  '--sf': '#1a1a1a',
  '--tx': '#ededed',
  '--mu': '#a0a0a0',
  '--dv': '#2e2e2e',
  '--ac': '#2DD4BF',
  '--ac6': '#5eead4',
  '--ac1': 'rgba(45,212,191,.14)',
  '--onac': '#0a0a0a',
  '--red': '#dc2626',
  '--hl': '#2DD4BF',
}
const LIGHT = {
  '--bg': '#f5f5f5',
  '--sf': '#ffffff',
  '--tx': '#1a1a1a',
  '--mu': '#6b6b6b',
  '--dv': '#e0e0e0',
  '--ac': '#0D9488',
  '--ac6': '#0f766e',
  '--ac1': 'rgba(13,148,136,.12)',
  '--onac': '#f5f5f5',
  '--red': '#dc2626',
  '--hl': '#5eead4',
}

const COACH: [string, string][] = [
  [
    'Swipe right on a task to complete it',
    'Drag any active task to the right. Swiping right again reopens it.',
  ],
  ['Swipe left to delete', 'Drag a task to the left. You can undo it right after.'],
  ['Tap the bar below to add your own task', 'Give it a title and, if you like, a description.'],
]

const input =
  'h-[50px] rounded-xl border border-[var(--dv)] bg-[var(--sf)] px-3.5 text-base text-[var(--tx)] caret-[var(--ac)] outline-none focus:border-[var(--ac)]'
const primary =
  'flex h-[54px] w-full items-center justify-between rounded-xl bg-[var(--ac)] px-[18px] text-base font-extrabold text-[var(--onac)] hover:bg-[var(--ac6)] disabled:opacity-45'
const label = 'flex flex-col gap-1.5 text-xs text-[var(--mu)]'
const iconBtn = 'grid h-11 w-11 place-items-center'

export default function TaskAppDemo() {
  const [screen, setScreen] = useState<Screen>('login')
  const [dark, setDark] = useState(true)
  const [email, setEmail] = useState('ana@example.com')
  const [password, setPassword] = useState('password123')
  const [name, setName] = useState('')
  const [regEmail, setRegEmail] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [authNotice, setAuthNotice] = useState('')
  const [loading, setLoading] = useState(false)
  const [tasks, setTasks] = useState<Task[]>(SEED)
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [sheet, setSheet] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [detailId, setDetailId] = useState<number | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDesc, setEditDesc] = useState('')
  const [info, setInfo] = useState(false)
  const [toast, setToast] = useState<{ text: string; undo: boolean } | null>(null)
  const [tut, setTut] = useState(0)
  const [tutDone, setTutDone] = useState(false)
  const [drag, setDrag] = useState<{ id: number; dx: number } | null>(null)

  const dragRef = useRef<{ id: number; x: number; dx: number; moved: boolean } | null>(null)
  const lastDel = useRef<{ task: Task; i: number } | null>(null)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const sheetInput = useRef<HTMLInputElement>(null)
  const searchInput = useRef<HTMLInputElement>(null)

  useEffect(() => () => clearTimeout(toastTimer.current), [])

  const showToast = (text: string, undo = false, ms = 2000) => {
    clearTimeout(toastTimer.current)
    setToast({ text, undo })
    toastTimer.current = setTimeout(() => setToast(null), ms)
  }

  const login = () => {
    if (loading) return
    if (!email || !password) return setAuthError('Enter email and password')
    setAuthError('')
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setScreen('tasks')
      setAuthNotice('')
      setTut(tutDone ? 0 : 1)
    }, 700)
  }
  const register = () => {
    if (loading) return
    if (!name || !regEmail || !regPassword) return setAuthError('All fields are required')
    setAuthError('')
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setScreen('login')
      setEmail(regEmail)
      setPassword('')
      setAuthNotice('Account created! Log in now.')
    }, 700)
  }

  const toggle = (id: number) => {
    const t = tasks.find((t) => t.id === id)
    if (!t) return
    const completed = !t.completed
    setTasks((ts) => ts.map((x) => (x.id === id ? { ...x, completed } : x)))
    if (tut === 1 && completed) setTut(2)
    showToast(completed ? 'Task completed!' : 'Task reopened')
  }
  const remove = (id: number) => {
    const i = tasks.findIndex((t) => t.id === id)
    if (i < 0) return
    lastDel.current = { task: tasks[i], i }
    setTasks((ts) => ts.filter((t) => t.id !== id))
    if (tut === 2) setTut(3)
    showToast('Task deleted', true, 4500)
  }
  const undo = () => {
    const d = lastDel.current
    if (!d) return
    lastDel.current = null
    setTasks((ts) => {
      const next = [...ts]
      next.splice(Math.min(d.i, next.length), 0, d.task)
      return next
    })
    showToast('Task restored', false, 1800)
  }

  const openDetail = (id: number) => {
    const t = tasks.find((t) => t.id === id)
    if (!t) return
    setDetailId(id)
    setEditTitle(t.title)
    setEditDesc(t.desc)
    setScreen('detail')
  }

  const onDown = (e: RPointerEvent<HTMLDivElement>, id: number) => {
    if ((e.target as HTMLElement).closest('[data-nodrag]')) return
    dragRef.current = { id, x: e.clientX, dx: 0, moved: false }
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onMove = (e: RPointerEvent<HTMLDivElement>) => {
    const d = dragRef.current
    if (!d) return
    const dx = e.clientX - d.x
    if (Math.abs(dx) > 6) d.moved = true
    if (!d.moved) return
    d.dx = Math.max(-160, Math.min(160, dx))
    setDrag({ id: d.id, dx: d.dx })
  }
  const onUp = () => {
    const d = dragRef.current
    dragRef.current = null
    setDrag(null)
    if (!d) return
    if (d.dx > 90) toggle(d.id)
    else if (d.dx < -90) remove(d.id)
    else if (!d.moved) openDetail(d.id)
  }
  const onCancel = () => {
    dragRef.current = null
    setDrag(null)
  }

  const openSheet = () => {
    setSheet(true)
    if (tut === 3) {
      setTut(0)
      setTutDone(true)
    }
    setTimeout(() => sheetInput.current?.focus({ preventScroll: true }), 320)
  }
  const addTask = () => {
    const title = newTitle.trim()
    if (!title) return
    setTasks((ts) => [{ id: Date.now(), title, desc: newDesc.trim(), completed: false }, ...ts])
    setSheet(false)
    setNewTitle('')
    setNewDesc('')
    setQuery('')
    if (filter === 'completed') setFilter('all')
    showToast('Task added', false, 1800)
  }
  const toggleSearch = () => {
    if (searchOpen) setQuery('')
    setSearchOpen(!searchOpen)
    setTimeout(() => searchInput.current?.focus({ preventScroll: true }), 50)
  }
  const saveDetail = () => {
    const title = editTitle.trim()
    if (!title) return
    setTasks((ts) => ts.map((t) => (t.id === detailId ? { ...t, title, desc: editDesc.trim() } : t)))
    setScreen('tasks')
    showToast('Changes saved', false, 1800)
  }
  const logout = () => {
    setScreen('login')
    setPassword('')
    setTut(0)
    setInfo(false)
  }

  const total = tasks.length
  const done = tasks.filter((t) => t.completed).length
  const pct = total ? Math.round((done / total) * 100) : 0
  const q = query.trim().toLowerCase()
  const visible = tasks.filter(
    (t) =>
      (filter === 'all' || (filter === 'active' ? !t.completed : t.completed)) &&
      (!q || t.title.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q))
  )
  const filters: [Filter, string, number][] = [
    ['all', 'All', total],
    ['active', 'Active', total - done],
    ['completed', 'Completed', done],
  ]
  const detail = tasks.find((t) => t.id === detailId)
  const detailDone = !!detail?.completed
  const filterName = filter === 'all' ? '' : `${filter} `
  const coach = tut > 0 ? COACH[tut - 1] : null
  const onTasks = screen === 'tasks'

  return (
    <div className="box-border w-[414px] rounded-[56px] bg-[#0e0d0d] p-3 shadow-[0_24px_60px_rgba(0,0,0,.28)]">
      <div
        style={
          {
            ...(dark ? DARK : LIGHT),
            fontFamily: 'var(--font-archivo), system-ui, sans-serif',
          } as CSSProperties
        }
        className="relative flex h-[844px] w-[390px] select-none flex-col overflow-hidden rounded-[44px] bg-[var(--bg)] text-[var(--tx)] transition-colors duration-300"
      >
        {/* Status bar */}
        <div
          className={`flex h-12 flex-none items-center justify-between px-[30px] text-[15px] font-semibold ${onTasks ? 'bg-[var(--ac)] text-[var(--onac)]' : ''}`}
        >
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-4 border-[1.5px] border-current" />
            <div className="h-[11px] w-6 border-[1.5px] border-current p-[1.5px]">
              <div className="h-full w-[70%] bg-current" />
            </div>
          </div>
        </div>

        {(screen === 'login' || screen === 'register') && (
          <div className="flex min-h-0 flex-1 flex-col px-6 pb-8 pt-2">
            <div className="flex items-center justify-between border-b-2 border-[var(--dv)] pb-3">
              {screen === 'register' ? (
                <button
                  onClick={() => {
                    setScreen('login')
                    setAuthError('')
                  }}
                  className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[.12em]"
                >
                  <ArrowLeft size={16} />
                  Task Manager
                </button>
              ) : (
                <span className="text-[11px] font-semibold uppercase tracking-[.12em]">Task Manager</span>
              )}
              <span className="h-3.5 w-3.5 rounded-full bg-[var(--ac)]" />
            </div>
            <div className="mt-auto flex flex-col gap-4">
              <h1 className="mb-3 text-[44px] font-extrabold leading-[1.02] tracking-[-.02em]">
                {screen === 'login' ? 'Log in to your account' : 'Create your account'}
              </h1>
              {screen === 'login' && authNotice && (
                <div className="bg-[var(--ac1)] px-3.5 py-3 text-sm font-semibold text-[var(--ac)]">
                  {authNotice}
                </div>
              )}
              {screen === 'register' && (
                <label className={label}>
                  Name
                  <input
                    className={input}
                    value={name}
                    placeholder="Your name"
                    onChange={(e) => {
                      setName(e.target.value)
                      setAuthError('')
                    }}
                  />
                </label>
              )}
              <label className={label}>
                Email
                <input
                  className={input}
                  type="email"
                  placeholder="you@example.com"
                  value={screen === 'login' ? email : regEmail}
                  onChange={(e) => {
                    ;(screen === 'login' ? setEmail : setRegEmail)(e.target.value)
                    setAuthError('')
                  }}
                />
              </label>
              <label className={label}>
                Password
                <input
                  className={input}
                  type="password"
                  placeholder={screen === 'login' ? '••••••••' : 'At least 8 characters'}
                  value={screen === 'login' ? password : regPassword}
                  onChange={(e) => {
                    ;(screen === 'login' ? setPassword : setRegPassword)(e.target.value)
                    setAuthError('')
                  }}
                />
              </label>
              {authError && <div className="text-sm font-semibold text-[var(--ac)]">{authError}</div>}
              <button
                onClick={screen === 'login' ? login : register}
                className={`${primary} mt-2 ${loading ? 'opacity-60' : ''}`}
              >
                <span>
                  {screen === 'login'
                    ? loading
                      ? 'Logging in...'
                      : 'Log in'
                    : loading
                      ? 'Signing up...'
                      : 'Sign up'}
                </span>
                <ArrowRight size={20} />
              </button>
            </div>
            <div className="mt-7 flex gap-1.5 border-t-2 border-[var(--dv)] pt-4 text-sm">
              <span className="text-[var(--mu)]">
                {screen === 'login' ? "Don't have an account?" : 'Already have an account?'}
              </span>
              <button
                className="font-extrabold text-[var(--ac)]"
                onClick={() => {
                  setScreen(screen === 'login' ? 'register' : 'login')
                  setAuthError('')
                  if (screen === 'login') setAuthNotice('')
                }}
              >
                {screen === 'login' ? 'Sign up' : 'Log in'}
              </button>
            </div>
          </div>
        )}

        {onTasks && (
          <div className="relative flex min-h-0 flex-1 flex-col">
            {/* Progress header */}
            <div className="-mt-px flex-none rounded-b-3xl bg-[var(--ac)] px-6 pb-[22px] text-[var(--onac)]">
              <div className="flex h-12 items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-[.12em]">My tasks</span>
                <div className="-mr-2.5 flex">
                  <button className={iconBtn} onClick={() => setDark(!dark)} aria-label="Toggle theme">
                    {dark ? <Sun size={22} /> : <Moon size={22} />}
                  </button>
                  <button className={iconBtn} onClick={() => setInfo(true)} aria-label="How it works">
                    <Info size={22} />
                  </button>
                  <button className={iconBtn} onClick={logout} aria-label="Log out">
                    <LogOut size={22} />
                  </button>
                </div>
              </div>
              <div className="flex items-end justify-between gap-3">
                <span className="text-[104px] font-extrabold leading-[.86] tracking-[-.05em]">{pct}%</span>
                <span className="pb-1 text-right text-sm font-semibold">
                  {done} of {total} done
                </span>
              </div>
              <div className="mt-[18px] h-2 overflow-hidden rounded-full bg-white/30">
                <div
                  className="h-full rounded-full bg-[var(--onac)] transition-[width] duration-[400ms]"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>

            {/* Filter tabs */}
            <div className="flex h-[52px] flex-none items-stretch border-b-2 border-[var(--dv)] pl-6">
              {filters.map(([key, text, count]) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`-mb-0.5 mr-[22px] flex items-center gap-1.5 border-b-[3px] text-[15px] font-extrabold ${filter === key ? 'border-[var(--ac)] text-[var(--tx)]' : 'border-transparent text-[var(--mu)]'}`}
                >
                  {text}
                  <span className="text-xs font-normal">{count}</span>
                </button>
              ))}
              <button
                onClick={toggleSearch}
                aria-label="Search"
                className="ml-auto grid w-14 place-items-center"
              >
                <Search size={22} />
              </button>
            </div>
            {searchOpen && (
              <div className="flex h-[52px] flex-none items-center border-b border-[var(--dv)] px-6">
                <input
                  ref={searchInput}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search tasks"
                  className="h-full min-w-0 flex-1 bg-transparent text-[17px] text-[var(--tx)] outline-none placeholder:text-[var(--mu)]"
                />
              </div>
            )}

            {/* List */}
            <div className="min-h-0 flex-1 overflow-y-auto pb-[120px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {visible.map((t) => {
                const dx = drag?.id === t.id ? drag.dx : 0
                return (
                  <div key={t.id} className="relative overflow-hidden border-b border-[var(--dv)]">
                    <div
                      className="absolute inset-0 flex items-center justify-between px-6 text-sm font-extrabold text-[var(--onac)]"
                      style={{
                        background: dx > 0 ? 'var(--ac)' : 'var(--red)',
                        opacity: Math.abs(dx) > 90 ? 1 : 0.7,
                      }}
                    >
                      <div className="flex items-center gap-2">
                        {dx > 0 && (
                          <>
                            {t.completed ? <Undo2 size={20} /> : <Check size={20} />}
                            <span>{t.completed ? 'Reopen' : 'Complete'}</span>
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
                      onPointerDown={(e) => onDown(e, t.id)}
                      onPointerMove={onMove}
                      onPointerUp={onUp}
                      onPointerCancel={onCancel}
                      className="relative flex min-h-[68px] cursor-pointer touch-pan-y items-center gap-3 bg-[var(--bg)] py-2.5 pl-3 pr-4"
                      style={{
                        transform: `translateX(${dx}px)`,
                        transition: drag?.id === t.id ? 'none' : 'transform .25s cubic-bezier(.2,.8,.2,1)',
                      }}
                    >
                      <button
                        data-nodrag
                        onClick={(e) => {
                          e.stopPropagation()
                          toggle(t.id)
                        }}
                        aria-label="Toggle complete"
                        className="grid h-11 w-11 flex-none place-items-center"
                      >
                        <span
                          className={`grid h-[22px] w-[22px] place-items-center rounded-[7px] border-2 border-[var(--ac)] text-[var(--bg)] ${t.completed ? 'bg-[var(--ac)]' : ''}`}
                        >
                          {t.completed && <Check size={14} strokeWidth={3.2} />}
                        </span>
                      </button>
                      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <span
                          className={`text-base font-semibold leading-[1.3] ${t.completed ? 'text-[var(--mu)] line-through' : ''}`}
                        >
                          {t.title}
                        </span>
                        {t.desc && (
                          <span className="truncate text-[13px] leading-[1.35] text-[var(--mu)]">
                            {t.desc}
                          </span>
                        )}
                      </div>
                      <ChevronRight size={18} className="flex-none text-[var(--mu)]" />
                    </div>
                  </div>
                )
              })}
              {visible.length === 0 && (
                <div className="flex flex-col gap-1.5 px-6 py-12">
                  <span className="text-xl font-extrabold">
                    {q ? 'No matches' : total === 0 ? 'No tasks yet. Add one!' : `No ${filterName}tasks`}
                  </span>
                  <span className="text-sm text-[var(--mu)]">
                    {q
                      ? `Nothing matches "${query.trim()}".`
                      : total === 0
                        ? 'Your list is empty.'
                        : 'Try another filter.'}
                  </span>
                </div>
              )}
            </div>

            {/* Quick add */}
            <div className="absolute inset-x-0 bottom-0 bg-[var(--bg)] px-4 pb-[26px] pt-3">
              <button
                onClick={openSheet}
                className="flex h-[60px] w-full items-center justify-between rounded-[18px] border border-[var(--dv)] bg-[var(--sf)] pl-5 pr-2.5 text-left text-[17px] text-[var(--mu)]"
              >
                <span>Add a task…</span>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--ac)] text-[var(--onac)]">
                  <Plus size={22} strokeWidth={2.4} />
                </span>
              </button>
            </div>

            {/* Tutorial */}
            {coach && !sheet && (
              <div className="absolute inset-x-4 bottom-[108px] flex flex-col gap-1.5 rounded-2xl border border-[var(--ac)] bg-[var(--sf)] px-4 pb-[18px] pt-4 shadow-[0_12px_32px_rgba(45,43,43,.3)]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-[.12em] text-[var(--ac)]">
                    Step {tut} of 3
                  </span>
                  <button
                    onClick={() => {
                      setTut(0)
                      setTutDone(true)
                    }}
                    className="py-1 text-[13px] font-semibold opacity-70"
                  >
                    Skip tutorial
                  </button>
                </div>
                <span className="text-[19px] font-extrabold leading-[1.2]">{coach[0]}</span>
                <span className="text-sm leading-[1.4] opacity-[.78]">{coach[1]}</span>
                <div className="mt-1.5 flex gap-1">
                  {[1, 2, 3].map((n) => (
                    <span
                      key={n}
                      className="h-1 flex-1 rounded-full"
                      style={{ background: n <= tut ? 'var(--hl)' : 'rgba(128,128,128,.35)' }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {screen === 'detail' && (
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="flex h-[52px] items-center justify-between border-b-2 border-[var(--dv)] px-3">
              <button
                onClick={() => setScreen('tasks')}
                className="flex h-11 items-center gap-1.5 px-2.5 text-[15px] font-semibold"
              >
                <ArrowLeft size={20} />
                My tasks
              </button>
              <button
                onClick={() => {
                  const id = detailId!
                  setScreen('tasks')
                  remove(id)
                }}
                className="flex h-11 items-center gap-1.5 px-2.5 text-[15px] font-extrabold text-[var(--red)]"
              >
                <Trash2 size={18} />
                Delete
              </button>
            </div>
            <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-6 [scrollbar-width:none]">
              <div className="flex">
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[.08em] ${detailDone ? 'bg-[var(--ac)] text-[var(--onac)]' : 'bg-[var(--ac1)] text-[var(--ac)]'}`}
                >
                  {detailDone ? 'Completed' : 'Active'}
                </span>
              </div>
              <label className={label}>
                Title
                <textarea
                  rows={2}
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value.replace(/\n/g, ''))}
                  className="resize-none border-b-2 border-[var(--dv)] bg-transparent pb-2.5 text-[30px] font-extrabold leading-[1.12] tracking-[-.015em] text-[var(--tx)] caret-[var(--ac)] outline-none focus:border-[var(--ac)]"
                />
              </label>
              <label className={label}>
                Description (optional)
                <textarea
                  rows={5}
                  value={editDesc}
                  placeholder="Add details"
                  onChange={(e) => setEditDesc(e.target.value)}
                  className="resize-none rounded-xl border border-[var(--dv)] bg-[var(--sf)] px-3.5 py-3 text-base leading-[1.5] text-[var(--tx)] caret-[var(--ac)] outline-none focus:border-[var(--ac)]"
                />
              </label>
              <button
                onClick={() => toggle(detailId!)}
                className="flex h-[52px] items-center justify-between rounded-xl border border-[var(--dv)] px-4 text-[15px] font-extrabold hover:bg-[var(--sf)]"
              >
                <span>{detailDone ? 'Reopen task' : 'Mark as completed'}</span>
                {detailDone ? <Undo2 size={20} /> : <Check size={20} />}
              </button>
            </div>
            <div className="border-t-2 border-[var(--dv)] px-6 pb-[30px] pt-3">
              <button onClick={saveDetail} disabled={!editTitle.trim()} className={primary}>
                <span>Save changes</span>
                <Check size={20} strokeWidth={2.4} />
              </button>
            </div>
          </div>
        )}

        {/* Toast */}
        {toast && (
          <div className="absolute inset-x-4 top-14 z-20 flex min-h-[52px] items-center justify-between gap-3 rounded-[14px] border border-[var(--dv)] bg-[var(--sf)] pl-4 pr-2 text-[15px] font-semibold shadow-[0_12px_32px_rgba(45,43,43,.3)]">
            <span>{toast.text}</span>
            {toast.undo && (
              <button onClick={undo} className="h-11 px-3 font-extrabold text-[var(--ac)]">
                Undo
              </button>
            )}
          </div>
        )}

        {/* Add task sheet */}
        <div
          onClick={() => setSheet(false)}
          className={`absolute inset-0 z-30 bg-[rgba(32,30,29,.5)] transition-opacity duration-[250ms] ${sheet ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        />
        <div
          className={`absolute inset-x-0 bottom-0 z-[31] flex flex-col gap-4 rounded-t-3xl border-t border-[var(--dv)] bg-[var(--bg)] px-6 pb-[34px] pt-5 transition-transform duration-[320ms] ease-[cubic-bezier(.2,.8,.2,1)] ${sheet ? 'translate-y-0' : 'translate-y-[105%]'}`}
        >
          <div className="mx-auto -mt-2 h-[5px] w-10 rounded-full bg-[var(--dv)]" />
          <div className="flex items-center justify-between">
            <h2 className="text-[26px] font-extrabold leading-none tracking-[-.015em]">New task</h2>
            <button onClick={() => setSheet(false)} aria-label="Close" className={`${iconBtn} -mr-2.5`}>
              <X size={22} />
            </button>
          </div>
          <label className={label}>
            Task title
            <input
              ref={sheetInput}
              className={input}
              value={newTitle}
              placeholder="What needs doing?"
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
            />
          </label>
          <label className={label}>
            Description (optional)
            <textarea
              rows={3}
              value={newDesc}
              placeholder="Add details"
              onChange={(e) => setNewDesc(e.target.value)}
              className="resize-none rounded-xl border border-[var(--dv)] bg-[var(--sf)] px-3.5 py-3 text-base leading-[1.45] text-[var(--tx)] caret-[var(--ac)] outline-none focus:border-[var(--ac)]"
            />
          </label>
          <button onClick={addTask} disabled={!newTitle.trim()} className={primary}>
            <span>Add task</span>
            <Plus size={22} strokeWidth={2.4} />
          </button>
        </div>

        {/* How it works */}
        {info && (
          <div
            onClick={() => setInfo(false)}
            className="absolute inset-0 z-40 flex items-center bg-[rgba(32,30,29,.55)] p-5"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex w-full flex-col overflow-hidden rounded-[20px] bg-[var(--bg)] shadow-[0_12px_32px_rgba(45,43,43,.22)]"
            >
              <div className="border-b-2 border-[var(--dv)] px-5 pb-3.5 pt-5">
                <h2 className="text-2xl font-extrabold leading-[1.1]">How it works</h2>
              </div>
              {[
                'Swipe right to complete or reopen a task.',
                'Swipe left to delete it. Tap Undo if you change your mind.',
                'Tap a task to see and edit its details.',
              ].map((text, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[44px_1fr] items-start border-b border-[var(--dv)] px-5 py-3.5"
                >
                  <span className="text-[13px] font-extrabold leading-[1.5] text-[var(--ac)]">0{i + 1}</span>
                  <span className="text-[15px] leading-[1.45]">{text}</span>
                </div>
              ))}
              <div className="grid grid-cols-2 gap-2 px-5 pb-5 pt-4">
                <button
                  onClick={() => {
                    setInfo(false)
                    setTut(1)
                    setFilter('all')
                    setQuery('')
                  }}
                  className="h-[50px] rounded-xl border border-[var(--dv)] px-3.5 text-left text-[15px] font-extrabold hover:bg-[var(--sf)]"
                >
                  Replay tutorial
                </button>
                <button
                  onClick={() => setInfo(false)}
                  className="h-[50px] rounded-xl bg-[var(--ac)] px-3.5 text-left text-[15px] font-extrabold text-[var(--onac)] hover:bg-[var(--ac6)]"
                >
                  Got it!
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
