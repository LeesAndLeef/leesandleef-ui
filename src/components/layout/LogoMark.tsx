import styles from './LogoMark.module.css'

export function LogoMark({ size = 28, gap = 2 }: { size?: number; gap?: number }) {
  return (
    <span className={styles.root} style={{ width: size, height: size, gap }} aria-hidden="true">
      <span className={styles.wine} />
      <span className={styles.olive} />
      <span className={styles.olive} />
      <span className={styles.wine} />
    </span>
  )
}
