'use client'
import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'
import { flushSync } from 'react-dom'
import { cn } from '@/lib/utils'

// true on the client, false during SSR: avoids rendering the wrong icon before the theme is known
const useMounted = () =>
  useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )

export default function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useMounted()

  if (!mounted) return null

  const isDark = resolvedTheme === 'dark'

  const toggleTheme = () => {
    const next = isDark ? 'light' : 'dark'
    // Browsers without View Transitions just switch instantly
    if (!document.startViewTransition) {
      setTheme(next)
      return
    }
    // flushSync applies the new theme class inside the callback, so the browser
    // snapshots the "after" state and cross-fades to it (timing lives in globals.css)
    document.startViewTransition(() => flushSync(() => setTheme(next)))
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={cn('text-muted-foreground transition-colors cursor-pointer', className)}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}
