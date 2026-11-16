import { addedNotice } from '../../lib/cart'
import { CartService } from '../../services/cart/CartService'
import { useCartNotice } from '../../state/useCartNotice'
import type { CartLinesInput } from '../../types'
import { useCartMutation } from './useCartMutation'

export function useAddToCart() {
  const showNotice = useCartNotice((state) => state.show)
  return useCartMutation((lines: CartLinesInput) => CartService.create().addLines(lines), {
    onSuccess: (cart, lines) => showNotice({ tone: 'added', text: addedNotice(cart, lines) }),
  }).mutate
}
