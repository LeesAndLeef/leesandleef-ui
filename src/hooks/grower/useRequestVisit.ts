import { GrowerService } from '../../services/grower/GrowerService'
import { useMutateData } from '../useMutateData'
import type { VisitRequestVariables } from './types'

export const useRequestVisit = () =>
  useMutateData(({ growerId, visit }: VisitRequestVariables) => GrowerService.create().requestVisit(growerId, visit))
