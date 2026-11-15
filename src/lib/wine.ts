import { DEFAULT_WINE_VOLUME, WINE_TYPES } from '../constants'
import { wines as rawWines } from '../data/wines'
import { WINES_ROUTE } from '../routes'
import { COLORS } from '../styles/colors'
import type { GalleryShot, LabelCopy, RawWine, Wine, WineFilterType, WineType, WineVintage } from '../types'
import {
  VINTAGE_LEFT_LABEL,
  VINTAGE_PRE_ORDER_LABEL,
  VINTAGE_YEAR,
  WINE_BACK_LABEL_LINES,
  WINE_BACK_LABEL_NOTE,
  WINE_POUR_TONES,
} from './constants'
import { formatCurrency } from './currency'
import { winePath } from './paths'
import { productRegion } from './productPlace'
import { contrastingTone } from './tone'

export const defaultVintage = (wine: Pick<RawWine, 'vintages'>) =>
  wine.vintages.find((vintage) => vintage.isDefault) ?? wine.vintages[0]

export const chosenVintage = (wine: Pick<RawWine, 'vintages'>, id?: string) =>
  wine.vintages.find((vintage) => vintage.id === id) ?? defaultVintage(wine)

export const lineVintage = (wine: Pick<RawWine, 'vintages'>, year?: string) =>
  wine.vintages.find((vintage) => vintage.vintage === year) ?? defaultVintage(wine)

export function withDefaultVintage<T extends Pick<RawWine, 'vintages'>>(wine: T) {
  const { price, left } = defaultVintage(wine)
  return { ...wine, price, left }
}

export const wines: Omit<Wine, 'detail'>[] = rawWines.map((wine) => ({
  ...withDefaultVintage(wine),
  path: winePath(wine),
}))

export const listedWines = (all: readonly Wine[]) => all.filter((w) => !w.unlisted)

export const wineNameWithoutYear = (name: string) => name.replace(/\s\d{4}$/, '')

export const wineTypePath = (type: WineType) =>
  WINE_TYPES.includes(type as WineFilterType) ? `${WINES_ROUTE}?type=${encodeURIComponent(type)}` : WINES_ROUTE

function vintageAvailability({ preOrder, left }: Pick<WineVintage, 'preOrder' | 'left'>) {
  if (preOrder) return `${VINTAGE_PRE_ORDER_LABEL} · ${preOrder}`
  return left === undefined ? undefined : `${left} ${VINTAGE_LEFT_LABEL}`
}

export const wineVintageOptions = (wine: Pick<RawWine, 'vintages'>) =>
  wine.vintages.map((vintage) => ({
    id: vintage.id,
    name: vintage.vintage ?? vintage.name,
    info: [formatCurrency(vintage.price), vintageAvailability(vintage)].filter(Boolean).join(' · '),
  }))

export const winePourTone = (wine: Pick<Wine, 'type' | 'glass'>) => WINE_POUR_TONES[wine.type] ?? wine.glass

const wineLabelName = (title: string) => title.split(VINTAGE_YEAR)[0]

const wineFrontLabel = (wine: Pick<Wine, 'type' | 'cap' | 'growerName' | 'region'>, title: string): LabelCopy => ({
  lines: [wine.growerName ?? '', productRegion(wine.region)],
  size: title.match(VINTAGE_YEAR)?.[0].trim() ?? '',
  note: wine.type,
  accent: contrastingTone(wine.cap, COLORS.wine, COLORS.paper),
})

const wineBackLabel = (wine: Pick<Wine, 'volume'>): LabelCopy => ({
  lines: WINE_BACK_LABEL_LINES,
  size: wine.volume ?? DEFAULT_WINE_VOLUME,
  note: WINE_BACK_LABEL_NOTE,
})

export const wineShots = (
  wine: Pick<Wine, 'type' | 'glass' | 'cap' | 'growerName' | 'region' | 'volume'>,
  title: string,
): GalleryShot[] => [
  {
    id: 'front',
    name: 'Front label',
    kind: 'frontlabel',
    cue: `${wineNameWithoutYear(title)} front`,
    text: wineLabelName(title),
    caption: 'Front label',
    labelCopy: wineFrontLabel(wine, title),
  },
  {
    id: 'label',
    name: 'Back label',
    kind: 'backlabel',
    cue: wineNameWithoutYear(title),
    caption: 'Back label',
    labelCopy: wineBackLabel(wine),
  },
  {
    id: 'pour',
    name: 'In the glass',
    kind: 'pour',
    cue: `${wineNameWithoutYear(title)} ${wine.type} glass`,
    tone: winePourTone(wine),
    caption: `A glass of ${title}`,
  },
]
