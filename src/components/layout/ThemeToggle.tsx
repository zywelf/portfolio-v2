'use client'
import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'
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

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={cn('text-muted-foreground transition-colors cursor-pointer', className)}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}
