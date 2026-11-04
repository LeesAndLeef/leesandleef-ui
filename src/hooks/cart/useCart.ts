import { QUERY_KEYS } from '../../constants'
import { CartService } from '../../services/cart/CartService'
import { useGetData } from '../useGetData'

export const useCart = () => useGetData(QUERY_KEYS.CART, (signal) => CartService.create().getCart(signal))
