type CardProps = {
  className?: string
  children: React.ReactNode
}

export default function Card({ className, children }: CardProps) {
  return (
    <div
      className={`border dark:border-white/10 border-black/10 hover:border-teal-light dark:hover:border-teal-light rounded-xl p-6 flex flex-col gap-4 transition-colors ease-in-out duration-300 ${className ?? ''}`}
    >
      {children}
    </div>
  )
}
