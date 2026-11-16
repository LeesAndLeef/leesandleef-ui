import { CartService } from '../../services/cart/CartService'
import type { CartMutationCallbacks } from './types'
import { useCartMutation } from './useCartMutation'

export const useSetGiftNote = (callbacks?: CartMutationCallbacks<string | null>) =>
  useCartMutation((note: string | null) => CartService.create().setGiftNote(note), callbacks)
