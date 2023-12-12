import type { Metadata } from 'next'
import { Libre_Baskerville } from 'next/font/google'
import './globals.css'

const baskerville = Libre_Baskerville({ weight: [ "700"], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GoodLetter',
  description: 'A home for everything you read',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={baskerville.className}>{children}</body>
    </html>
  )
}
