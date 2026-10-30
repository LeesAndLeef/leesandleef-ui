import { type ReactNode, useEffect, useMemo, useState } from 'react'
import { EMPTY_CART, PROMO_CODES } from '../../constants'
import { findItem, lineKey } from '../../lib/cart'
import { loadCart, saveCart } from '../../lib/cartStorage'
import { computeTotals, priceLine, priceLines } from '../../lib/pricing'
import type { CartState } from '../../types'
import type { CartApi, CartNotice } from './types'
import { CartContext } from './useCart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CartState>(loadCart)
  const [notice, setNotice] = useState<CartNotice | null>(null)

  useEffect(() => {
    saveCart(state)
  }, [state])

  const api = useMemo<CartApi>(() => {
    const priced = priceLines(state.lines)
    const savedPriced = priceLines(state.saved)
    const update = (fn: (s: CartState) => CartState) => setState(fn)

    return {
      ...state,
      notice,
      dismissNotice: () => setNotice(null),
      priced,
      savedPriced,
      totals: computeTotals(priced, state.promo),

      add(id, qty = 1, option) {
        const item = findItem(id)
        if (!item) return
        const key = lineKey(id, option)
        const label = priceLine({ key, id, option, qty })?.name ?? item.name
        setNotice({ text: qty > 1 ? `${qty} × ${label}` : label, at: Date.now() })
        update((s) => {
          const lines = item.kind === 'club' ? s.lines.filter((l) => findItem(l.id)?.kind !== 'club') : s.lines
          const max = item.kind === 'club' ? 1 : 24
          const existing = lines.find((l) => l.key === key)
          return {
            ...s,
            saved: s.saved.filter((l) => l.key !== key),
            lines: existing
              ? lines.map((l) => (l.key === key ? { ...l, qty: Math.min(max, l.qty + qty) } : l))
              : [...lines, { key, id, option, qty: Math.min(max, qty) }],
          }
        })
      },

      setQty(key, qty) {
        update((s) => ({
          ...s,
          lines: s.lines.map((l) => (l.key === key ? { ...l, qty: Math.max(1, Math.min(24, qty)) } : l)),
        }))
      },

      remove(key) {
        update((s) => ({ ...s, lines: s.lines.filter((l) => l.key !== key) }))
      },

      saveForLater(key) {
        update((s) => {
          const line = s.lines.find((l) => l.key === key)
          if (!line) return s
          return {
            ...s,
            lines: s.lines.filter((l) => l.key !== key),
            saved: [...s.saved.filter((l) => l.key !== key), line],
          }
        })
      },

      moveToCart(key) {
        update((s) => {
          const line = s.saved.find((l) => l.key === key)
          if (!line) return s
          return {
            ...s,
            saved: s.saved.filter((l) => l.key !== key),
            lines: [...s.lines.filter((l) => l.key !== key), line],
          }
        })
      },

      applyPromo(code) {
        const c = code.trim().toUpperCase()
        const ok = c in PROMO_CODES
        update((s) => ({ ...s, promo: ok ? c : null }))
        return ok
      },

      setGiftNote(note) {
        update((s) => ({ ...s, giftNote: note }))
      },

      clear() {
        update((s) => ({ ...EMPTY_CART, saved: s.saved }))
      },
    }
  }, [state, notice])

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>
}
