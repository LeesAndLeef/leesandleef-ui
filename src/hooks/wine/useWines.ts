import { useSuspenseQuery } from '@tanstack/react-query'
import { winesQuery } from '../../lib/catalogQueries'

export const useWines = () => useSuspenseQuery(winesQuery()).data
