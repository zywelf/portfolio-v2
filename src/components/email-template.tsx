import { Html, Body, Container, Heading, Text, Hr, Section } from '@react-email/components'

interface EmailTemplateProps {
  fullName: string
  email: string
  cellphone?: string
  message: string
}

export function EmailTemplate({ fullName, email, cellphone, message }: EmailTemplateProps) {
  return (
    <Html>
      <Body style={{ backgroundColor: '#0a0a0a', fontFamily: 'monospace' }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
          <Heading style={{ color: '#2DD4BF', fontSize: '24px', marginBottom: '8px' }}>
            Nuovo messaggio dal portfolio
          </Heading>
          <Hr style={{ borderColor: '#2DD4BF33', marginBottom: '24px' }} />
          <Section>
            <Text style={{ color: '#ededed', fontSize: '14px', margin: '8px 0' }}>
              <strong style={{ color: '#2DD4BF' }}>Nome:</strong> {fullName}
            </Text>
            <Text style={{ color: '#ededed', fontSize: '14px', margin: '8px 0' }}>
              <strong style={{ color: '#2DD4BF' }}>Email:</strong> {email}
            </Text>
            {cellphone && (
              <Text style={{ color: '#ededed', fontSize: '14px', margin: '8px 0' }}>
                <strong style={{ color: '#2DD4BF' }}>Cellulare:</strong> {cellphone}
              </Text>
            )}
          </Section>
          <Hr style={{ borderColor: '#2DD4BF33', margin: '24px 0' }} />
          <Heading as="h2" style={{ color: '#2DD4BF', fontSize: '16px', marginBottom: '8px' }}>
            Messaggio
          </Heading>
          <Text style={{ color: '#ededed', fontSize: '14px', lineHeight: '1.6' }}>{message}</Text>
        </Container>
      </Body>
    </Html>
  )
}
