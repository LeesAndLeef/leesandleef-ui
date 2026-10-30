import {
  CLUB_ROUTE,
  GROWERS_ROUTE,
  HOME_ROUTE,
  JOURNALS_ROUTE,
  OLIVE_OILS_ROUTE,
  QUIZ_ROUTE,
  WINES_ROUTE,
} from '../../routes'
import type { NavLink } from './types'

export const NAV_LINKS: NavLink[] = [
  { to: WINES_ROUTE, label: 'Wine', activeOn: { paths: [WINES_ROUTE], prefixes: [`${WINES_ROUTE}/`] } },
  {
    to: OLIVE_OILS_ROUTE,
    label: 'Olive oil',
    activeOn: { paths: [OLIVE_OILS_ROUTE], prefixes: [`${OLIVE_OILS_ROUTE}/`] },
  },
  { to: GROWERS_ROUTE, label: 'Growers', activeOn: { prefixes: [GROWERS_ROUTE] } },
  { to: CLUB_ROUTE, label: 'The Club', activeOn: { paths: [CLUB_ROUTE, QUIZ_ROUTE] } },
  { to: `${HOME_ROUTE}#journal`, label: 'Journal', activeOn: { prefixes: [JOURNALS_ROUTE] } },
]
