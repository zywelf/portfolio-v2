'use client'

import { useState, useRef, useEffect } from 'react'
import Section from '../layout/Section'
import SectionTitle from '../ui/SectionTitle'
import { useTranslations } from 'next-intl'
import Card from '../ui/Card'
import { Loader2 } from 'lucide-react'
import FormField from '../ui/FormField'

type FormData = {
  fullName: string
  email: string
  cellphone: string
  message: string
}

const EMPTY_FORM_DATA: FormData = {
  fullName: '',
  email: '',
  cellphone: '',
  message: '',
}

type Field = {
  id: keyof FormData
  type?: 'text' | 'email' | 'tel'
  required?: boolean
  multiline?: boolean
}

const FIELDS: Field[] = [
  { id: 'fullName', type: 'text', required: true },
  { id: 'email', type: 'email', required: true },
  { id: 'cellphone', type: 'tel' },
  { id: 'message', multiline: true, required: true },
]

export default function Contact() {
  const t = useTranslations('contact')
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM_DATA)
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const resetTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  useEffect(() => () => clearTimeout(resetTimer.current), [])

  const resetStatusLater = () => {
    clearTimeout(resetTimer.current)
    resetTimer.current = setTimeout(() => {
      setStatus('idle')
      setFieldErrors({})
    }, 4000)
  }

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setFieldErrors({})

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        setStatus('success')
        setFormData(EMPTY_FORM_DATA)
        resetStatusLater()
      } else {
        const data = await response.json().catch(() => null)
        const issues = Array.isArray(data?.error) ? data.error : null
        if (issues) {
          const errors: Record<string, string> = {}
          for (const issue of issues) {
            const field = issue.path?.[0]
            if (typeof field === 'string' && !errors[field]) {
              errors[field] = t(`errors.${issue.message}`)
            }
          }
          setFieldErrors(errors)
        }
        setStatus('error')
        resetStatusLater()
      }
    } catch {
      setStatus('error')
      resetStatusLater()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Section id="contact">
      <SectionTitle>{t('title')}</SectionTitle>
      <Card>
        <form onSubmit={handleSubmit} className="flex flex-col">
          {FIELDS.map((field) => (
            <FormField
              key={field.id}
              {...field}
              label={t(field.id)}
              value={formData[field.id]}
              error={fieldErrors[field.id]}
              onChange={(value) => handleChange(field.id, value)}
            />
          ))}
          <button
            type="submit"
            className="mt-4 px-6 py-3 rounded-full border border-teal-light text-teal-light hover:bg-teal-light hover:text-black transition-colors self-start disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 size={16} className="animate-spin" />
                {t('sending')}
              </span>
            ) : (
              t('send')
            )}
          </button>
          {status === 'success' && <p className="text-teal text-sm mt-2">{t('success')}</p>}
          {status === 'error' && <p className="text-red-500 text-sm mt-2">{t('error')}</p>}
        </form>
      </Card>
    </Section>
  )
}
