import { DEFAULT_OIL_SIZE, FREE_SHIPPING_FROM, FREQ_LABEL, MIX_SIX } from '../../constants'
import { clubPlans } from '../../lib/clubPlans'
import { oilPrice, oilSize } from '../../lib/oil'
import { getProductById } from '../../lib/products'
import { COLORS } from '../../styles/colors'
import type { CartLine, ClubPlan, Freq, PricedLine, Product } from '../../types'
import { MIX_DISCOUNT_RATE, PROMO_CODES, SHIPPING_FEE } from './constants'

export const oilOption = (size: string) => (size === DEFAULT_OIL_SIZE ? undefined : size)

export const lineKey = (id: string, option?: string) => (option ? `${id}@${option}` : id)

export function findItem(id: string): Product | ClubPlan | undefined {
  return getProductById(id) ?? clubPlans.find((p) => p.id === id)
}

export function priceLine(line: CartLine): PricedLine | null {
  const item = findItem(line.id)
  if (!item) return null

  if (item.kind === 'club') {
    const freq = (line.option as Freq) ?? 'season'
    const unit = item.price[freq]
    return {
      ...line,
      item,
      name: `The Club — ${item.name}`,
      meta: `${item.bottles} bottles · ${FREQ_LABEL[freq]} · delivery included`,
      unit,
      total: unit * line.qty,
      isWine: false,
      isClub: true,
      maxQty: 1,
      glass: COLORS.wine,
    }
  }

  const vintage = item.kind === 'wine' ? item.detail?.vintages?.find((v) => v.year === line.option) : undefined
  const unit = item.kind === 'oil' ? oilPrice(item, line.option) : (vintage?.price ?? item.price)
  const name = vintage ? item.name.replace(/\d{4}$/, vintage.year) : item.name
  const meta =
    item.kind === 'wine'
      ? `${item.type} · ${item.region} · ${item.volume ?? '750 ml'}`
      : item.set
        ? `Tasting set · ${item.set.contents}`
        : `Olive oil · ${oilSize(line.option).name}`
  return {
    ...line,
    item,
    name,
    meta,
    unit,
    total: unit * line.qty,
    isWine: item.kind === 'wine',
    isClub: false,
    maxQty: 24,
    glass: item.glass,
  }
}

const round = (n: number) => Math.round(n * 100) / 100

export function computeTotals(lines: PricedLine[], promo: string | null) {
  const sum = (ls: PricedLine[]) => ls.reduce((a, l) => a + l.total, 0)
  const wines = lines.filter((l) => l.isWine)
  const goods = lines.filter((l) => !l.isClub)
  const club = lines.filter((l) => l.isClub)

  const count = lines.reduce((a, l) => a + l.qty, 0)
  const wineBottles = wines.reduce((a, l) => a + l.qty, 0)
  const goodsSum = sum(goods)
  const clubSum = sum(club)
  const subtotal = goodsSum + clubSum

  const mixDiscount = wineBottles >= MIX_SIX ? round(sum(wines) * MIX_DISCOUNT_RATE) : 0
  const promoRate = promo ? (PROMO_CODES[promo] ?? 0) : 0
  const promoDiscount = round((goodsSum - mixDiscount) * promoRate)
  const goodsAfter = round(goodsSum - mixDiscount - promoDiscount)

  const shipping = goodsSum === 0 || goodsAfter >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FEE

  return {
    count,
    wineBottles,
    subtotal,
    mixDiscount,
    promoDiscount,
    goodsAfter,
    shipping,
    total: round(goodsAfter + clubSum + shipping),
  }
}

export const eur = (n: number) => '€' + n.toFixed(2)
