import type { PropsWithChildren } from 'react'
import { Inter, Josefin_Sans, Barlow } from 'next/font/google'
import { manrope } from '@/utils/fonts/manropeFont'
import { barlow } from '@/utils/fonts/barlowFont'
import ReactQueryProvider from '@/app/ReactQueryProvider'
import '@/styles/globals.scss'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export const metadata = {
  title: 'Score',
  description: 'Generated by score',
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='en' className={barlow.className}>
      <body >
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  )
}
