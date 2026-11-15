import { withGrowerAssets, withOilAssets } from '../../lib/assets'
import { linkOil, linkWine } from '../../lib/links'
import { withDefaultSize } from '../../lib/oil'
import type { SearchResults } from '../../lib/types'
import { withDefaultVintage } from '../../lib/wine'
import { BaseService } from '../BaseService'
import { API_ENDPOINTS } from '../constants'
import { HttpClient } from '../HttpClient'
import type { IHttpClient } from '../types'
import type { RawSearchResults } from './types'

export class SearchService extends BaseService<SearchResults, RawSearchResults> {
  private static instance: SearchService

  private constructor(httpClient: IHttpClient) {
    super(httpClient)
  }

  static create() {
    if (!SearchService.instance) SearchService.instance = new SearchService(HttpClient.create())
    return SearchService.instance
  }

  protected toModel(dto: RawSearchResults): SearchResults {
    return {
      wines: dto.wines.map((wine) => linkWine(withDefaultVintage(wine))),
      oils: dto.oils.map((oil) => withOilAssets(linkOil(withDefaultSize(oil)))),
      growers: dto.growers.map(withGrowerAssets),
    }
  }

  async search(query: string, signal?: AbortSignal) {
    const results = await this.httpClient.get<RawSearchResults>(API_ENDPOINTS.SEARCH, {
      params: this.getQueryParams({ q: query }),
      signal,
    })
    return this.toModel(results)
  }
}
