import { QUERY_KEYS } from '../../constants'
import { AccountService } from '../../services/account/AccountService'
import { useGetData } from '../useGetData'

export const useAccount = () => useGetData(QUERY_KEYS.ACCOUNT, (signal) => AccountService.create().getAccount(signal))
