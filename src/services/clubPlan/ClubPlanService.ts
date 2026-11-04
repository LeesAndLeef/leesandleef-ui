import { linkClubPlan } from '../../lib/links'
import type { ClubPlan, RawClubPlan } from '../../types'
import { BaseService } from '../BaseService'
import { API_ENDPOINTS } from '../constants'
import { HttpClient } from '../HttpClient'
import type { IHttpClient } from '../types'

export class ClubPlanService extends BaseService<ClubPlan, RawClubPlan> {
  private static instance: ClubPlanService

  private constructor(httpClient: IHttpClient) {
    super(httpClient)
  }

  static create() {
    if (!ClubPlanService.instance) ClubPlanService.instance = new ClubPlanService(HttpClient.create())
    return ClubPlanService.instance
  }

  protected toModel(dto: RawClubPlan): ClubPlan {
    return linkClubPlan(dto)
  }

  async getClubPlans(signal?: AbortSignal) {
    return this.toModels(await this.httpClient.get<RawClubPlan[]>(API_ENDPOINTS.CLUB_PLANS, { signal }))
  }
}
