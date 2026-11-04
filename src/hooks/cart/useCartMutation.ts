import { useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '../../constants'
import type { Cart } from '../../types'
import type { MutationRunner } from '../types'
import { useMutateData } from '../useMutateData'

export function useCartMutation<V = void>(mutationFn: MutationRunner<Cart, V>) {
  const queryClient = useQueryClient()
  return useMutateData(mutationFn, {
    onSuccess: (cart) => {
      queryClient.setQueryData(QUERY_KEYS.CART, cart)
      return queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SHIPPING_OPTIONS })
    },
  })
}
