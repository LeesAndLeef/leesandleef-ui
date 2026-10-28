export type ShopWineType = 'Red' | 'White' | 'Orange' | 'Rosé' | 'Sparkling'
export type WineType = ShopWineType | 'Dessert'

export interface Vintage {
  year: string
  price: number
  info: string
}

export interface StructureBar {
  label: string
  value: number
  word: string
}

export interface WineDetail {
  story: string
  tags: string[]
  vintages?: Vintage[]
  defaultVintage?: string
  drinkWindow?: { label: string; cells: number[] }
  tasting: { nose: string; palate: string; finish: string }
  structure: StructureBar[]
  serve: { temp: string; decant: string; glass: string }
  pairings: { dish: string; kind: string }[]
  vineyard: [string, string][]
  vineyardMap?: string
  cellar: [string, string][]
  quote?: { text: string; who: string; role: string; portrait: string; facts: string }
  related: { id: string; why: string }[]
}

interface BaseProduct {
  id: string
  name: string
  growerId?: string
  growerName?: string
  region: string
  price: number
  left?: number
  glass: string
  cap: string
  note: string
}

export interface Wine extends BaseProduct {
  kind: 'wine'
  type: WineType
  grape: string
  abv: string
  volume?: string
  homeNote?: string
  badge?: string
  releaseRank: number
  unlisted?: boolean
  so2: number
  so2Added: boolean
  vegan: boolean
  amphora: boolean
  magnum: boolean
  detail?: WineDetail
}

export type OilLevel = 'Delicate' | 'Medium' | 'Robust'

export interface Oil extends BaseProduct {
  kind: 'oil'
  cultivar: string
  origin: string
  level: OilLevel
  bitter: number
  pepper: number
  fruit: number
  poly: string
  acid: string
  harvest: string
  limited?: boolean
  set?: { was: number; contents: string }
}

export type Product = Wine | Oil

export const wines: Wine[] = [
  {
    kind: 'wine',
    id: 'teran-crvena-zemlja',
    name: 'Teran “Crvena Zemlja” 2023',
    growerId: 'vina-brajko',
    growerName: 'Vina Brajko',
    grape: 'Teran',
    region: 'Istria',
    type: 'Red',
    abv: '12.5%',
    price: 24,
    left: 118,
    glass: '#1E0A10',
    cap: '#6E1C2B',
    badge: 'Staff pick',
    releaseRank: 1,
    so2: 18,
    so2Added: true,
    vegan: true,
    amphora: false,
    magnum: true,
    note: 'Sour cherry, iron, wild fennel. Bright and grippy.',
    homeNote: 'Sour cherry, iron, wild fennel. Bright acid that wants grilled meat.',
    detail: {
      story:
        '“Crvena zemlja” means red earth. Ana Brajko’s Teran grows on a single south-facing terrace of iron-rich terra rossa beneath the walls of Motovun. Destemmed by hand, nine days on skins, then eleven months in old 500 L Slavonian oak. Unfined, unfiltered, a whisper of sulphur at bottling.',
      tags: ['Organic, uncertified', 'Vegan', 'Wild ferment', '18 mg/L total SO₂'],
      vintages: [
        { year: '2022', price: 26, info: '€26 · 12 left' },
        { year: '2023', price: 24, info: '€24 · 118 left' },
        { year: '2024', price: 23, info: 'Pre-order · Mar' },
      ],
      defaultVintage: '2023',
      drinkWindow: { label: 'Best 2025 – 2029', cells: [0, 2, 2, 2, 2, 1, 0, 0] },
      tasting: {
        nose: 'Sour cherry and pomegranate first, then wet red clay, crushed fennel seed and a hint of smoked paprika as it opens.',
        palate:
          'Medium-bodied and juicy, with Teran’s signature high acidity. Fine, slightly dusty tannins and a ferrous, almost blood-orange tang.',
        finish:
          'Long and savoury. Bitter cherry pit, black pepper, a salty edge. Better on day two — recork and keep it in the fridge.',
      },
      structure: [
        { label: 'Body', value: 5, word: 'Medium' },
        { label: 'Acidity', value: 9, word: 'High' },
        { label: 'Tannin', value: 6, word: 'Fine' },
        { label: 'Fruit', value: 7, word: 'Red' },
        { label: 'Funk', value: 2, word: 'Clean' },
      ],
      serve: { temp: '14–16°', decant: '30 min', glass: 'Burgundy' },
      pairings: [
        { dish: 'Istrian pršut & aged cheese', kind: 'Classic' },
        { dish: 'Fuži with game ragù', kind: 'Local' },
        { dish: 'Grilled lamb, rosemary, charred peppers', kind: 'Weekend' },
        { dish: 'Mushroom & beetroot tart', kind: 'Veggie' },
      ],
      vineyard: [
        ['Plot', 'Brdo pod zidinama, single terrace'],
        ['Soil', 'Terra rossa over limestone, 40–80 cm deep'],
        ['Altitude', '230 m, south-facing'],
        ['Vine age', 'Planted 1974 and 1998'],
        ['Farming', 'Organic practice, cover crops, no herbicides'],
        ['Harvest', 'By hand, 2–4 October 2023, 15 kg crates'],
      ],
      vineyardMap: 'plot outline over Motovun hill',
      cellar: [
        ['Ferment', 'Native yeast, open-top steel, 9 days on skins, punch-downs twice daily'],
        ['Ageing', '11 months in used 500 L Slavonian oak'],
        ['Fining', 'None — vegan'],
        ['Filtration', 'None; settled by gravity, racked twice'],
        ['Total SO₂', '18 mg/L (lab report available)'],
        ['Production', '2,140 bottles · 60 magnums'],
        ['Closure', 'Natural cork, wax-free'],
      ],
      quote: {
        text: '2023 was a nervous year — hail in June, then a perfect September. We lost a third of the crop, but what was left had the thickest skins I’ve seen. That’s the iron you taste.',
        who: 'Ana Brajko',
        role: 'Winemaker, Motovun',
        portrait: 'Ana Brajko, harvest 2023',
        facts: '3.2 ha · 3rd generation',
      },
      related: [
        { id: 'babic-kamenjar', why: 'Same grip, darker fruit' },
        { id: 'plavac-mali-brijeg', why: 'For a bigger night' },
        { id: 'opolo-svila', why: 'Chillable cousin' },
        { id: 'buza-grove-14', why: 'Same hillside, same cellar' },
      ],
    },
  },
  {
    kind: 'wine',
    id: 'malvazija-sedam-dana',
    name: 'Malvazija “Sedam Dana” 2023',
    growerId: 'obitelj-radic',
    growerName: 'Obitelj Radić',
    grape: 'Malvazija',
    region: 'Istria',
    type: 'Orange',
    abv: '12%',
    price: 27,
    left: 64,
    glass: '#A2562A',
    cap: '#EFECE3',
    badge: '7 days skin',
    releaseRank: 2,
    so2: 12,
    so2Added: true,
    vegan: true,
    amphora: false,
    magnum: false,
    note: 'Apricot skin, chamomile, a fine tannic grip.',
    homeNote: 'Apricot skin, chamomile and a fine tannic grip. Serve cellar-cool.',
  },
  {
    kind: 'wine',
    id: 'plavac-mali-brijeg',
    name: 'Plavac Mali “Brijeg” 2021',
    growerId: 'podrum-kos',
    growerName: 'Podrum Kos',
    grape: 'Plavac Mali',
    region: 'Pelješac',
    type: 'Red',
    abv: '14%',
    price: 31,
    left: 22,
    glass: '#2A0E16',
    cap: '#A9AD7A',
    badge: '420 bottles',
    releaseRank: 4,
    so2: 24,
    so2Added: true,
    vegan: false,
    amphora: false,
    magnum: true,
    note: 'Dried fig, carob and sea salt. Long finish.',
    homeNote: 'Dried fig, carob and sea salt. Steep slopes, low yields, long finish.',
  },
  {
    kind: 'wine',
    id: 'grasevina-pet-nat-pjena',
    name: 'Graševina Pét-Nat “Pjena” 2024',
    growerId: 'tri-bure',
    growerName: 'Tri Bure',
    grape: 'Graševina',
    region: 'Slavonia',
    type: 'Sparkling',
    abv: '11%',
    price: 19,
    left: 210,
    glass: '#6B733A',
    cap: '#1B1D14',
    badge: 'New',
    releaseRank: 3,
    so2: 6,
    so2Added: false,
    vegan: true,
    amphora: false,
    magnum: false,
    note: 'Cloudy, crunchy, green apple. Crown cap.',
    homeNote: 'Cloudy, crunchy, green apple. Crown cap — open it like a beer.',
  },
  {
    kind: 'wine',
    id: 'posip-kamen',
    name: 'Pošip “Kamen” 2023',
    growerId: 'stari-brijeg',
    growerName: 'Stari Brijeg',
    grape: 'Pošip',
    region: 'Korčula',
    type: 'White',
    abv: '13%',
    price: 22,
    left: 95,
    glass: '#A9AD7A',
    cap: '#6E1C2B',
    releaseRank: 5,
    so2: 22,
    so2Added: true,
    vegan: false,
    amphora: false,
    magnum: false,
    note: 'Lemon pith, salted almond, warm stone.',
  },
  {
    kind: 'wine',
    id: 'zlahtina-bura',
    name: 'Žlahtina “Bura” 2024',
    growerId: 'vina-lucic',
    growerName: 'Vina Lučić',
    grape: 'Žlahtina',
    region: 'Krk',
    type: 'White',
    abv: '11.5%',
    price: 17,
    left: 140,
    glass: '#C9C48A',
    cap: '#6E1C2B',
    releaseRank: 6,
    so2: 20,
    so2Added: true,
    vegan: true,
    amphora: false,
    magnum: false,
    note: 'Wind-blown, saline, pear and white flowers.',
  },
  {
    kind: 'wine',
    id: 'opolo-svila',
    name: 'Opolo “Svila” 2024',
    growerId: 'podrum-kos',
    growerName: 'Podrum Kos',
    grape: 'Plavac Mali',
    region: 'Dalmatia',
    type: 'Rosé',
    abv: '12%',
    price: 18,
    left: 76,
    glass: '#C98A93',
    cap: '#6E1C2B',
    releaseRank: 7,
    so2: 15,
    so2Added: true,
    vegan: true,
    amphora: false,
    magnum: false,
    note: 'Wild strawberry, blood orange, chalky dry.',
  },
  {
    kind: 'wine',
    id: 'babic-kamenjar',
    name: 'Babić “Kamenjar” 2022',
    growerId: 'stari-brijeg',
    growerName: 'Stari Brijeg',
    grape: 'Babić',
    region: 'Primošten',
    type: 'Red',
    abv: '13.5%',
    price: 28,
    left: 41,
    glass: '#2A0E16',
    cap: '#EFECE3',
    releaseRank: 8,
    so2: 26,
    so2Added: true,
    vegan: false,
    amphora: false,
    magnum: true,
    note: 'Black olive, plum, garrigue. Stone-wall terraces.',
  },
  {
    kind: 'wine',
    id: 'skrlet-mahovina',
    name: 'Škrlet “Mahovina” 2023',
    growerId: 'tri-bure',
    growerName: 'Tri Bure',
    grape: 'Škrlet',
    region: 'Moslavina',
    type: 'White',
    abv: '11%',
    price: 16,
    left: 180,
    glass: '#A9AD7A',
    cap: '#1B1D14',
    releaseRank: 9,
    so2: 9,
    so2Added: true,
    vegan: true,
    amphora: false,
    magnum: false,
    note: 'Green herbs, quince, low alcohol lunch wine.',
  },
  {
    kind: 'wine',
    id: 'malvazija-amfora',
    name: 'Malvazija “Amfora” 2021',
    growerId: 'obitelj-radic',
    growerName: 'Obitelj Radić',
    grape: 'Malvazija',
    region: 'Istria',
    type: 'Orange',
    abv: '13%',
    price: 42,
    left: 18,
    glass: '#8A4421',
    cap: '#6E1C2B',
    releaseRank: 10,
    so2: 4,
    so2Added: false,
    vegan: true,
    amphora: true,
    magnum: true,
    note: '6 months in buried clay. Honeycomb and tea.',
  },
  {
    kind: 'wine',
    id: 'crljenak-kastela',
    name: 'Crljenak “Kaštela” 2022',
    growerId: 'vina-lucic',
    growerName: 'Vina Lučić',
    grape: 'Crljenak',
    region: 'Dalmatia',
    type: 'Red',
    abv: '14%',
    price: 34,
    left: 33,
    glass: '#1E0A10',
    cap: '#A9AD7A',
    releaseRank: 11,
    so2: 28,
    so2Added: true,
    vegan: false,
    amphora: false,
    magnum: false,
    note: 'The original Zinfandel. Bramble and pepper.',
  },
  {
    kind: 'wine',
    id: 'muskat-zlatna',
    name: 'Muškat “Zlatna” 2023',
    growerId: 'vina-brajko',
    growerName: 'Vina Brajko',
    grape: 'Muškat Momjanski',
    region: 'Istria',
    type: 'White',
    abv: '12%',
    price: 21,
    left: 88,
    glass: '#C9C48A',
    cap: '#6E1C2B',
    releaseRank: 12,
    so2: 14,
    so2Added: true,
    vegan: true,
    amphora: false,
    magnum: false,
    note: 'Bone-dry muscat. Elderflower and orange zest.',
  },
  {
    kind: 'wine',
    id: 'malvazija-bijela',
    name: 'Malvazija “Bijela” 2024',
    growerId: 'vina-brajko',
    growerName: 'Vina Brajko',
    grape: 'Malvazija',
    region: 'Istria',
    type: 'White',
    abv: '12%',
    price: 21,
    glass: '#A9AD7A',
    cap: '#6E1C2B',
    releaseRank: 13,
    unlisted: true,
    so2: 16,
    so2Added: true,
    vegan: true,
    amphora: false,
    magnum: false,
    note: 'Pear, acacia, salty finish. Stainless steel, 5 months on lees.',
  },
  {
    kind: 'wine',
    id: 'muskat-pod-crkvom',
    name: 'Muškat “Pod crkvom” 2023',
    growerId: 'obitelj-radic',
    growerName: 'Obitelj Radić',
    grape: 'Muškat Momjanski',
    region: 'Istria',
    type: 'White',
    abv: '12%',
    price: 23,
    left: 58,
    glass: '#C9C48A',
    cap: '#6E1C2B',
    releaseRank: 14,
    unlisted: true,
    so2: 17,
    so2Added: true,
    vegan: true,
    amphora: false,
    magnum: false,
    note: 'Dry Muškat Momjanski. Rose petal, sage and lime.',
  },
  {
    kind: 'wine',
    id: 'grasevina-les',
    name: 'Graševina “Les” 2023',
    growerId: 'tri-bure',
    growerName: 'Tri Bure',
    grape: 'Graševina',
    region: 'Slavonia',
    type: 'White',
    abv: '12.5%',
    price: 18,
    left: 90,
    glass: '#C9C48A',
    cap: '#3F4622',
    releaseRank: 15,
    unlisted: true,
    so2: 19,
    so2Added: true,
    vegan: true,
    amphora: false,
    magnum: false,
    note: 'Still Graševina from loess. Almond, pear and a bitter twist.',
  },
  {
    kind: 'wine',
    id: 'plavac-mali-gornji',
    name: 'Plavac Mali “Gornji” 2022',
    growerId: 'podrum-kos',
    growerName: 'Podrum Kos',
    grape: 'Plavac Mali',
    region: 'Dalmatia',
    type: 'Red',
    abv: '13.5%',
    price: 22,
    left: 120,
    glass: '#1E0A10',
    cap: '#6E1C2B',
    releaseRank: 16,
    unlisted: true,
    so2: 21,
    so2Added: true,
    vegan: false,
    amphora: false,
    magnum: false,
    note: 'Fresher, from the upper terrace. Plum, bay leaf, fine tannin.',
  },
  {
    kind: 'wine',
    id: 'prosek-strpljenje',
    name: 'Prošek “Strpljenje” 2015 · 375 ml',
    growerId: 'stari-brijeg',
    growerName: 'Stari Brijeg',
    grape: 'Babić',
    region: 'Dalmatia',
    type: 'Dessert',
    abv: '15%',
    volume: '375 ml',
    price: 38,
    left: 40,
    glass: '#4E1220',
    cap: '#A9AD7A',
    releaseRank: 17,
    unlisted: true,
    so2: 25,
    so2Added: true,
    vegan: true,
    amphora: false,
    magnum: false,
    note: 'Sun-dried Babić. Fig, raisin, coffee — and patience.',
  },
  {
    kind: 'wine',
    id: 'zlahtina-pjena-mora',
    name: 'Žlahtina Brut Nature “Pjena mora”',
    growerId: 'vina-lucic',
    growerName: 'Vina Lučić',
    grape: 'Žlahtina',
    region: 'Kvarner',
    type: 'Sparkling',
    abv: '12%',
    price: 26,
    left: 72,
    glass: '#6B733A',
    cap: '#EFECE3',
    releaseRank: 18,
    unlisted: true,
    so2: 8,
    so2Added: true,
    vegan: true,
    amphora: false,
    magnum: false,
    note: 'Traditional method, 30 months on lees. Lemon, brioche, sea spray.',
  },
]

export const oils: Oil[] = [
  {
    kind: 'oil',
    id: 'istarska-bjelica',
    name: 'Istarska Bjelica',
    growerId: 'vina-brajko',
    growerName: 'Vina Brajko',
    region: 'Istria',
    origin: 'Motovun, Istria',
    price: 26,
    glass: '#262A16',
    cap: '#6E1C2B',
    cultivar: 'Istarska Bjelica',
    level: 'Robust',
    bitter: 5,
    pepper: 4,
    fruit: 3,
    poly: '780 mg/kg',
    acid: '0.15%',
    harvest: 'Oct 2025',
    note: 'Intensely bitter in the best way — tomato leaf, rocket, black pepper.',
  },
  {
    kind: 'oil',
    id: 'rosinjola-early-harvest',
    name: 'Rosinjola — Early Harvest',
    growerId: 'obitelj-radic',
    growerName: 'Obitelj Radić',
    region: 'Istria',
    origin: 'Momjan, Istria',
    price: 28,
    glass: '#3F4622',
    cap: '#6E1C2B',
    cultivar: 'Rosinjola',
    level: 'Robust',
    bitter: 4,
    pepper: 5,
    fruit: 4,
    poly: '690 mg/kg',
    acid: '0.16%',
    harvest: 'Oct 2025',
    limited: true,
    note: 'Picked green in early October. Green apple, artichoke and a long, spicy finish.',
  },
  {
    kind: 'oil',
    id: 'buza-grove-14',
    name: 'Buža — Grove 14',
    growerId: 'vina-brajko',
    growerName: 'Vina Brajko',
    region: 'Istria',
    origin: 'Motovun, Istria',
    price: 22,
    left: 300,
    glass: '#6B733A',
    cap: '#1B1D14',
    cultivar: 'Buža',
    level: 'Medium',
    bitter: 3,
    pepper: 3,
    fruit: 4,
    poly: '612 mg/kg',
    acid: '0.18%',
    harvest: 'Oct 2025',
    note: 'Green almond, artichoke and a peppery finish. Our everyday finishing oil.',
  },
  {
    kind: 'oil',
    id: 'levantinka-solta',
    name: 'Levantinka — Šolta',
    growerName: 'Uljara Grohote',
    region: 'Dalmatia',
    origin: 'Šolta, Dalmatia',
    price: 21,
    glass: '#A9AD7A',
    cap: '#6E1C2B',
    cultivar: 'Levantinka',
    level: 'Medium',
    bitter: 3,
    pepper: 3,
    fruit: 3,
    poly: '520 mg/kg',
    acid: '0.20%',
    harvest: 'Nov 2025',
    note: 'Wild herbs and green banana, from stone-walled terraces on the island.',
  },
  {
    kind: 'oil',
    id: 'oblica-island-blend',
    name: 'Oblica — Island Blend',
    growerName: 'Uljara Grohote',
    region: 'Dalmatia',
    origin: 'Dalmatia',
    price: 19,
    glass: '#C9C48A',
    cap: '#3F4622',
    cultivar: 'Oblica / Levantinka',
    level: 'Delicate',
    bitter: 2,
    pepper: 2,
    fruit: 4,
    poly: '410 mg/kg',
    acid: '0.22%',
    harvest: 'Nov 2025',
    note: 'Soft, buttery, ripe-fruit style. Gentle enough for baking and fish.',
  },
  {
    kind: 'oil',
    id: 'leccino-vodnjan',
    name: 'Leccino — Vodnjan',
    growerName: 'Stancija Mandić',
    region: 'Istria',
    origin: 'Vodnjan, Istria',
    price: 20,
    glass: '#E3DFD2',
    cap: '#6E1C2B',
    cultivar: 'Leccino',
    level: 'Delicate',
    bitter: 1,
    pepper: 2,
    fruit: 3,
    poly: '350 mg/kg',
    acid: '0.24%',
    harvest: 'Nov 2025',
    note: 'Sweet almond and a mild finish — the one to win over people who think they dislike olive oil.',
  },
  {
    kind: 'oil',
    id: 'olio-nuovo-unfiltered',
    name: 'Olio Nuovo — Unfiltered',
    growerId: 'vina-brajko',
    growerName: 'Vina Brajko',
    region: 'Istria',
    origin: 'Motovun, Istria',
    price: 32,
    glass: '#6E1C2B',
    cap: '#3F4622',
    cultivar: 'Buža / Bjelica',
    level: 'Robust',
    bitter: 4,
    pepper: 5,
    fruit: 5,
    poly: '850 mg/kg',
    acid: '0.14%',
    harvest: 'Oct 2025',
    limited: true,
    note: 'Bottled straight from the press, cloudy and electric green. Drink by spring.',
  },
  {
    kind: 'oil',
    id: 'oil-tasting-set',
    name: 'Olive oil tasting set',
    region: 'Istria & Dalmatia',
    origin: 'Istria & Dalmatia',
    price: 36,
    glass: '#A9AD7A',
    cap: '#6E1C2B',
    cultivar: 'Oblica · Buža · Istarska Bjelica',
    level: 'Medium',
    bitter: 3,
    pepper: 3,
    fruit: 4,
    poly: '410–780 mg/kg',
    acid: '0.15–0.22%',
    harvest: 'Oct – Nov 2025',
    set: { was: 40, contents: '3 × 250 ml tins' },
    note: 'Three 250 ml tins — Oblica, Buža and Istarska Bjelica — in a paper box with a tasting card and the grove map. Taste them side by side on plain bread.',
  },
]

export const oilLevels: OilLevel[] = ['Delicate', 'Medium', 'Robust']

export const oilSizes = [
  { id: '250', label: '250 ml', name: '250 ml tin', mult: 0.6 },
  { id: '500', label: '500 ml', name: '500 ml tin', mult: 1 },
  { id: '3000', label: '3 L', name: '3 L tin', mult: 4.6 },
] as const

export type OilSize = (typeof oilSizes)[number]['id']

export const DEFAULT_OIL_SIZE: OilSize = '500'

export const oilSize = (id?: string) => oilSizes.find((z) => z.id === id) ?? oilSizes[1]

export function oilPrice(o: Oil, size?: string) {
  return o.set ? o.price : Math.round(o.price * oilSize(size).mult)
}

export const shopOils = oils.filter((o) => !o.set)

export const products: Product[] = [...wines, ...oils]

export const productPath = (p: Pick<Product, 'id' | 'kind'>) => `${p.kind === 'oil' ? '/olive-oil' : '/wine'}/${p.id}`

export function getProduct(id: string | undefined): Product | undefined {
  return products.find((p) => p.id === id)
}

export const wineTypes: ShopWineType[] = ['Red', 'White', 'Orange', 'Rosé', 'Sparkling']

export const euro = (n: number) => '€' + n

export const regionGroups: { label: string; regions: string[] }[] = [
  { label: 'Istria', regions: ['Istria'] },
  { label: 'Dalmatia', regions: ['Dalmatia', 'Primošten'] },
  { label: 'Pelješac & Korčula', regions: ['Pelješac', 'Korčula'] },
  { label: 'Kvarner islands', regions: ['Krk'] },
  { label: 'Slavonia', regions: ['Slavonia'] },
  { label: 'Moslavina & Zagorje', regions: ['Moslavina'] },
]

export const grapes = ['Malvazija', 'Teran', 'Plavac Mali', 'Graševina', 'Pošip', 'Babić', 'Žlahtina', 'Škrlet']
