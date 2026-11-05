import type { Site } from '../types'
import { shipCountriesSentence } from './site'

export const shippingFaqAnswer = (site: Pick<Site, 'shipCountries' | 'nonEuShippingYear'>) =>
  `Not yet. We ship to ${shipCountriesSentence(site)}. UK and Switzerland are on our list for ${site.nonEuShippingYear}.`
