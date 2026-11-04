import { QUERY_KEYS } from '../../constants'
import { CartService } from '../../services/cart/CartService'
import { useGetData } from '../useGetData'

export const useShippingOptions = () =>
  useGetData(QUERY_KEYS.SHIPPING_OPTIONS, (signal) => CartService.create().getShippingOptions(signal))
