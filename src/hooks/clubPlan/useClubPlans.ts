import { useSuspenseQuery } from '@tanstack/react-query'
import { clubPlansQuery } from '../../lib/catalogQueries'

export const useClubPlans = () => useSuspenseQuery(clubPlansQuery()).data
