import { useSuspenseQuery } from '@tanstack/react-query'
import { oilsQuery } from '../../lib/catalogQueries'

export const useOils = () => useSuspenseQuery(oilsQuery()).data
