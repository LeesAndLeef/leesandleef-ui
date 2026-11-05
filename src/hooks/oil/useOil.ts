import { useSuspenseQuery } from '@tanstack/react-query'
import { oilsQuery } from '../../lib/catalogQueries'

export const useOil = (id: string | undefined) =>
  useSuspenseQuery({ ...oilsQuery(), select: (oils) => oils.find((oil) => oil.id === id) }).data
