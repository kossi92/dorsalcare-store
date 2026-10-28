'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import { FB_PIXEL_IDS, fbTrack } from '@/lib/fbpixel'
import { SITE } from '@/lib/site'

/**
 * Charge et initialise les Pixels Facebook (MK_EXPRESS + KossiDetox + zozo achat),
 * envoie le PageView, puis un ViewContent (vue de la page produit).
 * Chaque événement part vers tous les pixels initialisés.
 * Ne rend rien si aucun Pixel ID n'est configuré.
 */
export function FacebookPixel() {
  useEffect(() => {
    if (FB_PIXEL_IDS.length === 0) return
    // ViewContent une fois le Pixel prêt (léger délai pour laisser fbq s'initialiser).
    const t = setTimeout(() => {
      fbTrack('ViewContent', {
        content_name: SITE.product,
        content_type: 'product',
        currency: 'XOF',
        value: SITE.price,
      })
    }, 800)
    return () => clearTimeout(t)
  }, [])

  if (FB_PIXEL_IDS.length === 0) return null

  const initCalls = FB_PIXEL_IDS.map((id) => `fbq('init', '${id}');`).join('\n          ')

  return (
    <>
      <Script id="fb-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          ${initCalls}
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {FB_PIXEL_IDS.map((id) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={id}
            height="1"
            width="1"
            style={{ display: 'none' }}
            alt=""
            src={`https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1`}
          />
        ))}
      </noscript>
    </>
  )
}
