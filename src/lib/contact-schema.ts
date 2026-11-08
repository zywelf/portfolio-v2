import { z } from 'zod'

// Single source of truth for the contact form, shared by the API route (runtime validation)
// and the client (types only, so zod is not shipped to the browser).
// Error messages are codes translated on the client under `contact.errors.*`.
export const contactSchema = z.object({
  fullName: z.string().trim().min(1, 'required').max(100, 'tooLong'),
  email: z.email('invalidEmail').max(254, 'tooLong'),
  cellphone: z.string().trim().max(30, 'tooLong').optional().or(z.literal('')),
  message: z.string().trim().min(1, 'required').max(5000, 'tooLong'),
})

export type ContactField = keyof typeof contactSchema.shape
export type ContactFormData = Record<ContactField, string>
export type ContactErrorCode = 'required' | 'tooLong' | 'invalidEmail'
