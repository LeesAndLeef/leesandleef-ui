import { CartService } from '../../services/cart/CartService'
import { useCartMutation } from './useCartMutation'

export const useMoveToCart = () => useCartMutation((key: string) => CartService.create().moveToCart(key))
