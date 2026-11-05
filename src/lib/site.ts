import type { Site } from '../types'

export const shipCountryNames = (site: Pick<Site, 'shipCountries'>) =>
  site.shipCountries.map((c) => c.replace(/^the /, ''))

export const shipCountriesSentence = (site: Pick<Site, 'shipCountries'>) =>
  `${site.shipCountries.slice(0, -1).join(', ')} and ${site.shipCountries.at(-1)}`
