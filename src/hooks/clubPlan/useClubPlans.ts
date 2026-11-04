import { QUERY_KEYS } from '../../constants'
import { ClubPlanService } from '../../services/clubPlan/ClubPlanService'
import { useGetData } from '../useGetData'

export const useClubPlans = () =>
  useGetData(QUERY_KEYS.CLUB_PLANS, (signal) => ClubPlanService.create().getClubPlans(signal))
