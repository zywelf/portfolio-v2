'use client'
import { useEffect } from 'react'

interface Props {
  locale: string
}

export function HtmlLangSync({ locale }: Props) {
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])
  return null
}
