import type { CustomerOrder, OrderLine, PlacedOrder, RawCartItem } from '../../types'

export interface RawOrderLine extends Omit<OrderLine, 'item'> {
  item?: RawCartItem
}

export interface RawCustomerOrder extends Omit<CustomerOrder, 'lines'> {
  lines: RawOrderLine[]
}

export interface RawPlacedOrder extends Omit<PlacedOrder, 'order'> {
  order: RawCustomerOrder
}
