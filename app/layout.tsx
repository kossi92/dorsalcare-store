import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Anton, Inter } from 'next/font/google'
import { FacebookPixel } from '@/components/facebook-pixel'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-anton',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'DorsalCare — Civière Dorsale | Soulagez votre dos en 5 min/jour',
  description:
    "Dites adieu aux douleurs de dos, lombaires, sciatique et tensions. La civière dorsale DorsalCare à 5 000 FCFA. Livraison rapide. Commandez en 1 minute sur WhatsApp.",
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#061426',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${anton.variable} bg-background`}>
      <body className="antialiased">
        <FacebookPixel />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
