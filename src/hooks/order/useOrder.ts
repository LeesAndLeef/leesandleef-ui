import { skipToken } from '@tanstack/react-query'
import { QUERY_KEYS } from '../../constants'
import { OrderService } from '../../services/order/OrderService'
import { useGetData } from '../useGetData'

export const useOrder = (id: string | undefined) =>
  useGetData([...QUERY_KEYS.ORDERS, id], id ? (signal) => OrderService.create().getOrder(id, signal) : skipToken)
