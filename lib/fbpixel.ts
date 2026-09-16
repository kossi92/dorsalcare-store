// Identifiant du Pixel Facebook, fourni via la variable d'environnement.
// Ajoutez NEXT_PUBLIC_FACEBOOK_PIXEL_ID dans les réglages du projet (Vars).
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID ?? ''

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
