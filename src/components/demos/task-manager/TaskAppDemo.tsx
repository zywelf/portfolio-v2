'use client'

import { useState, type CSSProperties } from 'react'
import { THEMES } from './constants'
import { useTasks } from './hooks/useTasks'
import { useToast } from './hooks/useToast'
import { useTutorial } from './hooks/useTutorial'
import { useSwipe } from './hooks/useSwipe'
import StatusBar from './components/StatusBar'
import AuthScreen from './components/AuthScreen'
import TasksScreen from './components/TasksScreen'
import DetailScreen from './components/DetailScreen'
import AddTaskSheet from './components/AddTaskSheet'
import Toast from './components/Toast'
import InfoDialog from './components/InfoDialog'
import type { Filter, Screen } from './types'

// Interactive phone mock-up of the Task Manager app. This component only holds the state
// shared between screens and wires actions to toasts and tutorial steps.
export default function TaskAppDemo() {
  const [screen, setScreen] = useState<Screen>('auth')
  const [dark, setDark] = useState(true)
  const [filter, setFilter] = useState<Filter>('all')
  const [query, setQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [infoOpen, setInfoOpen] = useState(false)
  const [detailId, setDetailId] = useState<number | null>(null)

  const { tasks, toggle, remove, restore, add, update } = useTasks()
  const { toast, showToast } = useToast()
  const tutorial = useTutorial()

  const toggleTask = (id: number) => {
    const completed = toggle(id)
    if (completed === undefined) return
    if (completed) tutorial.advanceFrom(1)
    showToast(completed ? 'Task completed!' : 'Task reopened')
  }

  const deleteTask = (id: number) => {
    if (!remove(id)) return
    tutorial.advanceFrom(2)
    showToast('Task deleted', true, 4500)
  }

  const undoDelete = () => {
    if (restore()) showToast('Task restored', false, 1800)
  }

  const openDetail = (id: number) => {
    setDetailId(id)
    setScreen('detail')
  }

  const swipe = useSwipe({
    onSwipeRight: toggleTask,
    onSwipeLeft: deleteTask,
    onTap: openDetail,
  })

  const openSheet = () => {
    setSheetOpen(true)
    if (tutorial.step === tutorial.total) tutorial.finish()
  }

  const addTask = (title: string, desc: string) => {
    add(title, desc)
    setSheetOpen(false)
    setQuery('')
    if (filter === 'completed') setFilter('all')
    showToast('Task added', false, 1800)
  }

  const toggleSearch = () => {
    if (searchOpen) setQuery('')
    setSearchOpen(!searchOpen)
  }

  const login = () => {
    setScreen('tasks')
    tutorial.startIfNew()
  }

  const logout = () => {
    setScreen('auth')
    tutorial.hide()
    setInfoOpen(false)
  }

  const replayTutorial = () => {
    setInfoOpen(false)
    tutorial.restart()
    setFilter('all')
    setQuery('')
  }

  const detailTask = tasks.find(t => t.id === detailId)

  return (
    <div className="box-border w-103.5 rounded-4xl bg-neutral-950 p-3 shadow-2xl">
      <div
        style={THEMES[dark ? 'dark' : 'light'] as CSSProperties}
        className="relative flex h-211 font-demo w-97.5 select-none flex-col overflow-hidden rounded-3xl bg-tm-bg text-tm-text transition-colors duration-300"
      >
        <StatusBar accent={screen === 'tasks'} />

        {screen === 'auth' && <AuthScreen onLogin={login} />}

        {screen === 'tasks' && (
          <TasksScreen
            tasks={tasks}
            filter={filter}
            onFilterChange={setFilter}
            query={query}
            onQueryChange={setQuery}
            searchOpen={searchOpen}
            onToggleSearch={toggleSearch}
            dark={dark}
            onToggleTheme={() => setDark(!dark)}
            onShowInfo={() => setInfoOpen(true)}
            onLogout={logout}
            drag={swipe.drag}
            bindSwipe={swipe.bind}
            onToggleTask={toggleTask}
            onOpenSheet={openSheet}
            tutorial={
              tutorial.current && !sheetOpen
                ? {
                    step: tutorial.step,
                    total: tutorial.total,
                    ...tutorial.current,
                  }
                : null
            }
            onSkipTutorial={tutorial.finish}
          />
        )}

        {screen === 'detail' && detailTask && (
          <DetailScreen
            key={detailTask.id}
            task={detailTask}
            onBack={() => setScreen('tasks')}
            onDelete={() => {
              setScreen('tasks')
              deleteTask(detailTask.id)
            }}
            onToggle={() => toggleTask(detailTask.id)}
            onSave={(title, desc) => {
              update(detailTask.id, title, desc)
              setScreen('tasks')
              showToast('Changes saved', false, 1800)
            }}
          />
        )}

        {toast && <Toast toast={toast} onUndo={undoDelete} />}

        <AddTaskSheet open={sheetOpen} onClose={() => setSheetOpen(false)} onAdd={addTask} />

        {infoOpen && <InfoDialog onClose={() => setInfoOpen(false)} onReplay={replayTutorial} />}
      </div>
    </div>
  )
}
