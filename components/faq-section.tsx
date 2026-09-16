import { ChevronDown } from 'lucide-react'
import { Reveal } from '@/components/reveal'
import { SITE } from '@/lib/site'

const faqs = [
  {
    q: 'Combien coûte la civière dorsale ?',
    a: `La civière dorsale ${SITE.brand} est à ${SITE.price.toLocaleString('fr-FR')} ${SITE.currency} au lieu de ${SITE.oldPrice.toLocaleString('fr-FR')} ${SITE.currency}, soit -50% pendant l'offre.`,
  },
  {
    q: 'Comment se passe la livraison ?',
    a: 'La livraison est payante et très rapide. Vous payez le produit à la réception, en toute sécurité.',
  },
  {
    q: 'Comment passer commande ?',
    a: "Remplissez le formulaire (prénom, numéro, quantité, lieu de livraison). Votre commande est envoyée sur notre WhatsApp et nous vous rappelons pour confirmer.",
  },
  {
    q: 'Est-ce vraiment efficace ?',
    a: "Oui. En 5 minutes par jour, la civière étire la colonne, décompresse les vertèbres et détend les muscles. Les résultats sont visibles dès les premières séances.",
  },
  {
    q: 'Est-ce difficile à utiliser ?',
    a: 'Non, c\'est très simple : posez-la au sol, allongez-vous dessus et détendez-vous. 3 niveaux de réglage pour un étirement adapté.',
  },
]

export function FaqSection() {
  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-md">
        <Reveal>
          <h2 className="text-center font-display text-3xl leading-tight text-shadow-strong">
            Questions fréquentes
          </h2>
        </Reveal>

        <div className="mt-6 space-y-3">
          {faqs.map((faq, i) => (
            <Reveal key={faq.q} delay={i * 60}>
              <details className="group rounded-xl border border-border bg-card px-4 open:bg-card">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-4 text-sm font-semibold">
                  {faq.q}
                  <ChevronDown
                    className="size-5 shrink-0 text-primary transition-transform group-open:rotate-180"
                    aria-hidden
                  />
                </summary>
                <p className="pb-4 text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
