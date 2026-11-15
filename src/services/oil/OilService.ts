import { withOilAssets } from '../../lib/assets'
import { linkOil } from '../../lib/links'
import { withDefaultSize } from '../../lib/oil'
import type { Oil, OilFilters, OilList, RawOil } from '../../types'
import { BaseService } from '../BaseService'
import { API_ENDPOINTS } from '../constants'
import { HttpClient } from '../HttpClient'
import type { IHttpClient } from '../types'
import type { RawOilList } from './types'

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
    return withOilAssets(linkOil(withDefaultSize(dto)))
  }

  async getOils(filters: Readonly<OilFilters> = {}, signal?: AbortSignal): Promise<OilList> {
    const params = this.getQueryParams(filters)
    const { data, meta } = await this.httpClient.get<RawOilList>(API_ENDPOINTS.OILS, { params, signal })
    return { oils: this.toModels(data), meta }
  }
}
