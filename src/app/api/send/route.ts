import { EmailTemplate } from '../../../components/email-template'
import { Resend } from 'resend'
import { contactSchema } from '@/lib/contact-schema'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null)

  const result = contactSchema.safeParse(body)

  if (!result.success) {
    return Response.json({ error: result.error.issues }, { status: 400 })
  }

  const { fullName, email, cellphone, message } = result.data

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('RESEND_API_KEY not found')
    return Response.json({ error: 'send_failed' }, { status: 500 })
  }

  const resend = new Resend(apiKey)

  try {
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Zywel <onboarding@resend.dev>',
      to: ['zywelf@gmail.com'],
      subject: `Portfolio: nuovo messaggio da ${fullName}`,
      react: EmailTemplate({ fullName, email, cellphone, message }),
    })

    if (error) {
      console.error('Resend error:', error)
      return Response.json({ error: 'send_failed' }, { status: 500 })
    }

    return Response.json(data)
  } catch (error) {
    console.error('Catch error:', error)
    return Response.json({ error: 'send_failed' }, { status: 500 })
  }
}
