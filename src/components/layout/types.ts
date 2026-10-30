import type { NavMatch } from '../../lib/types'

export interface NavLink {
  to: string
  label: string
  activeOn: NavMatch
}
