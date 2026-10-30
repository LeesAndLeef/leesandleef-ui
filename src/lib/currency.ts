import { DEFAULT_CURRENCY, DEFAULT_LOCALE } from '../constants'

const wholeAmount = new Intl.NumberFormat(DEFAULT_LOCALE, {
  style: 'currency',
  currency: DEFAULT_CURRENCY,
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})

const exactAmount = new Intl.NumberFormat(DEFAULT_LOCALE, {
  style: 'currency',
  currency: DEFAULT_CURRENCY,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export const formatCurrency = (amount: number, { cents = false }: { cents?: boolean } = {}) =>
  (cents ? exactAmount : wholeAmount).format(amount)
