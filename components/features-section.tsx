import { Activity, Layers, Zap, ShieldCheck } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const features = [
  {
    icon: Activity,
    title: 'Points de massage',
    desc: 'Stimulent et détendent les muscles du dos.',
  },
  {
    icon: Layers,
    title: '3 niveaux de réglage',
    desc: 'Un étirement adapté à chaque niveau.',
  },
  {
    icon: Zap,
    title: 'Mousse rembourrée',
    desc: 'Plus de confort pendant vos séances.',
  },
  {
    icon: ShieldCheck,
    title: 'Solide & durable',
    desc: 'Matériaux résistants, conçus pour durer.',
  },
]

export function FeaturesSection() {
  return (
    <section className="bg-card/40 px-4 py-12">
      <div className="mx-auto max-w-md">
        <Reveal>
          <h2 className="text-center font-display text-3xl leading-tight text-shadow-strong">
            Conçue pour votre <span className="text-primary">confort</span>
          </h2>
        </Reveal>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 80}>
              <div className="h-full rounded-xl border border-border bg-card p-4">
                <span className="grid size-10 place-items-center rounded-lg bg-primary/15 text-primary">
                  <f.icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-3 font-display text-base leading-tight">{f.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {f.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
