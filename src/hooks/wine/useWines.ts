import { QUERY_KEYS } from '../../constants'
import { WineService } from '../../services/wine/WineService'
import type { WineListParams } from '../../types'
import { useGetData } from '../useGetData'

export const useWines = (params: WineListParams = {}) =>
  useGetData([...QUERY_KEYS.WINES, params], (signal) => WineService.create().getWines(params, signal))
