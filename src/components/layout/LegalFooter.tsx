import type { ReactNode } from 'react'
import styles from './LegalFooter.module.css'

export function LegalFooter({ children }: { children?: ReactNode }) {
  return (
    <footer className={styles.root}>
      <div className="container mono mono-sm">
        {children ?? (
          <>
            <span>© 2026 Lees &amp; Leaf — concept project · Fictional producer aliases and composite stories</span>
            <span>Free EU delivery over €120</span>
            <span>Sale of alcohol to persons over 18 only</span>
          </>
        )}
      </div>
    </footer>
  )
}
