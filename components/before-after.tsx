import Image from 'next/image'
import { Reveal } from '@/components/reveal'

export function BeforeAfter() {
  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-md">
        <Reveal>
          <h2 className="text-center font-display text-3xl leading-tight text-shadow-strong">
            Améliorez votre posture
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Un dos droit, moins de douleurs, plus d&apos;énergie — dès les premières
            utilisations.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-white shadow-xl">
            <Image
              src="/images/posture.png"
              alt="Comparaison avant et après : posture voûtée douloureuse contre posture droite et détendue"
              width={1000}
              height={1000}
              className="h-auto w-full"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
