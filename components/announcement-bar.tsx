import { Flame, Truck, ShieldCheck } from 'lucide-react'

const items = [
  { icon: Flame, text: 'OFFRE -50% : 5 000 FCFA au lieu de 10 000' },
  { icon: Truck, text: 'Livraison payante & très rapide' },
  { icon: ShieldCheck, text: 'Paiement à la livraison' },
  { icon: Flame, text: 'Stock limité — dernières pièces disponibles' },
]

export function AnnouncementBar() {
  return (
    <div className="overflow-hidden bg-danger text-danger-foreground">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((dup) => (
          <ul key={dup} className="flex shrink-0" aria-hidden={dup === 1}>
            {items.map((item, i) => (
              <li
                key={`${dup}-${i}`}
                className="flex items-center gap-2 whitespace-nowrap px-6 py-2 text-xs font-bold tracking-wide"
              >
                <item.icon className="size-4" aria-hidden />
                {item.text}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
