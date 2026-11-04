import type { Account, LoginInput, SignupInput } from '../../types'
import { BaseService } from '../BaseService'
import { API_ENDPOINTS } from '../constants'
import { HttpClient } from '../HttpClient'
import type { IHttpClient } from '../types'

export class AuthService extends BaseService<Account> {
  private static instance: AuthService

  private constructor(httpClient: IHttpClient) {
    super(httpClient)
  }

  static create() {
    if (!AuthService.instance) AuthService.instance = new AuthService(HttpClient.create())
    return AuthService.instance
  }

  protected toModel(dto: Account) {
    return dto
  }

  async signup(input: Readonly<SignupInput>) {
    return this.toModel(await this.httpClient.post<Account>(API_ENDPOINTS.AUTH_SIGNUP, input))
  }

  async login(input: Readonly<LoginInput>) {
    return this.toModel(await this.httpClient.post<Account>(API_ENDPOINTS.AUTH_LOGIN, input))
  }

  async logout() {
    await this.httpClient.post<void>(API_ENDPOINTS.AUTH_LOGOUT)
  }
}
