import { useDeferredValue, useMemo, useState } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import { WineCard } from '../../components/product/WineCard'
import { WineGrid } from '../../components/product/WineGrid'
import { Breadcrumb } from '../../components/ui/Breadcrumb'
import { WineNoResults } from '../../components/wine/WineNoResults'
import { WinePriceFilter } from '../../components/wine/WinePriceFilter'
import { WineQuizPromo } from '../../components/wine/WineQuizPromo'
import { WineResultsTools } from '../../components/wine/WineResultsTools'
import { WINE_TYPES } from '../../constants'
import { useAddToCart } from '../../hooks/cart/useAddToCart'
import { useWineResults } from '../../hooks/wine/useWineResults'
import { sumCounts } from '../../lib/counts'
import { toggle } from '../../lib/toggle'
import { groupRegions, priceFilterLabel, wineFilters } from '../../lib/wineFilters'
import { HOME_ROUTE, OLIVE_OILS_ROUTE } from '../../routes'
import type { So2, Wine, WineExtra, WineLayout, WineSort } from '../../types'
import { EXTRAS, GRAPES, REGION_GROUPS } from './constants'
import styles from './WinesPage.module.css'

export default function WinesPage() {
  const addToCart = useAddToCart()
  const [params, setParams] = useSearchParams()
  const type = WINE_TYPES.find((t) => t === params.get('type'))
  const query = params.get('q') ?? ''

  const [regions, setRegions] = useState<string[]>([])
  const [grape, setGrape] = useState<string[]>([])
  const [priceFrom, setPriceFrom] = useState('')
  const [priceTo, setPriceTo] = useState('')
  const [so2, setSo2] = useState<So2>('any')
  const [extra, setExtra] = useState<WineExtra[]>([])
  const [sort, setSort] = useState<WineSort>('newest')
  const [view, setView] = useState<WineLayout>('grid')

  const request = useMemo(
    () => ({
      ...wineFilters({
        query,
        regions: groupRegions(REGION_GROUPS, regions),
        grapes: grape,
        priceFrom,
        priceTo,
        so2,
        extras: extra,
      }),
      type,
      sort,
    }),
    [query, regions, grape, priceFrom, priceTo, so2, extra, type, sort],
  )
  const shownRequest = useDeferredValue(request)
  const { wines: results, meta } = useWineResults(shownRequest)

  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params)
    if (value === null) next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: true })
  }

  const hasPrice = priceFrom !== '' || priceTo !== ''

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
      ? [
          {
            label: priceFilterLabel(priceFrom, priceTo, meta.price?.max),
            remove: () => (setPriceFrom(''), setPriceTo('')),
          },
        ]
      : []),
    ...grape.map((g) => ({ label: g, remove: () => setGrape(toggle(grape, g)) })),
    ...(so2 !== 'any' ? [{ label: so2 === '10' ? 'SO₂ ≤ 10' : 'Zero added SO₂', remove: () => setSo2('any') }] : []),
    ...extra.map((e) => ({ label: EXTRAS.find((x) => x.id === e)!.label, remove: () => setExtra(toggle(extra, e)) })),
  ]

  if (params.get('type') === 'oil') return <Navigate to={OLIVE_OILS_ROUTE} replace />

  return (
    <>
      <section className="section gridbg">
        <div className={`container ${styles.head}`}>
          <Breadcrumb items={[{ label: 'Home', to: HOME_ROUTE }, { label: 'Wine' }]} />
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
            {(['All', ...WINE_TYPES] as const).map((t) => (
              <button
                key={t}
                className="chip"
                aria-pressed={(type ?? 'All') === t}
                onClick={() => setParam('type', t === 'All' ? null : t)}
              >
                {t} <span className="mono">{t === 'All' ? sumCounts(meta.types) : meta.types[t]}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.bodyWrap}>
        <div className={styles.body}>
          <aside aria-label="Filters" className={styles.filters}>
            <div className={styles.filtersHead}>
              <span className="disp" style={{ fontSize: 20 }}>
                Filters
              </span>
              <button className="text-btn" onClick={clearAll}>
                Clear all
              </button>
            </div>

            <fieldset className={styles.filterGroup}>
              <legend className="mono label-muted">Region</legend>
              {REGION_GROUPS.map((g) => (
                <label key={g.label} className="check">
                  <input
                    type="checkbox"
                    checked={regions.includes(g.label)}
                    onChange={() => setRegions(toggle(regions, g.label))}
                  />
                  {g.label}
                  <span className={`mono label-muted ${styles.filterCount}`}>{sumCounts(meta.regions, g.regions)}</span>
                </label>
              ))}
            </fieldset>

            {meta.price && (
              <fieldset className={styles.filterGroup}>
                <legend className="mono label-muted">Price, €</legend>
                <WinePriceFilter
                  priceFrom={priceFrom}
                  priceTo={priceTo}
                  max={meta.price.max}
                  onPriceFromChange={setPriceFrom}
                  onPriceToChange={setPriceTo}
                />
              </fieldset>
            )}

            <fieldset className={styles.filterGroup}>
              <legend className="mono label-muted">Grape</legend>
              <div className="chip-row" style={{ gap: 6 }}>
                {GRAPES.map((g) => (
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

            <fieldset className={styles.filterGroup}>
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

            <fieldset className={styles.filterGroup}>
              <legend className="mono label-muted">Also</legend>
              {EXTRAS.map((x) => (
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

            <WineQuizPromo />
          </aside>

          <div className={styles.results} aria-busy={shownRequest !== request}>
            <div className={styles.resultsBar}>
              <div className={styles.resultsChips}>
                <span className="mono label-muted" aria-live="polite">
                  {`${results.length} wine${results.length === 1 ? '' : 's'}`}
                </span>
                {activeChips.map((c) => (
                  <span key={c.label} className={styles.activeChip}>
                    {c.label}
                    <button aria-label={`Remove ${c.label} filter`} onClick={c.remove}>
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <WineResultsTools sort={sort} onSortChange={setSort} view={view} onViewChange={setView} />
            </div>

            {results.length ? (
              <WineGrid layout={view}>
                {results.map((w: Wine) => (
                  <WineCard key={w.id} wine={w} layout={view} onAdd={() => addToCart([{ id: w.sellableId }])} />
                ))}
              </WineGrid>
            ) : (
              <WineNoResults onClear={clearAll} />
            )}
          </div>
        </div>
      </section>
    </>
  )
}
