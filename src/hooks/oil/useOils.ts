import { QUERY_KEYS } from '../../constants'
import { OilService } from '../../services/oil/OilService'
import type { OilListParams } from '../../types'
import { useGetData } from '../useGetData'

export const useOils = (params: OilListParams = {}) =>
  useGetData([...QUERY_KEYS.OILS, params], (signal) => OilService.create().getOils(params, signal))
