import type { AxiosRequestConfig } from 'axios'
import type { ApiIssue } from '../types'

export type RequestConfig = Pick<AxiosRequestConfig, 'params' | 'signal'>

export type QueryValue = string | number | boolean | readonly string[] | null | undefined

export type QueryParams = Record<string, QueryValue>

export interface IHttpClient {
  get<T>(url: string, config?: RequestConfig): Promise<T>
  post<T>(url: string, body?: unknown, config?: RequestConfig): Promise<T>
  put<T>(url: string, body?: unknown, config?: RequestConfig): Promise<T>
  patch<T>(url: string, body?: unknown, config?: RequestConfig): Promise<T>
  delete<T>(url: string, config?: RequestConfig): Promise<T>
}

export interface ApiErrorBody {
  statusCode: number
  error: string
  message: string
  issues?: ApiIssue[]
}
