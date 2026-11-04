import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '../constants'
import { ApiError } from '../services/ApiError'
import { MAX_QUERY_RETRIES, QUERY_STALE_TIME } from './constants'

const clearAccountOnUnauthorized = (error: Error) => {
  if (error instanceof ApiError && error.isUnauthorized) queryClient.setQueryData(QUERY_KEYS.ACCOUNT, null)
}

const shouldRetry = (failureCount: number, error: Error) =>
  error instanceof ApiError && error.isRetryable && failureCount < MAX_QUERY_RETRIES

export const queryClient: QueryClient = new QueryClient({
  queryCache: new QueryCache({ onError: clearAccountOnUnauthorized }),
  mutationCache: new MutationCache({ onError: clearAccountOnUnauthorized }),
  defaultOptions: { queries: { staleTime: QUERY_STALE_TIME, retry: shouldRetry } },
})
