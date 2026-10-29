import type { OIL_SIZES } from './constants'

export type WineFilterType = 'Red' | 'White' | 'Orange' | 'Rosé' | 'Sparkling'
export type WineType = WineFilterType | 'Dessert'
export type WineSort = 'newest' | 'price-asc' | 'price-desc' | 'left'
export type WineLayout = 'grid' | 'list'

export interface Vintage {
  year: string
  price: number
  info: string
}

export interface StructureBar {
  label: string
  value: number
  word: string
}

export interface WineDetail {
  story: string
  tags: string[]
  vintages?: Vintage[]
  defaultVintage?: string
  drinkWindow?: { label: string; cells: number[] }
  tasting: { nose: string; palate: string; finish: string }
  structure: StructureBar[]
  serve: { temp: string; decant: string; glass: string }
  pairings: { dish: string; kind: string }[]
  vineyard: [string, string][]
  vineyardMap?: string
  cellar: [string, string][]
  quote?: { text: string; who: string; role: string; portrait: string; facts: string }
  related: { id: string; why: string }[]
}

interface BaseProduct {
  id: string
  name: string
  growerId?: string
  growerName?: string
  region: string
  price: number
  left?: number
  glass: string
  cap: string
  note: string
}

interface Linked {
  path: string
}

export interface RawWine extends BaseProduct {
  kind: 'wine'
  type: WineType
  grape: string
  abv: string
  volume?: string
  homeNote?: string
  badge?: string
  releaseRank: number
  unlisted?: boolean
  so2: number
  so2Added: boolean
  vegan: boolean
  amphora: boolean
  magnum: boolean
  detail?: WineDetail
}

export type OilLevel = 'Delicate' | 'Medium' | 'Robust'

export type Wine = RawWine & Linked

export type OilSize = (typeof OIL_SIZES)[number]['id']

export interface RawOil extends BaseProduct {
  kind: 'oil'
  cultivar: string
  origin: string
  level: OilLevel
  bitter: number
  pepper: number
  fruit: number
  poly: string
  acid: string
  harvest: string
  limited?: boolean
  set?: { was: number; contents: string }
}

export type Oil = RawOil & Linked

export type Product = Wine | Oil

export type GalleryShotId = 'label' | 'field' | 'cellar'

export interface GalleryShot {
  id: GalleryShotId
  name: string
  kind: SceneKind
  cue: string
  caption: string
}

export interface ProductPerk {
  label: string
  text: string
}

export type Freq = 'season' | 'month'

export interface RawClubPlan {
  kind: 'club'
  id: string
  name: string
  tag: string
  bottles: number
  featured?: boolean
  price: Record<Freq, number>
  desc: string
  perks: string[]
}

export type ClubPlan = RawClubPlan & Linked

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

export interface Order {
  number: string
  firstName: string
  email: string
  shipName: string
  payName: string
  total: number
  lines: PricedLine[]
}

export interface GrowerMonth {
  name: string
  short: string
  phase: string
  intensity: number
  text: string
  vine: string
  cellar: string
  hands: string
  food: string
}

export type PlotTone = 'wine' | 'olive' | 'dark' | 'dashed'

export interface Plot {
  name: string
  grape: string
  soil: string
  size: string
  planted: string
  map: { label?: string; x: number; y: number; w: number; h: number; tone: PlotTone }
}

export interface GrowerProfile {
  heroPhoto: string
  heroImg: string
  facts: [string, string][]
  storyTitle: string
  story: string[]
  pullQuote: string
  pullQuoteBy: string
  photos: { img: string; alt: string; caption: string }[]
  checklist: { text: string; done: boolean }[]
  yearLabel: string
  year: GrowerMonth[]
  defaultMonth: number
  plotsTitle: string
  plotsIntro?: string
  plots: Plot[]
  landmark: { label: string; x: number; y: number; w: number; h: number }
  mapLegend: [string, string]
  winesTitle: string
  visit?: { title: string; host: string; intro: string; formTitle: string; rows: [string, string][] }
}

export interface Grower {
  id: string
  name: string
  shortName: string
  place: string
  region: string
  who: string
  people: string
  ha: string
  since: string
  grapes: string[]
  tone: string
  quote: string
  portrait?: string
  profile?: GrowerProfile
}

export type ArticleSlug = 'terroir' | 'skin-contact' | 'olive-oil'

export interface Article {
  slug: ArticleSlug
  no: number
  tag: string
  read: string
  title: string
  lede: string
  dek: string
  img: string
  alt: string
  caption: string
  pattern: 'hatch' | 'hatch-w'
  author: string
  authorImg: string
  date: string
  toc: { id: string; title: string }[]
  short: string[]
  productsTitle: string
  products: { id: string; note: string }[]
}

export interface QuizAnswer {
  label: string
  styles: Partial<Record<WineFilterType, number>>
  bold?: number
}

export interface QuizQuestion {
  q: string
  answers: QuizAnswer[]
}

export type SceneKind =
  | 'landscape'
  | 'grove'
  | 'soil'
  | 'amphora'
  | 'casks'
  | 'vat'
  | 'press'
  | 'crates'
  | 'walls'
  | 'leaves'
  | 'rack'
  | 'portrait'
  | 'map'
  | 'backlabel'
