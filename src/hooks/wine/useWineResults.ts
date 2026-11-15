import { useSuspenseQuery } from '@tanstack/react-query'
import { winesQuery } from '../../lib/catalogQueries'
import type { WineFilters } from '../../types'

export const useWineResults = (filters: WineFilters) => useSuspenseQuery(winesQuery(filters)).data
