import type { Grower } from '../types'

export const productRegion = (region: string) => `${region}, Croatia`

export const productPlace = (region: string, grower?: Pick<Grower, 'place'>) => grower?.place ?? productRegion(region)
