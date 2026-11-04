import { skipToken } from '@tanstack/react-query'
import { QUERY_KEYS } from '../../constants'
import { WineService } from '../../services/wine/WineService'
import { useGetData } from '../useGetData'

export const useWine = (id: string | undefined) =>
  useGetData([...QUERY_KEYS.WINES, id], id ? (signal) => WineService.create().getWine(id, signal) : skipToken)
