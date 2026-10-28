import { useState } from 'react'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import { useCart } from '../cart/context'
import { oilOption } from '../cart/pricing'
import { Bottle, OilTin } from '../components/Bottle'
import { MiniFooter } from '../components/Footer'
import { Scene, type SceneKind } from '../components/Scene'
import { Breadcrumb, QtyStepper } from '../components/ui'
import { getGrower } from '../data/growers'
import {
  DEFAULT_OIL_SIZE,
  euro,
  getProduct,
  oilPrice,
  oilSize,
  oilSizes,
  type Product as ProductT,
  productPath,
  type ShopWineType,
  type WineDetail,
  wineTypes,
} from '../data/products'
import NotFound from './NotFound'
import './Product.css'

type Tab = 'tasting' | 'vineyard' | 'cellar'
type View = 'bottle' | 'label' | 'field' | 'cellar'

export default function Product() {
  const { id } = useParams()
  const { pathname } = useLocation()
  const product = getProduct(id)
  if (!product) return <NotFound />
  if (pathname !== productPath(product)) return <Navigate to={productPath(product)} replace />
  return <ProductView key={product.id} product={product} />
}

function ProductView({ product }: { product: ProductT }) {
  const wine = product.kind === 'wine' ? product : undefined
  const detail = wine?.detail
  const grower = getGrower(product.growerId)

  const oil = product.kind === 'oil' ? product : undefined
  const [vintage, setVintage] = useState(detail?.defaultVintage)
  const [size, setSize] = useState<string>(DEFAULT_OIL_SIZE)
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState<Tab>('tasting')
  const [added, setAdded] = useState(false)
  const [view, setView] = useState<View>('bottle')
  const { add } = useCart()

  const unitPrice = oil
    ? oilPrice(oil, size)
    : (detail?.vintages?.find((v) => v.year === vintage)?.price ?? product.price)
  const option = oil ? oilOption(size) : vintage
  const tags =
    detail?.tags ??
    (wine
      ? [
          wine.vegan ? 'Vegan' : 'Fined (not vegan)',
          'Wild ferment',
          wine.amphora ? 'Amphora-aged' : null,
          wine.so2Added ? `${wine.so2} mg/L total SO₂` : `Zero added SO₂ · ${wine.so2} mg/L natural`,
          wine.magnum ? 'Magnum available' : null,
        ].filter((t): t is string => t !== null)
      : oil
        ? [
            `${oil.level} intensity`,
            `Cultivar: ${oil.cultivar}`,
            `Polyphenols ${oil.poly}`,
            `Acidity ${oil.acid}`,
            `Harvest ${oil.harvest}`,
          ]
        : [])
  const title = vintage ? product.name.replace(/\d{4}$/, vintage) : product.name
  const typeLabel = wine ? wine.type : 'Olive oil'
  const volume = wine ? (wine.volume ?? '750 ml') : oil?.set ? oil.set.contents : oilSize(size).name
  const where = grower?.place ?? `${product.region}, Croatia`
  const shots: { id: Exclude<View, 'bottle'>; name: string; kind: SceneKind; cue: string; caption: string }[] = [
    {
      id: 'label',
      name: 'Back label',
      kind: 'backlabel',
      cue: wine ? title : `${title} olive oil`,
      caption: 'Back label',
    },
    wine
      ? {
          id: 'field',
          name: 'Vineyard',
          kind: 'landscape',
          cue: grower?.profile?.heroPhoto ?? where,
          caption: `${wine.grape} vines · ${where}`,
        }
      : {
          id: 'field',
          name: 'Grove',
          kind: 'grove',
          cue: `${title} grove`,
          caption: `${oil?.cultivar} trees · ${where}`,
        },
    wine
      ? {
          id: 'cellar',
          name: 'Cellar',
          kind: wine.amphora ? 'amphora' : wine.type === 'Sparkling' ? 'rack' : 'casks',
          cue: `${title} cellar`,
          caption: wine.amphora
            ? `Buried amphorae · ${where}`
            : wine.type === 'Sparkling'
              ? 'Riddling by hand before disgorging'
              : `In the ${grower?.shortName ?? ''} cellar`,
        }
      : {
          id: 'cellar',
          name: 'Mill',
          kind: 'press',
          cue: `${title} mill`,
          caption: 'Cold-extracted within four hours of picking',
        },
  ]
  const shot = shots.find((s) => s.id === view)

  return (
    <>
      <div className="container product-crumbs">
        <Breadcrumb
          items={
            wine
              ? [
                  { label: 'Home', to: '/' },
                  { label: 'Shop', to: '/shop' },
                  {
                    label: typeLabel,
                    to: wineTypes.includes(wine.type as ShopWineType)
                      ? `/shop?type=${encodeURIComponent(wine.type)}`
                      : '/shop',
                  },
                  { label: product.name.replace(/\s\d{4}$/, '') },
                ]
              : [{ label: 'Home', to: '/' }, { label: 'Olive oil', to: '/olive-oil' }, { label: product.name }]
          }
        />
      </div>

      <section className="section">
        <div className="product-hero">
          <div className="product-gallery">
            <div className={(oil ? 'hatch-w' : 'hatch') + ' product-stage'}>
              {shot ? (
                <>
                  <Scene kind={shot.kind} cue={shot.cue} tone={product.glass} text={title} label={shot.caption} />
                  <span className="mono scene-cap">{shot.caption}</span>
                </>
              ) : (
                <>
                  {!oil && <div className="block product-b1" />}
                  <div className="block product-b2" />
                  {oil ? (
                    <OilTin
                      body={oil.glass}
                      cap={oil.cap}
                      width={size === '3000' ? 300 : size === '250' ? 200 : 250}
                      height={size === '3000' ? 500 : size === '250' ? 333 : 417}
                      label={`Tin of ${title}`}
                    />
                  ) : (
                    <Bottle
                      glass={product.glass}
                      cap={product.cap}
                      width={170}
                      height={560}
                      mark
                      label={`Bottle of ${title}`}
                    />
                  )}
                </>
              )}
              {!shot && (wine?.badge || product.left !== undefined) && (
                <div className="glass product-stage-tag">
                  {wine?.badge && <span className="mono">{wine.badge}</span>}
                  {product.left !== undefined && <span className="mono label-rose">{product.left} bottles left</span>}
                </div>
              )}
              {!shot && detail?.drinkWindow && (
                <div className="glass drink-window">
                  <span className="mono mono-sm" style={{ color: 'var(--sage)' }}>
                    Drink window
                  </span>
                  <div className="drink-window-bar" aria-hidden="true">
                    {detail.drinkWindow.cells.map((c, i) => (
                      <span key={i} data-level={c} />
                    ))}
                  </div>
                  <span style={{ fontSize: 13 }}>{detail.drinkWindow.label}</span>
                </div>
              )}
            </div>
            <div className="product-thumbs" role="group" aria-label="Pictures">
              <button
                type="button"
                className={view === 'bottle' ? 'is-current' : undefined}
                aria-pressed={view === 'bottle'}
                aria-label={wine ? 'Bottle' : 'Tin'}
                onClick={() => setView('bottle')}
              >
                {oil ? (
                  <OilTin body={oil.glass} cap={oil.cap} width={45} height={80} />
                ) : (
                  <Bottle glass={product.glass} width={24} height={80} detail="label" />
                )}
              </button>
              {shots.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={view === s.id ? 'is-current' : undefined}
                  aria-pressed={view === s.id}
                  aria-label={s.name}
                  onClick={() => setView(s.id)}
                >
                  <Scene kind={s.kind} cue={s.cue} tone={product.glass} text={title} />
                </button>
              ))}
            </div>
          </div>

          <div className="buy-box">
            <div className="stack" style={{ gap: 14 }}>
              <div className="mono label-muted buy-meta">
                <span>{typeLabel}</span>
                <span>{product.region}, Croatia</span>
                <span>{volume}</span>
                {wine && <span>{wine.abv} abv</span>}
              </div>
              <h1 className="disp product-title">{title}</h1>
              {grower && (
                <Link to={`/growers/${grower.id}`} className="product-grower">
                  by {grower.name}, {grower.place.split(',')[0]} →
                </Link>
              )}
            </div>
            <p className="lede">{detail?.story ?? product.note}</p>

            {tags.length > 0 && (
              <div className="chip-row">
                {tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            )}

            {detail?.vintages && (
              <fieldset>
                <legend className="mono label-muted" style={{ marginBottom: 10 }}>
                  Vintage
                </legend>
                <div className="chip-row">
                  {detail.vintages.map((v) => (
                    <button
                      key={v.year}
                      className="vintage"
                      aria-pressed={vintage === v.year}
                      onClick={() => setVintage(v.year)}
                    >
                      <span style={{ fontWeight: 600 }}>{v.year}</span>
                      <span className="mono mono-sm">{v.info}</span>
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            {oil && !oil.set && (
              <fieldset>
                <legend className="mono label-muted" style={{ marginBottom: 10 }}>
                  Size
                </legend>
                <div className="chip-row">
                  {oilSizes.map((z) => (
                    <button key={z.id} className="vintage" aria-pressed={size === z.id} onClick={() => setSize(z.id)}>
                      <span style={{ fontWeight: 600 }}>{z.name}</span>
                      <span className="mono mono-sm">{euro(oilPrice(oil, z.id))}</span>
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            <div className="buy-row">
              <QtyStepper value={qty} onChange={setQty} size="lg" />
              <button
                className="btn btn-primary buy-btn"
                onClick={() => {
                  add(product.id, qty, option)
                  setAdded(true)
                }}
              >
                <span>Add to cart</span>
                <span className="disp">{euro(unitPrice * qty)}</span>
              </button>
            </div>

            {added && (
              <div className="status added-status" role="status">
                <span>Added to cart. Six bottles or more ship free.</span>
                <Link to="/cart">View cart →</Link>
              </div>
            )}

            <div className="cells buy-perks">
              <div>
                <span className="mono mono-sm label-wine">Ships</span>
                <span>Next packing day: Friday</span>
              </div>
              {oil ? (
                <>
                  <div>
                    <span className="mono mono-sm label-wine">Harvest</span>
                    <span>{oil.harvest}, best within 18 months</span>
                  </div>
                  <div>
                    <span className="mono mono-sm label-wine">Store</span>
                    <span>Cool and dark; the tin keeps light out</span>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <span className="mono mono-sm label-wine">Mix &amp; save</span>
                    <span>−10% on any 6 bottles</span>
                  </div>
                  <div>
                    <span className="mono mono-sm label-wine">Corked?</span>
                    <span>Replaced, no return</span>
                  </div>
                </>
              )}
            </div>

            <div className="club-nudge">
              <div className="hatch-w" aria-hidden="true" />
              <div>
                <span style={{ fontWeight: 600 }}>Club members got this 48 hours early.</span>
                <span className="label-muted">
                  Join the Club for first access to every release and members-only cuvées.{' '}
                  <Link to="/club">See plans</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {detail && <Details detail={detail} tab={tab} setTab={setTab} />}

      {detail?.quote && grower && (
        <section className="section gridbg-d">
          <div className="container section-pad product-quote">
            <div className="hatch product-portrait">
              {grower.portrait ? (
                <img
                  src={grower.portrait}
                  alt={`Illustrated portrait of ${detail.quote.who}`}
                  className="product-portrait-pic"
                />
              ) : (
                <Scene
                  kind="landscape"
                  cue={grower.profile?.heroPhoto ?? where}
                  tone={grower.tone}
                  label={`Illustrated vineyard at ${where}`}
                />
              )}
              <div className="glass product-portrait-cap">
                <span className="mono">{grower.name}</span>
                <span className="mono" style={{ color: 'var(--sage)' }}>
                  {detail.quote.facts}
                </span>
              </div>
            </div>
            <figure className="stack" style={{ gap: 28 }}>
              <span className="mono label-olive">From the grower</span>
              <blockquote className="product-blockquote">“{detail.quote.text}”</blockquote>
              <figcaption className="stack" style={{ gap: 4 }}>
                <span style={{ fontWeight: 600 }}>{detail.quote.who}</span>
                <span className="label-olive" style={{ fontSize: 14 }}>
                  {detail.quote.role}
                </span>
              </figcaption>
              <Link to={`/growers/${grower.id}`} className="btn btn-ghost-light" style={{ alignSelf: 'flex-start' }}>
                Visit {grower.name}’s page →
              </Link>
            </figure>
          </div>
        </section>
      )}

      {detail && detail.related.length > 0 && (
        <section className="section">
          <div className="container product-related">
            <div className="section-head">
              <h2 className="disp" style={{ fontSize: 'clamp(32px, 3.6vw, 52px)' }}>
                If you like this
              </h2>
              <Link to="/shop" style={{ fontWeight: 600 }}>
                Back to the cellar →
              </Link>
            </div>
            <div className="ledger related-grid">
              {detail.related.map((r) => {
                const p = getProduct(r.id)
                if (!p) return null
                return (
                  <Link key={r.id} to={productPath(p)} className="lnk related-item">
                    <span className="hatch related-img">
                      {p.kind === 'oil' ? (
                        <OilTin body={p.glass} cap={p.cap} width={50} height={90} />
                      ) : (
                        <Bottle glass={p.glass} width={26} height={90} detail="label" />
                      )}
                    </span>
                    <span className="stack" style={{ gap: 6 }}>
                      <span className="mono mono-sm label-muted">{r.why}</span>
                      <span style={{ fontWeight: 600, lineHeight: 1.3 }}>{p.name}</span>
                      <span className="disp" style={{ fontSize: 20 }}>
                        {euro(p.price)}
                      </span>
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <MiniFooter />
    </>
  )
}

const tabs: { id: Tab; label: string }[] = [
  { id: 'tasting', label: 'Tasting notes' },
  { id: 'vineyard', label: 'Vineyard' },
  { id: 'cellar', label: 'In the cellar' },
]

function Details({ detail, tab, setTab }: { detail: WineDetail; tab: Tab; setTab: (t: Tab) => void }) {
  return (
    <section className="section">
      <div className="container product-details">
        <div role="tablist" aria-label="Wine details" className="tabs">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls={`panel-${t.id}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="stack" style={{ gap: 40 }}>
          {tab === 'tasting' && (
            <>
              <div className="cells tasting">
                {(['nose', 'palate', 'finish'] as const).map((k) => (
                  <div key={k}>
                    <span className="disp accent">{k}</span>
                    <p>{detail.tasting[k]}</p>
                  </div>
                ))}
              </div>
              <div className="tasting-more">
                <div className="stack" style={{ gap: 16 }}>
                  <span className="mono label-muted">Structure</span>
                  {detail.structure.map((b) => (
                    <div key={b.label} className="bar-row">
                      <span>{b.label}</span>
                      <div className="bar" role="img" aria-label={`${b.label}: ${b.value} out of 10`}>
                        {Array.from({ length: 10 }, (_, i) => (
                          <span key={i} className={i < b.value ? 'on' : undefined} />
                        ))}
                      </div>
                      <span className="mono label-muted" style={{ textAlign: 'right' }}>
                        {b.word}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="stack" style={{ gap: 16 }}>
                  <span className="mono label-muted">Serve &amp; pair</span>
                  <div className="serve">
                    {(
                      [
                        ['Temp', detail.serve.temp],
                        ['Decant', detail.serve.decant],
                        ['Glass', detail.serve.glass],
                      ] as const
                    ).map(([k, v]) => (
                      <div key={k}>
                        <span className="mono mono-sm label-wine">{k}</span>
                        <span className="disp">{v}</span>
                      </div>
                    ))}
                  </div>
                  <ul className="pairings">
                    {detail.pairings.map((p) => (
                      <li key={p.dish}>
                        <span>{p.dish}</span>
                        <span className="mono label-muted">{p.kind}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}

          {tab === 'vineyard' && (
            <div className="tasting-more">
              <Rows rows={detail.vineyard} />
              <div className="hatch vineyard-map">
                <Scene
                  kind="map"
                  cue={detail.vineyardMap ?? 'vineyard'}
                  label={`Map: ${detail.vineyardMap ?? 'vineyard plot'}`}
                />
              </div>
            </div>
          )}

          {tab === 'cellar' && (
            <div style={{ maxWidth: 900 }}>
              <Rows rows={detail.cellar} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function Rows({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="rows" style={{ margin: 0 }}>
      {rows.map(([k, v]) => (
        <div key={k} className="row">
          <dt className="mono label-muted">{k}</dt>
          <dd style={{ margin: 0 }}>{v}</dd>
        </div>
      ))}
    </dl>
  )
}
