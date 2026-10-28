import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../cart/context'
import { MiniFooter } from '../components/Footer'
import { useCountdown } from '../components/useCountdown'
import { clubPlans, type Freq, freqLabel } from '../data/club'
import { site } from '../data/site'
import './Club.css'

const boxContents = [
  ['The bottles', 'A mix of colours and styles. Tell us what you never want — we’ll never send it.'],
  ['The field journal', 'A 32-page printed booklet: grower interviews, harvest reports and maps of the plots.'],
  ['Tasting cards', 'One per wine — serving temperature, what to cook, how long it keeps once open.'],
  ['A small extra', 'Sometimes oil, sometimes salt from Ston, sometimes a jar of the grower’s fig jam.'],
]

const steps = [
  ['Take the taste quiz', 'Eight questions about coffee, citrus and cheese. No wine vocabulary needed.'],
  ['Preview your box', 'Ten days before shipping, see the line-up and swap up to two bottles.'],
  ['Drink and rate', 'Rate each wine in your account. Your next box learns from it.'],
  ['Reorder favourites', 'Members keep a reserved allocation of every wine they’ve received, while stock lasts.'],
]

const compare: [string, string, string, string][] = [
  ['Bottles per box', '3', '6', '12'],
  ['Early access to releases', '24 h', '48 h', '72 h'],
  ['Swap bottles before shipping', '1', '2', 'Unlimited'],
  ['Members-only cuvées', '—', '■', '■'],
  ['Library vintages & magnums', '—', '—', '■'],
  ['Printed field journal', '■', '■', '■'],
  ['Harvest weekend invite', '—', 'Draw', 'Guaranteed'],
  ['Shop discount between boxes', '5%', '10%', '15%'],
]

const faq = [
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

function Cell({ v }: { v: string }) {
  if (v === '■') return <span aria-label="Included">■</span>
  if (v === '—') return <span aria-label="Not included">—</span>
  return <>{v}</>
}

export default function Club() {
  const { add } = useCart()
  const navigate = useNavigate()
  const [freq, setFreq] = useState<Freq>('season')
  const countdown = useCountdown(site.nextBoxCloses)

  function join(planId: string) {
    add(planId, 1, freq)
    navigate('/cart')
  }
  const [open, setOpen] = useState(0)

  return (
    <>
      <section className="section hatch-w on-dark club-hero">
        <div className="block club-hero-b1" />
        <div className="block club-hero-b2" />
        <div className="container section-pad club-hero-inner">
          <div className="stack" style={{ gap: 24 }}>
            <span className="mono label-rose">The Lees &amp; Leaf Club</span>
            <h1 className="disp h-xl">Let the growers pick for you.</h1>
            <p className="club-hero-lede">
              A seasonal box of natural wine chosen with the people who made it. Every shipment comes with a printed
              field journal, tasting cards and first access to the release.
            </p>
          </div>
          <div className="glass club-countdown">
            <span className="mono label-rose">{countdown.closed ? 'Box Nº 07 is closed' : 'Next box closes'}</span>
            <div
              className="club-countdown-grid"
              role="timer"
              aria-label={`${countdown.days} days, ${countdown.hours} hours, ${countdown.mins} minutes left`}
            >
              {['Days', 'Hours', 'Min']
                .map((l, i) => [countdown.cells[i], l])
                .map(([v, l]) => (
                  <div key={l}>
                    <span className="disp">{v}</span>
                    <span className="mono label-rose">{l}</span>
                  </div>
                ))}
              <div className="is-box">
                <span className="disp">Nº 07</span>
                <span className="mono label-wine">Box</span>
              </div>
            </div>
            <p>
              This season: three Istrian growers, one Pelješac red from a 420-bottle run, and a pét-nat we only make for
              members.
            </p>
          </div>
        </div>
      </section>

      <section className="section gridbg">
        <div className="container section-pad stack" style={{ gap: 40 }}>
          <div className="section-head">
            <div>
              <span className="mono label-wine">01 — Choose a plan</span>
              <h2 className="disp h-l">Three sizes. Same care.</h2>
            </div>
            <div role="group" aria-label="Delivery frequency" className="freq-toggle">
              <button aria-pressed={freq === 'season'} onClick={() => setFreq('season')}>
                Every season <span className="mono">4× a year</span>
              </button>
              <button aria-pressed={freq === 'month'} onClick={() => setFreq('month')}>
                Every month <span className="mono">−8%</span>
              </button>
            </div>
          </div>
          <div className="plans">
            {clubPlans.map((p) => (
              <article key={p.id} className={'plan' + (p.featured ? ' is-featured' : '')}>
                <div className="plan-head">
                  <div className="stack" style={{ gap: 8 }}>
                    <span className={'mono ' + (p.featured ? 'label-rose' : 'label-wine')}>{p.tag}</span>
                    <h3 className="disp">{p.name}</h3>
                  </div>
                  <div className="plan-dots" aria-hidden="true">
                    {Array.from({ length: 12 }, (_, i) => (
                      <span key={i} className={i < p.bottles ? 'on' : undefined} />
                    ))}
                  </div>
                </div>
                <p className="plan-desc">{p.desc}</p>
                <div className="plan-price">
                  <span className="disp">€{p.price[freq]}</span>
                  <span className="mono mono-sm">{freqLabel[freq]}</span>
                </div>
                <ul className="square-list plan-perks">
                  {p.perks.map((k) => (
                    <li key={k}>
                      <span aria-hidden="true">■</span>
                      <span>{k}</span>
                    </li>
                  ))}
                </ul>
                <button className={'btn btn-lg ' + (p.featured ? 'btn-paper' : 'btn-ink')} onClick={() => join(p.id)}>
                  Start with {p.name}
                </button>
              </article>
            ))}
          </div>
          <p className="mono label-muted" style={{ textAlign: 'center' }}>
            Prices include EU delivery · Skip or pause any box · Cancel online in two clicks
          </p>
        </div>
      </section>

      <section className="section">
        <div className="club-box">
          <div className="hatch club-box-art">
            <div className="club-box-grid" aria-hidden="true">
              {['#1E0A10', '#A2562A', '#6B733A', '#2A0E16', '#A9AD7A', '#6E1C2B'].map((c) => (
                <span key={c} style={{ background: c }} />
              ))}
            </div>
            <div className="glass club-box-cap">
              <span className="mono mono-sm" style={{ color: 'var(--sage)' }}>
                Box Nº 06 · Summer
              </span>
              <span style={{ fontSize: 14 }}>2 white · 2 orange · 1 rosé · 1 pét-nat</span>
            </div>
          </div>
          <div className="club-box-copy">
            <span className="mono label-wine">02 — What arrives</span>
            <h2 className="disp h-m">Inside every box</h2>
            <ol className="box-list">
              {boxContents.map(([t, d], i) => (
                <li key={t}>
                  <span className="disp accent">{'ABCD'[i]}</span>
                  <div className="stack" style={{ gap: 4 }}>
                    <span style={{ fontWeight: 600, fontSize: 17 }}>{t}</span>
                    <span style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--ink-body)' }}>{d}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="how" className="section" style={{ background: 'var(--olive-900)', color: 'var(--paper)' }}>
        <div className="container section-pad stack" style={{ gap: 40 }}>
          <span className="mono label-olive">03 — How it works</span>
          <ol className="how-steps">
            {steps.map(([t, d], i) => (
              <li key={t}>
                <span className="disp">{i + 1}</span>
                <h3>
                  {i === 0 ? (
                    <Link to="/quiz" className="lnk">
                      {t} →
                    </Link>
                  ) : (
                    t
                  )}
                </h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container section-pad stack" style={{ gap: 32 }}>
          <span className="mono label-wine">04 — Compare</span>
          <div className="table-wrap">
            <table className="compare-table">
              <thead>
                <tr>
                  <th className="mono mono-sm">Feature</th>
                  <th className="mono mono-sm">Explorer</th>
                  <th className="mono mono-sm is-featured">Cellar</th>
                  <th className="mono mono-sm">Collector</th>
                </tr>
              </thead>
              <tbody>
                {compare.map(([f, a, b, c]) => (
                  <tr key={f}>
                    <th scope="row">{f}</th>
                    <td>
                      <Cell v={a} />
                    </td>
                    <td className="is-featured">
                      <Cell v={b} />
                    </td>
                    <td>
                      <Cell v={c} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="faq" className="section">
        <div className="container section-pad club-faq">
          <div className="stack" style={{ gap: 16 }}>
            <span className="mono label-wine">05 — Questions</span>
            <h2 className="disp h-m">Before you join</h2>
            <p className="lede" style={{ fontSize: 16 }}>
              Still unsure? Write to <a href={`mailto:${site.clubEmail}`}>{site.clubEmail}</a> — a person who has tasted
              every wine in the box will answer.
            </p>
          </div>
          <div className="faq">
            {faq.map((f, i) => {
              const isOpen = open === i
              return (
                <div key={f.q}>
                  <button aria-expanded={isOpen} aria-controls={`faq-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                    <span>{f.q}</span>
                    <span className="faq-icon" aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  {isOpen && <p id={`faq-${i}`}>{f.a}</p>}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="hatch on-dark club-cta">
        <div className="block club-cta-b" />
        <div className="container club-cta-inner">
          <h2 className="disp">Your first box ships with the autumn release.</h2>
          <div className="glass club-cta-btns">
            <Link to="/quiz" className="btn btn-paper btn-lg">
              Take the taste quiz
            </Link>
            <button className="btn btn-primary btn-lg" onClick={() => join('club-cellar')}>
              Join the Cellar plan →
            </button>
          </div>
          <span className="mono" style={{ color: 'var(--sage)' }}>
            Gift memberships available · 3, 6 or 12 months
          </span>
        </div>
      </section>

      <MiniFooter />
    </>
  )
}
