import { COLORS } from '../styles/colors'
import type { LabelCopy, OilLevel, WineType } from '../types'

export const OIL_BACK_LABEL_TITLE = 'Extra virgin olive oil · Croatia'

export const OIL_SET_BACK_LABEL_NOTE = 'Paper box'

export const OIL_SET_FRONT_LABEL_NOTE = 'Tasting set · 3 tins'

export const OIL_POUR_TONES: Record<OilLevel, string> = {
  Delicate: COLORS.tintGolden,
  Medium: COLORS.oilGold,
  Robust: COLORS.oilGreen,
}

export const WINE_BACK_LABEL_LINES: LabelCopy['lines'] = ['Natural wine · Product of Croatia', 'Unfined · Unfiltered']

export const WINE_BACK_LABEL_NOTE = 'Contains sulphites'

export const WINE_POUR_TONES: Partial<Record<WineType, string>> = {
  White: COLORS.tintWhite,
  Orange: COLORS.tintOrange,
  Sparkling: COLORS.tintGolden,
  Dessert: COLORS.tintDeepAmber,
}

export const VINTAGE_YEAR = /\s?\b(?:19|20)\d{2}\b/

export const SHIPPING_FEE = 9.9

export const CART_STORAGE_KEY = 'lees-leaf-cart-v1'

export const MAX_PER_STYLE = 2
