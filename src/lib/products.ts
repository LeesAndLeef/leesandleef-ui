import type { CartItem } from '../types'
import { oils } from './oil'
import { wines } from './wine'

export const products: CartItem[] = [...wines, ...oils]

export function getProductById(id: string | undefined): CartItem | undefined {
  return products.find((p) => p.id === id)
}
