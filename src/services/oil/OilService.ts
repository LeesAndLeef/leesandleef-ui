import { withOilAssets } from '../../lib/assets'
import { linkOil } from '../../lib/links'
import type { Oil, RawOil } from '../../types'
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
    return withOilAssets(linkOil(dto))
  }

  async getOils(signal?: AbortSignal) {
    return this.toModels(await this.httpClient.get<RawOil[]>(API_ENDPOINTS.OILS, { signal }))
  }
}
