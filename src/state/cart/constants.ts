import type { CartState } from './types'

export const SHIPPING_FEE = 9.9
export const PROMO_CODES: Record<string, number> = { HARVEST10: 0.1 }
export const STORAGE_KEY = 'lees-leaf-cart-v1'
export const EMPTY_CART: CartState = { lines: [], saved: [], promo: null, giftNote: null }
export const MIX_DISCOUNT_RATE = 0.1
