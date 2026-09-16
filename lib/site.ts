export const SITE = {
  brand: 'DorsalCare',
  product: 'Civière Dorsale',
  price: 5000,
  oldPrice: 10000,
  currency: 'FCFA',
  // Numéro WhatsApp qui reçoit les commandes (format international sans +)
  whatsapp: '22896095707',
  whatsappDisplay: '+228 96 09 57 07',
  // Frais de livraison par défaut si jamais aucune zone n'est reconnue.
  deliveryFee: 1500,
} as const

// Zones de livraison couvertes, basées sur la grille tarifaire réelle de
// KOSSI DETOX. `approx: true` signale un tarif non garanti (chauffeur
// indépendant, distance variable) — affiché comme "à partir de" et confirmé
// sur WhatsApp. Ajustez librement les libellés et les tarifs selon vos frais
// réels — c'est la seule chose à maintenir à jour ici.
export const DELIVERY_ZONES = [
{
id: 'lome-proche',
label:
'Lomé — Bè, Adidogomé, Agoè (tous), Tokoin, Zanguéra, Amandahomé, Nyékonakpoè, Kodjoviakopé, Sarakawa, Togo 2000',
fee: 1000,
approx: false,
},
{
id: 'lome-portuaire',
label:
'Lomé — Zone portuaire : Port, Cimtogo, Raffinerie, Kagomé, Adakpamé, Ablogamé, Bagida, Kpogan',
fee: 1500,
approx: false,
},
{
id: 'lome-peripherie',
label: 'Lomé — Périphérie : Djagblé, Adétikopé, Togblécopé',
fee: 2000,
approx: false,
},
{
id: 'interieur-sokode',
label: 'Intérieur — Sokodé (expédition + livreur)',
fee: 2000,
approx: false,
},
{
id: 'interieur-nord',
label: 'Intérieur — Kara, Dapaong et au-delà',
fee: 2500,
approx: false,
},
{
id: 'frontaliere',
label: 'Zone frontalière — Aného, Agbodrafo, Vogan…',
fee: 2000,
approx: true,
},
{
id: 'autre',
label: 'Autre quartier / je ne sais pas',
fee: 1500,
approx: true,
},
] as const

export type DeliveryZoneId = (typeof DELIVERY_ZONES)[number]['id']

export function getDeliveryZone(id: string) {
return DELIVERY_ZONES.find((z) => z.id === id)
}

export function getDeliveryFee(id: string): number | undefined {
return getDeliveryZone(id)?.fee
}
export function buildOrderMessage(o: {
firstName: string
phone: string
quantity: number
location: string
zoneLabel?: string
deliveryFee?: number
approxDelivery?: boolean
subtotal: number
paid?: boolean
reference?: string
}) {
const hasDelivery = typeof o.deliveryFee === 'number' && !!o.zoneLabel
const total = o.subtotal + (hasDelivery ? o.deliveryFee! : 0)
const feePrefix = o.approxDelivery ? 'à partir de ' : ''
const lines = [
`Bonjour ${SITE.brand} ! Je souhaite commander la ${SITE.product}.`,
'',
`👤 Prénom : ${o.firstName}`,
`📞 Numéro : ${o.phone}`,
`📦 Quantité : ${o.quantity}`,
`📍 Lieu de livraison : ${o.zoneLabel ?? o.location}${
o.zoneLabel && o.location ? ` (${o.location})` : ''
}`,
'',
`💰 Produit : ${o.subtotal.toLocaleString('fr-FR')} ${SITE.currency} ` +
`(${o.quantity} x ${SITE.price.toLocaleString('fr-FR')} ${SITE.currency})`,
]
if (hasDelivery) {
lines.push(
`🚚 Livraison${o.approxDelivery ? ' estimée' : ''} (${o.zoneLabel}) : ${feePrefix}${o.deliveryFee!.toLocaleString(
'fr-FR',
)} ${SITE.currency}`,
`🧮 Total estimé${o.approxDelivery ? ' (livraison à confirmer)' : ''} : ${feePrefix}${total.toLocaleString(
'fr-FR',
)} ${SITE.currency}`,
)
}
if (o.paid) {
lines.push(
`✅ PAYÉ par Mobile Money (Mixx by Yas / Flooz)`,
o.reference ? `🧾 Référence : ${o.reference}` : '',
hasDelivery
? `🚚 Merci de confirmer la livraison (${o.deliveryFee!.toLocaleString(
'fr-FR',
)} ${SITE.currency} à régler à la livraison).`
: `🚚 Merci de confirmer la livraison (frais de livraison à part).`,
)
} else {
lines.push('', `Merci de confirmer ma commande.`)
}
return lines.filter(Boolean).join('\n')
}

export function buildWhatsAppLink(text: string) {
return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`
}
