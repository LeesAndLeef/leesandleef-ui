import type { Grower, Oil, So2, Wine, WineExtra } from '../types'

export interface SearchResults {
  wines: Wine[]
  oils: Oil[]
  growers: Grower[]
}

export interface OilLabResult {
  measure: string
  value: string
  reference: string
}

export interface NavMatch {
  paths?: string[]
  prefixes?: string[]
}

export interface TextSegment {
  text: string
  italic: boolean
}

export interface WineFilterInput {
  query: string
  regions: string[]
  grapes: string[]
  priceFrom: string
  priceTo: string
  so2: So2
  extras: WineExtra[]
}
