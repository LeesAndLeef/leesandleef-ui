import type { SearchResults } from './types'

const plural = (count: number, noun: string) => `${count} ${noun}${count === 1 ? '' : 's'}`

export function searchSummary({ wines, oils, growers }: SearchResults) {
  const parts = [
    wines.length > 0 && plural(wines.length, 'wine'),
    oils.length > 0 && plural(oils.length, 'olive oil'),
    growers.length > 0 && plural(growers.length, 'grower'),
  ].filter(Boolean)
  return parts.length ? parts.join(' · ') : 'No matches'
}
