'use client'

import { useEffect } from 'react'
import { fbTrack } from '@/lib/fbpixel'
import { SITE } from '@/lib/site'

export function PurchaseTracker({ value, quantity }: { value: number; quantity: number }) {
  useEffect(() => {
    fbTrack('Purchase', {
      content_name: SITE.product,
      currency: 'XOF',
      value,
      quantity,
    })
  }, [value, quantity])

  return null
}
