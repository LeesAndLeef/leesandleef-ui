import type { OilLevel, OilSize } from '../../types'

export const STAGE_TIN_SIZES: Record<OilSize, { width: number; height: number }> = {
  '250': { width: 200, height: 333 },
  '500': { width: 250, height: 417 },
  '3000': { width: 300, height: 500 },
}

export const PROMISES = [
  ['Hand-picked', 'Nets and rakes, no shakers.'],
  ['Pressed in 4 h', 'From tree to mill the same day.'],
  ['Cold-extracted', 'Kept below 27 °C at the mill.'],
  ['Lab-tested', 'Acidity & polyphenols on every lot.'],
]

export const PAIRINGS: { level: OilLevel; dots: number; text: string; dishes: string[] }[] = [
  {
    level: 'Delicate',
    dots: 1,
    text: 'Soft, ripe, buttery. Little bitterness, a gentle finish. Leccino, Oblica.',
    dishes: ['White fish & shellfish', 'Baking, cakes, mayonnaise', 'Delicate leaves, burrata'],
  },
  {
    level: 'Medium',
    dots: 2,
    text: 'Grassy, almond, balanced bitterness. The everyday bottle. Buža, Levantinka.',
    dishes: ['Roast vegetables & pasta', 'Tomato salad, fresh cheese', 'Finishing soups and risotto'],
  },
  {
    level: 'Robust',
    dots: 3,
    text: 'Intensely green, bitter, makes you cough. Early harvest. Istarska Bjelica, Rosinjola.',
    dishes: ['Bread, just bread, and salt', 'Grilled steak, lamb, bean stews', 'Bitter greens, chard, rocket'],
  },
]

export const HARVEST_DAY = [
  ['07:00', 'Nets down, picking', 'Nets under the trees, olives combed off by hand rakes.'],
  ['11:00', 'Crates to the mill', 'Shallow crates, never sacks, so the fruit doesn’t bruise.'],
  ['12:30', 'Wash, crush, malax', 'Paste is mixed slowly, kept below 27 °C.'],
  ['14:00', 'First oil', 'Centrifuge separates oil from water. It runs bright green.'],
  ['Week 4', 'Settled & tinned', 'Rested under nitrogen, then filled into dark tins and glass.'],
]

export const CULTIVARS: [string, string, string, OilLevel][] = [
  ['Istarska Bjelica', 'Istria', 'Tomato leaf, rocket, black pepper', 'Robust'],
  ['Rosinjola', 'Istria', 'Green apple, artichoke, chicory', 'Robust'],
  ['Buža', 'Istria', 'Cut grass, green almond', 'Medium'],
  ['Levantinka', 'Dalmatian islands', 'Herbs, green banana, mild pepper', 'Medium'],
  ['Oblica', 'Dalmatia', 'Ripe olive, butter, a little apple', 'Delicate'],
  ['Leccino', 'Istria (Italian origin)', 'Soft, sweet almond, mild', 'Delicate'],
]

export const STORAGE = [
  ['Dark', 'Light breaks oil down fast. Keep it in the tin or a dark bottle, in a cupboard.'],
  ['Cool', 'Not next to the stove. Room temperature is fine; the fridge makes it cloudy.'],
  ['Closed', 'Air is the third enemy. Cap it after every pour; decant big tins into a small bottle.'],
  ['Soon', 'Once open, finish within about two months. Oil is for using, not saving.'],
]

export const SET_ID = 'oil-tasting-set'
