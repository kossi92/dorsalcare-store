import { CheckCircle2, Briefcase, Dumbbell, Accessibility, Armchair } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const benefits = [
  'Soulage les douleurs du dos et des lombaires',
  'Améliore la posture et réaligne la colonne',
  'Détend les muscles et réduit les tensions',
  'Utilisation simple, rapide et efficace',
  'Résultats visibles dès les premières séances',
  'Aucun médicament — 100% naturel',
]

const audience = [
  { icon: Briefcase, label: 'Travailleurs assis' },
  { icon: Accessibility, label: 'Douleurs lombaires' },
  { icon: Dumbbell, label: 'Sportifs' },
  { icon: Armchair, label: 'Seniors' },
]

export function BenefitsSection() {
  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-md">
        <Reveal>
          <h2 className="text-center font-display text-3xl leading-tight text-shadow-strong">
            Pourquoi l&apos;adopter ?
          </h2>
        </Reveal>

        <ul className="mt-6 space-y-2.5">
          {benefits.map((b, i) => (
            <Reveal as="li" key={b} delay={i * 70}>
              <div className="flex items-center gap-3 rounded-xl border border-success/25 bg-success/5 px-4 py-3">
                <CheckCircle2 className="size-5 shrink-0 text-success" aria-hidden />
                <span className="text-sm">{b}</span>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120}>
          <p className="mt-8 text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Idéal pour
          </p>
          <div className="mt-4 grid grid-cols-4 gap-2">
            {audience.map((a) => (
              <div key={a.label} className="flex flex-col items-center text-center">
                <span className="grid size-12 place-items-center rounded-full bg-primary/15 text-primary">
                  <a.icon className="size-6" aria-hidden />
                </span>
                <span className="mt-2 text-[0.65rem] leading-tight text-muted-foreground">
                  {a.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
