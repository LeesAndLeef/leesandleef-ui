import { CartService } from '../../services/cart/CartService'
import { useCartMutation } from './useCartMutation'

export const useRemovePromo = () => useCartMutation(() => CartService.create().removePromo())
