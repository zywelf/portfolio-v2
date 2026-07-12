import { ThemeProvider } from '@/components/layout/ThemeProvider'
import { JetBrains_Mono } from 'next/font/google'
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import './globals.css'
import type { Metadata } from 'next'

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
})

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" suppressHydrationWarning className={jetBrainsMono.variable}>
      <body>
        <Analytics />
        <SpeedInsights />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
