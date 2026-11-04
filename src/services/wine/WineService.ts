import { apiPath } from '../../lib/apiPath'
import { linkWine } from '../../lib/links'
import type { RawWine, Wine, WineListParams } from '../../types'
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

  async getWines(params: Readonly<WineListParams> = {}, signal?: AbortSignal) {
    const wines = await this.httpClient.get<RawWine[]>(API_ENDPOINTS.WINES, {
      params: this.getQueryParams({ ...params }),
      signal,
    })
    return this.toModels(wines)
  }

  async getWine(id: string, signal?: AbortSignal) {
    return this.toModel(await this.httpClient.get<RawWine>(apiPath(API_ENDPOINTS.WINES, id), { signal }))
  }
}
