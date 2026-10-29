import { site } from '../../lib/site'
import type { Pay } from './types'

export const PAY_NAMES: Record<Pay, string> = { card: 'Card', wallet: 'Apple / Google Pay', bank: 'Bank transfer' }

export const COUNTRIES = site.shipCountries.map((c) => c.replace(/^the /, ''))

export const STEP_LABELS = ['Details', 'Delivery', 'Payment', 'Review']
