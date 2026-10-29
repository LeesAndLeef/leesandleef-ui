import type { ComponentProps, ReactNode } from 'react'
import { Breadcrumb } from '../ui/Breadcrumb'
import styles from './ProductHero.module.css'

export function ProductHero({
  crumbs,
  gallery,
  children,
}: {
  crumbs: ComponentProps<typeof Breadcrumb>['items']
  gallery: ReactNode
  children: ReactNode
}) {
  return (
    <>
      <div className={`container ${styles.crumbs}`}>
        <Breadcrumb items={crumbs} />
      </div>

      <section className="section">
        <div className={styles.hero}>
          {gallery}
          <div className={styles.buyBox}>{children}</div>
        </div>
      </section>
    </>
  )
}
