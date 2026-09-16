import { AlertTriangle, X } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const pains = [
  'Douleurs au bas du dos dès le réveil',
  'Sciatique et hernie discale qui reviennent',
  'Tensions musculaires après le travail assis',
  'Fatigue, mauvaise posture et dos voûté',
  'Nuits difficiles à cause des douleurs',
]

export function PainSection() {
  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-md">
        <Reveal>
          <span className="mx-auto flex w-fit items-center gap-2 rounded-full bg-danger/15 px-3 py-1 text-xs font-bold text-danger">
            <AlertTriangle className="size-4" aria-hidden />
            LE PROBLÈME
          </span>
          <h2 className="mt-4 text-center font-display text-3xl leading-tight text-shadow-strong">
            Votre dos vous fait souffrir <span className="text-danger">chaque jour ?</span>
          </h2>
          <p className="mt-3 text-center text-sm leading-relaxed text-muted-foreground">
            Les douleurs de dos gâchent votre quotidien, votre travail et votre sommeil. Et
            plus vous attendez, plus elles s&apos;aggravent.
          </p>
        </Reveal>

        <ul className="mt-6 space-y-3">
          {pains.map((pain, i) => (
            <Reveal as="li" key={pain} delay={i * 80}>
              <div className="flex items-center gap-3 rounded-xl border border-danger/25 bg-danger/5 px-4 py-3">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-danger text-danger-foreground">
                  <X className="size-4" aria-hidden />
                </span>
                <span className="text-sm">{pain}</span>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={120}>
          <p className="mt-6 text-center text-sm font-semibold text-accent">
            Il existe une solution simple, naturelle et rapide. 👇
          </p>
        </Reveal>
      </div>
    </section>
  )
}
