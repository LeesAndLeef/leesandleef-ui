import { apiPath } from '../../lib/apiPath'
import type { Grower, VisitConfirmation, VisitRequestInput } from '../../types'
import { BaseService } from '../BaseService'
import { API_ENDPOINTS, API_SEGMENTS } from '../constants'
import { HttpClient } from '../HttpClient'
import type { IHttpClient } from '../types'

export class GrowerService extends BaseService<Grower> {
  private static instance: GrowerService

  private constructor(httpClient: IHttpClient) {
    super(httpClient)
  }

  static create() {
    if (!GrowerService.instance) GrowerService.instance = new GrowerService(HttpClient.create())
    return GrowerService.instance
  }

  protected toModel(dto: Grower) {
    return dto
  }

  async getGrowers(signal?: AbortSignal) {
    return this.toModels(await this.httpClient.get<Grower[]>(API_ENDPOINTS.GROWERS, { signal }))
  }

  async getGrower(id: string, signal?: AbortSignal) {
    return this.toModel(await this.httpClient.get<Grower>(apiPath(API_ENDPOINTS.GROWERS, id), { signal }))
  }

  requestVisit(growerId: string, visit: Readonly<VisitRequestInput>) {
    return this.httpClient.post<VisitConfirmation>(apiPath(API_ENDPOINTS.GROWERS, growerId, API_SEGMENTS.VISITS), visit)
  }
}
