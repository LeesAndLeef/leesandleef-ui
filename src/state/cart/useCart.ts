import { createContext, useContext } from 'react'
import type { CartApi } from './types'

export const CartContext = createContext<CartApi | null>(null)

export function useCart(): CartApi {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
