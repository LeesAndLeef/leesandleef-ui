import type { Freq, OilSize, WineFilterType } from './types'

export const FREE_SHIPPING_FROM = 120
export const MIX_SIX = 6

export const WINE_TYPES: WineFilterType[] = ['Red', 'White', 'Orange', 'Rosé', 'Sparkling']

export const OIL_SIZES = [
  { id: '250', label: '250 ml', name: '250 ml tin', mult: 0.6 },
  { id: '500', label: '500 ml', name: '500 ml tin', mult: 1 },
  { id: '3000', label: '3 L', name: '3 L tin', mult: 4.6 },
] as const

export const DEFAULT_OIL_SIZE: OilSize = '500'

export const FREQ_LABEL: Record<Freq, string> = { season: 'per season', month: 'per month' }
