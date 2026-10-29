import type { Product } from '../types'
import { oils } from './oil'
import { wines } from './wine'

export const products: Product[] = [...wines, ...oils]

export function getProductById(id: string | undefined): Product | undefined {
  return products.find((p) => p.id === id)
}
