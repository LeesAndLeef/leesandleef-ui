import {
  CLUB_ROUTE,
  GROWERS_ROUTE,
  HOME_ROUTE,
  JOURNALS_ROUTE,
  OLIVE_OILS_ROUTE,
  QUIZ_ROUTE,
  WINES_ROUTE,
} from '../../routes'
export const NAV_LINKS = [
  { to: WINES_ROUTE, label: 'Wine', match: (p: string) => p === WINES_ROUTE || p.startsWith(`${WINES_ROUTE}/`) },
  {
    to: OLIVE_OILS_ROUTE,
    label: 'Olive oil',
    match: (p: string) => p === OLIVE_OILS_ROUTE || p.startsWith(`${OLIVE_OILS_ROUTE}/`),
  },
  { to: GROWERS_ROUTE, label: 'Growers', match: (p: string) => p.startsWith(GROWERS_ROUTE) },
  { to: CLUB_ROUTE, label: 'The Club', match: (p: string) => p === CLUB_ROUTE || p === QUIZ_ROUTE },
  { to: `${HOME_ROUTE}#journal`, label: 'Journal', match: (p: string) => p.startsWith(JOURNALS_ROUTE) },
]
