import { OLIVE_OILS_ROUTE, WINES_ROUTE } from '../routes'
import type { Oil, Wine } from '../types'

export const winePath = (wine: Pick<Wine, 'id'>) => `${WINES_ROUTE}/${wine.id}`

export const oilPath = (oil: Pick<Oil, 'id'>) => `${OLIVE_OILS_ROUTE}/${oil.id}`
