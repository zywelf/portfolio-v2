import React from 'react'

type TechBadgeProps = {
  name: string
  size?: number
  icon: React.ElementType
}

export default function TechBadge({ name, size = 20, icon: Icon }: TechBadgeProps) {
  return (
    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full border dark:border-white/10 border-black/10 text-xs text-muted-foreground hover:border-teal-light dark:hover:border-teal-light hover:text-teal-light transition-colors ease-in-out duration-300 cursor-default">
      <Icon size={size} />
      {name}
    </span>
  )
}
