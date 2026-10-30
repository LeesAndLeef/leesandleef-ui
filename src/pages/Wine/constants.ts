import { SHIPPING_PERK } from '../../components/product/constants'
import { FREE_SHIPPING_FROM, MIX_DISCOUNT_RATE, MIX_SIX } from '../../constants'
import { formatCurrency } from '../../lib/currency'
import { WINES_ROUTE } from '../../routes'
import type { ProductPerk } from '../../types'

export const WINE_ADDED_NOTE = `Added. ${MIX_SIX} bottles or more take ${MIX_DISCOUNT_RATE * 100}% off; delivery is free over ${formatCurrency(FREE_SHIPPING_FROM)}.`

export const WINE_PERKS: ProductPerk[] = [
  SHIPPING_PERK,
  { label: 'Mix & save', text: '-10% on any 6 bottles' },
  { label: 'Corked?', text: 'Replaced, no return' },
]

export const WINE_RELATED_LINK = { label: 'Back to the cellar →', to: WINES_ROUTE }
