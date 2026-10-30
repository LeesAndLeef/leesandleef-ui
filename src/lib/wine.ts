import { DEFAULT_WINE_VOLUME, WINE_TYPES } from '../constants'
import { wines as rawWines } from '../data/wines'
import { WINES_ROUTE } from '../routes'
import { COLORS } from '../styles/colors'
import type { GalleryShot, LabelCopy, Wine, WineFilterType, WineType } from '../types'
import { VINTAGE_YEAR, WINE_BACK_LABEL_LINES, WINE_BACK_LABEL_NOTE, WINE_POUR_TONES } from './constants'
import { winePath } from './paths'
import { productRegion } from './productPlace'
import { contrastingTone } from './tone'

export const wines: Wine[] = rawWines.map((wine) => ({ ...wine, path: winePath(wine) }))

export function getWine(id: string | undefined): Wine | undefined {
  return wines.find((w) => w.id === id)
}

export const wineTitle = (name: string, vintage?: string) => (vintage ? name.replace(/\d{4}$/, vintage) : name)

export const wineNameWithoutYear = (name: string) => name.replace(/\s\d{4}$/, '')

export const wineTypePath = (type: WineType) =>
  WINE_TYPES.includes(type as WineFilterType) ? `${WINES_ROUTE}?type=${encodeURIComponent(type)}` : WINES_ROUTE

export const vintagePrice = (wine: Pick<Wine, 'price' | 'detail'>, vintage?: string) =>
  wine.detail.vintages?.find((v) => v.year === vintage)?.price ?? wine.price

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
