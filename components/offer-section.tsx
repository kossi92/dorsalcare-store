import { Flame, Zap } from 'lucide-react'
import { SITE } from '@/lib/site'
import { Countdown } from '@/components/countdown'
import { Reveal } from '@/components/reveal'

export function OfferSection() {
  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-md">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-accent/40 bg-gradient-to-b from-card to-muted p-6 text-center shadow-2xl">
            <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-danger px-2.5 py-1 text-[0.65rem] font-bold text-danger-foreground animate-shake">
              <Flame className="size-3.5" aria-hidden />
              STOCK LIMITÉ
            </span>

            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              Offre spéciale du jour
            </span>

            <div className="mt-3 flex items-end justify-center gap-3">
              <span className="text-lg text-muted-foreground line-through">
                {SITE.oldPrice.toLocaleString('fr-FR')}
              </span>
              <span className="font-display text-6xl leading-none text-accent">
                {SITE.price.toLocaleString('fr-FR')}
              </span>
            </div>
            <span className="mt-1 block font-display text-xl text-accent">
              {SITE.currency} seulement !
            </span>

            <div className="mx-auto mt-3 w-fit rounded-full bg-danger/15 px-3 py-1 text-sm font-bold text-danger">
              -50% de réduction immédiate
            </div>

            <div className="mt-5 rounded-xl border border-danger/40 bg-danger/10 p-3">
              <p className="flex items-center justify-center gap-1.5 text-xs font-bold text-danger">
                <Zap className="size-4" aria-hidden />
                Le prix remonte à la fin du compte à rebours
              </p>
              <Countdown className="mt-2 justify-center" />
            </div>

            <a
              href="#commander"
              className="mt-5 flex w-full items-center justify-center rounded-xl bg-success px-6 py-4 font-display text-xl text-success-foreground shadow-xl transition active:scale-[0.98]"
            >
              J&apos;EN PROFITE MAINTENANT
            </a>
            <p className="mt-2 text-xs text-muted-foreground">
              Livraison rapide • Paiement à la livraison
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
