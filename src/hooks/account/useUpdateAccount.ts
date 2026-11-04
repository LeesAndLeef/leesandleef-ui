import { useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '../../constants'
import { AccountService } from '../../services/account/AccountService'
import type { AccountUpdate } from '../../types'
import { useMutateData } from '../useMutateData'

export function useUpdateAccount() {
  const queryClient = useQueryClient()
  return useMutateData((update: AccountUpdate) => AccountService.create().updateAccount(update), {
    onSuccess: (account) => queryClient.setQueryData(QUERY_KEYS.ACCOUNT, account),
  })
}
