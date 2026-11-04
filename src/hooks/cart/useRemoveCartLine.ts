import { CartService } from '../../services/cart/CartService'
import { useCartMutation } from './useCartMutation'

export const useRemoveCartLine = () => useCartMutation((key: string) => CartService.create().removeLine(key))
