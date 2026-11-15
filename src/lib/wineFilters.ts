import type { RegionGroup, WineExtra, WineFilters } from '../types'
import { MAX_CATALOG_QUERY_LENGTH, SO2_FILTERS } from './constants'
import { formatCurrency } from './currency'
import type { WineFilterInput } from './types'

export const groupRegions = (groups: readonly RegionGroup[], labels: readonly string[]) =>
  groups.filter((group) => labels.includes(group.label)).flatMap((group) => group.regions)

function priceBound(value: string) {
  if (value === '') return undefined
  const price = Number(value)
  return Number.isFinite(price) && price >= 0 ? price : undefined
}

const nonEmpty = (values: readonly string[]) => (values.length ? [...values] : undefined)

const onlyIf = (extras: readonly WineExtra[], extra: WineExtra) => extras.includes(extra) || undefined

export function wineFilters({ query, regions, grapes, priceFrom, priceTo, so2, extras }: WineFilterInput): WineFilters {
  return {
    listed: true,
    q: query.trim().slice(0, MAX_CATALOG_QUERY_LENGTH) || undefined,
    region: nonEmpty(regions),
    grape: nonEmpty(grapes),
    priceMin: priceBound(priceFrom),
    priceMax: priceBound(priceTo),
    ...SO2_FILTERS[so2],
    vegan: onlyIf(extras, 'vegan'),
    amphora: onlyIf(extras, 'amphora'),
    magnum: onlyIf(extras, 'magnum'),
    inStock: onlyIf(extras, 'inStock'),
  }
}

export function priceFilterLabel(priceFrom: string, priceTo: string, max: number | undefined) {
  const from = formatCurrency(Number(priceFrom) || 0)
  const to = Number(priceTo) || max
  return to === undefined ? `${from}+` : `${from}-${formatCurrency(to)}`
}
