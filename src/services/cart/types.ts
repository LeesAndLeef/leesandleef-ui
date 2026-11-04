import type { Cart, CartPricedLine, RawCartItem } from '../../types'

export interface RawCartPricedLine extends Omit<CartPricedLine, 'item'> {
  item: RawCartItem
}

export interface RawCart extends Omit<Cart, 'lines' | 'saved'> {
  lines: RawCartPricedLine[]
  saved: RawCartPricedLine[]
}
