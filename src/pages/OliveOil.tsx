import { useState } from 'react'
import { Link } from 'react-router-dom'
import oliveNetsImg from '../assets/journal/olive-nets.svg'
import { useCart } from '../cart/context'
import { oilOption } from '../cart/pricing'
import { OilTin } from '../components/Bottle'
import { MiniFooter } from '../components/Footer'
import { OilCard } from '../components/OilCard'
import { Breadcrumb } from '../components/ui'
import { getArticle } from '../data/journal'
import {
  DEFAULT_OIL_SIZE,
  euro,
  getProduct,
  type Oil,
  type OilLevel,
  type OilSize,
  oilLevels,
  oilSizes,
  shopOils,
} from '../data/products'
import './OliveOil.css'

const promises = [
  ['Hand-picked', 'Nets and rakes, no shakers.'],
  ['Pressed in 4 h', 'From tree to mill the same day.'],
  ['Cold-extracted', 'Kept below 27 °C at the mill.'],
  ['Lab-tested', 'Acidity & polyphenols on every lot.'],
]

const pairings: { level: OilLevel; dots: number; text: string; dishes: string[] }[] = [
  {
    level: 'Delicate',
    dots: 1,
    text: 'Soft, ripe, buttery. Little bitterness, a gentle finish. Leccino, Oblica.',
    dishes: ['White fish & shellfish', 'Baking, cakes, mayonnaise', 'Delicate leaves, burrata'],
  },
  {
    level: 'Medium',
    dots: 2,
    text: 'Grassy, almond, balanced bitterness. The everyday bottle. Buža, Levantinka.',
    dishes: ['Roast vegetables & pasta', 'Tomato salad, fresh cheese', 'Finishing soups and risotto'],
  },
  {
    level: 'Robust',
    dots: 3,
    text: 'Intensely green, bitter, makes you cough. Early harvest. Istarska Bjelica, Rosinjola.',
    dishes: ['Bread, just bread, and salt', 'Grilled steak, lamb, bean stews', 'Bitter greens, chard, rocket'],
  },
]

const harvestDay = [
  ['07:00', 'Nets down, picking', 'Nets under the trees, olives combed off by hand rakes.'],
  ['11:00', 'Crates to the mill', 'Shallow crates, never sacks, so the fruit doesn’t bruise.'],
  ['12:30', 'Wash, crush, malax', 'Paste is mixed slowly, kept below 27 °C.'],
  ['14:00', 'First oil', 'Centrifuge separates oil from water. It runs bright green.'],
  ['Week 4', 'Settled & tinned', 'Rested under nitrogen, then filled into dark tins and glass.'],
]

const cultivars: [string, string, string, OilLevel][] = [
  ['Istarska Bjelica', 'Istria', 'Tomato leaf, rocket, black pepper', 'Robust'],
  ['Rosinjola', 'Istria', 'Green apple, artichoke, chicory', 'Robust'],
  ['Buža', 'Istria', 'Cut grass, green almond', 'Medium'],
  ['Levantinka', 'Dalmatian islands', 'Herbs, green banana, mild pepper', 'Medium'],
  ['Oblica', 'Dalmatia', 'Ripe olive, butter, a little apple', 'Delicate'],
  ['Leccino', 'Istria (Italian origin)', 'Soft, sweet almond, mild', 'Delicate'],
]

const storage = [
  ['Dark', 'Light breaks oil down fast. Keep it in the tin or a dark bottle, in a cupboard.'],
  ['Cool', 'Not next to the stove. Room temperature is fine; the fridge makes it cloudy.'],
  ['Closed', 'Air is the third enemy. Cap it after every pour; decant big tins into a small bottle.'],
  ['Soon', 'Once open, finish within about two months. Oil is for using, not saving.'],
]

const SET_ID = 'oil-tasting-set'

export default function OliveOil() {
  const { add } = useCart()
  const [level, setLevel] = useState<OilLevel | 'All'>('All')
  const [size, setSize] = useState<OilSize>(DEFAULT_OIL_SIZE)
  const [added, setAdded] = useState<Record<string, boolean>>({})
  const set = getProduct(SET_ID) as Oil
  const article = getArticle('olive-oil')!
  const shown = shopOils.filter((o) => level === 'All' || o.level === level)

  function addOil(o: Oil) {
    add(o.id, 1, oilOption(size))
    setAdded((a) => ({ ...a, [`${o.id}@${size}`]: true }))
  }

  return (
    <>
      <section className="section gridbg-d oil-hero">
        <div className="oil-hero-grid">
          <div className="oil-hero-copy">
            <div className="stack" style={{ gap: 24 }}>
              <Breadcrumb className="on-dark" items={[{ label: 'Home', to: '/' }, { label: 'Olive oil' }]} />
              <span className="mono label-olive">Harvest 2025 · Istria &amp; Dalmatia</span>
              <h1 className="disp oil-hero-title">
                Green, bitter, peppery — <span className="label-olive">and dated by harvest.</span>
              </h1>
              <p className="oil-hero-lede">
                Single-grove extra virgin olive oil from the same families who make our wine. Picked by hand, pressed
                the same day, and labelled with the cultivar, the grove and the date the olives came off the tree.
              </p>
              <div className="btn-row">
                <a href="#oils" className="btn btn-paper btn-lg">
                  Shop the oils ↓
                </a>
                <Link to="/journal/olive-oil" className="btn btn-ghost-light btn-lg">
                  How to read a label
                </Link>
              </div>
            </div>
            <ol className="oil-promises">
              {promises.map(([title, text], i) => (
                <li key={title}>
                  <span className="mono label-olive">{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ fontWeight: 600 }}>{title}</span>
                  <span className="oil-promise-text">{text}</span>
                </li>
              ))}
            </ol>
          </div>
          <figure className="hatch oil-hero-fig">
            <img src={oliveNetsImg} alt="Illustration: olive trees with harvest nets spread underneath" />
            <div className="glass oil-hero-panel">
              <div>
                <span className="mono">Now shipping</span>
                <span className="disp" style={{ fontSize: 26 }}>
                  Olio nuovo 2025
                </span>
              </div>
              <div>
                <span className="mono">Pressed</span>
                <span>Oct – Nov 2025</span>
              </div>
              <div>
                <span className="mono">Best within</span>
                <span>12 months of harvest</span>
              </div>
            </div>
          </figure>
        </div>
      </section>

      <section id="oils" className="section">
        <div className="container oil-block stack" style={{ gap: 32 }}>
          <div className="oil-head">
            <div className="stack" style={{ gap: 16, maxWidth: 720 }}>
              <span className="mono label-wine">§ 01 — The oils</span>
              <h2 className="disp oil-h2-lg">Seven groves, three intensities.</h2>
              <p className="oil-intro">
                Pick by how bold you like it. Delicate oils are for fish, baking and salads; robust ones for bread,
                beans, grilled meat and anything that can stand up to pepper.
              </p>
            </div>
            <div className="stack" style={{ gap: 8 }}>
              <span className="mono label-muted">Size</span>
              <div role="group" aria-label="Size" className="oil-sizes">
                {oilSizes.map((z) => (
                  <button key={z.id} aria-pressed={size === z.id} onClick={() => setSize(z.id)}>
                    {z.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="oil-filter">
            <div role="group" aria-label="Intensity" className="chip-row">
              {(['All', ...oilLevels] as const).map((l) => (
                <button key={l} className="chip" aria-pressed={level === l} onClick={() => setLevel(l)}>
                  {l}{' '}
                  <span className="mono">
                    {l === 'All' ? shopOils.length : shopOils.filter((o) => o.level === l).length}
                  </span>
                </button>
              ))}
            </div>
            <span className="mono label-muted" role="status">
              {shown.length} oils
            </span>
          </div>
          <div className="oil-grid">
            {shown.map((o) => (
              <OilCard key={o.id} oil={o} size={size} added={!!added[`${o.id}@${size}`]} onAdd={() => addOil(o)} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bone)' }}>
        <div className="container oil-block stack" style={{ gap: 32 }}>
          <div className="stack" style={{ gap: 16 }}>
            <span className="mono label-wine">§ 02 — What to cook with which</span>
            <h2 className="disp oil-h2">Match the oil to the plate.</h2>
          </div>
          <div className="oil-pairings">
            {pairings.map((p) => (
              <div key={p.level} className={p.level === 'Robust' ? 'is-dark' : undefined}>
                <div className="oil-pairing-head">
                  <span className="disp" style={{ fontSize: 32 }}>
                    {p.level}
                  </span>
                  <span className="oil-pairing-dots" aria-hidden="true">
                    {[1, 2, 3].map((n) => (
                      <span key={n} className={n <= p.dots ? 'is-on' : undefined} />
                    ))}
                  </span>
                </div>
                <p>{p.text}</p>
                <ul>
                  {p.dishes.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section gridbg-d oil-day">
        <div className="container stack" style={{ gap: 40, paddingTop: 96, paddingBottom: 96 }}>
          <div className="oil-day-head">
            <div className="stack" style={{ gap: 16 }}>
              <span className="mono label-olive">§ 03 — One harvest day</span>
              <h2 className="disp oil-h2">From tree to tin before dinner.</h2>
            </div>
            <p>
              Olives start to oxidise the moment they’re picked. The shorter the gap between tree and press, the greener
              and more peppery the oil — so every step of the day is about speed.
            </p>
          </div>
          <ol className="oil-steps">
            {harvestDay.map(([time, title, text]) => (
              <li key={time}>
                <span className="disp oil-step-time">{time}</span>
                <span style={{ fontWeight: 600 }}>{title}</span>
                <span className="oil-step-text">{text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container oil-block stack" style={{ gap: 28 }}>
          <div className="stack" style={{ gap: 16 }}>
            <span className="mono label-wine">§ 04 — Know your cultivars</span>
            <h2 className="disp oil-h2">Six olives worth knowing.</h2>
          </div>
          <div className="oil-table">
            <table>
              <thead>
                <tr>
                  {['Cultivar', 'Where', 'Tastes like', 'Style'].map((h) => (
                    <th key={h} className="mono">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cultivars.map(([name, where, taste, style]) => (
                  <tr key={name}>
                    <td style={{ fontWeight: 600 }}>{name}</td>
                    <td>{where}</td>
                    <td>{taste}</td>
                    <td>
                      <span className={'mono oil-style is-' + style.toLowerCase()}>{style}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="oil-split">
          <div className="hatch-w on-dark oil-set">
            <div className="block oil-set-b1" aria-hidden="true" />
            <div className="block oil-set-b2" aria-hidden="true" />
            <div className="glass oil-set-panel">
              <span className="mono" style={{ color: 'var(--wine-200)' }}>
                Gift · tasting set
              </span>
              <h2 className="disp oil-set-title">One of each intensity.</h2>
              <p style={{ color: 'var(--wine-100)', lineHeight: 1.6 }}>{set.note}</p>
              <div className="oil-set-tins" aria-hidden="true">
                {['oblica-island-blend', 'buza-grove-14', 'istarska-bjelica'].map((id) => {
                  const o = getProduct(id)
                  return o ? <OilTin key={id} body={o.glass} cap={o.cap} width={56} height={92} /> : null
                })}
              </div>
              <div className="oil-set-foot">
                <span style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                  <span className="disp" style={{ fontSize: 40 }}>
                    {euro(set.price)}
                  </span>
                  <span
                    className="mono"
                    style={{ fontSize: 11, color: 'var(--wine-200)', textDecoration: 'line-through' }}
                  >
                    {euro(set.set!.was)}
                  </span>
                </span>
                <button
                  className="btn btn-paper btn-lg"
                  onClick={() => {
                    add(SET_ID)
                    setAdded((a) => ({ ...a, [SET_ID]: true }))
                  }}
                >
                  {added[SET_ID] ? 'Added ✓' : 'Add the set'}
                </button>
              </div>
            </div>
          </div>
          <Link to={`/journal/${article.slug}`} className="lnk oil-article">
            <span className="oil-article-img">
              <img src={article.img} alt="" />
            </span>
            <span className="oil-article-body">
              <span className="mono label-muted" style={{ display: 'flex', gap: 16 }}>
                <span>Field notes · {article.tag}</span>
                <span>{article.read}</span>
              </span>
              <span className="oil-article-title">{article.title}</span>
              <span className="oil-article-lede">{article.lede}</span>
              <span className="label-wine" style={{ fontWeight: 600, fontSize: 14 }}>
                Read the story →
              </span>
            </span>
          </Link>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bone)' }}>
        <div className="container stack" style={{ gap: 24, paddingTop: 72, paddingBottom: 72 }}>
          <span className="mono label-wine">§ 05 — Keep it green</span>
          <div className="oil-storage">
            {storage.map(([title, text]) => (
              <div key={title}>
                <span className="disp label-wine" style={{ fontSize: 28 }}>
                  {title}
                </span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MiniFooter />
    </>
  )
}
