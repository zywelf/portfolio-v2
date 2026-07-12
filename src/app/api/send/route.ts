import { EmailTemplate } from '../../../components/email-template'
import { Resend } from 'resend'
import { z } from 'zod'

const resend = new Resend(process.env.RESEND_API_KEY)

const contactSchema = z.object({
  fullName: z.string().trim().min(1, 'required').max(100, 'tooLong'),
  email: z.email('invalidEmail').max(254, 'tooLong'),
  cellphone: z.string().trim().max(30, 'tooLong').optional().or(z.literal('')),
  message: z.string().trim().min(1, 'required').max(5000, 'tooLong'),
})

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)

  const result = contactSchema.safeParse(body)

  if (!result.success) {
    return Response.json({ error: result.error.issues }, { status: 400 })
  }
  const { fullName, email, cellphone, message } = body

  try {
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Zywel <onboarding@resend.dev>',
      to: ['zywelf@gmail.com'],
      subject: `Portfolio: nuovo messaggio da ${fullName}`,
      react: EmailTemplate({ fullName, email, cellphone, message }),
    })

    if (error) {
      console.error('Resend error:', error)
      return Response.json({ error }, { status: 500 })
    }

    return Response.json(data)
  } catch (error) {
    console.error('Catch error:', error)
    return Response.json({ error }, { status: 500 })
  }
}
