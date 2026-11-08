import { useEffect, useRef, useState } from 'react'
import type { ToastMessage } from '../types'

export function useToast() {
  const [toast, setToast] = useState<ToastMessage | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  const showToast = (text: string, undo = false, ms = 2000) => {
    clearTimeout(timer.current)
    setToast({ text, undo })
    timer.current = setTimeout(() => setToast(null), ms)
  }

  return { toast, showToast }
}
