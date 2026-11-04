import { useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '../../constants'
import { AuthService } from '../../services/auth/AuthService'
import { useMutateData } from '../useMutateData'

export function useLogout() {
  const queryClient = useQueryClient()
  return useMutateData(() => AuthService.create().logout(), {
    onSuccess: () => {
      queryClient.setQueryData(QUERY_KEYS.ACCOUNT, null)
      queryClient.removeQueries({ queryKey: QUERY_KEYS.ORDERS })
    },
  })
}
