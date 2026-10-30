import { useState } from 'react'
import type { Oil } from '../../types'
import { ProductTabs } from '../product/ProductTabs'
import { ProductTastingNotes } from '../product/ProductTastingNotes'
import { OIL_DETAIL_TABS } from './constants'
import { OilGrove } from './OilGrove'
import { OilLabReport } from './OilLabReport'
import { OilTastingSteps } from './OilTastingSteps'
import { OilUses } from './OilUses'
import type { OilTab } from './types'
import styles from './OilDetails.module.css'

export function OilDetails({ oil }: { oil: Pick<Oil, 'acid' | 'poly' | 'detail'> }) {
  const [tab, setTab] = useState<OilTab>('tasting')
  const { detail } = oil
  return (
    <section className="section">
      <div className={`container ${styles.root}`}>
        <ProductTabs label="Oil details" tabs={OIL_DETAIL_TABS} value={tab} onChange={setTab} />

        <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="stack" style={{ gap: 40 }}>
          {tab === 'tasting' && (
            <>
              <ProductTastingNotes notes={detail.tasting} variant="oil" />
              <div className={styles.split}>
                <OilTastingSteps />
                <OilUses uses={detail.uses} />
              </div>
            </>
          )}
          {tab === 'lab' && <OilLabReport oil={oil} />}
          {tab === 'grove' && <OilGrove grove={detail.grove} grovePhoto={detail.grovePhoto} />}
        </div>
      </div>
    </section>
  )
}
