import { CartService } from '../../services/cart/CartService'
import { useCartMutation } from './useCartMutation'

export const useClearCart = () => useCartMutation(() => CartService.create().clear())
