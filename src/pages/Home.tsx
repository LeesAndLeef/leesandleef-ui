import { Link } from 'react-router-dom'
import oilPressImg from '../assets/scenes/oil-press.svg'
import { useCart } from '../cart/context'
import { Bottle } from '../components/Bottle'
import { Footer } from '../components/Footer'
import { Scene } from '../components/Scene'
import { growers } from '../data/growers'
import { articles } from '../data/journal'
import { euro, getProduct, type Oil, oilPrice, productPath, type Wine, wines } from '../data/products'
import { site } from '../data/site'
import './Home.css'

const releaseIds = ['teran-crvena-zemlja', 'malvazija-sedam-dana', 'grasevina-pet-nat-pjena', 'plavac-mali-brijeg']
const release = releaseIds.map((id) => getProduct(id) as Wine)
const listedCount = wines.filter((w) => !w.unlisted).length

const principles = [
  ['Hand-harvested only', 'No machine picking, ever.'],
  ['Native yeast', 'Fermented with what lives on the skins.'],
  ['≤ 30 mg/L SO₂', 'Total sulphites, tested by lab.'],
  ['Paid before bottling', 'Growers never carry our risk.'],
]

const homeOils = ['buza-grove-14', 'istarska-bjelica', 'oblica-island-blend'].map((id) => getProduct(id) as Oil)

const regions = ['Istria', 'Kvarner', 'Dalmatia', 'Pelješac', 'Slavonia', 'Moslavina']

const shipping = [
  ['Order by Thursday', 'We pack once a week, so wine rests as little as possible in transit.'],
  ['Packed in paper pulp', 'No plastic, no foam. Boxes are recyclable and bottle-tested to 1.2 m drops.'],
  ['Temperature-aware', 'Shipping pauses above 28 °C; we email you before holding an order.'],
  ['Corked? Replaced.', 'Send a photo of the cork within 30 days — no need to return the bottle.'],
]

export default function Home() {
  const { add } = useCart()
  const hero = release[0]

  return (
    <>
      <div className="announce mono">
        <span>Autumn release Nº 07 ships from {site.releaseShipDate}</span>
        <span aria-hidden="true">■</span>
        <span>Free EU delivery over €120</span>
        <span aria-hidden="true">■</span>
        <span>Every box carries the grower’s handwritten notes</span>
      </div>

      <section className="section gridbg">
        <div className="home-hero">
          <div className="home-hero-copy">
            <div className="stack" style={{ gap: 28 }}>
              <div className="mono home-hero-kicker">
                <span>Nº 07 — Autumn release</span>
                <span>Harvest 2025 / Vintage 2023–24</span>
              </div>
              <h1 className="disp home-hero-title">
                Wine that tastes of a place, <span className="accent">not a process.</span>
              </h1>
              <p className="home-hero-lede">
                Low-intervention wine and single-estate olive oil from small growers along the Adriatic coast and its
                hinterland. Hand-picked, wild-fermented, bottled in tiny runs — and shipped with the grower’s own notes
                in every box.
              </p>
              <div className="btn-row">
                <Link to="/shop" className="btn btn-primary btn-lg">
                  Shop the release <span aria-hidden="true">→</span>
                </Link>
                <Link to="/growers" className="btn btn-outline btn-lg">
                  How we choose growers
                </Link>
              </div>
            </div>
            <ol className="principles">
              {principles.map(([title, text], i) => (
                <li key={title}>
                  <span className="mono label-wine">0{i + 1}</span>
                  <span className="principles-title">{title}</span>
                  <span className="principles-text">{text}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="home-hero-art hatch">
            <div className="block home-hero-b1" />
            <div className="block home-hero-b2" />
            <div className="home-hero-bottle">
              <Bottle glass={hero.glass} cap={hero.cap} width={150} height={440} mark />
            </div>
            <div className="glass home-pouring">
              <div className="stack" style={{ gap: 8 }}>
                <span className="mono" style={{ color: 'var(--sage)' }}>
                  Now pouring
                </span>
                <span className="disp" style={{ fontSize: 30 }}>
                  {hero.name}
                </span>
                <span style={{ fontSize: 14, color: 'var(--bone)' }}>
                  Vina Brajko · Istria · 12.5% · 9 days on skins
                </span>
              </div>
              <div className="home-pouring-buy">
                <span className="disp" style={{ fontSize: 32 }}>
                  {euro(hero.price)}
                </span>
                <Link to={`/wine/${hero.id}`} className="btn btn-paper btn-sm">
                  View bottle →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="region-strip disp">
        {regions.map((r, i) => (
          <span key={r}>
            {i > 0 && (
              <span className="accent" aria-hidden="true">
                ■{' '}
              </span>
            )}
            {r}
          </span>
        ))}
      </div>

      <section className="section">
        <div className="container section-pad stack" style={{ gap: 40 }}>
          <div className="section-head">
            <div>
              <span className="mono label-wine">§ 01 — The autumn release</span>
              <h2 className="disp h-l">Twelve cuvées. Four we can’t stop opening.</h2>
              <p className="lede">
                Each wine below comes from a single plot and a single grower. Runs are small — when a cuvée is gone, it
                is gone until next vintage.
              </p>
            </div>
            <Link to="/shop" className="btn btn-outline">
              See all {listedCount} wines →
            </Link>
          </div>

          <div className="ledger release-grid">
            {release.map((w) => (
              <article key={w.id} className="release-card">
                <Link to={`/wine/${w.id}`} className="release-card-img hatch" aria-label={w.name}>
                  <span className="mono glass release-card-badge">{w.badge}</span>
                  <Bottle glass={w.glass} cap={w.cap} width={92} height={300} />
                </Link>
                <div className="release-card-body">
                  <div className="mono release-card-meta">
                    <span>{w.region}</span>
                    <span>{w.type}</span>
                  </div>
                  <h3>
                    <Link to={`/wine/${w.id}`} className="lnk">
                      {w.name}
                    </Link>
                  </h3>
                  <p className="label-muted" style={{ fontSize: 14 }}>
                    {w.growerName}
                  </p>
                  <p className="release-card-note">{w.homeNote ?? w.note}</p>
                  <div className="release-card-foot">
                    <span className="disp">{euro(w.price)}</span>
                    <button className="btn btn-ink btn-sm" onClick={() => add(w.id)}>
                      Add to cart
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section gridbg-d">
        <div className="container section-pad home-oil">
          <div className="stack" style={{ gap: 24 }}>
            <span className="mono label-olive">§ 02 — Liquid gold, but green</span>
            <h2 className="disp h-l">Pressed within four hours of picking.</h2>
            <p className="lede" style={{ color: 'var(--sage)', maxWidth: 520 }}>
              Our oils come from old groves of Buža, Oblica and Istarska Bjelica — cold-extracted the same day,
              unfiltered for the first weeks, and dated by harvest, not by bottling. Expect pepper at the back of the
              throat. That’s the polyphenols.
            </p>
            <div className="home-oil-art hatch-w">
              <img
                src={oilPressImg}
                alt="Illustration: oil tins and a bottle on a stone olive press"
                className="home-oil-pic"
              />
              <div className="glass mono home-oil-cap">Buža · Bjelica · Oblica — harvest 2025</div>
            </div>
          </div>

          <div className="oil-list">
            {homeOils.map((o) => (
              <div key={o.id} className="glass oil-item">
                <div className="oil-item-head">
                  <h3 className="disp">
                    <Link to={productPath(o)} className="lnk">
                      {o.name}
                    </Link>
                  </h3>
                  <span className="disp">{euro(o.price)}</span>
                </div>
                <p>{o.note}</p>
                <dl className="oil-facts">
                  {[
                    ['Cultivar', o.cultivar],
                    ['Polyphenols', o.poly],
                    ['Acidity', o.acid],
                    ['Harvest', o.harvest],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="mono mono-sm label-olive">{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="btn-row" style={{ gap: 10 }}>
                  <button className="btn btn-paper btn-sm" onClick={() => add(o.id)}>
                    Add 500 ml
                  </button>
                  <button className="btn btn-ghost-light btn-sm" onClick={() => add(o.id, 1, '3000')}>
                    3 L tin · {euro(oilPrice(o, '3000'))}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="growers" className="section">
        <div className="container section-pad stack" style={{ gap: 40 }}>
          <div className="home-growers-head">
            <div className="stack" style={{ gap: 16 }}>
              <span className="mono label-wine">§ 03 — The people</span>
              <h2 className="disp h-l">Twenty-three growers. No middlemen.</h2>
            </div>
            <p className="lede">
              We visit every grower at least twice a year — once at harvest, once at bottling. Most farm under five
              hectares. Some work vines their great-grandparents planted; some started with a borrowed press and a
              single barrel.
            </p>
          </div>
          <div className="grower-cards">
            {growers.slice(0, 2).map((g) => (
              <Link key={g.id} to={`/growers/${g.id}`} className="lnk grower-card">
                <div className="grower-card-img hatch">
                  {g.portrait ? (
                    <img src={g.portrait} alt={`Illustrated portrait — ${g.who}`} className="grower-card-pic" />
                  ) : (
                    <Scene
                      kind="portrait"
                      cue={g.who}
                      tone={g.tone}
                      label={`Illustrated fictional producer: ${g.name}`}
                    />
                  )}
                  <div className="glass grower-card-facts">
                    <span className="mono">{g.ha}</span>
                    <span className="mono">{g.since}</span>
                  </div>
                </div>
                <div className="grower-card-body">
                  <span className="mono label-muted">{g.place}</span>
                  <h3 className="disp">{g.name}</h3>
                  <p>“{g.quote}”</p>
                  <span className="grower-card-more">Read the profile →</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="home-growers-more">
            <span className="mono label-muted">
              {growers.length - 2} more growers in Istria, Dalmatia, Kvarner &amp; Slavonia
            </span>
            <Link to="/growers" className="btn btn-primary btn-lg">
              Meet all growers →
            </Link>
          </div>
        </div>
      </section>

      <section className="section hatch-w on-dark home-club">
        <div className="block home-club-b1" />
        <div className="block home-club-b2" />
        <div className="container section-pad home-club-inner">
          <div className="stack" style={{ gap: 20 }}>
            <span className="mono label-rose">§ 04 — The Club</span>
            <h2 className="disp" style={{ fontSize: 'clamp(40px, 5vw, 76px)' }}>
              Six bottles. Every season. Chosen by people who drank them first.
            </h2>
            <p className="lede" style={{ color: 'var(--wine-100)', maxWidth: 560 }}>
              Members get first access to every release, cuvées we never list publicly, and a printed field journal with
              each box. Skip, pause or cancel any time from your account.
            </p>
          </div>
          <div className="glass home-club-card">
            <div className="home-club-tiers">
              <div>
                <span className="mono mono-sm label-rose">Explorer</span>
                <span className="disp">3 btl</span>
              </div>
              <div className="is-featured">
                <span className="mono mono-sm label-wine">Cellar ■</span>
                <span className="disp">6 btl</span>
              </div>
              <div>
                <span className="mono mono-sm label-rose">Collector</span>
                <span className="disp">12 btl</span>
              </div>
            </div>
            <ul className="square-list">
              {[
                '48-hour early access to every release',
                'Members-only cuvées and library vintages',
                'Field journal + tasting cards in every box',
                'Free delivery, always',
              ].map((t) => (
                <li key={t}>
                  <span aria-hidden="true">■</span>
                  {t}
                </li>
              ))}
            </ul>
            <Link to="/club" className="btn btn-paper btn-lg">
              Choose a plan →
            </Link>
          </div>
        </div>
      </section>

      <section id="journal" className="section">
        <div className="container section-pad stack" style={{ gap: 40 }}>
          <div className="section-head">
            <div>
              <span className="mono label-wine">§ 05 — Journal</span>
              <h2 className="disp h-l">Field notes</h2>
            </div>
          </div>
          <div className="journal-grid">
            {articles.map((j) => (
              <article key={j.slug} className="journal-item">
                <Link to={`/journal/${j.slug}`} className={j.pattern + ' journal-img'} tabIndex={-1}>
                  <img src={j.img} alt={j.alt} className="journal-pic" />
                </Link>
                <div className="mono label-muted" style={{ display: 'flex', gap: 16 }}>
                  <span>{j.tag}</span>
                  <span>{j.read}</span>
                </div>
                <h3>
                  <Link to={`/journal/${j.slug}`} className="lnk">
                    {j.title}
                  </Link>
                </h3>
                <p>{j.lede}</p>
                <Link to={`/journal/${j.slug}`} className="journal-more">
                  Read the story →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="visit" className="section" style={{ background: 'var(--bone)' }}>
        <div className="container stack home-ship">
          <span className="mono label-wine">§ 06 — From cellar to door</span>
          <ol className="cells home-ship-steps">
            {shipping.map(([title, text], i) => (
              <li key={title}>
                <span className="disp accent">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Footer />
    </>
  )
}
