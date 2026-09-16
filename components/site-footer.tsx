import { HeartPulse, Phone } from 'lucide-react'
import { SITE, buildWhatsAppLink } from '@/lib/site'

export function SiteFooter() {
  const link = buildWhatsAppLink(
    `Bonjour ${SITE.brand} ! Je souhaite des informations sur la ${SITE.product}.`,
  )
  return (
    <footer className="border-t border-border bg-card/40 px-4 py-10 pb-28">
      <div className="mx-auto max-w-md text-center">
        <div className="flex items-center justify-center gap-2">
          <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
            <HeartPulse className="size-5" aria-hidden />
          </span>
          <span className="font-display text-xl tracking-wide">
            Dorsal<span className="text-primary">Care</span>
          </span>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Votre dos mérite mieux. Soulagement naturel, simple et rapide.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          Vendu par {SITE.brand} (KOSSI DETOX) — Lomé, Togo. Livraison à Lomé (Bè, Adidogomé,
          Agoè, Tokoin et environs) et à l&apos;intérieur du pays.
        </p>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-success/40 bg-success/10 px-4 py-2 text-sm font-semibold text-success"
        >
          <Phone className="size-4" aria-hidden />
          {SITE.whatsappDisplay}
        </a>

        <p className="mt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {SITE.brand}. Tous droits réservés.
        </p>
      </div>
    </footer>
  )
}
