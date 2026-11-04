import type { Grower, RawOil, RawWine } from '../../types'

export interface RawSearchResults {
  wines: RawWine[]
  oils: RawOil[]
  growers: Grower[]
}
