import { apiPath } from '../../lib/apiPath'
import { linkCartItem } from '../../lib/links'
import type { AddCartLineInput, Cart, CartPricedLine, SetCartQtyInput, ShipOption } from '../../types'
import { BaseService } from '../BaseService'
import { API_ENDPOINTS, API_SEGMENTS } from '../constants'
import { HttpClient } from '../HttpClient'
import type { IHttpClient } from '../types'
import type { RawCart, RawCartPricedLine } from './types'

export class CartService extends BaseService<Cart, RawCart> {
  private static instance: CartService

  private constructor(httpClient: IHttpClient) {
    super(httpClient)
  }

  static create() {
    if (!CartService.instance) CartService.instance = new CartService(HttpClient.create())
    return CartService.instance
  }

  private static toLine(line: RawCartPricedLine): CartPricedLine {
    return { ...line, item: linkCartItem(line.item) }
  }

  protected toModel(dto: RawCart): Cart {
    return { ...dto, lines: dto.lines.map(CartService.toLine), saved: dto.saved.map(CartService.toLine) }
  }

  async getCart(signal?: AbortSignal) {
    return this.toModel(await this.httpClient.get<RawCart>(API_ENDPOINTS.CART, { signal }))
  }

  getShippingOptions(signal?: AbortSignal) {
    return this.httpClient.get<ShipOption[]>(API_ENDPOINTS.CART_SHIPPING_OPTIONS, { signal })
  }

  async addLine(line: Readonly<AddCartLineInput>) {
    return this.toModel(await this.httpClient.post<RawCart>(API_ENDPOINTS.CART_LINES, line))
  }

  async setQty({ key, qty }: Readonly<SetCartQtyInput>) {
    return this.toModel(await this.httpClient.patch<RawCart>(apiPath(API_ENDPOINTS.CART_LINES, key), { qty }))
  }

  async removeLine(key: string) {
    return this.toModel(await this.httpClient.delete<RawCart>(apiPath(API_ENDPOINTS.CART_LINES, key)))
  }

  async saveForLater(key: string) {
    const url = apiPath(API_ENDPOINTS.CART_LINES, key, API_SEGMENTS.SAVE_FOR_LATER)
    return this.toModel(await this.httpClient.post<RawCart>(url))
  }

  async moveToCart(key: string) {
    const url = apiPath(API_ENDPOINTS.CART_SAVED, key, API_SEGMENTS.MOVE_TO_CART)
    return this.toModel(await this.httpClient.post<RawCart>(url))
  }

  async removeSaved(key: string) {
    return this.toModel(await this.httpClient.delete<RawCart>(apiPath(API_ENDPOINTS.CART_SAVED, key)))
  }

  async applyPromo(code: string) {
    return this.toModel(await this.httpClient.put<RawCart>(API_ENDPOINTS.CART_PROMO, { code }))
  }

  async removePromo() {
    return this.toModel(await this.httpClient.delete<RawCart>(API_ENDPOINTS.CART_PROMO))
  }

  async setGiftNote(note: string | null) {
    return this.toModel(await this.httpClient.put<RawCart>(API_ENDPOINTS.CART_GIFT_NOTE, { note }))
  }

  async clear() {
    return this.toModel(await this.httpClient.delete<RawCart>(API_ENDPOINTS.CART))
  }
}
