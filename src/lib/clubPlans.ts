import { clubPlans as rawClubPlans } from '../data/clubPlans'
import { CLUB_ROUTE } from '../routes'
import type { ClubPlan } from '../types'

export const clubPlans: ClubPlan[] = rawClubPlans.map((plan) => ({ ...plan, path: CLUB_ROUTE }))
