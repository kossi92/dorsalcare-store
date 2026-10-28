// Pixels Facebook chargés sur le site. Chaque événement (PageView, ViewContent,
// InitiateCheckout, Lead, Purchase…) est envoyé à TOUS ces pixels.
//
// 1) Pixel(s) fourni(s) via la variable d'environnement Vercel
//    NEXT_PUBLIC_FACEBOOK_PIXEL_ID (pixel MK_EXPRESS Bazaar Ads). Plusieurs
//    identifiants peuvent être séparés par des virgules.
// 2) « Pixel KossiDetox » du compte publicitaire Paul Atila, toujours chargé.
// 3) « zozo achat » du compte publicitaire zozo (Mkexpress bazar), toujours chargé.
const KOSSIDETOX_PIXEL_ID = '943686954774735'
const ZOZO_ACHAT_PIXEL_ID = '1555207795878538'

export const FB_PIXEL_IDS: string[] = Array.from(
  new Set(
    [
      ...(process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID ?? '').split(','),
      KOSSIDETOX_PIXEL_ID,
      ZOZO_ACHAT_PIXEL_ID,
    ]
      .map((id) => id.trim())
      .filter((id) => /^\d+$/.test(id)),
  ),
)

type FbEventName =
  | 'PageView'
  | 'ViewContent'
  | 'InitiateCheckout'
  | 'AddPaymentInfo'
  | 'Contact'
  | 'Lead'
  | 'Purchase'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

/** Déclenche un événement standard Facebook si le Pixel est chargé. */
export function fbTrack(event: FbEventName, params?: Record<string, unknown>) {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return
  window.fbq('track', event, params)
}
