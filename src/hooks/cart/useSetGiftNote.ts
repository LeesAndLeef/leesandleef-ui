import { CartService } from '../../services/cart/CartService'
import { useCartMutation } from './useCartMutation'

export const useSetGiftNote = () => useCartMutation((note: string | null) => CartService.create().setGiftNote(note))
