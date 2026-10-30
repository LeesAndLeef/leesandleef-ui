import { DEFAULT_OIL_SIZE } from '../constants'
import type { ClubPlan, Product } from '../types'
import { clubPlans } from './clubPlans'
import { getProductById } from './products'

export const oilOption = (size: string) => (size === DEFAULT_OIL_SIZE ? undefined : size)

export const lineKey = (id: string, option?: string) => (option ? `${id}@${option}` : id)

export function findItem(id: string): Product | ClubPlan | undefined {
  return getProductById(id) ?? clubPlans.find((p) => p.id === id)
}
