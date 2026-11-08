import { cn } from '@/lib/utils'

const SIZES = {
  h2: 'text-4xl mb-12',
  h3: 'text-2xl mb-6',
}

type SectionTitleProps = {
  children: React.ReactNode
  as?: keyof typeof SIZES
  className?: string
}

export default function SectionTitle({ children, as: Tag = 'h2', className }: SectionTitleProps) {
  return (
    <Tag className={cn('font-bold text-foreground', SIZES[Tag], className)}>
      {children}
      <span className="text-teal-light">.</span>
    </Tag>
  )
}
