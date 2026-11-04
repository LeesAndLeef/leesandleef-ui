import { apiPath } from '../../lib/apiPath'
import { linkOil } from '../../lib/links'
import type { Oil, OilListParams, RawOil } from '../../types'
import { BaseService } from '../BaseService'
import { API_ENDPOINTS } from '../constants'
import { HttpClient } from '../HttpClient'
import type { IHttpClient } from '../types'

export class OilService extends BaseService<Oil, RawOil> {
  private static instance: OilService

  private constructor(httpClient: IHttpClient) {
    super(httpClient)
  }

  static create() {
    if (!OilService.instance) OilService.instance = new OilService(HttpClient.create())
    return OilService.instance
  }

  protected toModel(dto: RawOil): Oil {
    return linkOil(dto)
  }

  async getOils(params: Readonly<OilListParams> = {}, signal?: AbortSignal) {
    const oils = await this.httpClient.get<RawOil[]>(API_ENDPOINTS.OILS, {
      params: this.getQueryParams({ ...params }),
      signal,
    })
    return this.toModels(oils)
  }

  async getOil(id: string, signal?: AbortSignal) {
    return this.toModel(await this.httpClient.get<RawOil>(apiPath(API_ENDPOINTS.OILS, id), { signal }))
  }
}
