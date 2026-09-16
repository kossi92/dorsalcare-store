import Link from 'next/link'
import { CheckCircle2, ArrowLeft } from 'lucide-react'
import { SITE, buildOrderMessage, buildWhatsAppLink } from '@/lib/site'
import { PurchaseTracker } from './purchase-tracker'

export const metadata = {
  title: 'Paiement confirmé — DorsalCare',
  robots: { index: false, follow: false },
}

export default async function PaymentReturnPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const sp = await searchParams
  const get = (k: string) => (Array.isArray(sp[k]) ? sp[k]?.[0] : sp[k]) ?? ''

  const reference = get('ref')
  const firstName = get('n')
  const phone = get('t')
  const location = get('l')
  const zoneLabel = get('z') || undefined
  const deliveryFeeRaw = get('f')
  const deliveryFee = deliveryFeeRaw ? Math.max(0, Math.floor(Number(deliveryFeeRaw))) : undefined
  const quantity = Math.max(1, Math.floor(Number(get('q')) || 1))
  const subtotal = Math.max(0, Math.floor(Number(get('a')) || SITE.price * quantity))

  const message = buildOrderMessage({
    firstName,
    phone,
    quantity,
    location,
    zoneLabel,
    deliveryFee,
    subtotal,
    paid: true,
    reference,
  })

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center px-4 py-12 text-center">
      <PurchaseTracker value={subtotal} quantity={quantity} />

      <div className="animate-pop grid size-20 place-items-center rounded-full bg-success/15">
        <CheckCircle2 className="size-12 text-success" aria-hidden />
      </div>

      <h1 className="mt-6 font-display text-3xl leading-tight text-shadow-strong">
        Merci {firstName || 'pour votre commande'} !
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Si votre paiement Mobile Money a bien été validé, votre commande est enregistrée.
        Cliquez ci-dessous pour l&apos;envoyer sur WhatsApp et confirmer votre livraison.
      </p>

      {reference ? (
        <p className="mt-4 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
          Référence de commande : <span className="font-semibold text-foreground">{reference}</span>
        </p>
      ) : null}

      <dl className="mt-5 w-full space-y-1.5 rounded-xl border border-border bg-card p-4 text-left text-sm">
        <Row label="Produit" value={`${SITE.product} x ${quantity}`} />
        <Row
          label="Montant payé"
          value={`${subtotal.toLocaleString('fr-FR')} ${SITE.currency}`}
        />
        {zoneLabel ? <Row label="Quartier" value={zoneLabel} /> : null}
        {location ? <Row label="Adresse précise" value={location} /> : null}
        {typeof deliveryFee === 'number' ? (
          <Row
            label="Frais de livraison"
            value={`${deliveryFee.toLocaleString('fr-FR')} ${SITE.currency} (à régler à la livraison)`}
          />
        ) : null}
      </dl>

      <a
        href={buildWhatsAppLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-success px-6 py-4 font-display text-lg text-success-foreground shadow-xl transition active:scale-[0.98] animate-pulse-glow"
      >
        CONFIRMER SUR WHATSAPP
      </a>

      <Link
        href="/"
        className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Retour à la boutique
      </Link>
    </main>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-semibold">{value}</dd>
    </div>
  )
}
