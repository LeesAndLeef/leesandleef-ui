import { type FormEvent, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useCart } from '../cart/context'
import { Bottle } from '../components/Bottle'
import { MiniFooter } from '../components/Footer'
import { Breadcrumb } from '../components/ui'
import { type GrowerProfile, type Grower as GrowerT, getGrower, growers } from '../data/growers'
import { euro, productPath, products } from '../data/products'
import NotFound from './NotFound'
import './Grower.css'

function withItalics(text: string) {
  return text.split(/<em>(.*?)<\/em>/).map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part))
}

export default function Grower() {
  const { id } = useParams()
  const grower = getGrower(id)
  if (!grower) return <NotFound />
  return <GrowerView key={grower.id} grower={grower} />
}

function GrowerView({ grower }: { grower: GrowerT }) {
  const { add } = useCart()
  const profile = grower.profile
  const inStock = products.filter((p) => p.growerId === grower.id && p.kind === 'wine')
  const next = growers[(growers.findIndex((g) => g.id === grower.id) + 1) % growers.length]
  const bundleTotal = inStock.reduce((a, w) => a + w.price, 0)
  const bundleName = ['', '', 'pair', 'trio'][inStock.length] ?? 'set'

  const sections: [string, string][] = profile
    ? [
        ['story', 'The story'],
        ['year', profile.yearLabel ?? 'A year in the vineyard'],
        ['plots', 'The plots'],
        ...(inStock.length ? ([['wines', 'Wines in stock']] as [string, string][]) : []),
        ...(profile.visit ? ([['visit', 'Visit']] as [string, string][]) : []),
      ]
    : []
  const num = (id: string) => String(sections.findIndex(([s]) => s === id) + 1).padStart(2, '0')
  const [first, ...rest] = grower.name.split(' ')

  const facts: [string, string][] = profile?.facts ?? [
    ['Village', grower.place],
    ...(grower.ha ? ([['Vineyards', grower.ha]] as [string, string][]) : []),
    ...(grower.since ? ([['Farming', grower.since]] as [string, string][]) : []),
  ]

  return (
    <>
      <section className="section hatch on-dark grower-hero">
        {profile ? (
          <img src={profile.heroImg} alt={`Illustration: ${profile.heroPhoto}`} className="grower-hero-img" />
        ) : (
          <>
            <div className="block grower-hero-b1" style={{ background: grower.tone }} />
            <div className="block grower-hero-b2" />
          </>
        )}
        <div className="container grower-hero-inner">
          <Breadcrumb
            className="on-dark"
            items={[{ label: 'Home', to: '/' }, { label: 'Growers', to: '/growers' }, { label: grower.name }]}
          />
          <h1 className="disp grower-name">
            {first}
            {rest.length > 0 && (
              <>
                <br />
                {rest.join(' ')}
              </>
            )}
          </h1>
          <dl className="glass grower-facts">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt className="mono mono-sm" style={{ color: 'var(--sage)' }}>
                  {k}
                </dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {profile ? (
        <Profile profile={profile} sections={sections} num={num} />
      ) : (
        <section className="section">
          <div className="container section-pad stack" style={{ gap: 20, maxWidth: 900, marginLeft: 0 }}>
            <span className="mono label-wine">The story</span>
            {grower.quote && (
              <p className="disp" style={{ fontSize: 'clamp(26px, 2.8vw, 42px)', lineHeight: 1.05 }}>
                “{grower.quote}”
              </p>
            )}
            <p className="lede">We’re still writing {grower.name}’s full profile. Their wines are below.</p>
          </div>
        </section>
      )}

      {inStock.length > 0 && (
        <section id="wines" className="section" style={{ background: 'var(--bone)' }}>
          <div className="container section-pad stack" style={{ gap: 32 }}>
            <div className="section-head">
              <div>
                <span className="mono label-wine">{profile ? `${num('wines')} — ` : ''}Wines in stock</span>
                <h2 className="disp h-m">{profile?.winesTitle ?? 'In stock'}</h2>
              </div>
              {inStock.length > 1 && (
                <button className="btn btn-primary" onClick={() => inStock.forEach((w) => add(w.id))}>
                  Add the {grower.shortName} {bundleName} — {euro(bundleTotal)}
                </button>
              )}
            </div>
            <div className="ledger grower-wines">
              {inStock.map((w) => (
                <Link key={w.id} to={productPath(w)} className="lnk grower-wine">
                  <span className="hatch grower-wine-img">
                    <Bottle glass={w.glass} cap="#6E1C2B" width={44} height={150} detail="label" />
                  </span>
                  <span className="stack" style={{ gap: 8 }}>
                    <span className="mono mono-sm label-muted">{w.kind === 'wine' ? w.type : 'Olive oil'}</span>
                    <span style={{ fontWeight: 600, fontSize: 18, lineHeight: 1.3 }}>{w.name}</span>
                    <span style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--ink-body)' }}>{w.note}</span>
                    <span className="disp" style={{ fontSize: 24, marginTop: 'auto' }}>
                      {euro(w.price)}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {profile?.visit && <Visit visit={profile.visit} label={`${num('visit')} — Visit`} />}

      {next && next.id !== grower.id && (
        <Link to={`/growers/${next.id}`} className="lnk hatch-w next-grower">
          <div className="container">
            <span className="mono label-rose">Next grower</span>
            <span className="disp">{next.name} →</span>
          </div>
        </Link>
      )}

      <MiniFooter />
    </>
  )
}

function Profile({
  profile,
  sections,
  num,
}: {
  profile: GrowerProfile
  sections: [string, string][]
  num: (id: string) => string
}) {
  const [month, setMonth] = useState(profile.defaultMonth)
  const cur = profile.year[month]

  return (
    <>
      <section className="section">
        <div className="grower-story-wrap">
          <aside className="grower-toc">
            <span className="mono label-wine">In this profile</span>
            <nav aria-label="Sections" className="grower-toc-nav">
              {sections.map(([id, label]) => (
                <a key={id} href={`#${id}`} className="lnk">
                  <span>
                    {num(id)} · {label}
                  </span>
                  <span aria-hidden="true">↓</span>
                </a>
              ))}
            </nav>
            <div className="grower-checklist">
              <span className="mono label-muted">Our checklist</span>
              <ul>
                {profile.checklist.map((c) => (
                  <li key={c.text}>
                    <span className={c.done ? 'accent' : 'label-muted'} aria-hidden="true">
                      {c.done ? '■' : '□'}
                    </span>
                    <span>
                      {c.text}
                      {!c.done && <span className="sr-only"> (not yet)</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <article id="story" className="grower-story">
            <div className="stack" style={{ gap: 16, maxWidth: 820 }}>
              <span className="mono label-wine">{num('story')} — The story</span>
              <h2 className="disp h-m">{profile.storyTitle}</h2>
            </div>
            <div className="prose">
              {profile.story.map((p) => (
                <p key={p.slice(0, 24)}>{withItalics(p)}</p>
              ))}
            </div>
            <figure className="hatch-w on-dark pull-quote">
              <div className="block pull-quote-b" />
              <blockquote className="disp">“{profile.pullQuote}”</blockquote>
              <figcaption className="mono label-rose">{profile.pullQuoteBy}</figcaption>
            </figure>
            <div className="grower-photos">
              {profile.photos.map((p) => (
                <figure key={p.caption} className="hatch">
                  <img src={p.img} alt={p.alt} />
                  <figcaption className="glass mono grower-photo-cap">{p.caption}</figcaption>
                </figure>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section id="year" className="section gridbg-d">
        <div className="container section-pad stack" style={{ gap: 40 }}>
          <div className="section-head">
            <div>
              <span className="mono label-olive">
                {num('year')} — {profile.yearLabel ?? 'A year in the vineyard'}
              </span>
              <h2 className="disp h-m">Twelve months, one bottle.</h2>
            </div>
            <p style={{ maxWidth: 440, color: 'var(--sage)', fontSize: 15, lineHeight: 1.6 }}>
              Pick a month to see what happens in the vineyard and cellar.
            </p>
          </div>
          <div role="tablist" aria-label="Months" className="months">
            {profile.year.map((m, i) => (
              <button
                key={m.short}
                role="tab"
                aria-selected={month === i}
                aria-controls="month-panel"
                aria-label={m.name}
                onClick={() => setMonth(i)}
              >
                <span className="mono mono-sm">{m.short}</span>
                <span
                  className={'month-bar month-bar-' + (m.intensity >= 5 ? 'hi' : m.intensity >= 3 ? 'mid' : 'lo')}
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>
          <div id="month-panel" role="tabpanel" className="month-panel">
            <div className="glass month-main">
              <span className="mono label-olive">{cur.phase}</span>
              <h3 className="disp">{cur.name}</h3>
              <p>{cur.text}</p>
            </div>
            <dl className="month-facts">
              <div>
                <dt className="mono mono-sm label-olive">In the vineyard</dt>
                <dd>{cur.vine}</dd>
              </div>
              <div>
                <dt className="mono mono-sm label-olive">In the cellar</dt>
                <dd>{cur.cellar}</dd>
              </div>
              <div>
                <dt className="mono mono-sm label-olive">Hands needed</dt>
                <dd className="disp" style={{ fontSize: 32 }}>
                  {cur.hands}
                </dd>
              </div>
              <div className="is-wine">
                <dt className="mono mono-sm label-rose">On the table</dt>
                <dd>{cur.food}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section id="plots" className="section">
        <div className="container section-pad grower-plots">
          <div className="stack" style={{ gap: 24 }}>
            <span className="mono label-wine">{num('plots')} — The plots</span>
            <h2 className="disp h-m">{profile.plotsTitle}</h2>
            {profile.plotsIntro && <p className="lede">{profile.plotsIntro}</p>}
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    {['Plot', 'Grape', 'Soil', 'Size', 'Planted'].map((h) => (
                      <th key={h} className="mono mono-sm">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {profile.plots.map((p) => (
                    <tr key={p.name}>
                      <td style={{ fontWeight: 600 }}>{p.name}</td>
                      <td>{p.grape}</td>
                      <td>{p.soil}</td>
                      <td className="num">{p.size}</td>
                      <td className="num">{p.planted}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="gridbg plot-map" aria-label="Schematic map of the plots, not to scale" role="img">
            <span className="mono label-muted" style={{ position: 'absolute', left: 16, top: 16 }}>
              Schematic · not to scale
            </span>
            <div
              className="plot plot-town mono"
              style={{
                left: `${profile.landmark.x}%`,
                top: `${profile.landmark.y}%`,
                width: `${profile.landmark.w}%`,
                height: `${profile.landmark.h}%`,
              }}
            >
              {profile.landmark.label}
            </div>
            {profile.plots.map((p) => (
              <div
                key={p.name}
                className={'plot mono plot-' + p.map.tone}
                style={{ left: `${p.map.x}%`, top: `${p.map.y}%`, width: p.map.w, height: p.map.h }}
              >
                {p.map.label ?? p.name}
              </div>
            ))}
            <div className="plot-legend">
              <span className="mono mono-sm">{profile.mapLegend[0]}</span>
              <span>{profile.mapLegend[1]}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function Visit({ visit, label }: { visit: NonNullable<GrowerProfile['visit']>; label: string }) {
  const [sent, setSent] = useState(false)

  function submit(e: FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="visit" className="section">
      <div className="container section-pad grower-visit">
        <div className="stack" style={{ gap: 20 }}>
          <span className="mono label-wine">{label}</span>
          <h2 className="disp h-m">{visit.title}</h2>
          <p className="lede">{visit.intro}</p>
          <dl className="visit-rows">
            {visit.rows.map(([k, v]) => (
              <div key={k}>
                <dt className="mono label-muted">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        {sent ? (
          <div className="visit-form" role="status">
            <span className="disp" style={{ fontSize: 24 }}>
              Request sent
            </span>
            <p className="lede">We’ll pass your details to {visit.host} and confirm the date by email.</p>
            <button className="btn btn-outline" style={{ alignSelf: 'flex-start' }} onClick={() => setSent(false)}>
              Send another
            </button>
          </div>
        ) : (
          <form className="visit-form" onSubmit={submit}>
            <span className="disp" style={{ fontSize: 24 }}>
              {visit.formTitle}
            </span>
            <div className="visit-fields">
              <label className="fld">
                Name
                <input className="input" type="text" name="name" autoComplete="name" required />
              </label>
              <label className="fld">
                Email
                <input className="input" type="email" name="email" autoComplete="email" required />
              </label>
              <label className="fld">
                Preferred date
                <input className="input" type="date" name="date" required />
              </label>
              <label className="fld">
                Guests
                <select className="input" name="guests" defaultValue="2">
                  {[2, 3, 4, 5, 6].map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </label>
            </div>
            <label className="fld">
              Anything {visit.host} should know?
              <textarea className="input" rows={4} name="notes" />
            </label>
            <button type="submit" className="btn btn-ink btn-lg">
              Send request
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
