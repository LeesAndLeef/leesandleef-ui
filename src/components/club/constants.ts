import { site } from '../../lib/site'

export const BOX_CONTENTS = [
  ['The bottles', 'A mix of colours and styles. Tell us what you never want — we’ll never send it.'],
  ['The field journal', 'A 32-page printed booklet: grower interviews, harvest reports and maps of the plots.'],
  ['Tasting cards', 'One per wine — serving temperature, what to cook, how long it keeps once open.'],
  ['A small extra', 'Sometimes oil, sometimes salt from Ston, sometimes a jar of the grower’s fig jam.'],
]

export const CLUB_STEPS = [
  ['Take the taste quiz', 'Eight questions about coffee, citrus and cheese. No wine vocabulary needed.'],
  ['Preview your box', 'Ten days before shipping, see the line-up and swap up to two bottles.'],
  ['Drink and rate', 'Rate each wine in your account. Your next box learns from it.'],
  ['Reorder favourites', 'Members keep a reserved allocation of every wine they’ve received, while stock lasts.'],
]

export const COMPARE_ROWS: [string, string, string, string][] = [
  ['Bottles per box', '3', '6', '12'],
  ['Early access to releases', '24 h', '48 h', '72 h'],
  ['Swap bottles before shipping', '1', '2', 'Unlimited'],
  ['Members-only cuvées', '—', '■', '■'],
  ['Library vintages & magnums', '—', '—', '■'],
  ['Printed field journal', '■', '■', '■'],
  ['Harvest weekend invite', '—', 'Draw', 'Guaranteed'],
  ['Shop discount between boxes', '5%', '10%', '15%'],
]

export const FAQ = [
  {
    q: 'Can I skip a box or pause?',
    a: 'Yes. Skip any box up to five days before it ships, or pause for up to six months. Both are one click in your account.',
  },
  {
    q: 'What if I don’t like a wine?',
    a: 'Rate it and tell us why. We’ll credit half its price to your next box and adjust your profile — no need to return anything.',
  },
  {
    q: 'Do you ship outside the EU?',
    a: `Not yet. We ship to ${site.shipCountries.slice(0, -1).join(', ')} and ${site.shipCountries.at(-1)}. UK and Switzerland are on our list for ${site.nonEuShippingYear}.`,
  },
  {
    q: 'Is natural wine always cloudy or funky?',
    a: 'No. Most of our wines are clear and clean. When a wine is deliberately cloudy or wild, the tasting card says so plainly.',
  },
  {
    q: 'Can I give the Club as a gift?',
    a: 'Yes — choose 3, 6 or 12 months. The recipient gets a printed card and picks their own delivery date.',
  },
  {
    q: 'How do you choose the wines?',
    a: 'Every wine is tasted by at least three of us and visited in the vineyard. We publish our full selection criteria on the growers page.',
  },
]
