import { QUERY_KEYS } from '../../constants'
import { OrderService } from '../../services/order/OrderService'
import { useGetData } from '../useGetData'

export const useOrders = () => useGetData(QUERY_KEYS.ORDERS, (signal) => OrderService.create().getOrders(signal))
