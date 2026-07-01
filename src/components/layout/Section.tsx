type SectionProps = {
  children: React.ReactNode
  id: string
  className?: string
}

export default function Section({ children, id, className }: SectionProps) {
  return (
    <section id={id} className={`px-6 py-24 max-w-5xl mx-auto ${className ?? ''}`}>
      {children}
    </section>
  )
}
