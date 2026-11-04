import { apiPath } from '../../lib/apiPath'
import type { Article } from '../../types'
import { BaseService } from '../BaseService'
import { API_ENDPOINTS } from '../constants'
import { HttpClient } from '../HttpClient'
import type { IHttpClient } from '../types'

export class ArticleService extends BaseService<Article> {
  private static instance: ArticleService

  private constructor(httpClient: IHttpClient) {
    super(httpClient)
  }

  static create() {
    if (!ArticleService.instance) ArticleService.instance = new ArticleService(HttpClient.create())
    return ArticleService.instance
  }

  protected toModel(dto: Article) {
    return dto
  }

  async getArticles(signal?: AbortSignal) {
    return this.toModels(await this.httpClient.get<Article[]>(API_ENDPOINTS.ARTICLES, { signal }))
  }

  async getArticle(slug: string, signal?: AbortSignal) {
    return this.toModel(await this.httpClient.get<Article>(apiPath(API_ENDPOINTS.ARTICLES, slug), { signal }))
  }
}
