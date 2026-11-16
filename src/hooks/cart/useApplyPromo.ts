import { CartService } from '../../services/cart/CartService'
import type { CartMutationCallbacks } from './types'
import { useCartMutation } from './useCartMutation'

export const useApplyPromo = (callbacks?: CartMutationCallbacks<string>) =>
  useCartMutation((code: string) => CartService.create().applyPromo(code), callbacks)
