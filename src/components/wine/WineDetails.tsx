import { useState } from 'react'
import type { WineDetail } from '../../types'
import { Scene } from '../illustrations/Scene'
import { ProductDetailRows } from '../product/ProductDetailRows'
import { ProductTabs } from '../product/ProductTabs'
import { ProductTastingNotes } from '../product/ProductTastingNotes'
import { DETAIL_TABS } from './constants'
import type { Tab } from './types'
import styles from './WineDetails.module.css'

export function WineDetails({ detail }: { detail: WineDetail }) {
  const [tab, setTab] = useState<Tab>('tasting')
  return (
    <section className="section">
      <div className={`container ${styles.root}`}>
        <ProductTabs label="Wine details" tabs={DETAIL_TABS} value={tab} onChange={setTab} />

        <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="stack" style={{ gap: 40 }}>
          {tab === 'tasting' && (
            <>
              <ProductTastingNotes notes={detail.tasting} variant="wine" />
              <div className={styles.tastingMore}>
                <div className="stack" style={{ gap: 16 }}>
                  <span className="mono label-muted">Structure</span>
                  {detail.structure.map((b) => (
                    <div key={b.label} className={styles.barRow}>
                      <span>{b.label}</span>
                      <div className={styles.bar} role="img" aria-label={`${b.label}: ${b.value} out of 10`}>
                        {Array.from({ length: 10 }, (_, i) => (
                          <span key={i} className={i < b.value ? styles.on : undefined} />
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
                  <div className={styles.serve}>
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
                  <ul className={styles.pairings}>
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
            <div className={styles.tastingMore}>
              <ProductDetailRows rows={detail.vineyard} />
              <div className={`hatch ${styles.vineyardMap}`}>
                <Scene kind="map" cue={detail.vineyardMap} label={`Map: ${detail.vineyardMap}`} />
              </div>
            </div>
          )}

          {tab === 'cellar' && (
            <div style={{ maxWidth: 900 }}>
              <ProductDetailRows rows={detail.cellar} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
