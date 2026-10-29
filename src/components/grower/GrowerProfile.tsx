import { useState } from 'react'
import { COLORS } from '../../styles/colors'
import type { GrowerProfile as Profile } from '../../types'
import styles from './GrowerProfile.module.css'

function withItalics(text: string) {
  return text.split(/<em>(.*?)<\/em>/).map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part))
}

export function GrowerProfile({
  profile,
  sections,
  num,
}: {
  profile: Profile
  sections: [string, string][]
  num: (id: string) => string
}) {
  const [month, setMonth] = useState(profile.defaultMonth)
  const cur = profile.year[month]

  return (
    <>
      <section className="section">
        <div className={styles.storyWrap}>
          <aside className={styles.toc}>
            <span className="mono label-wine">In this profile</span>
            <nav aria-label="Sections" className={styles.tocNav}>
              {sections.map(([id, label]) => (
                <a key={id} href={`#${id}`} className="lnk">
                  <span>
                    {num(id)} · {label}
                  </span>
                  <span aria-hidden="true">↓</span>
                </a>
              ))}
            </nav>
            <div className={styles.checklist}>
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

          <article id="story" className={styles.story}>
            <div className="stack" style={{ gap: 16, maxWidth: 820 }}>
              <span className="mono label-wine">{num('story')} — The story</span>
              <h2 className="disp h-m">{profile.storyTitle}</h2>
            </div>
            <div className={styles.prose}>
              {profile.story.map((p) => (
                <p key={p.slice(0, 24)}>{withItalics(p)}</p>
              ))}
            </div>
            <figure className={`hatch-w on-dark ${styles.pullQuote}`}>
              <div className={`block ${styles.pullQuoteB}`} />
              <blockquote className="disp">“{profile.pullQuote}”</blockquote>
              <figcaption className="mono label-rose">{profile.pullQuoteBy}</figcaption>
            </figure>
            <div className={styles.photos}>
              {profile.photos.map((p) => (
                <figure key={p.caption} className="hatch">
                  <img src={p.img} alt={p.alt} />
                  <figcaption className={`glass mono ${styles.photoCap}`}>{p.caption}</figcaption>
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
            <p style={{ maxWidth: 440, color: COLORS.sage, fontSize: 15, lineHeight: 1.6 }}>
              Pick a month to see what happens in the vineyard and cellar.
            </p>
          </div>
          <div role="tablist" aria-label="Months" className={styles.months}>
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
                  className={`${styles.monthBar} ${m.intensity >= 5 ? styles.monthBarHi : m.intensity >= 3 ? styles.monthBarMid : styles.monthBarLo}`}
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>
          <div id="month-panel" role="tabpanel" className={styles.monthPanel}>
            <div className={`glass ${styles.monthMain}`}>
              <span className="mono label-olive">{cur.phase}</span>
              <h3 className="disp">{cur.name}</h3>
              <p>{cur.text}</p>
            </div>
            <dl className={styles.monthFacts}>
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
              <div className={styles.isWine}>
                <dt className="mono mono-sm label-rose">On the table</dt>
                <dd>{cur.food}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section id="plots" className="section">
        <div className={`container section-pad ${styles.plots}`}>
          <div className="stack" style={{ gap: 24 }}>
            <span className="mono label-wine">{num('plots')} — The plots</span>
            <h2 className="disp h-m">{profile.plotsTitle}</h2>
            {profile.plotsIntro && <p className="lede">{profile.plotsIntro}</p>}
            <div className="table-wrap">
              <table className={styles.dataTable}>
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
          <div className={`gridbg ${styles.plotMap}`} aria-label="Schematic map of the plots, not to scale" role="img">
            <span className="mono label-muted" style={{ position: 'absolute', left: 16, top: 16 }}>
              Schematic · not to scale
            </span>
            <div
              className={`${styles.plot} ${styles.town} mono`}
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
                className={`${styles.plot} mono ${styles[p.map.tone]}`}
                style={{ left: `${p.map.x}%`, top: `${p.map.y}%`, width: p.map.w, height: p.map.h }}
              >
                {p.map.label ?? p.name}
              </div>
            ))}
            <div className={styles.plotLegend}>
              <span className="mono mono-sm">{profile.mapLegend[0]}</span>
              <span>{profile.mapLegend[1]}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
