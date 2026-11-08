import { overlayCard } from '../styles'
import type { ToastMessage } from '../types'

export default function Toast({ toast, onUndo }: { toast: ToastMessage; onUndo: () => void }) {
  return (
    <div
      className={`absolute inset-x-4 top-14 z-20 flex min-h-13 items-center justify-between gap-3 rounded-xl border border-tm-divider bg-tm-surface pl-4 pr-2 text-base font-semibold ${overlayCard}`}
    >
      <span>{toast.text}</span>
      {toast.undo && (
        <button onClick={onUndo} className="h-11 px-3 font-extrabold text-tm-accent">
          Undo
        </button>
      )}
    </div>
  )
}
