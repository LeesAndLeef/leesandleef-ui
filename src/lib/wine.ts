import { WINE_TYPES } from '../constants'
import { wines as rawWines } from '../data/wines'
import { WINES_ROUTE } from '../routes'
import type { GalleryShot, Grower, Wine, WineFilterType, WineType } from '../types'
import { winePath } from './paths'

export const wines: Wine[] = rawWines.map((wine) => ({ ...wine, path: winePath(wine) }))

export function getWine(id: string | undefined): Wine | undefined {
  return wines.find((w) => w.id === id)
}

export const wineTitle = (name: string, vintage?: string) => (vintage ? name.replace(/\d{4}$/, vintage) : name)

export const wineNameWithoutYear = (name: string) => name.replace(/\s\d{4}$/, '')

export const wineTypePath = (type: WineType) =>
  WINE_TYPES.includes(type as WineFilterType) ? `${WINES_ROUTE}?type=${encodeURIComponent(type)}` : WINES_ROUTE

export const vintagePrice = (wine: Pick<Wine, 'price' | 'detail'>, vintage?: string) =>
  wine.detail?.vintages?.find((v) => v.year === vintage)?.price ?? wine.price

export function wineTags(wine: Wine): string[] {
  return (
    wine.detail?.tags ??
    [
      wine.vegan ? 'Vegan' : 'Fined (not vegan)',
      'Wild ferment',
      wine.amphora ? 'Amphora-aged' : null,
      wine.so2Added ? `${wine.so2} mg/L total SO₂` : `Zero added SO₂ · ${wine.so2} mg/L natural`,
      wine.magnum ? 'Magnum available' : null,
    ].filter((t): t is string => t !== null)
  )
}

type CellarScene = Pick<GalleryShot, 'kind' | 'caption'>

function cellarScene(wine: Pick<Wine, 'amphora' | 'type'>, where: string, growerShortName = ''): CellarScene {
  if (wine.amphora) return { kind: 'amphora', caption: `Buried amphorae · ${where}` }
  if (wine.type === 'Sparkling') return { kind: 'rack', caption: 'Riddling by hand before disgorging' }
  return { kind: 'casks', caption: `In the ${growerShortName} cellar` }
}

export function wineShots(
  wine: Pick<Wine, 'amphora' | 'type' | 'grape'>,
  title: string,
  grower: Pick<Grower, 'shortName' | 'profile'> | undefined,
  where: string,
): GalleryShot[] {
  return [
    { id: 'label', name: 'Back label', kind: 'backlabel', cue: title, caption: 'Back label' },
    {
      id: 'field',
      name: 'Vineyard',
      kind: 'landscape',
      cue: grower?.profile?.heroPhoto ?? where,
      caption: `${wine.grape} vines · ${where}`,
    },
    { id: 'cellar', name: 'Cellar', cue: `${title} cellar`, ...cellarScene(wine, where, grower?.shortName) },
  ]
}
