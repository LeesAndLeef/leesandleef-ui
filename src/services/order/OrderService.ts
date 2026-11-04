import { apiPath } from '../../lib/apiPath'
import { linkCartItem } from '../../lib/links'
import type { CustomerOrder, OrderLine, PlacedOrder, PlaceOrderInput } from '../../types'
import { BaseService } from '../BaseService'
import { API_ENDPOINTS } from '../constants'
import { HttpClient } from '../HttpClient'
import type { IHttpClient } from '../types'
import type { RawCustomerOrder, RawOrderLine, RawPlacedOrder } from './types'

export class OrderService extends BaseService<CustomerOrder, RawCustomerOrder> {
  private static instance: OrderService

  private constructor(httpClient: IHttpClient) {
    super(httpClient)
  }

  static create() {
    if (!OrderService.instance) OrderService.instance = new OrderService(HttpClient.create())
    return OrderService.instance
  }

  private static toLine({ item, ...line }: RawOrderLine): OrderLine {
    return item ? { ...line, item: linkCartItem(item) } : line
  }

  protected toModel(dto: RawCustomerOrder): CustomerOrder {
    return { ...dto, lines: dto.lines.map(OrderService.toLine) }
  }

  async placeOrder(input: Readonly<PlaceOrderInput>): Promise<PlacedOrder> {
    const { order, payment } = await this.httpClient.post<RawPlacedOrder>(API_ENDPOINTS.ORDERS, input)
    return { order: this.toModel(order), payment }
  }

  async getOrders(signal?: AbortSignal) {
    return this.toModels(await this.httpClient.get<RawCustomerOrder[]>(API_ENDPOINTS.ORDERS, { signal }))
  }

  async getOrder(id: string, signal?: AbortSignal) {
    return this.toModel(await this.httpClient.get<RawCustomerOrder>(apiPath(API_ENDPOINTS.ORDERS, id), { signal }))
  }
}
