import type { Account, AccountUpdate } from '../../types'
import { ApiError } from '../ApiError'
import { BaseService } from '../BaseService'
import { API_ENDPOINTS } from '../constants'
import { HttpClient } from '../HttpClient'
import type { IHttpClient } from '../types'

export class AccountService extends BaseService<Account> {
  private static instance: AccountService

  private constructor(httpClient: IHttpClient) {
    super(httpClient)
  }

  static create() {
    if (!AccountService.instance) AccountService.instance = new AccountService(HttpClient.create())
    return AccountService.instance
  }

  protected toModel(dto: Account) {
    return dto
  }

  async getAccount(signal?: AbortSignal): Promise<Account | null> {
    try {
      return this.toModel(await this.httpClient.get<Account>(API_ENDPOINTS.ACCOUNT, { signal }))
    } catch (error) {
      if (error instanceof ApiError && error.isUnauthorized) return null
      throw error
    }
  }

  async updateAccount(update: Readonly<AccountUpdate>) {
    return this.toModel(await this.httpClient.patch<Account>(API_ENDPOINTS.ACCOUNT, update))
  }
}
