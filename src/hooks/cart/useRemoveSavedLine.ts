import { CartService } from '../../services/cart/CartService'
import { useCartMutation } from './useCartMutation'

export const useRemoveSavedLine = () => useCartMutation((key: string) => CartService.create().removeSaved(key))
