import { OIL_SIZES } from '../constants'
import { oils as rawOils } from '../data/oils'
import { COLORS } from '../styles/colors'
import type { GalleryShot, LabelCopy, Oil, OilSize, ProductPerk } from '../types'
import {
  OIL_BACK_LABEL_TITLE,
  OIL_POUR_TONES,
  OIL_SET_BACK_LABEL_NOTE,
  OIL_SET_FRONT_LABEL_NOTE,
  VINTAGE_YEAR,
} from './constants'
import { formatCurrency } from './currency'
import { oilPath } from './paths'
import { contrastingTone } from './tone'
import type { OilLabResult } from './types'

export const oils: Oil[] = rawOils.map((oil) => ({ ...oil, path: oilPath(oil) }))

export const listedOils = oils.filter((o) => !o.set)

export function getOil(id: string | undefined): Oil | undefined {
  return oils.find((o) => o.id === id)
}

export const oilSize = (id?: string) => OIL_SIZES.find((z) => z.id === id) ?? OIL_SIZES[1]

export function oilPrice(o: Oil, size?: string) {
  return o.set ? o.price : Math.round(o.price * oilSize(size).mult)
}

export const oilTags = (oil: Pick<Oil, 'poly' | 'detail'>) => [...oil.detail.tags, `${oil.poly} polyphenols`]

export const oilSizeOptions = (oil: Oil) =>
  OIL_SIZES.map((z) => ({ id: z.id, name: z.name, info: `${formatCurrency(oilPrice(oil, z.id))} · ${z.hint}` }))

export const oilKeeping = (oil: Pick<Oil, 'detail'>): ProductPerk[] => [
  { label: 'Best within', text: '12 months of harvest' },
  { label: 'Once open', text: 'Finish within 2 months' },
  { label: 'Lot', text: oil.detail.lot },
]

export const oilLabResults = (oil: Pick<Oil, 'acid' | 'poly' | 'detail'>): OilLabResult[] => [
  { measure: 'Free acidity', value: oil.acid, reference: '≤ 0.8% for extra virgin (EU)' },
  { measure: 'Polyphenols', value: oil.poly, reference: 'EU health claim from ~250 mg/kg' },
  { measure: 'Peroxide value', value: oil.detail.peroxide, reference: '≤ 20 meq O₂/kg (EU)' },
  { measure: 'Sensory panel', value: 'No defects', reference: 'Required for extra virgin' },
]

export const oilBackLabel = (oil: Pick<Oil, 'cultivar' | 'harvest' | 'set'>, size: OilSize): LabelCopy => ({
  lines: [OIL_BACK_LABEL_TITLE, oil.cultivar],
  size: oil.set ? oil.set.contents : oilSize(size).label,
  note: oil.set ? OIL_SET_BACK_LABEL_NOTE : `Harvest ${oil.harvest}`,
})

const oilFrontLabel = (
  oil: Pick<Oil, 'cap' | 'growerName' | 'origin' | 'cultivar' | 'harvest' | 'set'>,
): LabelCopy => ({
  lines: [oil.growerName ?? '', oil.origin],
  size: oil.harvest.match(VINTAGE_YEAR)?.[0].trim() ?? '',
  note: oil.set ? OIL_SET_FRONT_LABEL_NOTE : oil.cultivar,
  accent: contrastingTone(oil.cap, COLORS.wine, COLORS.paper),
})

export const oilShots = (
  oil: Pick<Oil, 'name' | 'cap' | 'growerName' | 'origin' | 'cultivar' | 'harvest' | 'level' | 'set'>,
  size: OilSize,
): GalleryShot[] => [
  {
    id: 'front',
    name: 'Front label',
    kind: 'frontlabel',
    cue: `${oil.name} front`,
    caption: 'Front label',
    labelCopy: oilFrontLabel(oil),
  },
  {
    id: 'label',
    name: 'Back label',
    kind: 'backlabel',
    cue: `${oil.name} olive oil`,
    caption: 'Back label',
    labelCopy: oilBackLabel(oil, size),
  },
  {
    id: 'plate',
    name: 'On the plate',
    kind: 'plate',
    cue: `${oil.name} ${oil.level} plate`,
    tone: OIL_POUR_TONES[oil.level],
    caption: `${oil.name} on a saucer with bread`,
  },
]
