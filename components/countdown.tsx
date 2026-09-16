'use client'

import { useEffect, useState } from 'react'

function getTarget() {
  // Fin de l'offre : ce soir à minuit (réinitialise chaque jour => urgence permanente crédible)
  const now = new Date()
  const end = new Date(now)
  end.setHours(23, 59, 59, 0)
  if (end.getTime() <= now.getTime()) {
    end.setDate(end.getDate() + 1)
  }
  return end.getTime()
}

function pad(n: number) {
  return n.toString().padStart(2, '0')
}

export function Countdown({ className = '' }: { className?: string }) {
  const [target, setTarget] = useState<number | null>(null)
  const [remaining, setRemaining] = useState(0)

  useEffect(() => {
    const t = getTarget()
    setTarget(t)
    setRemaining(t - Date.now())
    const id = setInterval(() => {
      setRemaining(t - Date.now())
    }, 1000)
    return () => clearInterval(id)
  }, [])

  if (target === null) {
    return (
      <div className={`flex items-center gap-2 ${className}`} aria-hidden>
        {['00', '00', '00'].map((v, i) => (
          <Cell key={i} value={v} label={['H', 'M', 'S'][i]} />
        ))}
      </div>
    )
  }

  const total = Math.max(0, remaining)
  const hours = Math.floor(total / 3_600_000)
  const minutes = Math.floor((total % 3_600_000) / 60_000)
  const seconds = Math.floor((total % 60_000) / 1000)

  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      role="timer"
      aria-label="Temps restant de l'offre"
    >
      <Cell value={pad(hours)} label="H" />
      <Sep />
      <Cell value={pad(minutes)} label="MIN" />
      <Sep />
      <Cell value={pad(seconds)} label="SEC" />
    </div>
  )
}

function Cell({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-display grid min-w-[3rem] place-items-center rounded-lg bg-danger px-2 py-1.5 text-2xl leading-none text-danger-foreground tabular-nums shadow-lg">
        {value}
      </span>
      <span className="mt-1 text-[0.6rem] font-bold tracking-widest text-muted-foreground">
        {label}
      </span>
    </div>
  )
}

function Sep() {
  return <span className="font-display -mt-4 text-2xl text-danger animate-blink">:</span>
}
