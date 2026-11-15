import { useSuspenseQuery } from '@tanstack/react-query'
import { oilsQuery } from '../../lib/catalogQueries'
import type { OilFilters } from '../../types'

export const useOilResults = (filters: OilFilters) => useSuspenseQuery(oilsQuery(filters)).data
