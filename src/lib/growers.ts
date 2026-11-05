import type { Grower, Product } from '../types'

export function stockLabel(g: Pick<Grower, 'id'>, products: readonly Pick<Product, 'kind' | 'growerId'>[]) {
  const mine = products.filter((p) => p.growerId === g.id)
  const wines = mine.filter((p) => p.kind === 'wine').length
  const oil = mine.some((p) => p.kind === 'oil')
  return `${wines} wine${wines === 1 ? '' : 's'}${oil ? ' + oil' : ''}`
}

export const nextGrower = <T extends Pick<Grower, 'id'>>(growers: readonly T[], current: Pick<Grower, 'id'>) =>
  growers[(growers.findIndex((g) => g.id === current.id) + 1) % growers.length]
