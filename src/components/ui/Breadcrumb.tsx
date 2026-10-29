import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import styles from './Breadcrumb.module.css'

export function Breadcrumb({
  items,
  variant = 'default',
}: {
  items: { label: string; to?: string }[]
  variant?: 'default' | 'onDark'
}) {
  return (
    <nav aria-label="Breadcrumb" className={`mono ${styles.root} ${variant === 'onDark' ? styles.onDark : ''}`}>
      {items.map((it, i) => (
        <Fragment key={it.label}>
          {i > 0 && <span aria-hidden="true">/</span>}
          {it.to ? (
            <Link to={it.to} className="lnk">
              {it.label}
            </Link>
          ) : (
            <span aria-current="page">{it.label}</span>
          )}
        </Fragment>
      ))}
    </nav>
  )
}
