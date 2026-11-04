import type { NewsletterSignup, NewsletterSubscription } from '../../types'
import { BaseService } from '../BaseService'
import { API_ENDPOINTS } from '../constants'
import { HttpClient } from '../HttpClient'
import type { IHttpClient } from '../types'

export class NewsletterService extends BaseService<NewsletterSubscription> {
  private static instance: NewsletterService

  private constructor(httpClient: IHttpClient) {
    super(httpClient)
  }

  static create() {
    if (!NewsletterService.instance) NewsletterService.instance = new NewsletterService(HttpClient.create())
    return NewsletterService.instance
  }

  protected toModel(dto: NewsletterSubscription) {
    return dto
  }

  async subscribe(signup: Readonly<NewsletterSignup>) {
    return this.toModel(await this.httpClient.post<NewsletterSubscription>(API_ENDPOINTS.NEWSLETTER, signup))
  }
}
