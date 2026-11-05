import { useSuspenseQuery } from '@tanstack/react-query'
import { growersQuery } from '../../lib/catalogQueries'

export const useGrowers = () => useSuspenseQuery(growersQuery()).data
