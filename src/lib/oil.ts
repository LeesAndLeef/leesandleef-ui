import { OIL_SIZES } from '../constants'
import { oils as rawOils } from '../data/oils'
import type { GalleryShot, Oil, ProductPerk } from '../types'
import { oilPath } from './paths'

export const oils: Oil[] = rawOils.map((oil) => ({ ...oil, path: oilPath(oil) }))

export const listedOils = oils.filter((o) => !o.set)

export function getOil(id: string | undefined): Oil | undefined {
  return oils.find((o) => o.id === id)
}

export const oilSize = (id?: string) => OIL_SIZES.find((z) => z.id === id) ?? OIL_SIZES[1]

export function oilPrice(o: Oil, size?: string) {
  return o.set ? o.price : Math.round(o.price * oilSize(size).mult)
}

export const oilTags = (oil: Pick<Oil, 'level' | 'cultivar' | 'poly' | 'acid' | 'harvest'>) => [
  `${oil.level} intensity`,
  `Cultivar: ${oil.cultivar}`,
  `Polyphenols ${oil.poly}`,
  `Acidity ${oil.acid}`,
  `Harvest ${oil.harvest}`,
]

export const oilPerks = (oil: Pick<Oil, 'harvest'>): ProductPerk[] => [
  { label: 'Harvest', text: `${oil.harvest}, best within 18 months` },
  { label: 'Store', text: 'Cool and dark; the tin keeps light out' },
]

export const oilShots = (oil: Pick<Oil, 'cultivar'>, title: string, where: string): GalleryShot[] => [
  { id: 'label', name: 'Back label', kind: 'backlabel', cue: `${title} olive oil`, caption: 'Back label' },
  { id: 'field', name: 'Grove', kind: 'grove', cue: `${title} grove`, caption: `${oil.cultivar} trees · ${where}` },
  {
    id: 'cellar',
    name: 'Mill',
    kind: 'press',
    cue: `${title} mill`,
    caption: 'Cold-extracted within four hours of picking',
  },
]
