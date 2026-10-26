import { Phone, Truck, Banknote, Smartphone, MapPin } from 'lucide-react'
import { SITE, buildWhatsAppLink } from '@/lib/site'
import { Logo } from '@/components/logo'

export function SiteFooter() {
  const link = buildWhatsAppLink(
    `Bonjour ${SITE.brand} ! Je souhaite des informations sur la ${SITE.product}.`,
  )
  return (
    <footer className="border-t border-border bg-card/40 px-4 py-10 pb-28">
      <div className="mx-auto max-w-md">
        <div className="text-center">
          <Logo />
          <p className="mt-3 text-sm text-muted-foreground">
            Votre dos mérite mieux. Soulagement naturel, simple et rapide.
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
        </div>

        <dl className="mt-8 grid gap-4 rounded-2xl border border-border bg-card p-4 text-sm">
          <FooterItem icon={Truck} title="Livraison">
            À Lomé (Bè, Adidogomé, Agoè, Tokoin, zone portuaire, périphérie) et à
            l&apos;intérieur du pays. Frais selon votre quartier, affichés avant de commander.
          </FooterItem>
          <FooterItem icon={Banknote} title="Paiement à la livraison">
            Vous payez le produit à la réception, en main propre.
          </FooterItem>
          <FooterItem icon={Smartphone} title="Ou Mobile Money">
            Mixx by Yas (T-Money) et Flooz, paiement sécurisé via PayGate.
          </FooterItem>
          <FooterItem icon={MapPin} title="Qui sommes-nous ?">
            {SITE.brand} est une marque de KOSSI DETOX, opérée par BLACK TALENT SARL,
            entreprise enregistrée à Lomé, Togo.
          </FooterItem>
        </dl>

        <nav
          aria-label="Liens rapides"
          className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-semibold text-muted-foreground"
        >
          <a href="#commander" className="hover:text-foreground">
            Commander
          </a>
          <a href="#galerie-titre" className="hover:text-foreground">
            Photos
          </a>
          <a href="#mode-emploi-titre" className="hover:text-foreground">
            Mode d&apos;emploi
          </a>
          <a href={link} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
            Contact WhatsApp
          </a>
        </nav>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {SITE.brand} — BLACK TALENT SARL. Tous droits réservés.
        </p>
      </div>
    </footer>
  )
}

function FooterItem({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-3">
      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary">
        <Icon className="size-4" aria-hidden />
      </span>
      <div>
        <dt className="font-semibold">{title}</dt>
        <dd className="text-xs leading-relaxed text-muted-foreground">{children}</dd>
      </div>
    </div>
  )
}
