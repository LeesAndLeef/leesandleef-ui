import { type QueryKey, skipToken, type UseQueryOptions, useQuery } from '@tanstack/react-query'
import type { QueryRunner } from './types'

export function useGetData<T>(
  queryKey: QueryKey,
  queryFn: QueryRunner<T> | typeof skipToken,
  options?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>,
) {
  return useQuery({
    ...options,
    queryKey,
    queryFn: queryFn === skipToken ? skipToken : ({ signal }) => queryFn(signal),
  })
}
