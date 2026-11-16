import { useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '../../constants'
import { useCartNotice } from '../../state/useCartNotice'
import type { Cart } from '../../types'
import type { MutationRunner } from '../types'
import { useMutateData } from '../useMutateData'
import { CART_MUTATION_SCOPE } from './constants'
import type { CartMutationCallbacks } from './types'

export function useCartMutation<V = void>(
  mutationFn: MutationRunner<Cart, V>,
  { onSuccess, onError }: CartMutationCallbacks<V> = {},
) {
  const queryClient = useQueryClient()
  const showNotice = useCartNotice((state) => state.show)
  return useMutateData(mutationFn, {
    scope: CART_MUTATION_SCOPE,
    onSuccess: (cart, variables) => {
      queryClient.setQueryData(QUERY_KEYS.CART, cart)
      onSuccess?.(cart, variables)
      return queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SHIPPING_OPTIONS })
    },
    onError: (error, variables) => {
      if (onError) onError(error, variables)
      else showNotice({ tone: 'error', text: error.message })
      return queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CART })
    },
  })
}
