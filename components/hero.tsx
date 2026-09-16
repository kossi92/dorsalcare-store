import Image from 'next/image'
import { HeartPulse, Star, Clock } from 'lucide-react'
import { SITE } from '@/lib/site'
import { Countdown } from '@/components/countdown'

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-10 pt-8">
      {/* glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 rounded-full bg-accent/15 blur-3xl"
      />

      <div className="relative mx-auto max-w-md">
        {/* brand */}
        <div className="mb-6 flex items-center justify-center gap-2">
          <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
            <HeartPulse className="size-5" aria-hidden />
          </span>
          <span className="font-display text-xl tracking-wide">
            Dorsal<span className="text-primary">Care</span>
          </span>
        </div>

        {/* rating chip */}
        <div className="mx-auto mb-4 flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs animate-fade-up">
          <span className="flex text-accent" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-3.5 fill-accent" />
            ))}
          </span>
          <span className="text-muted-foreground">
            <strong className="text-foreground">+2 300</strong> dos soulagés au Togo
          </span>
        </div>

        <h1 className="font-display text-center text-4xl leading-[1.05] text-shadow-strong">
          LIBÈRE TON DOS,
          <br />
          <span className="text-primary">RETROUVE TA VIE !</span>
        </h1>
        <p className="mt-3 text-balance text-center text-sm leading-relaxed text-muted-foreground">
          Fini les douleurs lombaires, la sciatique et les tensions. Soulage ton dos en
          seulement <strong className="text-accent">5 minutes par jour</strong>, chez toi,
          sans médicament.
        </p>

        {/* product visual */}
        <div className="relative mt-6">
          <div className="animate-float overflow-hidden rounded-2xl border border-border bg-white shadow-2xl">
            <Image
              src="/images/product-detail.png"
              alt="Civière dorsale DorsalCare avec points de massage et 3 niveaux de réglage"
              width={900}
              height={900}
              priority
              className="h-auto w-full"
            />
          </div>
          <div className="absolute -right-1 -top-3 rotate-6 rounded-xl bg-accent px-3 py-2 text-center text-accent-foreground shadow-xl">
            <span className="block font-display text-lg leading-none">-50%</span>
            <span className="block text-[0.6rem] font-bold">AUJOURD&apos;HUI</span>
          </div>
        </div>

        {/* price */}
        <div className="mt-6 flex items-end justify-center gap-3">
          <span className="font-display text-5xl text-accent leading-none">
            {SITE.price.toLocaleString('fr-FR')}
          </span>
          <div className="pb-1">
            <span className="block font-display text-lg text-accent leading-none">
              {SITE.currency}
            </span>
            <span className="text-sm text-muted-foreground line-through">
              {SITE.oldPrice.toLocaleString('fr-FR')} {SITE.currency}
            </span>
          </div>
        </div>

        {/* urgency countdown */}
        <div className="mt-5 rounded-xl border border-danger/40 bg-danger/10 p-3">
          <p className="flex items-center justify-center gap-1.5 text-xs font-bold text-danger">
            <Clock className="size-4" aria-hidden />
            L&apos;offre se termine dans :
          </p>
          <Countdown className="mt-2 justify-center" />
        </div>

        {/* CTA */}
        <a
          href="#commander"
          className="mt-5 flex w-full items-center justify-center rounded-xl bg-success px-6 py-4 text-center font-display text-xl text-success-foreground shadow-xl transition active:scale-[0.98] animate-pulse-glow"
        >
          JE COMMANDE MAINTENANT
        </a>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          Paiement à la livraison • Réponse rapide sur WhatsApp
        </p>
      </div>
    </section>
  )
}
