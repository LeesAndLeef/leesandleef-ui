import { useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '../../constants'
import type { Account } from '../../types'
import type { MutationRunner } from '../types'
import { useMutateData } from '../useMutateData'

export function useSessionMutation<V>(mutationFn: MutationRunner<Account, V>) {
  const queryClient = useQueryClient()
  return useMutateData(mutationFn, {
    onSuccess: (account) => {
      queryClient.setQueryData(QUERY_KEYS.ACCOUNT, account)
      return queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ORDERS })
    },
  })
}
