import { useSuspenseQuery } from '@tanstack/react-query'
import { growersQuery } from '../../lib/catalogQueries'

export const useGrower = (id: string | undefined) =>
  useSuspenseQuery({ ...growersQuery(), select: (growers) => growers.find((grower) => grower.id === id) }).data
