import { COLORS } from '../../styles/colors'
import { BOX_CONTENTS } from './constants'
import styles from './ClubBox.module.css'

export function ClubBox() {
  return (
    <section className="section">
      <div className={styles.box}>
        <div className={`hatch ${styles.boxArt}`}>
          <div className={styles.boxGrid} aria-hidden="true">
            {[
              COLORS.glassRed,
              COLORS.glassAmber,
              COLORS.olive500,
              COLORS.glassGarnet,
              COLORS.olive300,
              COLORS.wine,
            ].map((c) => (
              <span key={c} style={{ background: c }} />
            ))}
          </div>
          <div className={`glass ${styles.boxCap}`}>
            <span className="mono mono-sm" style={{ color: COLORS.sage }}>
              Box Nº 06 · Summer
            </span>
            <span style={{ fontSize: 14 }}>2 white · 2 orange · 1 rosé · 1 pét-nat</span>
          </div>
        </div>
        <div className={styles.boxCopy}>
          <span className="mono label-wine">02 — What arrives</span>
          <h2 className="disp h-m">Inside every box</h2>
          <ol className={styles.boxList}>
            {BOX_CONTENTS.map(([t, d], i) => (
              <li key={t}>
                <span className="disp accent">{'ABCD'[i]}</span>
                <div className="stack" style={{ gap: 4 }}>
                  <span style={{ fontWeight: 600, fontSize: 17 }}>{t}</span>
                  <span style={{ fontSize: 15, lineHeight: 1.55, color: COLORS.inkBody }}>{d}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
