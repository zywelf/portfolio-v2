'use client'

import { useState } from 'react'
import Section from '../layout/Section'
import SectionTitle from '../ui/SectionTitle'
import { useTranslations } from 'next-intl'
import Card from '../ui/Card'
import { Loader2 } from 'lucide-react'

type FormData = {
  fullName: string
  email: string
  cellphone: string
  message: string
}

export default function Contact() {
  const t = useTranslations('contact')
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    cellphone: '',
    message: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const inputClassName =
    'bg-transparent border dark:border-white/10 border-black/10 rounded-lg px-4 py-2 text-foreground text-sm focus:outline-none focus:border-teal-light dark:focus:border-teal-light transition-colors mb-4'

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
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
        setFormData({
          fullName: '',
          email: '',
          cellphone: '',
          message: '',
        })
        setTimeout(() => setStatus('idle'), 4000)
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
            setFieldErrors(errors)
          }
        }
        setStatus('error')
        setTimeout(() => {
          setStatus('idle')
          setFieldErrors({})
        }, 4000)
      }
    } catch {
      setStatus('error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Section id="contact">
      <SectionTitle>{t('title')}</SectionTitle>
      <Card>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="text-sm text-muted-foreground mb-1" htmlFor="fullName">
            {t('fullname')}*
          </label>
          <input
            required
            className={`${inputClassName}`}
            id="fullName"
            type="text"
            value={formData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
          />
          {fieldErrors.fullName && <p className="text-red-500 text-xs -mt-3 mb-3">{fieldErrors.fullName}</p>}
          <label className="text-sm text-muted-foreground mb-1" htmlFor="email">
            {t('email')}*
          </label>
          <input
            required
            className={`${inputClassName}`}
            id="email"
            type="text"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
          {fieldErrors.email && <p className="text-red-500 text-xs -mt-3 mb-3">{fieldErrors.email}</p>}
          <label className="text-sm text-muted-foreground mb-1" htmlFor="cellphone">
            {t('cellphone')}
          </label>
          <input
            className={`${inputClassName}`}
            id="cellphone"
            type="text"
            value={formData.cellphone}
            onChange={(e) => handleChange('cellphone', e.target.value)}
          />
          {fieldErrors.cellphone && (
            <p className="text-red-500 text-xs -mt-3 mb-3">{fieldErrors.cellphone}</p>
          )}
          <label className="text-sm text-muted-foreground mb-1" htmlFor="message">
            {t('message')}*
          </label>
          <textarea
            required
            id="message"
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            className={`${inputClassName}`}
          ></textarea>
          {fieldErrors.message && <p className="text-red-500 text-xs -mt-3 mb-3">{fieldErrors.message}</p>}
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
