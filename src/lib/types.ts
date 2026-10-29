import type { Grower, Oil, Wine } from '../types'

export interface SearchResults {
  wines: Wine[]
  oils: Oil[]
  growers: Grower[]
}
