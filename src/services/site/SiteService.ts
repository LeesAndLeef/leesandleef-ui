import type { Site } from '../../types'
import { BaseService } from '../BaseService'
import { API_ENDPOINTS } from '../constants'
import { HttpClient } from '../HttpClient'
import type { IHttpClient } from '../types'

export class SiteService extends BaseService<Site> {
  private static instance: SiteService

  private constructor(httpClient: IHttpClient) {
    super(httpClient)
  }

  static create() {
    if (!SiteService.instance) SiteService.instance = new SiteService(HttpClient.create())
    return SiteService.instance
  }

  protected toModel(dto: Site) {
    return dto
  }

  async getSite(signal?: AbortSignal) {
    return this.toModel(await this.httpClient.get<Site>(API_ENDPOINTS.SITE, { signal }))
  }
}
