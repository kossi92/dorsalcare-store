'use client'

import { useEffect, useState } from 'react'
import { SITE } from '@/lib/site'
import { fbTrack } from '@/lib/fbpixel'

export function StickyCta() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 transition-transform duration-300 ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="mx-auto max-w-md p-3">
        <a
          href="#commander"
          onClick={() =>
            fbTrack('InitiateCheckout', {
              content_name: SITE.product,
              currency: 'XOF',
              value: SITE.price,
            })
          }
          className="flex items-center justify-between gap-3 rounded-2xl border border-success/40 bg-success px-4 py-3 text-success-foreground shadow-2xl active:scale-[0.98]"
        >
          <span className="leading-tight">
            <span className="block font-display text-lg">COMMANDER — {SITE.price.toLocaleString('fr-FR')} {SITE.currency}</span>
            <span className="block text-[0.7rem] opacity-90">-50% aujourd&apos;hui • paiement à la livraison</span>
          </span>
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-success-foreground/15">
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-6" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
            </svg>
          </span>
        </a>
      </div>
    </div>
  )
}
