import { useMemo, useState } from 'react'
import { Link, Navigate, useSearchParams } from 'react-router-dom'
import { MiniFooter } from '../components/Footer'
import { Breadcrumb, WineCard } from '../components/ui'
import { grapes, regionGroups, type Wine, wines, wineTypes } from '../data/products'
import './Catalog.css'

type So2 = 'any' | '10' | 'zero'
type Sort = 'newest' | 'price-asc' | 'price-desc' | 'left'
type Extra = 'vegan' | 'amphora' | 'magnum' | 'inStock'

const extras: { id: Extra; label: string }[] = [
  { id: 'vegan', label: 'Vegan (unfined)' },
  { id: 'amphora', label: 'Amphora-aged' },
  { id: 'magnum', label: 'Magnum available' },
  { id: 'inStock', label: 'In stock only' },
]

const listed = wines.filter((w) => !w.unlisted)
const PRICE_MAX = Math.max(...listed.map((w) => w.price))

function toggle<T>(list: T[], v: T): T[] {
  return list.includes(v) ? list.filter((x) => x !== v) : [...list, v]
}

export default function Catalog() {
  const [params, setParams] = useSearchParams()
  const type = params.get('type') ?? 'All'
  const query = params.get('q') ?? ''

  const [regions, setRegions] = useState<string[]>([])
  const [grape, setGrape] = useState<string[]>([])
  const [priceFrom, setPriceFrom] = useState('')
  const [priceTo, setPriceTo] = useState('')
  const [so2, setSo2] = useState<So2>('any')
  const [extra, setExtra] = useState<Extra[]>([])
  const [sort, setSort] = useState<Sort>('newest')
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params)
    if (value === null) next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: true })
  }

  const from = priceFrom === '' ? 0 : Number(priceFrom)
  const to = priceTo === '' ? Infinity : Number(priceTo)
  const hasPrice = priceFrom !== '' || priceTo !== ''

  const baseFiltered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const allowedRegions = regionGroups.filter((g) => regions.includes(g.label)).flatMap((g) => g.regions)
    return listed.filter((w) => {
      if (q && ![w.name, w.growerName, w.grape, w.region].some((s) => s?.toLowerCase().includes(q))) return false
      if (allowedRegions.length && !allowedRegions.includes(w.region)) return false
      if (grape.length && !grape.some((g) => w.grape.startsWith(g))) return false
      if (w.price < from || w.price > to) return false
      if (so2 === '10' && w.so2 > 10) return false
      if (so2 === 'zero' && w.so2Added) return false
      if (extra.includes('vegan') && !w.vegan) return false
      if (extra.includes('amphora') && !w.amphora) return false
      if (extra.includes('magnum') && !w.magnum) return false
      if (extra.includes('inStock') && w.left === 0) return false
      return true
    })
  }, [query, regions, grape, from, to, so2, extra])

  const results = useMemo(() => {
    const list = type === 'All' ? baseFiltered : baseFiltered.filter((w) => w.type === type)
    const sorted = [...list]
    if (sort === 'newest') sorted.sort((a, b) => a.releaseRank - b.releaseRank)
    if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price)
    if (sort === 'left') sorted.sort((a, b) => (a.left ?? Infinity) - (b.left ?? Infinity))
    return sorted
  }, [baseFiltered, type, sort])

  const clearAll = () => {
    setRegions([])
    setGrape([])
    setPriceFrom('')
    setPriceTo('')
    setSo2('any')
    setExtra([])
    setParams({}, { replace: true })
  }

  const activeChips: { label: string; remove: () => void }[] = [
    ...(query ? [{ label: `“${query}”`, remove: () => setParam('q', null) }] : []),
    ...regions.map((r) => ({ label: r, remove: () => setRegions(toggle(regions, r)) })),
    ...(hasPrice
      ? [{ label: `€${priceFrom || 0}–${priceTo || PRICE_MAX}`, remove: () => (setPriceFrom(''), setPriceTo('')) }]
      : []),
    ...grape.map((g) => ({ label: g, remove: () => setGrape(toggle(grape, g)) })),
    ...(so2 !== 'any' ? [{ label: so2 === '10' ? 'SO₂ ≤ 10' : 'Zero added SO₂', remove: () => setSo2('any') }] : []),
    ...extra.map((e) => ({ label: extras.find((x) => x.id === e)!.label, remove: () => setExtra(toggle(extra, e)) })),
  ]

  const low = Math.min(from, PRICE_MAX)
  const high = Math.max(low, Math.min(to, PRICE_MAX))
  const lowPct = (low / PRICE_MAX) * 100
  const highPct = (high / PRICE_MAX) * 100
  const setLow = (v: number) => {
    const next = Math.min(v, high)
    setPriceFrom(next <= 0 ? '' : String(next))
  }
  const setHigh = (v: number) => {
    const next = Math.max(v, low)
    setPriceTo(next >= PRICE_MAX ? '' : String(next))
  }
  const lowOnTop = low > PRICE_MAX / 2

  if (type === 'oil') return <Navigate to="/olive-oil" replace />

  return (
    <>
      <section className="section gridbg">
        <div className="container catalog-head">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Shop', to: '/shop' }, { label: 'All wine' }]} />
          <div className="section-head">
            <h1 className="disp h-xl">
              The cellar
              <span className="accent">.</span>
            </h1>
            <p className="lede" style={{ maxWidth: 460, fontSize: 16 }}>
              Every bottle we stock, sorted by how it was made. Use the filters to narrow by colour, region, grape or
              how much sulphur you’re comfortable with.
            </p>
          </div>
          <div role="group" aria-label="Wine style" className="chip-row">
            {['All', ...wineTypes].map((t) => (
              <button
                key={t}
                className="chip"
                aria-pressed={type === t}
                onClick={() => setParam('type', t === 'All' ? null : t)}
              >
                {t}{' '}
                <span className="mono">
                  {t === 'All' ? baseFiltered.length : baseFiltered.filter((w) => w.type === t).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="catalog-body-wrap">
        <div className="catalog-body">
          <aside aria-label="Filters" className="catalog-filters">
            <div className="catalog-filters-head">
              <span className="disp" style={{ fontSize: 20 }}>
                Filters
              </span>
              <button className="text-btn" onClick={clearAll}>
                Clear all
              </button>
            </div>

            <fieldset className="filter-group">
              <legend className="mono label-muted">Region</legend>
              {regionGroups.map((g) => (
                <label key={g.label} className="check">
                  <input
                    type="checkbox"
                    checked={regions.includes(g.label)}
                    onChange={() => setRegions(toggle(regions, g.label))}
                  />
                  {g.label}
                  <span className="mono label-muted filter-count">
                    {listed.filter((w) => g.regions.includes(w.region)).length}
                  </span>
                </label>
              ))}
            </fieldset>

            <fieldset className="filter-group">
              <legend className="mono label-muted">Price, €</legend>
              <div className="price-inputs">
                <label className="fld label-muted">
                  From
                  <input
                    className="input mono-input"
                    type="number"
                    min={0}
                    placeholder="0"
                    value={priceFrom}
                    onChange={(e) => setPriceFrom(e.target.value)}
                  />
                </label>
                <label className="fld label-muted">
                  To
                  <input
                    className="input mono-input"
                    type="number"
                    min={0}
                    placeholder={String(PRICE_MAX)}
                    value={priceTo}
                    onChange={(e) => setPriceTo(e.target.value)}
                  />
                </label>
              </div>
              <div className="price-track">
                <div
                  className="price-track-fill"
                  style={{
                    left: `calc(8px + (100% - 16px) * ${lowPct / 100})`,
                    right: `calc(8px + (100% - 16px) * ${1 - highPct / 100})`,
                  }}
                />
                <input
                  type="range"
                  min={0}
                  max={PRICE_MAX}
                  step={1}
                  value={low}
                  aria-label="Minimum price"
                  style={{ zIndex: lowOnTop ? 2 : 1 }}
                  aria-valuetext={`€${low}`}
                  onChange={(e) => setLow(Number(e.target.value))}
                />
                <input
                  type="range"
                  min={0}
                  max={PRICE_MAX}
                  step={1}
                  value={high}
                  aria-label="Maximum price"
                  style={{ zIndex: lowOnTop ? 1 : 2 }}
                  aria-valuetext={`€${high}`}
                  onChange={(e) => setHigh(Number(e.target.value))}
                />
              </div>
            </fieldset>

            <fieldset className="filter-group">
              <legend className="mono label-muted">Grape</legend>
              <div className="chip-row" style={{ gap: 6 }}>
                {grapes.map((g) => (
                  <button
                    key={g}
                    className="chip chip-sm"
                    aria-pressed={grape.includes(g)}
                    onClick={() => setGrape(toggle(grape, g))}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="filter-group">
              <legend className="mono label-muted">Total SO₂</legend>
              {(
                [
                  ['any', 'Any (≤ 30 mg/L)'],
                  ['10', '≤ 10 mg/L'],
                  ['zero', 'Zero added'],
                ] as [So2, string][]
              ).map(([id, label]) => (
                <label key={id} className="check">
                  <input type="radio" name="so2" checked={so2 === id} onChange={() => setSo2(id)} />
                  {label}
                </label>
              ))}
            </fieldset>

            <fieldset className="filter-group">
              <legend className="mono label-muted">Also</legend>
              {extras.map((x) => (
                <label key={x.id} className="check">
                  <input
                    type="checkbox"
                    checked={extra.includes(x.id)}
                    onChange={() => setExtra(toggle(extra, x.id))}
                  />
                  {x.label}
                </label>
              ))}
            </fieldset>

            <div className="hatch quiz-promo">
              <div className="block quiz-promo-b" />
              <div className="glass quiz-promo-inner">
                <span className="mono" style={{ color: 'var(--sage)' }}>
                  Not sure?
                </span>
                <span className="quiz-promo-text">Take the 60-second taste quiz and we’ll build a mixed six.</span>
                <Link to="/quiz" className="quiz-promo-link">
                  Start the quiz →
                </Link>
              </div>
            </div>
          </aside>

          <div className="catalog-results">
            <div className="results-bar">
              <div className="results-chips">
                <span className="mono label-muted" aria-live="polite">
                  {`${results.length} wine${results.length === 1 ? '' : 's'}`}
                </span>
                {activeChips.map((c) => (
                  <span key={c.label} className="active-chip">
                    {c.label}
                    <button aria-label={`Remove ${c.label} filter`} onClick={c.remove}>
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="results-tools">
                <label htmlFor="sort" className="mono label-muted">
                  Sort
                </label>
                <select id="sort" className="input" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
                  <option value="newest">Newest release</option>
                  <option value="price-asc">Price, low to high</option>
                  <option value="price-desc">Price, high to low</option>
                  <option value="left">Fewest bottles left</option>
                </select>
                <div role="group" aria-label="View" className="view-toggle">
                  <button aria-label="Grid view" aria-pressed={view === 'grid'} onClick={() => setView('grid')}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                      <rect width="7" height="7" />
                      <rect x="9" width="7" height="7" />
                      <rect y="9" width="7" height="7" />
                      <rect x="9" y="9" width="7" height="7" />
                    </svg>
                  </button>
                  <button aria-label="List view" aria-pressed={view === 'list'} onClick={() => setView('list')}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                      <rect width="16" height="3" />
                      <rect y="6.5" width="16" height="3" />
                      <rect y="13" width="16" height="3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {results.length ? (
              <div className={'results-grid' + (view === 'list' ? ' is-list' : '')}>
                {results.map((w: Wine) => (
                  <WineCard key={w.id} wine={w} layout={view} />
                ))}
              </div>
            ) : (
              <div className="hatch no-results">
                <h2 className="disp">Nothing matches.</h2>
                <p>Try removing a filter — runs are small, and some combinations simply don’t exist yet.</p>
                <button className="btn btn-paper" onClick={clearAll}>
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <MiniFooter />
    </>
  )
}
