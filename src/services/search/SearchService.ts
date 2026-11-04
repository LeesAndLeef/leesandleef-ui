import { linkOil, linkWine } from '../../lib/links'
import type { SearchResults } from '../../lib/types'
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
    return { wines: dto.wines.map(linkWine), oils: dto.oils.map(linkOil), growers: dto.growers }
  }

  async search(query: string, signal?: AbortSignal) {
    const results = await this.httpClient.get<RawSearchResults>(API_ENDPOINTS.SEARCH, {
      params: this.getQueryParams({ q: query }),
      signal,
    })
    return this.toModel(results)
  }
}
