import { skipToken } from '@tanstack/react-query'
import { QUERY_KEYS } from '../../constants'
import { OilService } from '../../services/oil/OilService'
import { useGetData } from '../useGetData'

export const useOil = (id: string | undefined) =>
  useGetData([...QUERY_KEYS.OILS, id], id ? (signal) => OilService.create().getOil(id, signal) : skipToken)
