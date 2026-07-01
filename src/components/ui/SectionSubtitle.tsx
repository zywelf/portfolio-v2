interface SectionSubtitleProps {
  text: string
  className?: string
}

export default function SectionSubtitle({ text, className }: SectionSubtitleProps) {
  return (
    <h3 className={`text-2xl font-bold text-foreground mb-6 ${className ?? ''}`}>
      {text}
      <span className="text-teal-light">.</span>
    </h3>
  )
}
