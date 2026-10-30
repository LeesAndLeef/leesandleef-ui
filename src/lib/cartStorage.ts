import { EMPTY_CART } from '../constants'
import type { CartLine, CartState } from '../types'
import { findItem } from './cart'
import { CART_STORAGE_KEY } from './constants'

export function loadCart(): CartState {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    if (!raw) return EMPTY_CART
    const parsed = JSON.parse(raw) as Partial<CartState>
    const valid = (ls: CartLine[] = []) => ls.filter((l) => findItem(l.id) && l.qty > 0)
    return { ...EMPTY_CART, ...parsed, lines: valid(parsed.lines), saved: valid(parsed.saved) }
  } catch {
    return EMPTY_CART
  }
}

export function saveCart(state: CartState) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state))
    return true
  } catch {
    return false
  }
}
