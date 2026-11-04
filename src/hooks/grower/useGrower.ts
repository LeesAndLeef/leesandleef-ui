import { skipToken } from '@tanstack/react-query'
import { QUERY_KEYS } from '../../constants'
import { GrowerService } from '../../services/grower/GrowerService'
import { useGetData } from '../useGetData'

export const useGrower = (id: string | undefined) =>
  useGetData([...QUERY_KEYS.GROWERS, id], id ? (signal) => GrowerService.create().getGrower(id, signal) : skipToken)
