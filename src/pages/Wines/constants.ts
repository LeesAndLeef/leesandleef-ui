import type { RegionGroup, WineExtra } from '../../types'

export const EXTRAS: { id: WineExtra; label: string }[] = [
  { id: 'vegan', label: 'Vegan (unfined)' },
  { id: 'amphora', label: 'Amphora-aged' },
  { id: 'magnum', label: 'Magnum available' },
  { id: 'inStock', label: 'In stock only' },
]

export const REGION_GROUPS: RegionGroup[] = [
  { label: 'Istria', regions: ['Istria'] },
  { label: 'Dalmatia', regions: ['Dalmatia', 'Primošten'] },
  { label: 'Pelješac & Korčula', regions: ['Pelješac', 'Korčula'] },
  { label: 'Kvarner islands', regions: ['Krk'] },
  { label: 'Slavonia', regions: ['Slavonia'] },
  { label: 'Moslavina & Zagorje', regions: ['Moslavina'] },
]

export const GRAPES = ['Malvazija', 'Teran', 'Plavac Mali', 'Graševina', 'Pošip', 'Babić', 'Žlahtina', 'Škrlet']
