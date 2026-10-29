import { getOil } from '../../lib/oil'
import { getWine, wines } from '../../lib/wine'

const RELEASE_IDS = ['teran-crvena-zemlja', 'malvazija-sedam-dana', 'grasevina-pet-nat-pjena', 'plavac-mali-brijeg']

export const RELEASE = RELEASE_IDS.flatMap((id) => getWine(id) ?? [])

export const LISTED_COUNT = wines.filter((w) => !w.unlisted).length

export const PRINCIPLES = [
  ['Hand-harvested only', 'No machine picking, ever.'],
  ['Native yeast', 'Fermented with what lives on the skins.'],
  ['≤ 30 mg/L SO₂', 'Total sulphites, tested by lab.'],
  ['Paid before bottling', 'Growers never carry our risk.'],
]

export const HOME_OILS = ['buza-grove-14', 'istarska-bjelica', 'oblica-island-blend'].flatMap((id) => getOil(id) ?? [])

export const REGIONS = ['Istria', 'Kvarner', 'Dalmatia', 'Pelješac', 'Slavonia', 'Moslavina']

export const SHIPPING = [
  ['Order by Thursday', 'We pack once a week, so wine rests as little as possible in transit.'],
  ['Packed in paper pulp', 'No plastic, no foam. Boxes are recyclable and bottle-tested to 1.2 m drops.'],
  ['Temperature-aware', 'Shipping pauses above 28 °C; we email you before holding an order.'],
  ['Corked? Replaced.', 'Send a photo of the cork within 30 days — no need to return the bottle.'],
]
