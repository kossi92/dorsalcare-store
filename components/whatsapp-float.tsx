'use client'

import { useEffect, useState } from 'react'
import { SITE, buildWhatsAppLink } from '@/lib/site'
import { fbTrack } from '@/lib/fbpixel'

/** Bouton WhatsApp toujours visible, pour poser une question avant d'acheter. */
export function WhatsAppFloat() {
  // Masqué pendant que le formulaire de commande est à l'écran, pour ne pas
  // cacher les prix ni les champs.
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const form = document.getElementById('commander')
    if (!form) return
    const observer = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), {
      threshold: 0.05,
    })
    observer.observe(form)
    return () => observer.disconnect()
  }, [])

  const link = buildWhatsAppLink(
    `Bonjour ${SITE.brand} ! J'ai une question sur la ${SITE.product}.`,
  )

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => fbTrack('Contact', { method: 'whatsapp_question' })}
      aria-label="Poser une question sur WhatsApp"
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : undefined}
      className={`group fixed bottom-[10.5rem] right-3 z-40 flex items-center gap-2 transition-all duration-300 sm:right-6 ${
        hidden ? 'pointer-events-none translate-x-24 opacity-0' : 'opacity-100'
      }`}
    >
      <span className="pointer-events-none hidden rounded-full bg-card px-3 py-1.5 text-xs font-semibold text-foreground shadow-xl group-hover:block sm:block">
        Une question ?
      </span>
      <span className="relative grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl transition active:scale-95">
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 motion-safe:animate-ping [animation-duration:2.5s]"
        />
        <svg viewBox="0 0 24 24" fill="currentColor" className="relative size-7" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488" />
        </svg>
      </span>
    </a>
  )
}
