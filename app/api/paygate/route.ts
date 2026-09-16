import { NextResponse } from 'next/server'
import { SITE, getDeliveryZone } from '@/lib/site'

// PayGate Global (Togo) — passerelle Mixx by Yas (T-Money) + Flooz (Moov).
// Le token marchand reste côté serveur (jamais exposé au navigateur).
const PAYGATE_PAGE = 'https://paygateglobal.com/v1/page'

export async function POST(request: Request) {
  const token = process.env.PAYGATE_AUTH_TOKEN
  if (!token) {
    return NextResponse.json(
      {
        error:
          "Le paiement mobile n'est pas encore configuré. Ajoutez votre PAYGATE_AUTH_TOKEN.",
      },
      { status: 503 },
    )
  }

  let body: {
    firstName?: string
    phone?: string
    quantity?: number
    zoneId?: string
    location?: string
  }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 })
  }

  const firstName = String(body.firstName ?? '').trim()
  const phone = String(body.phone ?? '').trim()
  const location = String(body.location ?? '').trim()
  const zoneId = String(body.zoneId ?? '').trim()
  const zone = getDeliveryZone(zoneId)
  const quantity = Math.min(20, Math.max(1, Math.floor(Number(body.quantity) || 1)))

  if (firstName.length < 2 || phone.replace(/\D/g, '').length < 8 || !zone) {
    return NextResponse.json({ error: 'Informations de commande incomplètes.' }, { status: 400 })
  }

  // Montant recalculé côté serveur (jamais depuis le client).
  const amount = SITE.price * quantity

  // Identifiant de commande unique.
  const identifier = `DC-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 7)}`.toUpperCase()

  const origin = new URL(request.url).origin
  const returnUrl = new URL('/paiement/retour', origin)
  returnUrl.searchParams.set('ref', identifier)
  returnUrl.searchParams.set('n', firstName)
  returnUrl.searchParams.set('t', phone)
  returnUrl.searchParams.set('q', String(quantity))
  returnUrl.searchParams.set('l', location)
  returnUrl.searchParams.set('z', zone.label)
  returnUrl.searchParams.set('f', String(zone.fee))
  if (zone.approx) returnUrl.searchParams.set('x', '1')
  returnUrl.searchParams.set('a', String(amount))

  const pay = new URL(PAYGATE_PAGE)
  pay.searchParams.set('token', token)
  pay.searchParams.set('amount', String(amount))
  pay.searchParams.set('description', `${SITE.product} x${quantity} — ${SITE.brand}`)
  pay.searchParams.set('identifier', identifier)
  pay.searchParams.set('url', returnUrl.toString())

  return NextResponse.json({ url: pay.toString(), identifier, amount })
}
