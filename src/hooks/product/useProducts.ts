import { useSuspenseQueries } from '@tanstack/react-query'
import { useMemo } from 'react'
import { oilsQuery, winesQuery } from '../../lib/catalogQueries'
import type { Product } from '../../types'

export function useProducts(): Product[] {
  const [{ data: wineList }, { data: oilList }] = useSuspenseQueries({ queries: [winesQuery(), oilsQuery()] })
  return useMemo(() => [...wineList.wines, ...oilList.oils], [wineList, oilList])
}
