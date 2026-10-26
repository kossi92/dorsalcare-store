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

const SITE_URL = 'https://dorsalcare-store.vercel.app'
const TITLE = 'DorsalCare — Civière Dorsale | Soulagez votre dos en 5 min/jour'
const DESCRIPTION =
  'Civière dorsale DorsalCare à 5 000 FCFA au lieu de 10 000. Paiement à la livraison ou Mobile Money. Livraison rapide à Lomé et au Togo. Commandez en 1 minute sur WhatsApp.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: 'DorsalCare',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: SITE_URL,
    siteName: 'DorsalCare',
    title: 'Libère ton dos, retrouve ta vie ! — Civière dorsale à 5 000 FCFA',
    description:
      'Soulage ton dos en 5 minutes par jour, chez toi. Paiement à la livraison • Livraison rapide à Lomé.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DorsalCare — Civière dorsale à 5 000 FCFA',
    description: 'Soulage ton dos en 5 minutes par jour. Paiement à la livraison à Lomé.',
  },
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
