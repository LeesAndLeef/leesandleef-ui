import type { IHttpClient, QueryParams } from './types'

export abstract class BaseService<Model, DTO = Model> {
  protected readonly httpClient: IHttpClient

  protected constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient
  }

  protected abstract toModel(dto: DTO): Model

  protected toModels(dtos: DTO[]): Model[] {
    return dtos.map((dto) => this.toModel(dto))
  }

  protected getQueryParams(params: Readonly<QueryParams> = {}): QueryParams {
    return Object.fromEntries(
      Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== ''),
    )
  }
}
