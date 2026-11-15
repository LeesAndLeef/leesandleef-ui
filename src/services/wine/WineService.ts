import { linkWine } from '../../lib/links'
import { withDefaultVintage } from '../../lib/wine'
import type { RawWine, Wine, WineFilters, WineList } from '../../types'
import { BaseService } from '../BaseService'
import { API_ENDPOINTS } from '../constants'
import { HttpClient } from '../HttpClient'
import type { IHttpClient } from '../types'
import type { RawWineList } from './types'

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
    return linkWine(withDefaultVintage(dto))
  }

  async getWines(filters: Readonly<WineFilters> = {}, signal?: AbortSignal): Promise<WineList> {
    const params = this.getQueryParams(filters)
    const { data, meta } = await this.httpClient.get<RawWineList>(API_ENDPOINTS.WINES, { params, signal })
    return { wines: this.toModels(data), meta }
  }
}
