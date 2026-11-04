import axios, { type AxiosInstance } from 'axios'
import { ApiError } from './ApiError'
import { API_BASE_URL } from './constants'
import type { IHttpClient, RequestConfig } from './types'

export class HttpClient implements IHttpClient {
  private static instance: HttpClient
  private readonly client: AxiosInstance

  private constructor(client: AxiosInstance) {
    this.client = client
    this.client.interceptors.response.use((response) => response, HttpClient.rejectAsApiError)
  }

  static create() {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient(axios.create({ baseURL: API_BASE_URL, withCredentials: true }))
    }
    return HttpClient.instance
  }

  private static rejectAsApiError(error: unknown) {
    return Promise.reject(axios.isCancel(error) ? error : ApiError.from(error))
  }

  async get<T>(url: string, config?: RequestConfig) {
    const { data } = await this.client.get<T>(url, config)
    return data
  }

  async post<T>(url: string, body?: unknown, config?: RequestConfig) {
    const { data } = await this.client.post<T>(url, body, config)
    return data
  }

  async put<T>(url: string, body?: unknown, config?: RequestConfig) {
    const { data } = await this.client.put<T>(url, body, config)
    return data
  }

  async patch<T>(url: string, body?: unknown, config?: RequestConfig) {
    const { data } = await this.client.patch<T>(url, body, config)
    return data
  }

  async delete<T>(url: string, config?: RequestConfig) {
    const { data } = await this.client.delete<T>(url, config)
    return data
  }
}
