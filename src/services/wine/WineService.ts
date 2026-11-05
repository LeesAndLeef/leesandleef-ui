import { linkWine } from '../../lib/links'
import type { RawWine, Wine } from '../../types'
import { BaseService } from '../BaseService'
import { API_ENDPOINTS } from '../constants'
import { HttpClient } from '../HttpClient'
import type { IHttpClient } from '../types'

export class WineService extends BaseService<Wine, RawWine> {
  private static instance: WineService

  private constructor(httpClient: IHttpClient) {
    super(httpClient)
  }

  static create() {
    if (!WineService.instance) WineService.instance = new WineService(HttpClient.create())
    return WineService.instance
  }

  protected toModel(dto: RawWine): Wine {
    return linkWine(dto)
  }

  async getWines(signal?: AbortSignal) {
    return this.toModels(await this.httpClient.get<RawWine[]>(API_ENDPOINTS.WINES, { signal }))
  }
}
