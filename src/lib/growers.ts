import { growers } from '../data/growers'
import type { Grower } from '../types'
import { products } from './products'

export { growers }

export function getGrower(id: string | undefined): Grower | undefined {
  return growers.find((g) => g.id === id)
}

export function stockLabel(g: Grower) {
  const mine = products.filter((p) => p.growerId === g.id)
  const wines = mine.filter((p) => p.kind === 'wine').length
  const oil = mine.some((p) => p.kind === 'oil')
  return `${wines} wine${wines === 1 ? '' : 's'}${oil ? ' + oil' : ''}`
}
