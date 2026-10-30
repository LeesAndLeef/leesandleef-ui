import { FREE_SHIPPING_FROM } from '../../constants'
import { formatCurrency } from '../../lib/currency'
import { OLIVE_OILS_ROUTE } from '../../routes'

export const OIL_TYPE_LABEL = 'Olive oil'

export const OIL_GRADE_LABEL = 'Extra virgin olive oil'

export const SET_CRUMB_LABEL = 'Tasting set'

export const OIL_LIST_ANCHOR = `${OLIVE_OILS_ROUTE}#oils`

export const OIL_ADDED_NOTE = `Added. Oil counts toward free delivery over ${formatCurrency(FREE_SHIPPING_FROM)}.`

export const OIL_RELATED_LINK = { label: 'All olive oils →', to: OLIVE_OILS_ROUTE }
