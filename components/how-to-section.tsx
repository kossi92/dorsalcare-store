import Image from 'next/image'
import { Info } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const steps = [
  {
    img: '/images/etapes/etape-1-reglage.jpg',
    alt: 'Mains qui règlent la hauteur de la civière dorsale',
    title: 'Réglez la hauteur',
    desc: '3 niveaux au choix. Commencez par le plus bas, puis montez progressivement.',
  },
  {
    img: '/images/etapes/etape-2-sol.jpg',
    alt: 'Homme qui pose la civière dorsale sur un tapis au sol',
    title: 'Posez-la au sol',
    desc: 'Sur un tapis ou une surface plane, à la hauteur du bas du dos.',
  },
  {
    img: '/images/etapes/etape-3-allonge.jpg',
    alt: 'Dos allongé sur la civière dorsale',
    title: 'Allongez-vous 5 minutes',
    desc: 'Posez le dos sur l’arche, respirez calmement et laissez votre dos se détendre.',
  },
]

export function HowToSection() {
  return (
    <section className="px-4 py-12" aria-labelledby="mode-emploi-titre">
      <div className="mx-auto max-w-md">
        <Reveal>
          <h2
            id="mode-emploi-titre"
            className="text-center font-display text-3xl leading-tight text-shadow-strong"
          >
            Comment l&apos;utiliser ? <span className="text-primary">3 étapes</span>
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Aucune compétence nécessaire. 5 minutes par jour suffisent.
          </p>
        </Reveal>

        <ol className="mt-6 space-y-4">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 90} as="li">
              <div className="overflow-hidden rounded-2xl border border-border bg-card">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={s.img}
                    alt={s.alt}
                    fill
                    sizes="(max-width: 480px) 100vw, 448px"
                    className="object-cover"
                  />
                  <span className="absolute left-3 top-3 grid size-10 place-items-center rounded-full bg-accent font-display text-xl text-accent-foreground shadow-lg">
                    {i + 1}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-display text-xl leading-tight">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={300}>
          <p className="mt-4 flex gap-2 rounded-xl bg-muted/60 p-3 text-xs leading-relaxed text-muted-foreground">
            <Info className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
            Astuce : utilisez-la aussi au bureau, calée contre le dossier de votre chaise. En
            cas de problème de dos sérieux, de chirurgie récente ou de grossesse, demandez
            l&apos;avis d&apos;un médecin avant utilisation.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
