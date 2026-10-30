import type { Grower, Oil, Wine } from '../types'

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
