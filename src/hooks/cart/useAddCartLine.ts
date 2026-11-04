import { CartService } from '../../services/cart/CartService'
import type { AddCartLineInput } from '../../types'
import { useCartMutation } from './useCartMutation'

export const useAddCartLine = () => useCartMutation((line: AddCartLineInput) => CartService.create().addLine(line))
