import type { Cart, CartLinesInput, CartTotals, ShipOption } from '../types'
import { ADDED_ITEMS_LABEL } from './constants'

export const lineKey = (id: string, option?: string) => (option ? `${id}@${option}` : id)

export function addedNotice({ lines }: Pick<Cart, 'lines'>, added: CartLinesInput) {
  if (added.length !== 1) return `${added.length} ${ADDED_ITEMS_LABEL}`
  const [{ id, option, qty = 1 }] = added
  const name = lines.find((line) => line.key === lineKey(id, option))?.name ?? id
  return qty > 1 ? `${qty} × ${name}` : name
}

export const totalWithDelivery = (
  { total, shipping }: Pick<CartTotals, 'total' | 'shipping'>,
  delivery: Pick<ShipOption, 'price'>,
) => total - shipping + delivery.price
