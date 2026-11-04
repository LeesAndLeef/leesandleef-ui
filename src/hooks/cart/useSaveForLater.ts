import { CartService } from '../../services/cart/CartService'
import { useCartMutation } from './useCartMutation'

export const useSaveForLater = () => useCartMutation((key: string) => CartService.create().saveForLater(key))
