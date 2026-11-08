import { HOW_IT_WORKS } from '../constants'

export default function InfoDialog({ onClose, onReplay }: { onClose: () => void; onReplay: () => void }) {
  return (
    <div onClick={onClose} className="absolute inset-0 z-40 flex items-center bg-black/50 p-5">
      <div
        onClick={e => e.stopPropagation()}
        className="flex w-full flex-col overflow-hidden rounded-2xl bg-tm-bg shadow-xl"
      >
        <div className="border-b-2 border-tm-divider px-5 pb-3.5 pt-5">
          <h2 className="text-2xl font-extrabold leading-none">How it works</h2>
        </div>
        {HOW_IT_WORKS.map((text, i) => (
          <div key={text} className="flex items-start border-b border-tm-divider px-5 py-3.5">
            <span className="w-11 flex-none text-sm font-extrabold leading-normal text-tm-accent">
              0{i + 1}
            </span>
            <span className="text-base leading-normal">{text}</span>
          </div>
        ))}
        <div className="grid grid-cols-2 gap-2 px-5 pb-5 pt-4">
          <button
            onClick={onReplay}
            className="h-12.5 rounded-xl border border-tm-divider px-3.5 text-left text-base font-extrabold hover:bg-tm-surface"
          >
            Replay tutorial
          </button>
          <button
            onClick={onClose}
            className="h-12.5 rounded-xl bg-tm-accent px-3.5 text-left text-base font-extrabold text-tm-on-accent hover:bg-tm-accent-hover"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  )
}
