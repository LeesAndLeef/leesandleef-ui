import { QUERY_KEYS } from '../../constants'
import { GrowerService } from '../../services/grower/GrowerService'
import { useGetData } from '../useGetData'

export const useGrowers = () => useGetData(QUERY_KEYS.GROWERS, (signal) => GrowerService.create().getGrowers(signal))
