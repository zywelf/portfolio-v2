import { useEffect, useRef, useState } from 'react'
import { Plus, X } from 'lucide-react'
import { iconBtn, input, label, primary, textarea } from '../styles'

const OPEN_ANIMATION_MS = 320

type AddTaskSheetProps = {
  open: boolean
  onClose: () => void
  onAdd: (title: string, desc: string) => void
}

// Bottom sheet that slides up; always mounted so it can animate in and out
export default function AddTaskSheet({ open, onClose, onAdd }: AddTaskSheetProps) {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const titleInput = useRef<HTMLInputElement>(null)

  // Focus after the slide-in, otherwise the browser scrolls the half-hidden input into view
  useEffect(() => {
    if (!open) return
    const timer = setTimeout(() => titleInput.current?.focus({ preventScroll: true }), OPEN_ANIMATION_MS)
    return () => clearTimeout(timer)
  }, [open])

  const submit = () => {
    if (!title.trim()) return
    onAdd(title.trim(), desc.trim())
    setTitle('')
    setDesc('')
  }

  return (
    <>
      <div
        onClick={onClose}
        className={`absolute inset-0 z-30 bg-black/50 transition-opacity duration-250 ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      />
      <div
        className={`absolute inset-x-0 bottom-0 z-31 flex flex-col gap-4 rounded-t-3xl border-t border-tm-divider bg-tm-bg px-6 pb-8.5 pt-5 transition-transform duration-300 ease-out ${open ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="mx-auto -mt-2 h-1.25 w-10 rounded-full bg-tm-divider" />
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-extrabold leading-none tracking-tight">New task</h2>
          <button onClick={onClose} aria-label="Close" className={`${iconBtn} -mr-2.5`}>
            <X size={22} />
          </button>
        </div>
        <label className={label}>
          Task title
          <input
            ref={titleInput}
            className={input}
            value={title}
            placeholder="What needs doing?"
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
          />
        </label>
        <label className={label}>
          Description (optional)
          <textarea
            rows={3}
            value={desc}
            placeholder="Add details"
            onChange={(e) => setDesc(e.target.value)}
            className={textarea}
          />
        </label>
        <button onClick={submit} disabled={!title.trim()} className={primary}>
          <span>Add task</span>
          <Plus size={22} strokeWidth={2.4} />
        </button>
      </div>
    </>
  )
}
