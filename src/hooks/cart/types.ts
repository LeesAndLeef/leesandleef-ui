import type { ApiError } from '../../services/ApiError'
import type { Cart } from '../../types'

export interface CartMutationCallbacks<V> {
  onSuccess?: (cart: Cart, variables: V) => void
  onError?: (error: ApiError, variables: V) => void
}
