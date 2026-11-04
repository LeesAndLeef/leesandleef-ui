import { skipToken } from '@tanstack/react-query'
import { QUERY_KEYS } from '../../constants'
import { SearchService } from '../../services/search/SearchService'
import { useGetData } from '../useGetData'

export function useSearch(query: string) {
  const q = query.trim()
  return useGetData([...QUERY_KEYS.SEARCH, q], q ? (signal) => SearchService.create().search(q, signal) : skipToken)
}
