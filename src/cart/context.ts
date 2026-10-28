import { createContext, useContext } from 'react'
import type { CartLine, PricedLine, Totals } from './pricing'

export interface CartState {
  lines: CartLine[]
  saved: CartLine[]
  promo: string | null
  giftNote: string | null
}

export interface CartNotice {
  text: string
  at: number
}

export interface CartApi extends CartState {
  notice: CartNotice | null
  dismissNotice: () => void
  priced: PricedLine[]
  savedPriced: PricedLine[]
  totals: Totals
  add: (id: string, qty?: number, option?: string) => void
  setQty: (key: string, qty: number) => void
  remove: (key: string) => void
  saveForLater: (key: string) => void
  moveToCart: (key: string) => void
  applyPromo: (code: string) => boolean
  setGiftNote: (note: string | null) => void
  clear: () => void
}

export const CartContext = createContext<CartApi | null>(null)

export function useCart(): CartApi {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
