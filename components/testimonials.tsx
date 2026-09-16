import { Star, BadgeCheck } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const reviews = [
  {
    name: 'Koffi A.',
    role: 'Chauffeur, Lomé',
    text: "Je conduis toute la journée, mon bas du dos me faisait souffrir. Après une semaine, énorme différence. Je recommande à 100%.",
  },
  {
    name: 'Aïcha M.',
    role: 'Commerçante',
    text: "5 minutes le soir et je dors enfin sans douleur. La livraison a été très rapide, merci DorsalCare !",
  },
  {
    name: 'Serge K.',
    role: 'Employé de bureau',
    text: "Assis 8h par jour, mes tensions ont disparu. Simple à utiliser, solide et vraiment efficace.",
  },
]

export function Testimonials() {
  return (
    <section className="bg-card/40 px-4 py-12">
      <div className="mx-auto max-w-md">
        <Reveal>
          <h2 className="text-center font-display text-3xl leading-tight text-shadow-strong">
            Ils ont soulagé leur dos
          </h2>
          <p className="mt-2 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
            <span className="flex text-accent" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-accent" />
              ))}
            </span>
            4,9/5 — clients vérifiés
          </p>
        </Reveal>

        <div className="mt-6 space-y-3">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 90}>
              <figure className="rounded-xl border border-border bg-card p-4">
                <span className="flex text-accent" aria-hidden>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="size-4 fill-accent" />
                  ))}
                </span>
                <blockquote className="mt-2 text-sm leading-relaxed text-foreground/90">
                  {'"'}
                  {r.text}
                  {'"'}
                </blockquote>
                <figcaption className="mt-3 flex items-center gap-2 text-xs">
                  <span className="grid size-8 place-items-center rounded-full bg-primary/20 font-display text-sm text-primary">
                    {r.name.charAt(0)}
                  </span>
                  <span>
                    <span className="flex items-center gap-1 font-semibold">
                      {r.name}
                      <BadgeCheck className="size-3.5 text-success" aria-hidden />
                    </span>
                    <span className="text-muted-foreground">{r.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
