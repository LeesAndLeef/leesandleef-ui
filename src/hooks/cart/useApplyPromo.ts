import { CartService } from '../../services/cart/CartService'
import { useCartMutation } from './useCartMutation'

export const useApplyPromo = () => useCartMutation((code: string) => CartService.create().applyPromo(code))
