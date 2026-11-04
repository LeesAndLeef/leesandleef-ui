import axios from 'axios'
import type { ApiIssue } from '../types'
import { HTTP_STATUS } from './constants'
import type { ApiErrorBody } from './types'

export class ApiError extends Error {
  readonly status: number
  readonly issues: ApiIssue[]

  constructor(message: string, status: number, issues: ApiIssue[] = []) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.issues = issues
  }

  get isUnauthorized() {
    return this.status === HTTP_STATUS.UNAUTHORIZED
  }

  get isRetryable() {
    return this.status === HTTP_STATUS.NETWORK_ERROR || this.status >= HTTP_STATUS.SERVER_ERROR
  }

  static from(error: unknown): ApiError {
    if (error instanceof ApiError) return error
    if (!axios.isAxiosError<ApiErrorBody>(error)) {
      return new ApiError(error instanceof Error ? error.message : String(error), HTTP_STATUS.NETWORK_ERROR)
    }
    const body = error.response?.data
    return new ApiError(
      body?.message ?? error.message,
      error.response?.status ?? HTTP_STATUS.NETWORK_ERROR,
      body?.issues,
    )
  }
}
