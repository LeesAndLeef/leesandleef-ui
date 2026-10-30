import { Link, useParams } from 'react-router-dom'
import { GrowerProfile } from '../../components/grower/GrowerProfile'
import { GrowerVisit } from '../../components/grower/GrowerVisit'
import { Bottle } from '../../components/illustrations/Bottle'
import { Breadcrumb } from '../../components/ui/Breadcrumb'
import { formatCurrency } from '../../lib/currency'
import { getGrower, growers } from '../../lib/growers'
import { winePath } from '../../lib/paths'
import { wines } from '../../lib/wine'
import { GROWERS_ROUTE, HOME_ROUTE } from '../../routes'
import { useCart } from '../../state/cart/useCart'
import { COLORS } from '../../styles/colors'
import NotFoundPage from '../NotFound/NotFoundPage'
import styles from './GrowerPage.module.css'

export default function GrowerPage() {
  const { id } = useParams()
  const { add } = useCart()
  const grower = getGrower(id)

  if (!grower) return <NotFoundPage />

  const profile = grower.profile
  const inStock = wines.filter((w) => w.growerId === grower.id)
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
      <section className={`section hatch on-dark ${styles.hero}`}>
        {profile ? (
          <img src={profile.heroImg} alt={`Illustration: ${profile.heroPhoto}`} className={styles.heroImg} />
        ) : (
          <>
            <div className={`block ${styles.heroB1}`} style={{ background: grower.tone }} />
            <div className={`block ${styles.heroB2}`} />
          </>
        )}
        <div className={`container ${styles.heroInner}`}>
          <Breadcrumb
            variant="onDark"
            items={[{ label: 'Home', to: HOME_ROUTE }, { label: 'Growers', to: GROWERS_ROUTE }, { label: grower.name }]}
          />
          <h1 className={`disp ${styles.name}`}>
            {first}
            {rest.length > 0 && (
              <>
                <br />
                {rest.join(' ')}
              </>
            )}
          </h1>
          <dl className={`glass ${styles.facts}`}>
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt className="mono mono-sm" style={{ color: COLORS.sage }}>
                  {k}
                </dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {profile ? (
        <GrowerProfile profile={profile} sections={sections} num={num} />
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
        <section id="wines" className="section" style={{ background: COLORS.bone }}>
          <div className="container section-pad stack" style={{ gap: 32 }}>
            <div className="section-head">
              <div>
                <span className="mono label-wine">{profile ? `${num('wines')} — ` : ''}Wines in stock</span>
                <h2 className="disp h-m">{profile?.winesTitle ?? 'In stock'}</h2>
              </div>
              {inStock.length > 1 && (
                <button className="btn btn-primary" onClick={() => inStock.forEach((w) => add(w.id))}>
                  Add the {grower.shortName} {bundleName} — {formatCurrency(bundleTotal)}
                </button>
              )}
            </div>
            <div className={`ledger ${styles.wines}`}>
              {inStock.map((w) => (
                <Link key={w.id} to={winePath(w)} className={`lnk ${styles.wine}`}>
                  <span className={`hatch ${styles.wineImg}`}>
                    <Bottle glass={w.glass} cap={COLORS.wine} width={44} height={150} detail="label" />
                  </span>
                  <span className="stack" style={{ gap: 8 }}>
                    <span className="mono mono-sm label-muted">{w.kind === 'wine' ? w.type : 'Olive oil'}</span>
                    <span style={{ fontWeight: 600, fontSize: 18, lineHeight: 1.3 }}>{w.name}</span>
                    <span style={{ fontSize: 14, lineHeight: 1.5, color: COLORS.inkBody }}>{w.note}</span>
                    <span className="disp" style={{ fontSize: 24, marginTop: 'auto' }}>
                      {formatCurrency(w.price)}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {profile?.visit && <GrowerVisit visit={profile.visit} label={`${num('visit')} — Visit`} />}

      {next && next.id !== grower.id && (
        <Link to={`${GROWERS_ROUTE}/${next.id}`} className={`lnk hatch-w ${styles.nextGrower}`}>
          <div className="container">
            <span className="mono label-rose">Next grower</span>
            <span className="disp">{next.name} →</span>
          </div>
        </Link>
      )}
    </>
  )
}
