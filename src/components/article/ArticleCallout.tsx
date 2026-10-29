import { COLORS } from '../../styles/colors'
import styles from './ArticleCallout.module.css'

export function ArticleCallout({ kicker, title, steps }: { kicker: string; title: string; steps: string[] }) {
  return (
    <aside className={`hatch ${styles.root}`}>
      <div className={`block ${styles.b}`} aria-hidden="true" />
      <div className={`glass ${styles.panel}`}>
        <span className="mono" style={{ color: COLORS.sage }}>
          {kicker}
        </span>
        <span className={`disp ${styles.title}`}>{title}</span>
        <ol>
          {steps.map((s, i) => (
            <li key={s}>
              <span className="mono">{String(i + 1).padStart(2, '0')}</span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
      </div>
    </aside>
  )
}
