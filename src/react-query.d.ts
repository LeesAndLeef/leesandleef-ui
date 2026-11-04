import type { ApiError } from './services/ApiError'

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: ApiError
  }
}
