'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { Reveal } from '@/components/reveal'

const photos = [
  {
    src: '/images/galerie/civiere-produit.jpg',
    alt: 'Civière dorsale DorsalCare posée sur un parquet',
    caption: 'Compacte, elle se range partout',
  },
  {
    src: '/images/galerie/civiere-points-massage.jpg',
    alt: 'Gros plan sur les points de massage de la civière dorsale',
    caption: 'Points de massage sur toute l’arche',
  },
  {
    src: '/images/galerie/civiere-transport.jpg',
    alt: 'Homme qui porte la civière dorsale d’une seule main',
    caption: 'Légère, elle se transporte d’une main',
  },
  {
    src: '/images/galerie/civiere-bureau.jpg',
    alt: 'Homme plaçant la civière dorsale contre le dossier de sa chaise de bureau',
    caption: 'Utilisable aussi au bureau, sur la chaise',
  },
] as const

export function GallerySection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)

  function onScroll() {
    const el = trackRef.current
    if (!el) return
    setIndex(Math.round(el.scrollLeft / el.clientWidth))
  }

  function goTo(i: number) {
    const el = trackRef.current
    if (!el) return
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
  }

  return (
    <section className="px-4 py-12" aria-labelledby="galerie-titre">
      <div className="mx-auto max-w-md">
        <Reveal>
          <h2
            id="galerie-titre"
            className="text-center font-display text-3xl leading-tight text-shadow-strong"
          >
            Découvrez la <span className="text-primary">civière</span>
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Glissez pour voir toutes les photos
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div
            ref={trackRef}
            onScroll={onScroll}
            className="no-scrollbar mt-6 flex snap-x snap-mandatory overflow-x-auto rounded-2xl border border-border shadow-xl"
          >
            {photos.map((p, i) => (
              <figure key={p.src} className="relative w-full shrink-0 snap-center">
                <div className="relative aspect-[4/3] w-full bg-white">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 480px) 100vw, 448px"
                    loading={i === 0 ? 'eager' : 'lazy'}
                    className="object-cover"
                  />
                </div>
                <figcaption className="bg-card px-4 py-3 text-center text-sm font-semibold">
                  {p.caption}
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-3 flex justify-center gap-2" role="tablist" aria-label="Photos">
            {photos.map((p, i) => (
              <button
                key={p.src}
                type="button"
                role="tab"
                aria-selected={index === i}
                aria-label={`Photo ${i + 1} sur ${photos.length}`}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all ${
                  index === i ? 'w-6 bg-primary' : 'w-2 bg-muted-foreground/40'
                }`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
