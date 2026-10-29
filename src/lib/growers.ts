import { growers } from '../data/growers'
import type { Grower } from '../types'

export { growers }

export function getGrower(id: string | undefined): Grower | undefined {
  return growers.find((g) => g.id === id)
}
