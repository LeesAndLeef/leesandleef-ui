import { CartService } from '../../services/cart/CartService'
import type { SetCartQtyInput } from '../../types'
import { useCartMutation } from './useCartMutation'

export const useSetCartQty = () => useCartMutation((input: SetCartQtyInput) => CartService.create().setQty(input))
