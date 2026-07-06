'use client'
import { TypeAnimation } from 'react-type-animation'

export default function TypingTitle() {
  return (
    <TypeAnimation
      sequence={['Full Stack Developer', 2000, 'Frontend Developer', 2000, 'Backend Developer', 2000]}
      repeat={Infinity}
      speed={50}
      className="text-3xl md:text-7xl font-bold text-foreground max-w-4xl leading-tight text-nowrap"
    />
  )
}
