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

export interface GrowerQuote {
  text: string
  who: string
  role: string
  facts: string
}

export interface RelatedProduct {
  id: string
  why: string
}

export interface WineDetail {
  story: string
  tags: string[]
  vintages?: Vintage[]
  defaultVintage?: string
  drinkWindow: { label: string; cells: number[] }
  tasting: { nose: string; palate: string; finish: string }
  structure: StructureBar[]
  serve: { temp: string; decant: string; glass: string }
  pairings: { dish: string; kind: string }[]
  vineyard: [string, string][]
  vineyardMap: string
  cellar: [string, string][]
  quote: GrowerQuote & { portrait: string }
  related: RelatedProduct[]
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
  detail: WineDetail
}

export type OilLevel = 'Delicate' | 'Medium' | 'Robust'

export type OilTrait = 'fruit' | 'bitter' | 'pepper'

export interface Photo {
  img: string
  alt: string
  caption: string
}

export interface OilDetail {
  style: string
  story: string
  tags: string[]
  stageFact: { label: string; value: string; text: string }
  traits: Record<OilTrait, string>
  lot: string
  tasting: { nose: string; palate: string; finish: string }
  uses: { dish: string; kind: string }[]
  peroxide: string
  grove: [string, string][]
  grovePhoto: Photo
  quote?: GrowerQuote
  related: RelatedProduct[]
}

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
  detail: OilDetail
}

export type Oil = RawOil & Linked

export type Product = Wine | Oil

export type GalleryShotId = 'front' | 'label' | 'pour' | 'plate'

export interface LabelCopy {
  lines: [string, string]
  size: string
  note: string
  accent?: string
}

export interface GalleryShot {
  id: GalleryShotId
  name: string
  caption: string
  kind: SceneKind
  cue: string
  tone?: string
  text?: string
  labelCopy?: LabelCopy
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

export interface CartState {
  lines: CartLine[]
  saved: CartLine[]
  promo: string | null
  giftNote: string | null
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
  | 'frontlabel'
  | 'pour'
  | 'plate'

export type RawCartItem = Omit<RawWine, 'detail'> | Omit<RawOil, 'detail'> | RawClubPlan

export type CartItem = Omit<Wine, 'detail'> | Omit<Oil, 'detail'> | ClubPlan

export interface CartPricedLine extends CartLine {
  kind: CartItem['kind']
  item: CartItem
  name: string
  meta: string
  unit: number
  total: number
  isWine: boolean
  isClub: boolean
  maxQty: number
  glass: string
}

export interface CartTotals {
  count: number
  wineBottles: number
  subtotal: number
  mixDiscount: number
  promoDiscount: number
  goodsAfter: number
  shipping: number
  total: number
}

export interface Cart {
  lines: CartPricedLine[]
  saved: CartPricedLine[]
  promo: string | null
  giftNote: string | null
  totals: CartTotals
}

export type ShipMethod = 'std' | 'sat' | 'pick'

export interface ShipOption {
  id: ShipMethod
  name: string
  desc: string
  price: number
}

export interface AddCartLineInput {
  id: string
  qty?: number
  option?: string
}

export interface SetCartQtyInput {
  key: string
  qty: number
}

export interface Address {
  street: string
  postcode: string
  city: string
  country: string
  door?: string
}

export interface Account {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string | null
  address: Address | null
}

export interface LoginInput {
  email: string
  password: string
}

export interface SignupInput extends LoginInput {
  firstName: string
  lastName: string
  phone?: string
}

export interface AccountUpdate {
  firstName?: string
  lastName?: string
  phone?: string | null
  address?: Address | null
}

export type PayMethod = 'card' | 'wallet' | 'bank'

export type OrderStatus = 'pending_payment' | 'awaiting_transfer' | 'paid' | 'shipped' | 'cancelled'

export interface PlaceOrderInput {
  details: { first: string; last: string; phone?: string; age: true; news?: boolean }
  ship: ShipMethod
  address?: Address
  pay: PayMethod
}

export type OrderLine = Omit<CartPricedLine, 'maxQty' | 'item' | 'glass'> &
  Partial<Pick<CartPricedLine, 'item' | 'glass'>>

export interface CustomerOrder {
  id: string
  number: string
  status: OrderStatus
  firstName: string
  email: string
  shipName: string
  payName: string
  shipTo: string
  giftNote: string | null
  promo: string | null
  lines: OrderLine[]
  totals: Pick<CartTotals, 'subtotal' | 'mixDiscount' | 'promoDiscount' | 'shipping' | 'total'>
  total: number
  createdAt: string
  paidAt: string | null
}

export type PaymentInstructions =
  | { method: 'stripe'; clientSecret: string }
  | { method: 'bank'; beneficiary: string; iban: string; bic?: string; reference: string; amount: number }
  | { method: 'none' }

export interface PlacedOrder {
  order: CustomerOrder
  payment: PaymentInstructions
}

export interface Site {
  releaseShipDate: string
  nextBoxCloses: string
  street: string
  city: string
  hours: string
  email: string
  shipCountries: string[]
  nonEuShippingYear: string
}

export interface QuizProfile {
  title: string
  text: string
}

export interface Quiz {
  questions: QuizQuestion[]
  profiles: Partial<Record<WineFilterType, QuizProfile>>
}

export interface QuizRecommendation {
  top: WineFilterType
  profile: QuizProfile
  wines: Wine[]
}

export interface VisitRequestInput {
  name: string
  email: string
  date: string
  guests: number
  notes?: string
}

export interface VisitConfirmation {
  id: string
  host: string
  date: string
}

export type NewsletterSource = 'footer' | 'article' | 'checkout'

export interface NewsletterSignup {
  email: string
  source?: NewsletterSource
}

export interface ApiIssue {
  path: string
  message: string
}

export interface NewsletterSubscription {
  subscribed: true
}
