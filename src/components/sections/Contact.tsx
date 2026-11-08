'use client'

import { useTranslations } from 'next-intl'
import { Loader2 } from 'lucide-react'
import Section from '../layout/Section'
import SectionTitle from '../ui/SectionTitle'
import Card from '../ui/Card'
import FormField from '../ui/FormField'
import { useContactForm } from '@/hooks/useContactForm'
import type { ContactField } from '@/lib/contact-schema'

type Field = {
  id: ContactField
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
  const { formData, fieldErrors, status, isLoading, setField, handleSubmit } = useContactForm()

  return (
    <Section id="contact">
      <SectionTitle>{t('title')}</SectionTitle>
      <Card>
        <form onSubmit={handleSubmit} className="flex flex-col">
          {FIELDS.map((field) => {
            const errorCode = fieldErrors[field.id]
            return (
              <FormField
                key={field.id}
                {...field}
                label={t(field.id)}
                value={formData[field.id]}
                error={errorCode && t(`errors.${errorCode}`)}
                onChange={(value) => setField(field.id, value)}
              />
            )
          })}
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
