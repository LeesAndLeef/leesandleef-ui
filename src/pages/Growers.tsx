import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MiniFooter } from '../components/Footer'
import { Breadcrumb } from '../components/ui'
import { type Grower, growerRegions, growers } from '../data/growers'
import { products } from '../data/products'
import { site } from '../data/site'
import './Growers.css'

const rules = [
  ['Hand-harvested only', 'We check at harvest, not on paper.'],
  ['No herbicides', 'Cover crops, mowing or hoeing instead. Certified organic is welcome but not required.'],
  ['Native yeast', 'Fermented with what lives on the grapes and in the cellar.'],
  ['≤ 30 mg/L total SO₂', 'Lab-tested on every lot we buy. Results available on request.'],
  ['Small and family-run', 'The person we talk to is the person who prunes.'],
  ['Paid before bottling', 'Growers never carry our risk. We pay for the wine before it leaves the cellar.'],
]

function stockLabel(g: Grower) {
  const mine = products.filter((p) => p.growerId === g.id)
  const wines = mine.filter((p) => p.kind === 'wine').length
  const oil = mine.some((p) => p.kind === 'oil')
  return `${wines} wine${wines === 1 ? '' : 's'}${oil ? ' + oil' : ''}`
}

export default function Growers() {
  const [region, setRegion] = useState('All')
  const shown = growers.filter((g) => region === 'All' || g.region === region)

  return (
    <>
      <section className="section gridbg">
        <div className="container growers-head">
          <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Growers' }]} />
          <div className="growers-intro">
            <h1 className="disp growers-title">
              The growers<span className="accent">.</span>
            </h1>
            <p>
              Every bottle we sell comes from someone we’ve stood in a vineyard with. Most farm under five hectares;
              some started with a borrowed press. Meet six of the twenty-three — more profiles are added with every
              release.
            </p>
          </div>
          <div role="group" aria-label="Region" className="chip-row">
            {['All', ...growerRegions].map((r) => (
              <button key={r} className="chip" aria-pressed={region === r} onClick={() => setRegion(r)}>
                {r}{' '}
                <span className="mono">
                  {r === 'All' ? growers.length : growers.filter((g) => g.region === r).length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container growers-list stack" style={{ gap: 24 }}>
          <span className="mono label-muted" role="status">
            {shown.length} grower{shown.length === 1 ? '' : 's'}
          </span>
          <div className="growers-grid">
            {shown.map((g) => (
              <Link key={g.id} to={`/growers/${g.id}`} className="lnk gcard">
                <span className="hatch gcard-img">
                  {g.portrait && <img src={g.portrait} alt={`Illustrated portrait — ${g.people}`} />}
                  <span className="glass gcard-facts">
                    <span className="mono">{g.ha}</span>
                    <span className="mono">{g.since}</span>
                  </span>
                  <span className="mono gcard-region">{g.region}</span>
                </span>
                <span className="gcard-body">
                  <span className="mono label-muted">{g.place}</span>
                  <span className="disp gcard-name">{g.name}</span>
                  <span className="gcard-quote">“{g.quote}”</span>
                  <span className="gcard-grapes">
                    {g.grapes.map((gr) => (
                      <span key={gr}>{gr}</span>
                    ))}
                  </span>
                  <span className="gcard-foot">
                    <span className="gcta">Read the profile →</span>
                    <span className="mono label-muted" style={{ fontSize: 11 }}>
                      {stockLabel(g)}
                    </span>
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section gridbg-d growers-rules">
        <div className="container stack" style={{ gap: 40, paddingTop: 96, paddingBottom: 96 }}>
          <div className="growers-rules-head">
            <div className="stack" style={{ gap: 16 }}>
              <span className="mono label-olive">How we choose growers</span>
              <h2 className="disp growers-h2">Six rules. No exceptions.</h2>
            </div>
            <p>
              We visit every grower at least twice a year — once at harvest, once at bottling. A wine only joins the
              cellar when it meets all six.
            </p>
          </div>
          <ol className="growers-rule-list">
            {rules.map(([title, text], i) => (
              <li key={title}>
                <span className="disp growers-rule-no">{String(i + 1).padStart(2, '0')}</span>
                <span style={{ fontWeight: 600, fontSize: 17 }}>{title}</span>
                <span className="growers-rule-text">{text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section hatch-w on-dark growers-suggest">
        <div className="block growers-suggest-b" aria-hidden="true" />
        <div className="container growers-suggest-inner">
          <div className="stack" style={{ gap: 14 }}>
            <h2 className="disp growers-h2-sm">Know a grower we should meet?</h2>
            <p style={{ color: 'var(--wine-100)', lineHeight: 1.6 }}>
              Tell us who they are and where they farm. We taste everything people send us, and visit the ones we can’t
              stop thinking about.
            </p>
          </div>
          <div className="glass growers-suggest-card">
            <span className="mono" style={{ color: 'var(--wine-200)' }}>
              Write to
            </span>
            <a href={`mailto:${site.supportEmail}`} className="disp growers-email">
              {site.supportEmail}
            </a>
            <span style={{ fontSize: 14, color: 'var(--wine-100)' }}>
              We reply to every message, usually within a week.
            </span>
          </div>
        </div>
      </section>

      <MiniFooter />
    </>
  )
}
