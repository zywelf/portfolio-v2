'use client'
import { useEffect, useRef, useState } from 'react'
import type { ContactErrorCode, ContactField, ContactFormData } from '@/lib/contact-schema'

type Status = 'idle' | 'success' | 'error'
type FieldErrors = Partial<Record<ContactField, ContactErrorCode>>

const EMPTY_FORM_DATA: ContactFormData = {
  fullName: '',
  email: '',
  cellphone: '',
  message: '',
}

const STATUS_RESET_MS = 4000

// Maps the zod issues returned by /api/send to one error code per field
function toFieldErrors(payload: unknown): FieldErrors {
  const issues = (payload as { error?: unknown } | null)?.error
  if (!Array.isArray(issues)) return {}

  const errors: FieldErrors = {}
  for (const issue of issues) {
    const field = issue?.path?.[0] as ContactField | undefined
    if (field && !errors[field]) errors[field] = issue.message
  }
  return errors
}

// Owns the contact form state and submission; rendering and translations stay in the component
export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(EMPTY_FORM_DATA)
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const resetTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(resetTimer.current), [])

  const resetStatusLater = () => {
    clearTimeout(resetTimer.current)
    resetTimer.current = setTimeout(() => {
      setStatus('idle')
      setFieldErrors({})
    }, STATUS_RESET_MS)
  }

  const setField = (field: ContactField, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setFieldErrors({})

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setStatus('success')
        setFormData(EMPTY_FORM_DATA)
      } else {
        setFieldErrors(toFieldErrors(await response.json().catch(() => null)))
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally {
      setIsLoading(false)
      resetStatusLater()
    }
  }

  return { formData, fieldErrors, status, isLoading, setField, handleSubmit }
}
