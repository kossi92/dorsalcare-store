'use client'

import { useEffect, useState } from 'react'
import { PackageCheck, X } from 'lucide-react'
import { DELIVERY_ZONES } from '@/lib/site'

// Prénoms courants utilisés pour illustrer une activité récente sur la
// boutique. Ce ne sont pas des commandes individuellement vérifiées : à
// remplacer par un vrai flux (webhook de commandes, Shopify, etc.) dès que
// vous en avez un — voir la note envoyée avec cette mise à jour.
const FIRST_NAMES = [
  'Koffi',
  'Ama',
  'Yao',
  'Afi',
  'Kodjo',
  'Essi',
  'Komi',
  'Abra',
  'Sena',
  'Akou',
]

function pickZone() {
  return DELIVERY_ZONES[Math.floor(Math.random() * DELIVERY_ZONES.length)]
}

function pickName(exclude?: string) {
  let name = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)]
  if (FIRST_NAMES.length > 1) {
    while (name === exclude) {
      name = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)]
    }
  }
  return name
}

type Notice = { name: string; place: string; minutes: number }

export function SocialProofToast() {
  const [notice, setNotice] = useState<Notice | null>(null)
  const [visible, setVisible] = useState(false)
  const [closed, setClosed] = useState(false)

  useEffect(() => {
    if (closed) return
    let lastName = ''
    let showTimer: ReturnType<typeof setTimeout>
    let hideTimer: ReturnType<typeof setTimeout>
    let cancelled = false

    function schedule(delay: number) {
      showTimer = setTimeout(() => {
        if (cancelled) return
        const zone = pickZone()
        const name = pickName(lastName)
        lastName = name
        setNotice({ name, place: zone.label, minutes: 2 + Math.floor(Math.random() * 13) })
        setVisible(true)
        hideTimer = setTimeout(() => {
          if (cancelled) return
          setVisible(false)
          schedule(16000 + Math.random() * 14000)
        }, 6000)
      }, delay)
    }

    schedule(6000)
    return () => {
      cancelled = true
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [closed])

  if (closed || !notice) return null

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-24 left-3 right-3 z-40 mx-auto max-w-xs transition-all duration-500 sm:left-4 sm:right-auto ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <div className="flex items-center gap-3 rounded-xl border border-success/30 bg-card/95 p-3 pr-2 shadow-2xl backdrop-blur">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-success/15 text-success">
          <PackageCheck className="size-4" aria-hidden />
        </span>
        <div className="min-w-0 flex-1 text-left">
          <p className="truncate text-xs font-semibold leading-tight text-foreground">
            {notice.name} vient de commander à {notice.place}
          </p>
          <p className="text-[0.65rem] text-muted-foreground">il y a {notice.minutes} min</p>
        </div>
        <button
          type="button"
          aria-label="Fermer la notification"
          onClick={() => setClosed(true)}
          className="shrink-0 rounded-full p-1.5 text-muted-foreground/70 transition hover:bg-muted hover:text-foreground"
        >
          <X className="size-3.5" aria-hidden />
        </button>
      </div>
    </div>
  )
}
