import { useSuspenseQuery } from '@tanstack/react-query'
import { winesQuery } from '../../lib/catalogQueries'

export const useWine = (id: string | undefined) =>
  useSuspenseQuery({ ...winesQuery(), select: (list) => list.wines.find((wine) => wine.id === id) }).data
