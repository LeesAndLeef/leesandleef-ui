import { useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '../../constants'
import { OrderService } from '../../services/order/OrderService'
import type { PlaceOrderInput } from '../../types'
import { useMutateData } from '../useMutateData'

export function usePlaceOrder() {
  const queryClient = useQueryClient()
  return useMutateData((input: PlaceOrderInput) => OrderService.create().placeOrder(input), {
    onSuccess: () =>
      Promise.all(
        [QUERY_KEYS.CART, QUERY_KEYS.ORDERS, QUERY_KEYS.ACCOUNT].map((queryKey) =>
          queryClient.invalidateQueries({ queryKey }),
        ),
      ),
  })
}
