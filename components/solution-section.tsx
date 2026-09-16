import { Sparkles, PlayCircle } from 'lucide-react'
import { Reveal } from '@/components/reveal'

export function SolutionSection() {
  return (
    <section className="bg-card/40 px-4 py-12">
      <div className="mx-auto max-w-md">
        <Reveal>
          <span className="mx-auto flex w-fit items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-bold text-primary">
            <Sparkles className="size-4" aria-hidden />
            LA SOLUTION
          </span>
          <h2 className="mt-4 text-center font-display text-3xl leading-tight text-shadow-strong">
            La Civière Dorsale <span className="text-primary">DorsalCare</span>
          </h2>
          <p className="mt-3 text-center text-sm leading-relaxed text-muted-foreground">
            Allongez-vous 5 minutes par jour. La civière étire en douceur votre colonne,
            décompresse les vertèbres et détend vos muscles. Un soulagement immédiat,
            100% naturel.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-black shadow-2xl">
            <video
              className="h-auto w-full"
              controls
              playsInline
              muted
              loop
              preload="metadata"
              poster="/images/product-detail.png"
            >
              <source src="/videos/demo.mp4" type="video/mp4" />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
          </div>
          <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <PlayCircle className="size-4 text-primary" aria-hidden />
            Regardez la civière en action
          </p>
        </Reveal>
      </div>
    </section>
  )
}
