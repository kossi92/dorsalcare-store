import { Truck, Banknote, BadgeCheck } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const items = [
  {
    icon: Truck,
    title: 'Livraison rapide',
    desc: 'Livraison payante et très rapide, partout.',
  },
  {
    icon: Banknote,
    title: 'Paiement à la livraison',
    desc: 'Vous payez seulement quand vous recevez.',
  },
  {
    icon: BadgeCheck,
    title: 'Satisfait ou remboursé',
    desc: 'Essayez sans risque, en toute confiance.',
  },
]

export function GuaranteeSection() {
  return (
    <section className="bg-card/40 px-4 py-12">
      <div className="mx-auto max-w-md space-y-3">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={i * 90}>
            <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-success/15 text-success">
                <item.icon className="size-6" aria-hidden />
              </span>
              <div>
                <h3 className="font-display text-lg leading-tight">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
