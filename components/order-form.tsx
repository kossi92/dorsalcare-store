'use client'

import { useMemo, useState, type FormEvent } from 'react'
import {
  User,
  Phone,
  Hash,
  MapPin,
  ChevronDown,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
  Smartphone,
  Loader2,
} from 'lucide-react'
import { SITE, DELIVERY_ZONES, buildWhatsAppLink, buildOrderMessage } from '@/lib/site'
import { fbTrack } from '@/lib/fbpixel'

type PaymentMethod = 'cod' | 'mobile'

export function OrderForm() {
  const [firstName, setFirstName] = useState('')
  const [phone, setPhone] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [zoneId, setZoneId] = useState('')
  const [location, setLocation] = useState('')
  const [method, setMethod] = useState<PaymentMethod>('cod')
  const [loading, setLoading] = useState(false)
  const [payError, setPayError] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const subtotal = useMemo(() => SITE.price * quantity, [quantity])
  const zone = useMemo(() => DELIVERY_ZONES.find((z) => z.id === zoneId), [zoneId])
  const total = subtotal + (zone?.fee ?? 0)

  function validate() {
    const next: Record<string, string> = {}
    if (firstName.trim().length < 2) next.firstName = 'Entrez votre prénom.'
    if (phone.replace(/\D/g, '').length < 8)
      next.phone = 'Entrez un numéro joignable valide.'
    if (!zone) next.zone = 'Choisissez votre quartier de livraison.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setPayError('')
    if (!validate()) return

    fbTrack('Lead', {
      content_name: SITE.product,
      currency: 'XOF',
      value: subtotal,
      quantity,
    })

    if (method === 'mobile') {
      setLoading(true)
      fbTrack('AddPaymentInfo', { currency: 'XOF', value: subtotal })
      try {
        const res = await fetch('/api/paygate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName: firstName.trim(),
            phone: phone.trim(),
            quantity,
            zoneId,
            location: location.trim(),
          }),
        })
        const data = await res.json()
        if (!res.ok || !data.url) {
          setPayError(
            data?.error ??
              "Le paiement mobile est momentanément indisponible. Utilisez le paiement à la livraison.",
          )
          setLoading(false)
          return
        }
        window.location.href = data.url
      } catch {
        setPayError(
          "Connexion impossible. Réessayez ou choisissez le paiement à la livraison.",
        )
        setLoading(false)
      }
      return
    }

    // Paiement à la livraison -> redirection WhatsApp
    const message = buildOrderMessage({
      firstName: firstName.trim(),
      phone: phone.trim(),
      quantity,
      location: location.trim(),
      zoneLabel: zone?.label,
      deliveryFee: zone?.fee,
      subtotal,
    })
    fbTrack('Contact', { method: 'whatsapp' })
    window.open(buildWhatsAppLink(message), '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="commander" className="scroll-mt-4 px-4 py-12">
      <div className="mx-auto max-w-md">
        <div className="mb-5 text-center">
          <span className="mx-auto flex w-fit items-center gap-2 rounded-full bg-success/15 px-3 py-1 text-xs font-bold text-success">
            <Truck className="size-4" aria-hidden />
            COMMANDE EN 1 MINUTE
          </span>
          <h2 className="mt-4 font-display text-3xl leading-tight text-shadow-strong">
            Commandez votre civière
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Remplissez le formulaire, votre commande part directement sur notre WhatsApp.
            Paiement à la livraison.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="rounded-2xl border border-border bg-card p-5 shadow-2xl"
        >
          {/* Prénom */}
          <Field
            id="firstName"
            label="Prénom"
            icon={User}
            error={errors.firstName}
          >
            <input
              id="firstName"
              type="text"
              autoComplete="given-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Votre prénom"
              className="w-full bg-transparent py-3 pl-10 pr-3 text-sm outline-none placeholder:text-muted-foreground"
            />
          </Field>

          {/* Téléphone */}
          <Field
            id="phone"
            label="Numéro joignable"
            icon={Phone}
            error={errors.phone}
          >
            <input
              id="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ex : 90 00 00 00"
              className="w-full bg-transparent py-3 pl-10 pr-3 text-sm outline-none placeholder:text-muted-foreground"
            />
          </Field>

          {/* Quantité */}
          <div className="mt-4">
            <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">
              Quantité
            </label>
            <div className="flex items-center justify-between rounded-xl border border-input bg-background px-2 py-2">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Diminuer la quantité"
                className="grid size-10 place-items-center rounded-lg bg-muted text-foreground transition active:scale-95 disabled:opacity-40"
                disabled={quantity <= 1}
              >
                <Minus className="size-4" aria-hidden />
              </button>
              <div className="flex items-center gap-2">
                <Hash className="size-4 text-muted-foreground" aria-hidden />
                <span className="font-display text-2xl tabular-nums">{quantity}</span>
              </div>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                aria-label="Augmenter la quantité"
                className="grid size-10 place-items-center rounded-lg bg-primary text-primary-foreground transition active:scale-95"
              >
                <Plus className="size-4" aria-hidden />
              </button>
            </div>
          </div>

          {/* Quartier / zone de livraison */}
          <div className="mt-4">
            <label
              htmlFor="zone"
              className="mb-1.5 block text-xs font-semibold text-muted-foreground"
            >
              Votre quartier
            </label>
            <div
              className={`relative rounded-xl border bg-background ${
                errors.zone ? 'border-danger' : 'border-input'
              }`}
            >
              <MapPin
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <select
                id="zone"
                value={zoneId}
                onChange={(e) => setZoneId(e.target.value)}
                className="w-full appearance-none bg-transparent py-3 pl-10 pr-9 text-sm outline-none"
              >
                <option value="" disabled>
                  Choisissez votre quartier
                </option>
                {DELIVERY_ZONES.map((z) => (
                  <option key={z.id} value={z.id}>
                    {z.label} — livraison {z.fee.toLocaleString('fr-FR')} {SITE.currency}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
            </div>
            {errors.zone ? <p className="mt-1 text-xs text-danger">{errors.zone}</p> : null}
          </div>

          {/* Adresse précise (optionnelle) */}
          <Field id="location" label="Adresse précise, repère (optionnel)" icon={MapPin}>
            <input
              id="location"
              type="text"
              autoComplete="address-line1"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ex : non loin du grand marché"
              className="w-full bg-transparent py-3 pl-10 pr-3 text-sm outline-none placeholder:text-muted-foreground"
            />
          </Field>

          {/* Mode de paiement */}
          <div className="mt-4">
            <label className="mb-1.5 block text-xs font-semibold text-muted-foreground">
              Mode de paiement
            </label>
            <div className="grid gap-2">
              <PayOption
                active={method === 'cod'}
                onClick={() => setMethod('cod')}
                icon={Truck}
                title="Paiement à la livraison"
                desc="Vous payez à la réception (recommandé)"
              />
              <PayOption
                active={method === 'mobile'}
                onClick={() => setMethod('mobile')}
                icon={Smartphone}
                title="Payer maintenant — Mobile Money"
                desc="Mixx by Yas (T-Money) & Flooz"
              />
            </div>
          </div>

          {/* Récap */}
          <dl className="mt-5 space-y-1.5 rounded-xl bg-muted/60 p-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">
                Produit x {quantity}
              </dt>
              <dd className="font-semibold">
                {subtotal.toLocaleString('fr-FR')} {SITE.currency}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">
                Livraison{zone ? ` — ${zone.label}` : ''}
              </dt>
              <dd className="font-semibold text-accent">
                {zone
                  ? `${zone.fee.toLocaleString('fr-FR')} ${SITE.currency}`
                  : 'Choisissez un quartier'}
              </dd>
            </div>
            {zone ? (
              <div className="flex justify-between border-t border-border/60 pt-1.5">
                <dt className="font-semibold">Total estimé</dt>
                <dd className="font-display text-base text-accent">
                  {total.toLocaleString('fr-FR')} {SITE.currency}
                </dd>
              </div>
            ) : null}
          </dl>

          {payError ? (
            <p className="mt-4 rounded-lg bg-danger/10 px-3 py-2 text-center text-xs font-medium text-danger">
              {payError}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-success px-6 py-4 font-display text-lg text-success-foreground shadow-xl transition active:scale-[0.98] animate-pulse-glow disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="size-6 animate-spin" aria-hidden />
                REDIRECTION...
              </>
            ) : method === 'mobile' ? (
              <>
                <Smartphone className="size-6" aria-hidden />
                PAYER {subtotal.toLocaleString('fr-FR')} {SITE.currency}
              </>
            ) : (
              <>
                <WhatsAppGlyph className="size-6" />
                ENVOYER MA COMMANDE
              </>
            )}
          </button>

          <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
            <ShieldCheck className="size-4 text-success" aria-hidden />
            {method === 'mobile'
              ? 'Paiement sécurisé via PayGate • Mixx by Yas & Flooz'
              : 'Sans engagement • Vous payez à la réception'}
          </p>
        </form>
      </div>
    </section>
  )
}

function Field({
  id,
  label,
  icon: Icon,
  error,
  children,
}: {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="mt-4">
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold text-muted-foreground">
        {label}
      </label>
      <div
        className={`relative rounded-xl border bg-background ${
          error ? 'border-danger' : 'border-input'
        }`}
      >
        <Icon
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        {children}
      </div>
      {error ? <p className="mt-1 text-xs text-danger">{error}</p> : null}
    </div>
  )
}

function PayOption({
  active,
  onClick,
  icon: Icon,
  title,
  desc,
}: {
  active: boolean
  onClick: () => void
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>
  title: string
  desc: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex items-center gap-3 rounded-xl border p-3 text-left transition active:scale-[0.99] ${
        active
          ? 'border-primary bg-primary/10 ring-1 ring-primary'
          : 'border-input bg-background'
      }`}
    >
      <span
        className={`grid size-10 shrink-0 place-items-center rounded-lg ${
          active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
        }`}
      >
        <Icon className="size-5" aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold">{title}</span>
        <span className="block text-xs text-muted-foreground">{desc}</span>
      </span>
      <span
        className={`ml-auto grid size-5 shrink-0 place-items-center rounded-full border ${
          active ? 'border-primary bg-primary' : 'border-input'
        }`}
      >
        {active ? <span className="size-2 rounded-full bg-primary-foreground" /> : null}
      </span>
    </button>
  )
}

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488" />
    </svg>
  )
}
