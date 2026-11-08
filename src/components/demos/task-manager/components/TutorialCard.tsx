import { overlayCard } from '../styles'

type TutorialCardProps = {
  step: number
  total: number
  title: string
  body: string
  onSkip: () => void
}

export default function TutorialCard({ step, total, title, body, onSkip }: TutorialCardProps) {
  return (
    <div
      className={`absolute inset-x-4 bottom-27 flex flex-col gap-1.5 rounded-2xl border border-tm-accent bg-tm-surface px-4 pb-4.5 pt-4 ${overlayCard}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest text-tm-accent">
          Step {step} of {total}
        </span>
        <button onClick={onSkip} className="py-1 text-sm font-semibold opacity-70">
          Skip tutorial
        </button>
      </div>
      <span className="text-xl font-extrabold leading-tight">{title}</span>
      <span className="text-sm leading-snug opacity-80">{body}</span>
      <div className="mt-1.5 flex gap-1">
        {Array.from({ length: total }, (_, i) => i + 1).map((n) => (
          <span
            key={n}
            className="h-1 flex-1 rounded-full"
            style={{
              background: n <= step ? 'var(--tm-highlight)' : 'rgba(128,128,128,.35)',
            }}
          />
        ))}
      </div>
    </div>
  )
}
