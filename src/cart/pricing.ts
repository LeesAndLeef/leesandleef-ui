import { type ClubPlan, clubPlans, type Freq, freqLabel } from '../data/club'
import { DEFAULT_OIL_SIZE, getProduct, oilPrice, oilSize, type Product } from '../data/products'

export interface CartLine {
  key: string
  id: string
  option?: string
  qty: number
}

export interface PricedLine extends CartLine {
  item: Product | ClubPlan
  name: string
  meta: string
  unit: number
  total: number
  isWine: boolean
  isClub: boolean
  maxQty: number
  glass: string
}

export const FREE_SHIPPING_FROM = 120
export const SHIPPING_FEE = 9.9
export const MIX_SIX = 6
export const oilOption = (size: string) => (size === DEFAULT_OIL_SIZE ? undefined : size)
export const PROMO_CODES: Record<string, number> = { HARVEST10: 0.1 }

export const lineKey = (id: string, option?: string) => (option ? `${id}@${option}` : id)

export function findItem(id: string): Product | ClubPlan | undefined {
  return getProduct(id) ?? clubPlans.find((p) => p.id === id)
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
      meta: `${item.bottles} bottles · ${freqLabel[freq]} · delivery included`,
      unit,
      total: unit * line.qty,
      isWine: false,
      isClub: true,
      maxQty: 1,
      glass: '#6E1C2B',
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

  const mixDiscount = wineBottles >= MIX_SIX ? round(sum(wines) * 0.1) : 0
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

export type Totals = ReturnType<typeof computeTotals>

export const eur = (n: number) => '€' + n.toFixed(2)
