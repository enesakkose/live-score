import type { PropsWithChildren } from 'react'
import Head from 'next/head'
import { Metadata } from 'next'
import { barlow } from '@/assets/fonts/Barlow/barlowFont'
import ReactQueryProvider from '@/app/ReactQueryProvider'
import { DateProvider } from '@/context/DateContext'
import { TimezoneProvider } from '@/context/TimezoneContext'
import '@/styles/globals.scss'

export const metadata: Metadata = {
  title: "Skorr. | Follow today's live and schedule events on the Skorr.",
  description: "Follow today's live or schedule tennis, football, basketball events on the Skorr.",
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en' className={barlow.className}>
      <body>
        <ReactQueryProvider>
          <DateProvider>
            <TimezoneProvider>{children}</TimezoneProvider>
          </DateProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
