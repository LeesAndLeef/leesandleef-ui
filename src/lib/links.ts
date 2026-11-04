import { CLUB_ROUTE } from '../routes'
import type { CartItem, RawCartItem, RawClubPlan, RawOil, RawWine } from '../types'
import { oilPath, winePath } from './paths'

export const linkWine = <T extends Pick<RawWine, 'id'>>(wine: T) => ({ ...wine, path: winePath(wine) })

export const linkOil = <T extends Pick<RawOil, 'id'>>(oil: T) => ({ ...oil, path: oilPath(oil) })

export const linkClubPlan = <T extends Pick<RawClubPlan, 'id'>>(plan: T) => ({ ...plan, path: CLUB_ROUTE })

export function linkCartItem(item: RawCartItem): CartItem {
  if (item.kind === 'wine') return linkWine(item)
  if (item.kind === 'oil') return linkOil(item)
  return linkClubPlan(item)
}
