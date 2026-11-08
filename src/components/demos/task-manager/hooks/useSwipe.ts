import { useRef, useState, type PointerEvent } from 'react'
import type { Drag } from '../types'

export const SWIPE_THRESHOLD = 90
const MAX_OFFSET = 160
const TAP_SLOP = 6

type SwipeActions = {
  onSwipeRight: (id: number) => void
  onSwipeLeft: (id: number) => void
  onTap: (id: number) => void
}

// Horizontal swipe on list rows: past the threshold it triggers an action,
// a short move without dragging counts as a tap. Elements with data-nodrag are ignored.
export function useSwipe({ onSwipeRight, onSwipeLeft, onTap }: SwipeActions) {
  const [drag, setDrag] = useState<Drag | null>(null)
  const gesture = useRef<{
    id: number
    x: number
    dx: number
    moved: boolean
  } | null>(null)

  const end = () => {
    const g = gesture.current
    gesture.current = null
    setDrag(null)
    return g
  }

  const bind = (id: number) => ({
    onPointerDown: (e: PointerEvent<HTMLDivElement>) => {
      if ((e.target as HTMLElement).closest('[data-nodrag]')) return
      gesture.current = { id, x: e.clientX, dx: 0, moved: false }
      e.currentTarget.setPointerCapture(e.pointerId)
    },
    onPointerMove: (e: PointerEvent<HTMLDivElement>) => {
      const g = gesture.current
      if (!g) return
      const dx = e.clientX - g.x
      if (Math.abs(dx) > TAP_SLOP) g.moved = true
      if (!g.moved) return
      g.dx = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, dx))
      setDrag({ id: g.id, dx: g.dx })
    },
    onPointerUp: () => {
      const g = end()
      if (!g) return
      if (g.dx > SWIPE_THRESHOLD) onSwipeRight(g.id)
      else if (g.dx < -SWIPE_THRESHOLD) onSwipeLeft(g.id)
      else if (!g.moved) onTap(g.id)
    },
    onPointerCancel: end,
  })

  return { drag, bind }
}
