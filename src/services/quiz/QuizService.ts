import { linkWine } from '../../lib/links'
import type { Quiz, QuizRecommendation } from '../../types'
import { BaseService } from '../BaseService'
import { API_ENDPOINTS } from '../constants'
import { HttpClient } from '../HttpClient'
import type { IHttpClient } from '../types'
import type { RawQuizRecommendation } from './types'

export class QuizService extends BaseService<QuizRecommendation, RawQuizRecommendation> {
  private static instance: QuizService

  private constructor(httpClient: IHttpClient) {
    super(httpClient)
  }

  static create() {
    if (!QuizService.instance) QuizService.instance = new QuizService(HttpClient.create())
    return QuizService.instance
  }

  protected toModel(dto: RawQuizRecommendation): QuizRecommendation {
    return { ...dto, wines: dto.wines.map(linkWine) }
  }

  getQuiz(signal?: AbortSignal) {
    return this.httpClient.get<Quiz>(API_ENDPOINTS.QUIZ, { signal })
  }

  async recommend(answers: readonly number[]) {
    return this.toModel(
      await this.httpClient.post<RawQuizRecommendation>(API_ENDPOINTS.QUIZ_RECOMMENDATIONS, { answers }),
    )
  }
}
